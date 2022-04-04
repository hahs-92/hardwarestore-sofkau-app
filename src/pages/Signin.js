import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, GithubAuthProvider } from  'firebase/auth'
//helpers
import { signin, signInWithGoogle, signInWithGitHub } from '../helpers/auth'
//components
import { Form } from '../components/Form'

export const Signin = ({ isAuth }) => {
  const [ error, setError ] = useState(null)
  const navigate = useNavigate()

  const googleSignIn = async() => {
    try {
      const result = await signInWithGoogle()
      await GoogleAuthProvider.credentialFromResult(result)
      console.log(result.user)
    } catch (error) {
          setError(error.message)
    }
  }

  const gitHubSignIn = async() => {
    try {
      const result = await signInWithGitHub()
      await GithubAuthProvider.credentialFromResult(result)
      console.log(result.user)
    } catch (error) {
          setError(error.message)
    }
  }

  useEffect(() => {
    if(isAuth) navigate("/")
  },[isAuth])

  return (
    <section className='flex justify-center items-center my-12 min-h-fit'>
      <div className='max-w-sm w-full shadow-lg'>
        <Form cb={ signin }  title="Sign In"/>
        <section className='p-4 flex flex-col items-center'>
          <span>Or</span>
          <button
            className='w-full h-9 border border-orange-500'
            onClick={googleSignIn}
            type="button"
          >
            Sign In with Google
          </button>
          <button
            className='my-2 w-full h-9 border border-neutral-600'
            onClick={gitHubSignIn}
            type="button"
          >
            Sign In with GitHub
          </button>
          {error && <p>{error}</p>}
        </section>
        <hr />
        <section className='flex justify-center items-center h-11'>
          <p >
            Don't have an account? <Link className='text-orange-600' to="/signup">Sign up</Link>
          </p>
        </section>
      </div>
    </section>
  )
}
