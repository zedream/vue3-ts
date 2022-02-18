self.onmessage = (message) => {
  // message.data
  console.log(message.data)
  self.postMessage({
    th: 'tang hao'
  })
}
