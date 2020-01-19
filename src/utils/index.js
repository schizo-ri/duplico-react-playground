const compose = (...functions) => data => functions.reduceRight((value, func) => func(value), data)
// working with form. it's not actually useful if we use react component state
const collectFromData = form => new FormData(form)
const formToObject = form => {
  let collection = {}
  for (const [key, value] of form) {
    collection[key]
      ? Array.isArray(collection[key])
        ? collection[key].push(value)
        : (collection[key] = Array.from([collection[key], value]))
      : (collection[key] = value)
  }
  return collection
}
const formCollection = form =>
  compose(
    formToObject,
    collectFromData
  )(form)
// throttling, delaying functions
const delay = (time = 500) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}
function throttle(callback, wait, context = this) {
  let timeout = null
  let callbackArgs = null

  const later = () => {
    callback.apply(context, callbackArgs)
    timeout = null
  }

  return function() {
    if (!timeout) {
      callbackArgs = arguments
      timeout = setTimeout(later, wait)
    }
  }
}
// array/object utils
// pick random value from an array
const pickRandomFromArray = arr => arr[Math.floor(Math.random() * arr.length)]
// dumb because we flatten arrays, join values and then compare. be wary using this
const dumbArrayCompare = (a = []) => (b = []) => a.flat().join() === b.flat().join()
// deep clone object using JSON methods. it looks stupid but actually it's quite fast and usefull
const cloneDeep = input => JSON.parse(JSON.stringify(input))
// _ means not mutating method i guess. this is meant to replace mutating methods like splice.
// probably not fast
const _arradd = (arr, pos, data) => {
  if (arr.length === 0) {
    return [data]
  }
  if (pos >= arr.length) {
    return [...arr, data]
  }
  return arr.reduce((agg, itm, idx) => {
    if (pos === idx) {
      return [...agg, data, itm]
    }
    return [...agg, itm]
  }, [])
}
const _arrdel = (arr, pos) =>
  arr.reduce((agg, itm, idx) => {
    if (pos === idx) {
      return [...agg]
    }
    return [...agg, itm]
  }, [])
const _arrrep = (arr, pos, data) =>
  arr.reduce((agg, itm, idx) => {
    if (pos === idx) {
      return [...agg, data]
    }
    return [...agg, itm]
  }, [])

export {
  delay,
  pickRandomFromArray,
  throttle,
  dumbArrayCompare,
  compose,
  formCollection,
  cloneDeep,
  _arradd,
  _arrdel,
  _arrrep,
}
