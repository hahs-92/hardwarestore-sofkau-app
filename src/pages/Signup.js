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
      console.log(result.user)
    } catch (error) {
          setError(error.message)
    }
  }

  const gitHubSignIn = async() => {
    try {
      const result = await signInWithGitHub()
      GithubAuthProvider.credentialFromResult(result)
      console.log(result.user)
    } catch (error) {
          setError(error.message)
    }
  }

  useEffect(() => {
    if(isAuth) navigate("/")
  },[isAuth])

  return (
    <section>
      <div>
        <Form cb={ signup } />
        <section>
          <span>Or</span>
          <button onClick={googleSignIn} type="button">
            Sign Up with Google
          </button>
          <button onClick={gitHubSignIn} type="button">
            Sign Up with GitHub
          </button>
          {error && <p>{error}</p>}
        </section>
        <hr />
        <p>Already have an account?
            <Link to="/signin">Login</Link>
        </p>
      </div>
    </section>
  )
}
