

export const makeNum = (num) => {
  if (num < 10) {
    return `00000${num}`
  }
  if (num >= 10 && num < 100) {
  return `0000${num}`
  }
  if (num >= 100 && num < 1000) {
    return `000${num}`
  }
  if (num >= 1000 && num < 10000) {
    return `00${num}`
  }
  if (num >= 10000 && num < 100000) {
    return `0${num}`
  }
};