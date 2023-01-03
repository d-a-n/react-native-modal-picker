# Simple Demo App

This demo app demonstrates how to use this component.

```
$ npm install
$ react-native run-[ios|android]
```

# Development

Use [nodemon](https://github.com/remy/nodemon) to keep the module in sync with `node_modules` of this example app:

```
$ npm install
$ npm run nodemon
$ npm run start
```

You can now edit the files in `../`, and they will be synced to `node_modules/react-native-modal-selector/`


# Modifying react-native-modal-selector (RNMS) code during development

If the nodemon watcher doesn't work on your system, run `npm run postinstall` to update the library code in this sample app.  This must be done manually every time the library's code changes.  For Windows, the `postinstall` script must be modified to:
```
  "postinstall": "copy /y ..\\*.js node_modules\\react-native-modal-selector",
```
