import React from 'react';
import "./table.css"
import { useReactTable, flexRender, getCoreRowModel } from '@tanstack/react-table';
import { columnDef } from './columns';
import dataJSON from './data.json';

const BasicTable = () => {

  const finalData = React.useMemo(()=> dataJSON, []);
  const finalColumns = React.useMemo(()=> columnDef, []);


  const tableInstance = useReactTable ({
    columns: finalColumns,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
  });

  // console.log('test', tableInstance.getHeaderGroups())

  return ( <table>
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

export default BasicTable;