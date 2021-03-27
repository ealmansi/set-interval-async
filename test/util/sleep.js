/**
 * Copyright (c) 2021 Emilio Almansi. All rights reserved.
 * This work is licensed under the terms of the MIT license.
 * For a copy, see the file LICENSE in the root directory.
 */

/**
 * Returns a promise which resolves to undefined after the
 * specified number of millisenconds.
 *
 * @param {number} interval - Interval in milliseconds
 */
 export async function sleep (interval) {
  await new Promise((resolve) => {
    setTimeout(resolve, interval)
  })
}
