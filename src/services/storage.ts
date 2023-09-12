export const storage = {
  get: ({ key }: { key: string }): string | null => {
    return window.localStorage.getItem(key)
  },
  set: ({ key, value }: { key: string; value: string }): void => {
    window.localStorage.setItem(key, value)
  },
  remove: ({ key }: { key: string }): void => {
    window.localStorage.removeItem(key)
  }
}
