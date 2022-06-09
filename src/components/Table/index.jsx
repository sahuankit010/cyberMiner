import React, { useState } from "react";

import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";

const Table = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const deleteRow = (URL) => {
    console.log("you pressed the button and needa delete " + URL)
  }
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
            <th className={styles.tableHeader}>Description</th>
            <th className={styles.tableHeader}>URL</th>
            <th className={styles.tableHeader}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el) => (
            <tr className={styles.tableRowItems} key={el.URL}>
              <td className={styles.tableCell}>{el.description}</td>
              <td className={styles.tableCell}><a href={el.URL}>{el.URL}</a></td>
              <td className={styles.tableCell}><button onClick={() => deleteRow(el.URL)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;
