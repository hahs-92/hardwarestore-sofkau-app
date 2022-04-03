import { Link, useNavigate } from "react-router-dom"
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTable } from "react-table";
//actions
import { getProducts, deleteProduct } from '../actions/productActions'

export const Products = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.products)
    const loading = useSelector(state => state.products.loading)

    const productsData = useMemo(() => products.map(p => {
        return {
            ...p,
            supplier:  p?.supplier?.fullName
        }
    } ),[products])

    const productsColumns = useMemo(() =>
        products[0]
            ? Object.keys(products[0])
                //.filter(key => key !== "supplier")
                .map(key => {
                    return {
                        Header: key,
                        accessor: key
                    }
                })
            : []
        ,[products]
    )

    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
          ...columns,
          {
            id: "Options",
            Header: "Options",
            Cell: ({ row }) => (
                <section>
                    <button onClick={ () => navigate(`/products/update/${row.values.id}`)}>
                        Edit
                    </button>
                    <button disabled={!!loading} onClick={() => dispatch(deleteProduct(row.values.id))}>
                        Delete
                    </button>
                </section>
            ),
          },
        ])
    }

    const tableInstance = useTable(
        {
            columns: productsColumns,
            data: productsData
        },
        tableHooks
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance


    useEffect(() => {
      dispatch(getProducts())
    },[])

    console.log("load: ", loading)

    return (
        <main>
            <section>
                <Link to="/products/create">Add Product</Link>
            </section>
            <section>
                { loading && <h2>Loading...</h2>}
                { !loading && !products.length && <h2>No hay productos</h2>}
                {
                    products.length && !loading
                        &&
                            <table {...getTableProps()}>
                                <thead>
                                    { headerGroups.map((headerGroup) => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            { headerGroup.headers.map((col) => (
                                                <th
                                                    {...col.getHeaderProps()}
                                                >
                                                    { col.render("Header")}
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                    { rows.map((row, idx) => {
                                        prepareRow(row)
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map((cell, idx) => (
                                                    <td {...cell.getCellProps()}>
                                                        { cell.render("Cell")}
                                                    </td>
                                                ))}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                }
            </section>
        </main>
    )
}
