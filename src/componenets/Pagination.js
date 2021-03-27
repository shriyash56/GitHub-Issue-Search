import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "../css/table.css";

export default function Pagination({ issue }) {
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [data, setData] = useState([]);

  let today = new Date().toISOString().slice(0, 10).replaceAll("-", "/");
  let date2 = new Date();

  function parseDate(str) {
    var mdy = str.split("/");
    return new Date(mdy[0], mdy[1] - 1, mdy[2]);
  }

  function datediff(first, second) {
    return Math.round(Math.abs(second - first) / (1000 * 60 * 60 * 24));
  }

  const getData = () => {
    const slice = issue.slice(offset, offset + perPage);
    const postData = slice.map((element) => {
      const Date = element.date;
      date2 = Date.substr(0, Date.indexOf("T")).replaceAll("-", "/");

      const diffDate = datediff(parseDate(today), parseDate(date2));

      return (
        <tr>
          <td>
            <svg
              style={{
                color: "green",
                height: "30px",
                width: "30px",
              }}
            >
              <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
            </svg>
            <a
              href={element.url}
              style={{ textDecoration: "none", color: "white" }}
            >
              {element.title}
              <br />
              <span
                style={{ fontSize: "13px", opacity: "0.5", marginLeft: "25px" }}
              >
                #{element.number} opened {diffDate} days ago by{" "}
                {element.username}
              </span>
            </a>
            <svg
              style={{
                color: "green",
                height: "30px",
                width: "30px",
                float: "right",
              }}
            >
              <path d="M2.75 2.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h4.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25H2.75zM1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0113.25 12H9.06l-2.573 2.573A1.457 1.457 0 014 13.543V12H2.75A1.75 1.75 0 011 10.25v-7.5z"></path>
            </svg>
          </td>
        </tr>
      );
    });
    setData(postData);
    setPageCount(Math.ceil(issue.length / perPage));
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * 10);
  };

  //console.log(pageCount)

  useEffect(() => {
    getData();
  }, [offset]);

  return (
    <>
      {data}

      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </>
  );
}
