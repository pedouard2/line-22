import { type } from "@testing-library/user-event/dist/type";

const Syllables = ({syllables,children,rhyming_parts}) => {

    const re = /([A-Z]{1,})(\d*)/;

    const regexp = /(?<arapet>[A-Z]{1,})(?<stress>\d*)/gm;

    let arapet = "";
    let stress = "";
    for (const match of rhyming_parts.matchAll(regexp)) {
        arapet = match.groups.arapet;
        stress = "_" + match.groups.stress;
      }

    function changeBackground(e) {
        if (e.detail == 2){
            e.target.style.background = 'red';
        }else{
            e.target.style.background = 'white';
        }
      }

    function cycleClass(e) {
        console.log(e.target.id)
    }
    function originalBackground(e) {
        e.target.style.background = 'blue';
    } 
    // onMouseLeave={originalBackground}
    return(
    <span onClick={changeBackground} id={rhyming_parts}   className={`syllable ${arapet} ${stress}`}>{syllables}</span>
    // onMouseOver={} 
    )  
    
} 


const Words = ({word,rhyming_parts,syllables,children}) => {

    if (syllables === undefined) {
        return (
            <span>{syllables}</span> 
        )
    }

    let hyphenation = syllables.split("-")
    let rp = rhyming_parts.split(" ")
    let itemList = hyphenation.map((item,i) =>  <Syllables key={i} syllables={item} rhyming_parts={rp[i]} />)
    // return (
        
    //     <span onMouseOver={changeBackground} onMouseLeave={originalBackground}>{syllables}</span> 
    //     // className={`syllable c${classColor}`}  style={{"background": syllables.color }}
    //   );

    return (
        <span>{itemList} </span> 
      );
    
}
 
export default Words;