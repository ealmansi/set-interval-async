import { setIntervalAsync, clearIntervalAsync } from 'set-interval-async/fixed'

/**
 * HOW TO RUN THIS EXAMPLE.
 * 
 * Run the following command from the examples directory root:
 * 
 * `node --require @babel/register fixed/node-esm/example3.js`
 */

const INTERVAL_MS = 500
const EXAMPLE_DURATION_SEC = 5

let executionTimeMs = [600, 200, 200, 200, 200, 200]
let queue = [0, 1, 2, 3, 4, 5]

/**
 * This function is not guaranteed to work properly if executed
 * concurrently more than once at any given moment.
 */
async function processNextQueueElement () {
  if (queue.length === 0) {
    return
  }
  const head = queue[0]
  console.log(`Processing: ${head}.`)
  await sleep(executionTimeMs[head])
  console.log(`Done processing: ${head}.`)
  queue = queue.slice(1)
}

// Using vanilla setInterval here would lead to element 0
// being processed twice, and element 1 not being processed
// at all.
const timer = setIntervalAsync(
  processNextQueueElement,
  INTERVAL_MS
)

setTimeout(
  async () => {
    await clearIntervalAsync(timer)
    console.log('Done.')
  },
  EXAMPLE_DURATION_SEC * 1000
)

async function sleep (milliseconds) {
  await new Promise(
    (resolve) => {
      setTimeout(resolve, milliseconds)
    }
  )
}
