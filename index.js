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

export const duplicate = (bitset) => {
  const duplicateBitset = create(bitset.length * 32).fill(0)

  for (let i = 0; i < bitset.length; i++) {
    duplicateBitset[i] |= bitset[i]
  }

  return duplicateBitset
}

export const iterateSet = (bitset, callback) => {
  for (let i = 0; i < bitset.length; ++i) {
    let bits = bitset[i]

    while (bits != 0) {
      const t = bits & -bits
      const r = Math.clz32(bits)
      callback(i * 32 + r)
      bits ^= t
    }
  }
}

export const getBits = (bitset, startIndex, length) => {
  let result = 0

  for (let i = 0; i < length; i++) {
    if (get(bitset, startIndex + i)) {
      result |= 1 << i
    }
  }

  return result
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
