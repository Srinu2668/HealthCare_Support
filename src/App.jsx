import { useContext } from 'react';
import './App.css';
import Nav from './components/Nav';
import createContextProvider from './store/Provider';
import OpenSuggestion from './components/OpenSuggestion';
import MainOperation from './components/MainOperation';

function App() 
{
  const{open1,theme}=useContext(createContextProvider);
  return (
      <>
          <div className='main_Container' style={{backgroundColor:theme?'white':'black'}}>
              {
                open1 && <OpenSuggestion/>
              }
            <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
              <Nav></Nav>
              <MainOperation></MainOperation>
            </div>
          </div>
      </>
  )
}

export default App


