import { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import './App.css';

function App() {
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");
 
  const  handleChange =  async (event) => {

    const result = await toBase64(event.target.files[0]).catch(e => Error(e));

    setImagePath(result);
  }
  
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

  const handleClick = () => {
  
    Tesseract.recognize(
      imagePath,'eng',
      { 
        logger: m => console.log(m) 
      }
    )
    .catch (err => {
      console.error(err);
    })
    .then(result => {
      // Get Confidence score
   /*    let confidence = result.confidence */
      let text = result.data.text;
     
      setText(text);
  
    })
  }


  return (
    <div className="App">
      <main className="App-main">
        <h3>Sube una imagen para extraer el texto</h3>
        <img 
           src={imagePath} className="App-logo" alt="logo"/>
        
          <h3>Extraer texto</h3>
        <div className="text-box">
          <p> {text} </p>
        </div>
        <input type="file" onChange={handleChange} />
        <button onClick={handleClick} style={{height:50}}> convert to text</button>
      </main>
    </div>
  );
}

export default App