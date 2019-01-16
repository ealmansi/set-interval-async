import { setIntervalAsync, clearIntervalAsync } from 'set-interval-async/dynamic'

/**
 * HOW TO RUN THIS EXAMPLE.
 * 
 * Run the following command from the examples directory root:
 * 
 * `node --require @babel/register dynamic/node-esm/example1.js`
 */

const INTERVAL_MS = 1000
const EXECUTION_TIME_MS = 500
const EXAMPLE_DURATION_SEC = 10

const timer = setIntervalAsync(
  async () => {
    console.log('Start async fn 1.')
    await sleep(EXECUTION_TIME_MS)
    console.log('End async fn 1.')
  },
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
