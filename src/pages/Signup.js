import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, GithubAuthProvider } from  'firebase/auth'
//helpers
import { signup, signInWithGoogle, signInWithGitHub } from '../helpers/auth'
//components
import { Form } from '../components/Form'

export const Signup = ({ isAuth }) => {
  const [ error, setError ] = useState(null)
  const navigate = useNavigate()

  const googleSignIn = async() => {
    try {
      const result = await signInWithGoogle()
      GoogleAuthProvider.credentialFromResult(result)
    } catch (error) {
          setError(error.message)
    }
  }

  const gitHubSignIn = async() => {
    try {
      const result = await signInWithGitHub()
      GithubAuthProvider.credentialFromResult(result)
    } catch (error) {
          setError(error.message)
    }
  }

  useEffect(() => {
    if(isAuth) navigate("/")
  },[isAuth])

  return (
    <section  className='flex justify-center items-center my-12 min-h-fit'>
      <div className='max-w-sm w-full shadow-lg'>
        <Form cb={ signup } title="Sign Up"/>
        <section className='p-4 flex flex-col items-center'>
          <span>Or</span>
          <button
            className='w-full h-9 border border-orange-500'
            onClick={googleSignIn}
            type="button"
          >
            Sign Up with Google
          </button>
          <button
            className='my-2 w-full h-9 border border-neutral-600'
            onClick={gitHubSignIn}
            type="button"
          >
            Sign Up with GitHub
          </button>
          {error && <p>{error}</p>}
        </section>
        <hr />
        <section className='flex justify-center items-center h-11'>
          <p>Already have an account?
              <Link  className='text-orange-600' to="/signin">Login</Link>
          </p>
        </section>
      </div>
    </section>
  )
}
