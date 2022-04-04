

export const ListProductsItem = ({products}) => {

    return (
        <section className="w-full">
            {
                products.map(p => (
                    <article
                        className="w-full"
                        key={`${p.id} ${p.name}`}
                    >
                        <section className="w-full grid grid-cols-3">
                            <p className="truncate">{p.name}</p>
                            <p>{p.price}</p>
                            <p>{p.quantity}</p>
                        </section>
                    </article>
                ))
            }
        </section>
    )
}
