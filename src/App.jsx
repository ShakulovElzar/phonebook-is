import React, {useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import './styles/App.css';
import './styles/normalize.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import AppRouter from './components/AppRouter';
import {AdminContext, AuthContext} from './context/';
import Error from "./pages/Error";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [IP, setIP] = useState("");
  const [page, setPage] = useState(1);

  // internet connection check
  let onlineBoolean = navigator.onLine;

  useEffect(() => {
    setPage(localStorage.getItem("page"));

    const d = new Date();
    if(JSON.stringify(d.getDate()) === localStorage.getItem("logindate")){
      setIsAuth(true);
      if(localStorage.getItem("isAdmin") !== undefined){
        setIsAdmin(true);
      }
    }
    setIsLoading(false)
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth, 
      isLoading,
      IP
    }}>
      <AdminContext.Provider value={{
        isAdmin,
        setIsAdmin,
      }}>
        <BrowserRouter>
          <Header setPage={setPage} />
            <div className="App">

              <Navbar page={page} setPage={setPage}/>
                {
                  onlineBoolean
                      ?
                      <AppRouter setPage={setPage} page={page}/>
                      :
                      <Error/>
                }
          </div>
        </BrowserRouter>
      </AdminContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
