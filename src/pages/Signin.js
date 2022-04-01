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
        <Form cb={ signin } />
        <section>
          <span>Or</span>
          <button onClick={googleSignIn} type="button">
            Sign In with Google
          </button>
          <button onClick={gitHubSignIn} type="button">
            Sign In with GitHub
          </button>
          {error && <p>{error}</p>}
        </section>
        <hr />
        <p >
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </section>
  )
}
