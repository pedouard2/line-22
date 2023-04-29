import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Words from "./word";

const Rhymes = ({ rhymes }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
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
    getRhymingParts(rhymes.split(/(\s+)/)).then(values => setItems(values))
  }, [rhymes]);


  let v =  items.map((item,i) =>  <Words key={i} word={item.word} rhyming_parts={item.rhyming_parts} syllables = {item.syllables} />)

  return <pre>{v} </pre>;
};

export default Rhymes;
