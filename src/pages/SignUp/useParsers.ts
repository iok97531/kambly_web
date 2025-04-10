const useParsers = () => {
  return {
    parseEmail: (email: string) => {
      return email.trim()
    },
  }
}

export default useParsers