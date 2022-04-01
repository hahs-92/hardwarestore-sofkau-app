import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, GithubAuthProvider } from  'firebase/auth'
//helpers
import { signin, signInWithGoogle, signInWithGitHub } from '../helpers/auth'


export const Signin = ({ isAuth }) => {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ error, setError ] = useState(null)
  const [ warn, setWarn ] = useState(null)
  const navigate = useNavigate()


  const handleOnSubmit = async(e) => {
    e.preventDefault()

    if(password.length < 6) {
      setWarn("password must have at least 6 characters")
      return false
    }
    setError(null)
    setWarn(null)
    try {
      const userCredential =  await signin(email, password)
      console.log(userCredential.user)
    } catch (error) {
      setError(error.message)
    }
  }

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
        <form autoComplete='off' onSubmit={handleOnSubmit}>
          <section>
            <h2>Don Raul</h2>
          </section>
            <input
              placeholder="Email"
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              placeholder="Password"
              name="password"
              onChange={ (e) => setPassword(e.target.value)}
              value={password}
              type="password"
            />
            {error && <p>{error}</p>}
            <input type="submit" value="Sing In"/>
            { warn && <span>{warn}</span>}
            <section>
              <span>Or</span>
                  <button onClick={googleSignIn} type="button">
                    Sign in with Google
                  </button>
                  <button onClick={gitHubSignIn} type="button">
                    Sign in with GitHub
                  </button>
            </section>
        </form>
        <hr />
        <p >
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </section>
  )
}
