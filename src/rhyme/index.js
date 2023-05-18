import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Words from "./word";
import "./rhyme.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Rhymes = ({ rhymes }) => {
  const [items, setItems] = useState([]);
  const [dictionary, setDictionary] = useState([]);

  useEffect(() => {
    const fetchDictionary = async () => {
      const rsp = await axios.get(
        "http://localhost:5000/v1/words/*/rhyming-parts"
      );
      const words = rsp.data;
      for (let word of words) {
        localStorage.setItem(word.word, JSON.stringify(word));
      }
    };
    fetchDictionary();
  },[localStorage])

  useEffect(() => {
  

    const getRhymingParts = async (wordList) => {
      let promises = [];
      for (let word of wordList) {
        word = word.toLowerCase();
        if (!word) {
        } 
        else if (!word.match(/^[0-9a-z]+/)) {
          promises.push(word);
        } else if (word in localStorage) {
          promises.push(JSON.parse(localStorage.getItem(word)))
        }else {
          word = word.replace( /[[\-=_!"#%&*{},.\/:;?\(\)\[\]@\\$\^*+<>~`]/g, '');
          const response = await axios.get(
            `http://localhost:5000/v1/words/${word}/rhyming-parts`
          );
          promises.push(response);
        }
      }
      let resp = await Promise.all(promises);
      let res = [];

      for (let entry of resp) {
        if (typeof entry === "object" && entry !== null && "data" in entry) {
          res.push(entry.data);
        }
        else {
          res.push(entry);
        }
      }
      return res;
    };
    getRhymingParts(rhymes.split(/(\s+)/)).then((values) => setItems(values));
  }, [rhymes]);

  let v = [];
  let i = 0;
  for (let item of items) {
    if (typeof item === "object" && item !== null) {
      v.push(
        <Words
          key={i}
          word={item.word}
          rhyming_parts={item.rhyming_parts}
          syllables={item.syllables}
          children={item.children}
        />
      );
    } else {
      v.push(<span  key={i}>{item}</span>);
    }
    i++;
  }

  return <span className="word">{v}</span>;
};

export default Rhymes;
