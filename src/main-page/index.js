import React, { useState, useEffect } from "react";
import "./main-page.css";
import Header from "./header";
import Rhymes from "../rhyme";

let rhymeList = [
  {
    rhyming_parts: ["AA1 ", "AO1 "],
    word: "top",
  },
  {
    rhyming_parts: ["AH1 "],
    word: "run",
  },
  {
    rhyming_parts: ["AH1 ER0"],
    word: "hunter",
  },
  {
    rhyming_parts: [],
    word: " ",
  },
  {
    rhyming_parts: ["IH1 ", "IH2 "],
    word: "permit",
  },
  {
    rhyming_parts: [],
    word: "dfnjsdkl;fna",
  },
];

function App() {

  const [bodyText, setBodyText] = useState("")

  return (
    <div className="container">
      <Header />
      <div className="preview">
        <h2>Preview: {bodyText}</h2>
      </div>
      <div className="container">
        <textarea
        name="bodyText" 
        onChange={event => setBodyText(event.target.value)}>
        </textarea> 
        <Rhymes rhymes={bodyText} />
      </div>
    </div>
  );
}

export default App;
