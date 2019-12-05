const compose = (...functions) => data => functions.reduceRight((value, func) => func(value), data)

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

const delay = (time = 1500) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

const pickRandomFromArray = arr => arr[Math.floor(Math.random() * arr.length)]

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

const dumbArrayCompare = (a = []) => (b = []) => a.flat().join() === b.flat().join()

const cloneDeep = input => JSON.parse(JSON.stringify(input))

// _ means not mutating method i guess
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
