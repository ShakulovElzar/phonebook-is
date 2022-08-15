import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import './styles/App.css';
import './styles/normalize.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import { useState } from 'react';
import AppRouter from './components/AppRouter';
import { useEffect } from 'react';
import { AuthContext } from './context/';

function App() {
  const [isAuth, setIsAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1)

  useEffect(() => {
    localStorage.setItem("page", page)
  }, [page])

  useEffect(() => {
    let localPage = localStorage.getItem("page")
    setPage(localPage)
    

    if(localStorage.getItem('auth')){
      setIsAuth(true)
    }
    setIsLoading(false)
  }, [])
  
  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth, 
      isLoading
    }}>
      <BrowserRouter>
        <Header />
        <div className="App">

          <Navbar page={page} setPage={setPage}/>
          <AppRouter setPage={setPage}/>
        
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
