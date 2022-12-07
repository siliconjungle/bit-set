export const create = (bits) =>
  new Uint32Array(Math.ceil(bits / 32))

export const set = (bitset, i) => {
  const elementIndex = Math.floor(i / 32)
  const bitIndex = i % 32

  bitset[elementIndex] = bitset[elementIndex] | (1 << bitIndex)
}

export const replaceBits = (bitset, startIndex, value, length) => {
  for (let i = 0; i < length; i++) {
    if ((value >> i) & 1) {
      set(bitset, startIndex + i)
    } else {
      clear(bitset, startIndex + i)
    }
  }
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
