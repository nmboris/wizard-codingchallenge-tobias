import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';
import './styles/output.css';

let wizardData = [];

function App() {
  const [loaded, setLoaded] = useState(false);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    (async function anyNameFunction() {
      let result = await axios.get('https://api.npoint.io/7af3e99b000df4f418e0');
      wizardData = result.data || [];
      setLoaded(true);
      const wizardSlide = parseInt(localStorage.getItem('wizardSlide'));
      if (wizardSlide > 0) {
        setSlide(wizardSlide);
      }
    })();
  }, []);

  const updateSlide = (targetSlide) => {
    if (targetSlide >= 0 && targetSlide <= wizardData.length) {
      setSlide(targetSlide);
      localStorage.setItem('wizardSlide', targetSlide);
    }
  };

  const resetSlide = () => {
    setSlide(0);
    localStorage.removeItem('wizardSlide');
  };

  return (
    <div className="App">
      <main className="container flex flex-col justify-center items-center p-4 my-0 mx-auto h-screen">
      {(loaded && slide < wizardData.length) ? (
        <div className="w-3/4 h-3/6 border border-2 border-gray-300 rounded">
          <div className="flex flex-col justify-between h-full">
            <div className="title w-full h-12 bg-gray-200 p-4 flex justify-center items-center text-2xl">
              {slide + 1} - {wizardData[slide].title}
            </div>

            <div className="p-4 text-left" dangerouslySetInnerHTML={{__html: wizardData[slide].content}}>
            </div>

            <div className="flex justify-between border-t-2 py-4">
              <button 
                disabled={slide === 0} 
                className={`bg-transparent text-gray-700 font-semibold py-2 px-8 border border-gray-500 rounded ml-8 ${slide === 0 ? 'opacity-50 cursor-not-allowed': ''}`}
                onClick={() => updateSlide(slide - 1)}>
                Zurück
              </button>
              <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded mr-8"
                onClick={() => updateSlide(slide + 1)}>
                {(slide < wizardData.length-1) ? "Weiter" : "Fertigstellen"}
              </button>
            </div>
          </div>
        </div>
      ) : (<div/>)}

      {(loaded && slide === wizardData.length) ? (
        <div>
          <h2>Vielen Dank :o)</h2> 
          <button 
            className="mt-8 text-blue-600 hover:text-blue-900 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
            type="button"
            onClick={() => resetSlide()}>Assistenten neu starten</button>
        </div>
      ) : (<div/>)}
      </main>
    </div>
  );
}

export default App;
