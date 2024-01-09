define('utils/clock', [], function () {
  return {
    timeout(delay) {
      return new Promise(resolve => setTimeout(resolve, delay))
    },
    interval(delay, cb) {
      return setInterval(cb, delay)
    }
  }
})
