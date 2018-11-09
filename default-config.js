module.exports = {
  // The port to run on
  port: 8080,
  // The route's prefix. Defaults to `/hooks`
  prefix: '/hooks',
  // An array of hooks
  hooks: [
    // Each hook to listen for is a distinct object. This example hook
    // will execute when a POST request is sent to /hooks/test,
    // and will run the command `git pull` while also logging to console.
    {
      // The route to listen on. Routes are prefixed with the prefix defined earlier on
      route: '/test',
      // The method to listen to. Defaults to POST
      method: 'POST',
      // (optional) A function that takes the webhook payload and returns a boolean
      // If false, takes no further action.
      validate(payload) {
        return true;
      },
      // (optional) A shell command to execute after a webhook is validated
      command: 'git pull',
      // (optional) A function to execute after a webhook is validated
      execute(payload) {
        console.log('Yay!');
      }
    }
  ]
};