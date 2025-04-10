import { observer, useLocalObservable } from 'mobx-react-lite'
import SignUpView from './SignUpView'
import useParsers from './useParsers'
import useHandlers from './useHandlers'


const SignUpContainer: React.FC = observer(() => {

  const state = useLocalObservable(() => ({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
  }))

  const handlers = useHandlers(state)
  const parsers = useParsers()

  const {
    onConfirm
  } = handlers
  
  return <SignUpView state={state} onConfirm={onConfirm}/>
})

export default SignUpContainer