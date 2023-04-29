import { type } from "@testing-library/user-event/dist/type";

const Syllables = ({syllables}) => {

    function changeBackground(e) {
        e.target.style.background = 'red';
      }

    function originalBackground(e) {
        e.target.style.background = 'blue';
    } 

    return(
    <span onMouseOver={changeBackground} onMouseLeave={originalBackground} className="syllable">{syllables}</span>
    )  
    
} 


const Words = ({word,rhyming_parts,syllables}) => {

    if (syllables === undefined) {
        return (
            <span>{syllables}</span> 
        )
    }

    let hyphenation = syllables.split("-")
    let itemList = hyphenation.map((item,i) =>  <Syllables key={i} syllables={item} />)
    // return (
        
    //     <span onMouseOver={changeBackground} onMouseLeave={originalBackground}>{syllables}</span> 
    //     // className={`syllable c${classColor}`}  style={{"background": syllables.color }}
    //   );

    return (
        <span>{itemList}</span> 
      );
    
}
 
export default Words;