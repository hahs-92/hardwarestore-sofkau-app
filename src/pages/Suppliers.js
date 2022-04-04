import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'
import { useTable } from "react-table";
import { Link, useNavigate } from "react-router-dom"
//actions
import { getSuppliers, deleteSupplier } from '../actions/supplierActions'
//components
import { Loader } from "../components/Loader"

export const Suppliers = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const suppliers = useSelector(state => state.suppliers.suppliers)
    const loading = useSelector(state => state.suppliers.loading)

    const suppliersData = useMemo(() => [...suppliers],[suppliers])

    const supplierColumns = useMemo(() =>
    suppliers[0]
        ? Object.keys(suppliers[0])
            .map(key => { return {Header: key, accessor: key }})
        : []
    ,[suppliers])

    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
          ...columns,
          {
            id: "Options",
            Header: "Options",
            Cell: ({ row }) => (
                <section className="flex justify-between items-center">
                    <button onClick={ () => navigate(`/suppliers/update/${row.values.id}`)}>
                        Edit
                    </button>
                    <button onClick={() => dispatch(deleteSupplier(row.values.id))}>
                        { loading ? "loading..." : "Delete"}
                    </button>
                </section>
            ),
          },
        ])
    }

    const tableInstance = useTable({
            columns: supplierColumns,
            data: suppliersData
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
      dispatch(getSuppliers())
    },[])

    return (
        <main className="flex justify-center my-20">
            <div className="flex flex-wrap justify-center">
                <section className="w-full h-11">
                    <Link
                         className="w-10 h-full p-2 text-white bg-orange-500 rounded-sm"
                        to="/suppliers/create"
                    >Add Supplier</Link>
                </section>
                <section className="w-full min-w-max p-5 bg-orange-100 shadow-lg">
                    { loading &&  <Loader />}
                    {
                        suppliers.length && !loading
                            ?
                                <table
                                    className="w-full"
                                    {...getTableProps()}
                                >
                                    <thead>
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
                                    <tbody className="my-5" {...getTableBodyProps()}>
                                        { rows.map((row, idx) => {
                                            prepareRow(row)
                                            return (
                                                <tr className="h-14"  {...row.getRowProps()}>
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
                            : <h2>No tienes proveedores</h2>
                    }
                </section>
            </div>
        </main>
    )
}
