import React from 'react';
import "./table.css"
import { useReactTable, flexRender, getCoreRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { columnDef, columnDefWithFilter } from './columns';
import dataJSON from './data.json';
import FilterFunction from "./FilterFunction";

const BasicTable = () => {

  const finalData = React.useMemo(()=> dataJSON, []);
  const finalColumns = React.useMemo(()=> columnDefWithFilter, []);
  const defaultColumn = React.useMemo(() => {
    return {
        youTubeProp: "hello universe",
    };
  }, []);

  const [columnFilters, setColumnFilters] = React.useState([]);

  const tableInstance = useReactTable ({
    columns: finalColumns,
    data: finalData,
    defaultColumn: defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
        columnFilters: columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
  });

  // console.log('test', tableInstance.getHeaderGroups())

  return ( 
  <table>
    <thead>
      {tableInstance.getHeaderGroups().map((headerEl) => {
        return (<tr key={headerEl.id}>{headerEl.headers.map(columnEl => {

                console.log('our property', columnEl.column.columnDef.youTubeProp);
            return( <th key={columnEl.id} colSpan={columnEl.colSpan}>
                {columnEl.isPlaceholder 
                ? null : (
                <>
                {flexRender(
                  columnEl.column.columnDef.header,
                  columnEl.getContext()
                )}
                {
                    columnEl.column.getCanFilter() ? (<div>
                        <FilterFunction column={columnEl.column} table={tableInstance}/>
                    </div>
                    )  : null
                }
                </>
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