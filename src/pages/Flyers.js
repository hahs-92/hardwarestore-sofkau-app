import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
//actions
import { getFlyers } from '../actions/flyersActions'
//components
import { ListProductsItem } from "../components/ListProductsItem"
import { Loader } from "../components/Loader"

export const Flyers = () => {
    const dispatch = useDispatch()
    const flyers = useSelector(state => state.flyers.flyers)
    const loading = useSelector(state => state.flyers.loading)

    useEffect(() => {
        dispatch(getFlyers())
    },[])

    return (
        <main className="w-full my-10 flex justify-center">
            { loading
                ? <Loader />
                :
                <section className="w-full max-w-5xl flex flex-wrap">
                    {
                        flyers.length
                        ? flyers.map(f => (
                            <article
                                className="w-full p-4 m-1 max-w-xs flex flex-col justify-between text-slate-900 bg-orange-50 shadow-lg"
                                key={f.id}
                            >
                                <div>
                                    <h4><span className="text-slate-500">Date: </span>{ f.date }</h4>
                                    <h4><span className="text-slate-500">Supplier:</span> { f.supplier?.fullName}</h4>
                                    <h4><span className="text-slate-500">Products:</span></h4>
                                    <section className="w-full grid grid-cols-3 text-slate-500">
                                        <span>Name</span>
                                        <span>Price</span>
                                        <span>Quantity</span>
                                    </section>
                                    <ListProductsItem products={f.products} />
                                </div>
                                <button
                                    className="w-full h-11 my-2 bg-orange-500 text-white cursor-pointer"
                                >PDF</button>
                            </article>
                        ))
                        : <h2>No tienes Boletos de salida</h2>
                }
                </section>
            }
        </main>
    )
}
