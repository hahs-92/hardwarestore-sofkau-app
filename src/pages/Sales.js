import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { jsPDF } from "jspdf";
//actions
import { getInvoices } from '../actions/invoicesActions'
//components
import { ListProductsItem } from "../components/ListProductsItem"

export const Sales = () => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: [8, 6]
  })
  const dispatch = useDispatch()
  const invoices = useSelector(state => state.invoices.invoices)

  const handlePdf = (invoice) => {

    try {
      const text = `


        Date: ${invoice.date}

        Client Info:

        Cc: ${invoice.client.citizenshipCard}
        ClientName: ${invoice.client.fullName}
        ClientPhoneNumber: ${invoice.client.phoneNumber}

        Seller Info:

        Cc: ${invoice.seller.citizenshipCard}
        SellerName: ${invoice.seller.fullName}

        Total: $${invoice.products.reduce((acum, p)=>  (p.quantity * p.price) + acum,0)}

      `
      doc.text(text, 1, 1);
      doc.save(`${invoice.id}.pdf`);
    } catch(e) {
      console.error(e.message)
    }
  }

  useEffect(() => {
    dispatch(getInvoices())
  },[])


  return (

    <main className="w-full my-10 flex justify-center">
      <section className="w-full max-w-5xl flex flex-wrap">
        {
          invoices.length
            ? invoices.map(i => (
              <article
                className="w-full p-4 m-1 max-w-xs flex flex-col items-center justify-between text-slate-700 bg-orange-50 shadow-lg"
                key={i.id}
              >
                <h3>Date: {i.date}</h3>
                <div className="my-1 text-slate-900 ">
                  <h3 className="text-lg ">Datos del cliente</h3>
                  <p>Nombre:<span className="mx-2 text-gray-600">{ i.client?.fullName}</span></p>
                  <p>CC: <span className="mx-2 text-gray-600">{ i.client?.citizenshipCard}</span></p>
                  <p>Telefono: <span className="mx-2 text-gray-600">{ i.client?.phoneNumber}</span></p>
                </div>
                <div className="my-1 text-slate-900 ">
                  <h3 className="text-lg">Datos del vendedor</h3>
                  <p>Name: <span className="mx-2 text-gray-600">{ i.seller?.fullName}</span></p>
                  <p>CC: <span className="mx-2 text-gray-600">{ i.seller?.citizenshipCard}</span></p>
                  <p>Phone: <span className="mx-2 text-gray-600">{ i.seller?.phoneNumber}</span></p>
                </div>
                <h3 className="text-lg ">Products</h3>
                <div className="my-1 text-slate-900 ">
                  <section className="w-full grid grid-cols-3 text-slate-500">
                    <span>Name</span>
                    <span>Price</span>
                    <span>Quantity</span>
                  </section>
                  <ListProductsItem  products={i.products}/>
                </div>

                <button
                  onClick={() => handlePdf(i)}
                  className="w-full h-11 my-2 bg-orange-500 text-white cursor-pointer"
                >PDF</button>

              </article>
               ))
            : <h2>No tienes Facturas</h2>
        }
      </section>
    </main>
  )
}
