import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

const getRhymingParts = async (wordList) => {
  let res = [];
  for (let word of wordList) {
    try {
      const response = await axios.get(
        `http://localhost:5000/v1/words/${word}/rhyming-parts`
      );
      res.push({ word: response });
    } catch (error) {
    //   console.log(error);
    }
  }
  return res;
};
const seenWords = new Set();

const Rhymes = ({ rhymes }) => {

  const [apiResponse, setApiResponse] = useState([]);

  let words = rhymes.split(" ") 
  // words that are new that havent been seen
  let wordsDiff = new Set([...words].filter(x => !seenWords.has(x)));
  // api call to new words
  let temp = getRhymingParts(wordsDiff)
  // add recently seen words to seen
  wordsDiff.forEach(seenWords.add, seenWords)



  return (
    <div>
      <p>
        {/* {rhymes} */}
        {wordsDiff}
        {/* {rhymes.map((item, index) => (
          <span key={index}> {item}</span>
        ))} */}
      </p>
    </div>
  );
};

export default Rhymes;


  //     for(let i in rhymes.split(" ")) {
  // // use state to populate itemlsit for each axios call then item list to map and return
  // // empty list of rhyming part objects
  // // map paragraph to the map
  //         }