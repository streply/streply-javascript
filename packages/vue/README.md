# Vue.JS

The official Streply library for the Vue.js framework.

This package is a wrapper around `@streply/browser`, with added functionality related to Vue.js.

To use this SDK, call `init()` as early in your application as possible.

## Install

The first step is to install the `streply/vue` package.

NPM
```bash
npm install --save @streply/vue
```
    
YARN

```bash
yarn add @streply/vue
```

Then initialize Streply:

```js
import { createApp } from 'vue'
import App from './App.vue'
import * as Streply from '@streply/vue';

const app = createApp(App);

Streply.init(app, {
    dsn: 'https://clientPublicKey@api.streply.com/projectId',
});

app.mount('#app')
```

You can find the DSN code of the project in the Projects tab of your [Streply account](https://app.streply.com/projects).

## Capture events

### Errors

Streply automatically finds all errors in your code, but you can also identify exceptions yourself.

```js
try {
    nonExistsFunc("Welcome!");
} catch(err) {
    Streply.Exception(err);
}
```

Also, you can trigger errors in this way:

```typescript
<button @click="triggerError">Trigger error</button>

export default {
    methods: {
        triggerError() {
            throw new Error('This is an error');
        }
    }
};
```

If needed, you can manually send an error to Streply:

```js
Streply.Error('This is an error', {'userId': 1}, Streply.Level.Critical);
```

Reade more about [Capture errors in JS](https://docs.streply.com/js/capture-events/errors).

### Logs

To send a log to Streply, use the `Streply.Log` function.

```js
let createUser = function(userName) {
    // ...
    
    Streply.Log('users.create', {'userName': userName});
}

createUser('Joey Tribbiani');
```

Reade more about [Capture logs in JS](https://docs.streply.com/js/capture-events/logs).

## Configuration

Configuration should happen as early as possible in your code.

```js
Streply.init(app, {
    dsn: 'https://clientPublicKey@api.streply.com/projectId',
    environment: 'local'
});

// or 

Streply.Config.Environment('local');
```

Reade more about Streply configuration in [Configuration](https://docs.streply.com/js/configuration) page.