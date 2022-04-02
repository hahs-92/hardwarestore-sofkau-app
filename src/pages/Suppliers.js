import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'
import { useTable } from "react-table";
import { Link, useNavigate } from "react-router-dom"
//actions
import { getSuppliers, deleteSupplier } from '../actions/supplierActions'

export const Suppliers = () => {
    const suppliers = useSelector(state => state.suppliers.suppliers)
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
                <section>
                    <button onClick={ () => navigate(`/suppliers/update/${row.values.id}`)}>
                        Edit
                    </button>
                    <button onClick={() => dispatch(deleteSupplier.row.values.id)}>
                        Delete
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
        <main>
            <section>
                <Link to="/suppliers/create" >Add Supplier</Link>
            </section>
            <section>
                {
                    suppliers.length
                        ?
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
                        : <h2>No tienes proveedores</h2>
                }
            </section>
        </main>
    )
}
