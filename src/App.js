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
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [IP, setIP] = useState("")
  const [page, setPage] = useState(1)



  useEffect(() => {
    let localPage = localStorage.getItem("page")
    setPage(parseInt(localPage))

    // get IP
    let apiKey = '1be9a6884abd4c3ea143b59ca317c6b2';
    fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=' + apiKey)
        .then(response => response.json())
        .then(data => {
          setIP(data.ip_address)
        });

    if(localStorage.getItem("IP") !== null){
      setIsAuth(true)
    }

    if(localStorage.getItem('auth')){
      setIsAuth(true)
    }
    setIsLoading(false)
  }, [])
  
  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth, 
      isLoading,
      IP
    }}>
      <BrowserRouter>
        <Header />
        <div className="App">

          <Navbar page={page} setPage={setPage}/>
          <AppRouter setPage={setPage} page={page}/>
        
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
