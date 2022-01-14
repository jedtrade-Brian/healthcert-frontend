import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Link from '@material-ui/core/Link';

import {
  NavigateBefore,
  NavigateNext,
  FirstPage,
  LastPage
} from "@material-ui/icons";
import "./reactTable.css";

const NewPagination = ({
  rowsPerPage,
  totalData,
  paginate,
  pageNo,
  rowsPerPageOptions,
  dataRange,
  onChangeRowsPerPage
}) => {
  const NumberOfPages = totalData % rowsPerPage === 0 ? Math.floor(totalData / rowsPerPage) - 1 : Math.floor(totalData / rowsPerPage);
  const handleRowsPerPage = e => {
    onChangeRowsPerPage(e.target.value)
  };

  const handlePageNumber = (flag) => {
      switch(flag){
          case 'FirstPage':
            if(pageNo !== 0){
              paginate(0) 
            }
            break;
          case 'NavigateBefore':
            if(pageNo !== 0){
              paginate(pageNo - 1) 
            }  
            break;
          case 'NavigateNext':
            if(pageNo < NumberOfPages){
              paginate(pageNo + 1)
            }
            break;
          case 'LastPage':
            if(pageNo < NumberOfPages){
              paginate(NumberOfPages)
            }  
            break;  
          default :
      }
  };

  return (
    <div className="paginationBlock">
      <FormControl>
        <InputLabel id="demo-simple-select-label">Items per page :</InputLabel>
        <Select
          id="demo-simple-select"
          onChange={handleRowsPerPage}
          value={rowsPerPage}
        > {rowsPerPageOptions.map((item,index)=>(
            <MenuItem value={item} key={index}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <p>
        <span>
          {dataRange.first} - {dataRange.last}
        </span>
        of <span>{totalData}</span>
      </p>
      <nav className="paginationNav">
        <ul className="pagination">
          <li className={pageNo !== 0 ? 'active' : 'disable'}>
            <Link
              className="page-link"
              aria-label="Previous"
              onClick={() =>
                 handlePageNumber('FirstPage') 
              }
            >
              <FirstPage/>
            </Link>
          </li>
          <li className={pageNo !== 0 ? 'active' : 'disable'}>
            <Link
              className="page-link"
              aria-label="Previous"
              onClick={() =>
                 handlePageNumber('NavigateBefore') 
              }
            >
              <NavigateBefore />
            </Link>
          </li>

          <li className={pageNo < NumberOfPages ? 'active' : 'disable'}>
            <Link
              className="page-link"
              aria-label="Next"
              onClick={() =>
                handlePageNumber('NavigateNext')
              }
            >
              <NavigateNext />
            </Link>
          </li>
          <li className={pageNo < NumberOfPages ? 'active' : 'disable'}>
            <Link
              className="page-link"
              aria-label="Next"
              onClick={() =>
                 handlePageNumber('LastPage')
              }
            >
              <LastPage />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NewPagination;
