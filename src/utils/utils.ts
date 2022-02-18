export const BinaryPermission = (binary, binaries: number[]) => {
  let p = 0
  binaries.forEach(b => {
    p = p | b
  })
  return binary & p
}

export const ArrayToMap = function (arr, value = 'value', label = 'label') {
  const map = new Map()
  for (let i = 0, l = arr.length; i < l; i++) {
    map.set(arr[i][value], arr[i][label])
  }
  return map
}
