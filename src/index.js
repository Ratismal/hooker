const Koa = require('koa');
const Router = require('koa-router');
const config = require('./config');
const { exec } = require('child_process');
const { promisify } = require('util');
const pExec = promisify(exec);

const app = new Koa();
const router = new Router({
  prefix: config.prefix || '/hooks'
});

async function initialize() {
  for (const hook of config.hooks || []) {
    router[hook.method ? hook.method.toLowerCase() : 'post'](hook.route, async (ctx, next) => {
      let payload = ctx.request.body;
      console.log('Received a webhook on', ctx.path);
      if (!hook.validate || (typeof hook.validate === 'function' && await hook.validate(payload))) {
        if (hook.execute && typeof hook.execute === 'function') {
          await hook.execute(payload);
        }
        if (hook.command) {
          console.log('Executing command...');
          try {
            let result = await pExec(hook.command);
            console.log(result.stdout, result.stderr);
          } catch (err) {
            console.error(err);
          }
        }
        ctx.status = 200;
        ctx.body = 'OK';
      } else {
        ctx.status = 400;
        ctx.body = 'Failed Validation';
      }
    });
  }

  app.use(router.routes()).use(router.allowedMethods());

  app.listen(config.port || 8080);
}

initialize().then(() => {
  console.log('Setup is done.');
}).catch(err => {
  console.error('Unexpected termination:', err);
});