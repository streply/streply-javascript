# Streply SDK for React

## General

This package is a wrapper around `@streply/browser`, with added functionality related to React.

To use this SDK, call `init()` before you mount your React component.

### Usage example

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import * as Streply from '@streply/react';

Streply.init({
    dsn: '_YOUR_DSN_',
});

ReactDOM.render(<App />, rootNode);
```