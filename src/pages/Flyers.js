import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
//actions
import { getFlyers } from '../actions/flyersActions'

export const Flyers = () => {
    const dispatch = useDispatch()
    const flyers = useSelector(state => state.flyers.flyers)

    useEffect(() => {
        dispatch(getFlyers())
    },[])

    console.log("f: ", flyers)

    return (
        <main>
            <section>
               {
                   flyers.length &&
                   <article>
                   <h3>Date: { new Date(Date.now()).toDateString() }</h3>

                   <div>
                       <h3>Products:</h3>
                       {
                            flyers.map(f => (
                               <article key={f.id}>
                                   <h4>Date: { f.date}</h4>
                                   <h4>Supplier: { f.supplier?.fullName}</h4>
                                   <h4>Products:</h4>
                                   <button>PDF</button>
                               </article>
                           ))
                       }
                   </div>
               </article>
               }
            </section>
        </main>
    )
}
