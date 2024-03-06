# Streply SDK for Vue.js

## General

This package is a wrapper around `@streply/browser`, with added functionality related to Vue.js.

To use this SDK, call `init()` as early in your application as possible.

### Usage example

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import * as Streply from '@streply/vue';

const app = createApp(App);

Streply.init(app, {
    dsn: '_YOUR_DSN_',
});

app.mount('#app')
```