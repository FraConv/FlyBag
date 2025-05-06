
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Analytics from './Analytics';
import Negozio from './Negozio';
import Scan from './Scan';
import Graphic from './Graphic';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Analytics/>}/>
          <Route path='/Negozio' element={<Negozio/>}/>
          <Route path='/Scan' element={<Scan/>}/>
          <Route path='/Graphic' element={<Graphic/>}/>
        </Routes>
      </Router>
      
    </>
  )
}

export default App
