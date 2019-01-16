# `setIntervalAsync`  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT) [![npm version](https://img.shields.io/npm/v/set-interval-async.svg?style=flat-square)](https://badge.fury.io/js/set-interval-async) [![Build Status](https://img.shields.io/travis/ealmansi/set-interval-async.svg?style=flat-square)](https://travis-ci.org/ealmansi/set-interval-async) [![Coverage Status](https://img.shields.io/coveralls/github/ealmansi/set-interval-async.svg?style=flat-square)](https://coveralls.io/github/ealmansi/set-interval-async?branch=master)  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) 

Modern version of [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) for promises and async functions.

`setIntervalAsync` works both on Node.js and in the browser, providing the same <br>
familiar interface as `setInterval` for asynchronous functions, while preventing<br>
multiple executions from overlapping in time.


[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard) [![NPM](https://nodei.co/npm/set-interval-async.png)](https://nodei.co/npm/set-interval-async/)

# Getting Started

## Node.js

You can install `setIntervalAsync` using npm:

```bash
npm install -E set-interval-async
```

Or using Yarn:

```bash
yarn add -E set-interval-async
```

Now, you can require `setIntervalAsync` in CommonJS:

```javascript
// Choose one of the following flavors: dynamic, fixed, legacy.

const { setIntervalAsync, clearIntervalAsync } = require('set-interval-async/dynamic')
const { setIntervalAsync, clearIntervalAsync } = require('set-interval-async/fixed')
const { setIntervalAsync, clearIntervalAsync } = require('set-interval-async/legacy')

// Or require all at once:

const {
  dynamic: { setIntervalAsync: setIntervalAsyncD },
  fixed: { setIntervalAsync: setIntervalAsyncF },
  legacy: { setIntervalAsync: setIntervalAsyncL },
  clearIntervalAsync
} = require('set-interval-async')
```

Or else, you can use ES6 modules syntax:

```javascript
// Choose one of the following flavors: dynamic, fixed, legacy.

import { setIntervalAsync, clearIntervalAsync } from 'set-interval-async/dynamic'
import { setIntervalAsync, clearIntervalAsync } from 'set-interval-async/fixed'
import { setIntervalAsync, clearIntervalAsync } from 'set-interval-async/legacy'

// Import all at once:

import {
  dynamic,
  fixed,
  legacy,
  clearIntervalAsync
} from 'set-interval-async'
const { setIntervalAsync: setIntervalAsyncD } = dynamic
const { setIntervalAsync: setIntervalAsyncF } = fixed
const { setIntervalAsync: setIntervalAsyncL } = legacy

```

## Browser

In the browser, you can add a script tag in your HTML:

```html
<script src="https://unpkg.com/set-interval-async"></script>
```

After the script is loaded, a module `SetIntervalAsync` will be defined in the global context.
Now, you can retrieve the `setIntervalAsync` function in any of its flavors:

```javascript
// Choose one of the following flavors: dynamic, fixed, legacy.

var setIntervalAsync = SetIntervalAsync.dynamic.setIntervalAsync
var setIntervalAsync = SetIntervalAsync.fixed.setIntervalAsync
var setIntervalAsync = SetIntervalAsync.legacy.setIntervalAsync

// Load `clearIntervalAsync` as well.

var clearIntervalAsync = SetIntervalAsync.clearIntervalAsync
```

# Motivation

# Dynamic, Fixed, and Legacy `setIntervalAsync`

## Dynamic

## Fixed

## Legacy

# Examples

## [Dynamic] setIntervalAsync

## [Fixed] setIntervalAsync

## [Legacy] setIntervalAsync

## clearIntervalAsync

# Documentation

You can browse the full API in our [Documentation](https://emilio.almansi.me/set-interval-async/) page.

# Contributing

In order to contribute to this project, you will need to first clone the repository:

```bash
git clone https://github.com/ealmansi/set-interval-async.git
```

Make sure that [Yarn](https://yarnpkg.com/en/) is installed globally on your system,
install all project dependencies, and build the project:

```bash
yarn
yarn build
```

Now, you can run the tests and make sure that everything is up and running correctly:

```bash
yarn test
```

If the previous step succeeds, you're ready to start developing on this project. <br>Pull requests are welcome!

You can verify that your code follows the [JavaScript Standard Style](https://standardjs.com/) with the following command:

```bash
yarn lint
```
