
/**
 * Returns a string containing the function's body.
 *
 * @param {Function} fn 
 */
export function getFunctionBody (fn) {
  let fnString = fn.toString()
  return fnString
    .slice(
      fnString.indexOf('{') + 1,
      fnString.lastIndexOf('}')
    )
    .replace(/\bcov_[a-z0-9]+\b/g, '')
    .replace(/\[[0-9]+\]/g, '')
}
