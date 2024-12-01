import React from 'react';
import "./table.css"
import { useReactTable, flexRender, getCoreRowModel, getSortedRowModel } from '@tanstack/react-table';
import { columnDef, columnDefWithGrouping } from './columns';
import dataJSON from './data.json';

const SortingTable = () => {

  const finalData = React.useMemo(()=> dataJSON, []);
  const finalColumns = React.useMemo(()=> columnDef, []);

    const [sorting, setSorting] = React.useState([]);

  const tableInstance = useReactTable ({
    columns: finalColumns,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
        sorting: sorting,
    },
    onSortingChange: setSorting,
  });

  // console.log('test', tableInstance.getHeaderGroups())

  return ( <table>
    <thead>
      {tableInstance.getHeaderGroups().map((headerEl) => {
        return (
          <tr key={headerEl.id}>
            {headerEl.headers.map(columnEl => {
            return( 
                <th 
                key={columnEl.id} 
                colSpan={columnEl.colSpan} 
                onClick={ columnEl.column.getToggleSortingHandler()}>
                    {columnEl.isPlaceholder ? null :
                    flexRender(
                    columnEl.column.columnDef.header,
                    columnEl.getContext()
                    )}
                    {/* untuk search dari atas atau bawah */}
                    {{asc: " -UP", desc: " -DOWN"}[columnEl.column.getIsSorted() ?? null]}
                </th>
            );
          })}
          </tr>
         );
      })}
    </thead>
    <tbody>
      {tableInstance.getRowModel().rows.map(rowEl => {
        return ( <tr key={rowEl.id}>{rowEl.getVisibleCells().map(cellEl => {
          return( <td key={cellEl.id}>
            {flexRender(
              cellEl.column.columnDef.cell,
              cellEl.getContext()
            )}
          </td>
          );
        })}
        </tr>
        );
      })}
    </tbody>
    <tfoot>
    {tableInstance.getHeaderGroups().map((headerEl) => {
        return (
        <tr key={headerEl.id}>
          {headerEl.headers.map(columnEl => {
            return( 
            <th key={columnEl.id} colSpan={columnEl.colSpan}>
                {flexRender(
                  columnEl.column.columnDef.header,
                  columnEl.getContext()
                )}
              </th>
            );
          })}
          </tr>
         );
      })}
    </tfoot>
  </table>
  );
};

export default SortingTable;