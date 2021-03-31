# `setInterval`<wbr>`Async`<br>[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT) [![npm version](https://img.shields.io/npm/v/set-interval-async.svg?style=flat-square)](https://badge.fury.io/js/set-interval-async) [![Build Status](https://img.shields.io/travis/ealmansi/set-interval-async.svg?style=flat-square)](https://travis-ci.org/ealmansi/set-interval-async) [![Coverage Status](https://img.shields.io/coveralls/github/ealmansi/set-interval-async.svg?style=flat-square)](https://coveralls.io/github/ealmansi/set-interval-async?branch=master)  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) 

Modern version of [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) for promises and async functions available in Node.js and browsers.

`setIntervalAsync` works both on Node.js and in the browser, providing the same <br>
familiar interface as `setInterval` for asynchronous functions, while preventing<br>
multiple executions from overlapping in time.


[![NPM](https://nodei.co/npm/set-interval-async.png)](https://nodei.co/npm/set-interval-async/) [![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

# Getting Started

## Node.js

You can install `setIntervalAsync` using npm:

```bash
npm install set-interval-async
# If using Typescript, also run:
npm install -D @types/set-interval-async
```

Or using Yarn:

```bash
yarn add set-interval-async
# If using Typescript, also run:
yarn add -D @types/set-interval-async
```

Now, you can require `setIntervalAsync` in CommonJS:

```javascript
// Choose one of the following flavors: dynamic, fixed, legacy.

const { setIntervalAsync } = require('set-interval-async/dynamic')
const { setIntervalAsync } = require('set-interval-async/fixed')
const { setIntervalAsync } = require('set-interval-async/legacy')
const { clearIntervalAsync } = require('set-interval-async')

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

import { setIntervalAsync } from 'set-interval-async/dynamic'
import { setIntervalAsync } from 'set-interval-async/fixed'
import { setIntervalAsync } from 'set-interval-async/legacy'
import { clearIntervalAsync } from 'set-interval-async'

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

# Usage

In the most basic scenario, you can use `setIntervalAsync` the same way you would use vanilla `setInterval`. For example, the following code:

```javascript
const {
  setIntervalAsync,
  clearIntervalAsync
} = require('set-interval-async/dynamic')

setIntervalAsync(
  () => console.log('Hello'),
  1000
)
```

will print 'Hello' to the console once every second. However, you can also provide an async function (or a function returning a promise):

```javascript
const timer = setIntervalAsync(
  async () => {
    console.log('Hello')
    await doSomeWork()
    console.log('Bye')
  },
  1000
)

// or equivalently

const timer = setIntervalAsync(
  () => {
    console.log('Hello')
    return doSomeWork().then(
      () => console.log('Bye')
    )
  },
  1000
)
```

which has the added nicety that now you can wait until the cycle is fully stopped before moving on by using `clearIntervalId`. This is particularly useful when, at the end of a unit test, you want to make sure that no asynchronous code continues running by the time your test manager moves on to the next one.

```javascript
it('should test something', async () => {
  const timer = setIntervalAsync(
    /* some async function */,
    /* some interval */
  )
  // Do some assertions.
  await clearIntervalAsync(timer)
  // At this point, all timers have been cleared, and the last
  // execution is guaranteed to have finished as well.
})
```

Where `setIntervalAsync` really shines is in those situations where the given asynchronous function might take longer to compute than the configured interval and, at the same time, is not safe to execute more than once at a time. Using vanilla `setInterval` will break your code in this scenario, whereas `setIntervalAsync` guarantees that the function will never execute more than once at the same time. For example, consider:

```javascript
async function processQueue (queue) {
  if (queue.length === 0) {
    return
  }
  let head = queue[0]
  await doSomeWork(head)
  queue.shift() // Removes the first element.
}
```

The function above should never get called again before the previous execution is completed. Otherwise, the queue's first element will get processed twice, and the second element will be skipped. However, with `setIntervalAsync`, the following is perfectly safe:

```javascript
setIntervalAsync(processQueue, 1000, queue)
```

since `setIntervalAsync` will guarantee that the function is never executed more than once at any given moment. You can choose whether you wish to use the `Dynamic` or `Fixed` flavors, which will either launch every execution as soon as possible or set a fixed delay between the end of one execution and the start of the next one. See [Dynamic and Fixed `setIntervalAsync`](#dynamic-and-fixed-setintervalasync) for more details.

To see a full set of examples and instructions on how to run them, check out our [examples](https://github.com/ealmansi/set-interval-async/tree/master/examples) directory.

## A word of caution

While calling `clearIntervalAsync` to stop an interval is perfectly safe in any circumstance, please note that awaiting its result *within the async handler itself* will lead to undesirable results. For example, the code below:

```javascript
const timer = setIntervalAsync(async () => {
  // ...
  if (shouldStop) {
    await clearIntervalAsync(timer);
    console.log('Stopped!');
  }
}, interval);
```

leads to a cyclical promise chain that will never be resolved (the `console.log` statement is unreachable). This is the case because:

- `await clearIntervalAsync(timer)` will not resolve until the last execution has finished, AND
- the last execution will not finish until `await clearIntervalAsync(timer)` has been resolved.

To prevent this cycle, always allow the async handler to complete without awaiting for the interval to be cleared. For example, by removing the `await` keyword entirely or by using an immediately-invoked function expression:

```javascript
  if (shouldStop) {
    (async () => {
      await clearIntervalAsync(timer);
      console.log('Stopped!');
    })();
  }
```

# Motivation

If you've ever had to deal with weird, subtle bugs as a consequence of using `setInterval`[1] on asynchronous functions, or had to manually reimplement `setInterval` using `setTimeout`[2] to prevent multiple executions of the same asynchronous function from overlapping, then this library is a drop-in replacement that will solve your issues.

`setInterval` runs a given function repeateadly, once every fixed number of milliseconds. This may cause problems whenever the function takes longer to execute than the given interval, since it will be called again before the first execution has finished. This is often a problem for non-reentrant functions; ie. functions that are not designed to allow multiple executions at the same time.

`setIntervalAsync` is a drop-in replacement of `setInterval` which shares the same API but is safe to use with non-reentrant, asynchronous functions. 

[1] https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout<br>
[2] https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval

# Dynamic and Fixed `setIntervalAsync`

`setIntervalAsync` provides two strategies which can be used to prevent a recurring function from executing more than once at any given moment:

- **Dynamic**: If possible, the given function is called once every `interval` milliseconds. If any execution takes longer than the desired interval, the next execution is delayed until the previous one has finished, and called immediately after this condition is reached.<br><br>![Dynamic setIntervalAsync diagram.](https://github.com/ealmansi/set-interval-async/raw/master/assets/dynamic.png)

- **Fixed**: The given function is called repeatedly, guaranteeing a fixed delay of `interval` milliseconds between the end of one execution and the start of the following one.<br><br>![Fixed setIntervalAsync diagram.](https://github.com/ealmansi/set-interval-async/raw/master/assets/fixed.png)

You can choose whichever strategy works best for your application. When in doubt, the `Dynamic` strategy will likely suffice for most use cases, keeping the interval as close as possible to the desired one.

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

# License

[MIT](https://raw.githubusercontent.com/ealmansi/set-interval-async/master/LICENSE)
