import './App.css'
import React from 'react'
import { useState } from 'react';

//Pages
import ProductPage from './components/Products';
import HomePage from './components/HomePage';

function App() {
  const [pageIndex, setPageIndex] = useState(0);
  function NavToProducts(){
    setPageIndex(1);
  }
  function NavToHome(){
    setPageIndex(0);
  }

  function UpdatePage(){
      const Pages = [<HomePage/>, <ProductPage/>];

    return Pages[pageIndex];
  }

return (
    <>
    <header id="app">
    <div id="navbar">
      <h2>Buildtivity</h2>
      <div id="buttons">
      <button id="buttononbar" onClick={NavToHome}>Home</button>
      <button id="buttononbar" onClick={NavToProducts}>Products</button>
      <button id="buttononbar" onClick={NavToHome}>About us</button>
      <button id="buttononbar" onClick={NavToHome}>Contact</button>
      </div>
    </div>
    </header>
    <UpdatePage/>
    </>
  )
}

export default App
