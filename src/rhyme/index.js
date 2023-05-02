import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Words from "./word";
import "./rhyme.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

const Rhymes = ({ rhymes }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getRhymingParts = async (wordList) => {
      let promises = [];
      for (let word of wordList) {
        if (!word){

        }
        else if (!word.match(/^[0-9a-z]+$/)){
          promises.push(word)
        }
        else{
          const response = await axios.get(
            `http://localhost:5000/v1/words/${word}/rhyming-parts`
          );
          promises.push(response);
        }
      }
      let resp = await Promise.all(promises);
      let res = [];
      // resp = resp.map((entry) => entry.data);
      for (let entry of resp){
        if (typeof entry === 'object' && entry !== null){
          res.push(entry.data)
        } else {
          res.push(entry)
        }

      }
      return res;
    };
    getRhymingParts(rhymes.split(/(\s+)/)).then(values => setItems(values))
  }, [rhymes]);


  let v = [] 
  // items.map((item,i) =>  <Words key={i} word={item.word} rhyming_parts={item.rhyming_parts} syllables = {item.syllables} children = {item.children} />)
  for (let item of items){
    if (typeof item === 'object' && item !== null){
      // TODO add key
      v.push( <Words  word={item.word} rhyming_parts={item.rhyming_parts} syllables = {item.syllables} children = {item.children} />)
    } else {
      v.push(<span>{item}</span>)
    }

  }

  return <span className="word">{v}</span>;
};

export default Rhymes;
