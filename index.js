export const create = (bits) =>
  new Uint32Array(Math.ceil(bits / 32))

export const set = (bitset, i) => {
  const elementIndex = Math.floor(i / 32)
  const bitIndex = i % 32

  bitset[elementIndex] = bitset[elementIndex] | (1 << bitIndex)
}

export const clear = (bitset, i) => {
  const elementIndex = Math.floor(i / 32)
  const bitIndex = i % 32

  bitset[elementIndex] = bitset[elementIndex] & ~(1 << bitIndex)
}

export const get = (bitset, i) => {
  const elementIndex = Math.floor(i / 32)
  const bitIndex = i % 32

  const value = bitset[elementIndex] & (1 << bitIndex)
  return value != 0
}
