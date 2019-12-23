# Simple Demo App

This demo app demonstrates how to use this component.

```
$ npm install
$ cd ios && pod install
$ react-native run-[ios|android]
```

# Development

Use [nodemon](https://github.com/remy/nodemon) to keep the module in sync with `node_modules` of this example app:

```
$ npm install
$ npx react-native run-[ios|android]
$ npm run nodemon
```

You can now edit the files in `../`, and they will be synced to `node_modules/react-native-modal-selector/`

# Modifying react-native-modal-selector (RNMS) code during development

The RNMS source code is copied post-install due to a circular symlink bug. If the RNMS code changes, you must run `npm run postinstall` to update it in this sample app.
