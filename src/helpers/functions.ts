/* eslint-disable prefer-const */
export const getLocalStorageItem = (key: string, defaultValue: any): any => {
  let item = localStorage.getItem(key)
  if (item === null) {
    return defaultValue
  }
  return JSON.parse(item)
}

export const setLocalStorageItem = (key: string, value: any): void => {
  localStorage.setItem(key, value)
}
