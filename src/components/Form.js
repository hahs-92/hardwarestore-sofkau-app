import { useState } from "react"


export const Form = ({cb}) => {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState(null)
    const [ warn, setWarn ] = useState(null)

    const handleOnSubmit = async(e) => {
        e.preventDefault()

        if(password.length < 6) {
          setWarn("password must have at least 6 characters")
          return false
        }
        setError(null)
        setWarn(null)
        try {
            cb(email, password)
          //const userCredential =  await cb(email, password)
          //console.log(userCredential.user)
        } catch (error) {
          setError(error.message)
        }
      }

    return (
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
      </form>
    )
}
