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
  const duplicateBitset = create(bitset.length * 32)

  for (let i = 0; i < bitset.length; i++) {
    duplicateBitset[i] |= bitset[i]
  }

  return duplicateBitset
}

export const merge = (bitset, bitset2) => {
  const result = new Uint32Array(Math.max(bitset.length, bitset2.length))
  for (let i = 0; i < result.length; i++) {
    result[i] = bitset[i] | bitset2[i]
  }
  return result
}

const ctzl32 = (bits) => {
  let count = 0
  while ((bits & 1) === 0 && bits !== 0) {
    count++
    bits = bits >>> 1
  }
  return count
}

export const iterateSet = (bitset, callback) => {
  for (let i = 0; i < bitset.length; ++i) {
    let bits = bitset[i]

    while (bits != 0) {
      const t = bits & -bits
      const r = ctzl32(bits)
      callback(i * 32 + r)
      bits ^= t
    }
  }
}

export const iterateSetGroup = (bitset, groupLength, callback) => {
  const mask = (1 << groupLength) - 1
  const groupCount = 32 / groupLength

  for (let i = 0; i < bitset.length; ++i) {
    let bits = bitset[i]

    while (bits != 0) {
      const r = ctzl32(bits)
      const group = Math.floor(r / groupLength)
      callback(i * groupCount + group)
      bits &= ~(mask << (group * groupLength))
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
