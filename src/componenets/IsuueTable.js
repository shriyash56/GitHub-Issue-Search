import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "../css/table.css";
import { Table } from "react-bootstrap";
import Pagination from "./Pagination";

import { toast, ToastContainer } from "react-toastify";

export default function IsuueTable({ username, reponame }) {
  const [issue, setissue] = useState([]);
  const [error, seterror] = useState(true);
  const a = [];

  useEffect(() => {
    axios
      .get(`https://api.github.com/repos/${username}/${reponame}/issues`)
      .then((resp) => {
        resp.data.map((ele) => {
          a.push({
            url: ele.html_url,
            title: ele.title,
            number: ele.number,
            username: ele.user.login,
            date: ele.created_at,
          });
        });
        seterror(false);
        setissue(a);
       
        if (a.length === 0 ) {
          toast.dark("😊 Wow repo has 0 isuue");
        }
      })
      .catch((err) => {
        toast.error("⚠️ Please Enter Valid Input");
      });
  }, []);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>GitHub Isuues</h2>

      {!error && (
        <div className="table">
          <div>
            <Table striped bordered hover variant="dark" className="tableInner">
              <tbody>
                <thead>
                  <th>{issue.length} Isuee</th>
                </thead>
                <Pagination key={issue.length} issue={issue} />
              </tbody>
            </Table>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}
