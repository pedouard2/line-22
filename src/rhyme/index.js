import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

const getRhymingParts = async (wordList) => {
  let promises = [];
  for (let word of wordList) {
    const response = await axios.get(
      `http://localhost:5000/v1/words/${word}/rhyming-parts`
    );
    promises.push(response);
  }
  let resp = await Promise.all(promises);

  resp = resp.map((entry) => entry.data);

  return resp;
};
const seenWords = new Set();

const Rhymes = ({ rhymes }) => {
  const [apiResponse, setApiResponse] = useState([]);

  const wl = rhymes.split(" ");
  const res = getRhymingParts(wl);

  res.then((values) => {
    // setApiResponse(values)
    console.log(values)
  });

  return (
    <div>
      <p>{rhymes}</p>
    </div>
  );
};

export default Rhymes;
