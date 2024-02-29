# Streply SDK for Vue.js

## General

This package is a wrapper around `@streply/browser`, with added functionality related to Vue.js.

To use this SDK, call `init()` as early in your application as possible.

### Usage example

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import { init } from '@streply/vue';

const app = createApp(App);

init(app, {
    projectId: 'YOUR_PROJECT_ID',
    server: 'https://api.streply.com',
    token: 'YOUR_TOKEN',
});

app.mount('#app')
```