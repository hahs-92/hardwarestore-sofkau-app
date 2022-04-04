import { useState } from 'react'
import { useDispatch } from 'react-redux'
//icons
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/solid'
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
        <article
            className='my-2 px-1 w-full h-14 bg-white flex flex-col justify-center shadow-md'
            key={product?.id}
        >
            <section className='w-full grid grid-cols-5 '>
                <h4 className='truncate'>{ product.name }</h4>
                <h4>{ product.price}</h4>
                <input
                    className=''
                    type="number"
                    name='quantity'
                    value={quantity}
                    onChange={ handleSetQuantity }
                    disabled
                />
                <section className='full flex justify-between px-3'>
                    <button onClick={ handleIncreaseQuantity }> <PlusCircleIcon className='w-7' /> </button>
                    <button onClick={ handleDecreaseQuantity }> <MinusCircleIcon className='w-7' /> </button>
                </section>
                <section className='full flex justify-center px-3'>
                    <button
                        className='bg-orange-500 text-white w-16'
                        onClick={() => handleAddProduct(product)}
                    >Add</button>
                </section>
            </section>
        </article>
    )
}
