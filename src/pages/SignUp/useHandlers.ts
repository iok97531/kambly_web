const useHandlers = (state: any) => {
  return {
    onConfirm: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      console.log(state)
    },
  }
}

export default useHandlers