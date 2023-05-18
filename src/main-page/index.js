import React, { useState, useEffect } from "react";
import "./main-page.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./header";
import Rhymes from "../rhyme";

function App() {
  const [bodyText, setBodyText] = useState("");

  return (
    <div className="container h-100 d-flex flex-column">
      <div className="row">
        <Header />
      </div>
      <div className="content row flex-grow-1">
        <div className="col h-100 form-group green-border-focus">
          <textarea
            name="bodyText"
            className="form-control"
            onChange={(event) => setBodyText(event.target.value)}
          ></textarea>
        </div>

        <div className="col">
          <Rhymes rhymes={bodyText} />
        </div>
      </div>
    </div>
  );
}

export default App;
