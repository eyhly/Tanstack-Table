import React from 'react';
// import './App.css';
import BasicTable from './components/BasicTable';
import SortingTable from './components/SortingTable';
import GlobalFiltering from './components/GlobalFiltering';
import ColumnFiltering from './components/ColumnFiltering';
import PaginationTable from './components/PaginationTable';
import SelectingRow from "./components/SelectingRow"

function App() {
  return (
    <div>
      {/* <BasicTable/> */}
      {/* <SortingTable/> */}
      {/* <GlobalFiltering/> */}
      {/* <ColumnFiltering/> */}
      {/* <PaginationTable/> */}
      <SelectingRow/>
    </div>
  );
}

export default App;
