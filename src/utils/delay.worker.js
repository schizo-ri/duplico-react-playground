const delayReturn = async ({ time, value }) => {
  const delay = (time = 1500) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true)
      }, time)
    })
  }
  await delay(time)
  self.postMessage(value)
}

self.addEventListener('message', async e => {
  delayReturn(e.data)
})
