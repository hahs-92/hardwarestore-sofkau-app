import { Link, useNavigate } from "react-router-dom"
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTable } from "react-table";
//actions
import { getProducts, deleteProduct } from '../actions/productActions'
//components
import { Loader } from "../components/Loader";

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
                <section className="flex justify-between items-center">
                    <button
                        onClick={ () => navigate(`/products/update/${row.values.id}`)}
                    >
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

    return (
        <main className="flex justify-center my-20">
            <div className="flex flex-wrap justify-center">
                <section className="w-full h-11">
                    <Link
                        className="w-10 h-full p-2 text-white bg-orange-500 rounded-sm"
                        to="/products/create"
                    >Add Product</Link>
                </section>
                { loading && <Loader />}
                {
                    !loading &&
                        <section className="w-full min-w-max p-5 bg-orange-100 shadow-lg">
                            {
                                products.length
                                    ?
                                        <table
                                            className="w-full"
                                            {...getTableProps()}
                                        >
                                            <thead className="h-14">
                                                { headerGroups.map((headerGroup) => (
                                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                                        { headerGroup.headers.map((col) => (
                                                            <th
                                                                className="border border-orange-500"
                                                                {...col.getHeaderProps()}
                                                            >
                                                                { col.render("Header")}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </thead>
                                            <tbody
                                                className="my-5"
                                                {...getTableBodyProps()}
                                            >
                                                { rows.map((row, idx) => {
                                                    prepareRow(row)
                                                    return (
                                                        <tr className="h-14" {...row.getRowProps()}>
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
                                    : <h2>Not Products!</h2>
                            }
                        </section>
                }
            </div>
        </main>
    )
}
