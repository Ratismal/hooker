# hooker

A simple webhook receiver that executes shell commands.

## Configuration:

Configuration is done with a javascript file instead of JSON (whoa, I know right?!) to allow for more complex validation. You can use a JSON file if you want too, I guess. Hooker doesn't care.

See [`default-config.js`](default-config.js) for the default configuration file. If you run hooker without defining a config, `default-config.js` will be copied to a `config.js` file.

## Usage

First of all, clone the project.
```
git clone https://github.com/Ratismal/hooker.git <dir_name>
```

Next, install packages.
```
yarn install
```

Do your configuration stuff (or don't, I'm not your boss), and then run the start script.
```
yarn start
```