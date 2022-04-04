import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//actions
import { addProductToSelectList } from '../actions/productActions'


export const ProductItem = ({product}) => {
    const dispatch = useDispatch()
    const [ quantity, setQuantity] = useState(1)

    const handleAddProduct = (prod) => {
        if(quantity < 1) {
            window.alert("Debes seleccionar una cantidad")
            return
        }
        prod.quantityToSell = quantity
        dispatch(addProductToSelectList(prod))
    }

    const handleSetQuantity = (e) => {
        setQuantity(e.target.value)
    }

    const handleIncreaseQuantity = () => {
        if(quantity > product.quantity) {
            window.alert("No tienes mas unidades")
            return
        }
        setQuantity(quantity + 1)
    }

    const handleDecreaseQuantity = () => {
        if(quantity <= 1) {
            return
        }
        setQuantity(quantity - 1)
    }

    return (
        <article key={product?.id}>
            <section>
                <h4>Name: { product.name }</h4>
                <h4>Price: { product.price}</h4>
            </section>
            <section>
                <input
                    type="number"
                    name='quantity'
                    value={quantity}
                    onChange={ handleSetQuantity }
                    disabled
                />
            </section>
            <section>
                <button onClick={ handleIncreaseQuantity }> + </button>
                <button onClick={ handleDecreaseQuantity }> - </button>
                <button onClick={() => handleAddProduct(product)}>add</button>
            </section>
        </article>
    )
}
