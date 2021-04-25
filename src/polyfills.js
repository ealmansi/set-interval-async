export function flat (array) {
  return Array.prototype.reduce.call(array, function (acc, cur) {
    if (Array.isArray(cur)) {
      acc.push.apply(acc, flat(cur))
    } else {
      acc.push(cur)
    }

    return acc
  }, [])
}
