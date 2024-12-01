import React from 'react';
import "./table.css"
import { useReactTable, flexRender, getCoreRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { columnDef } from './columns';
import dataJSON from './data.json';

const GlobalFiltering = () => {

  const finalData = React.useMemo(()=> dataJSON, []);
  const finalColumns = React.useMemo(()=> columnDef, []);

  const [filtering, setFiltering] = React.useState("")

  const tableInstance = useReactTable ({
    columns: finalColumns,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state:{
        globalFilter: filtering,
    },
    onGlobalFilterChanged: setFiltering,
  }); 

  // console.log('test', tableInstance.getHeaderGroups())

  return ( 
  <table>
    {/* fungsi untuk search */}
    <input type='text' value={filtering} onChange={ e=> setFiltering(e.target.value)}/>
  <hr/>
    <thead>
      {tableInstance.getHeaderGroups().map((headerEl) => {
        return (<tr key={headerEl.id}>{headerEl.headers.map(columnEl => {
            return( <th key={columnEl.id} colSpan={columnEl.colSpan}>
                {columnEl.isPlaceholder ? null :
                flexRender(
                  columnEl.column.columnDef.header,
                  columnEl.getContext()
                )}
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

export default GlobalFiltering;