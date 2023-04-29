import React, { useState, useEffect } from "react";
import "./main-page.css";
import Header from "./header";
import Rhymes from "../rhyme";

function App() {
  const defaultTextStates = [
    "There's vomit on his sweater already, Mom's spaghetti!"
  ]
  // const [bodyText, setBodyText] = useState(defaultTextStates[Math.floor(Math.random() * defaultTextStates.length)]);
  const [bodyText, setBodyText] = useState("");

  return (
    <div className="container">
      <Header />

      <div>
        <div>
          <textarea
          name="bodyText"
          // defaultValue={bodyText}
          onChange={event => setBodyText(event.target.value)}
          >
          </textarea>
        </div>

        <div>
        <Rhymes rhymes={bodyText} />
        </div>
      </div>
    </div>
  );
}

export default App;

{
  /* <div className="container">
<textarea
  name="bodyText"
  onSubmit={(event) => setBodyText(event.target.value)}
></textarea>
<button type="submit">submit</button>

<div className="preview">
  <h2>Preview: {bodyText}</h2>
</div>
{/* <Rhymes rhymes={bodyText} /> */
}
// </div> */}
