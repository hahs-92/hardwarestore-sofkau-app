import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
//actions
import { getInvoices } from '../actions/invoicesActions'

export const Sales = () => {
  const dispatch = useDispatch()
  const invoices = useSelector(state => state.invoices.invoices)


  useEffect(() => {
    dispatch(getInvoices())
  },[])

  console.log("invoces: ", invoices)
  return (

    <main>
      <section>
        {
          invoices.length && invoices.map(i => (
            <article key={i.id}>
              <h3>Date: {i.date}</h3>
              <div>
                <h3>Datos del cliente</h3>
                <p>Nombre: { i.client?.fullName}</p>
                <p>CC: { i.client?.citizenshipCard}</p>
                <p>Telefono: { i.client?.phoneNumber}</p>
              </div>
              <div>
                <h3>Datos del vendedor</h3>
                <p>Name: { i.seller?.fullName} </p>
                <p>CC: { i.seller?.citizenshipCard}</p>
                <p>Phone: { i.seller?.phoneNumber}</p>
              </div>
              <div>
                {/* producst */}
              </div>
              <div>
                <button>PDF</button>
              </div>
            </article>
          ))
        }
      </section>
    </main>
  )
}
