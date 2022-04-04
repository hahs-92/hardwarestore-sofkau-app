import { useState } from "react"


export const Form = ({cb, title}) => {
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
            await cb(email, password)
        } catch (error) {
            console.log("error")
          setError(error.message)
        }
      }

    return (
        <form
          className="flex flex-col p-4"
          autoComplete='off'
          onSubmit={handleOnSubmit}
        >
          <section className="flex items-center justify-center text-3xl">
            <p className="text-orange-600">FerreRaul</p>
          </section>
          <section className="flex flex-col">
            <input
              className="my-2 px-1 h-11"
              placeholder="Email"
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              className="h-11 px-1"
              placeholder="Password"
              name="password"
              onChange={ (e) => setPassword(e.target.value)}
              value={password}
              type="password"
            />
            {error && <p>{error}</p>}
            <input
              className="my-2 h-11 bg-orange-600 text-white rounded-sm cursor-pointer"
              type="submit"
              value={ title }
              />
            { warn && <span>{warn}</span>}
          </section>
      </form>
    )
}
