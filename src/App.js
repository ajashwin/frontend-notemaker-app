import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';
import Addposts from './components/Addposts';
import Card from './components/Card';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/add' element={<Addposts/>}/>
        <Route path='/card' element={<Card/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;