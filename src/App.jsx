import React, {useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import './styles/App.css';
import './styles/normalize.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import AppRouter from './components/AppRouter';
import {AdminContext, AuthContext} from './context/';
import Error from "./pages/Error";
import axios from "axios";

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    // internet connection check
    let onlineBoolean = navigator.onLine;

    const isAdminCheck = () => {
      axios.get('http://10.200.24.103:8089/account/', {headers: {"Authorization": `Bearer ${localStorage.getItem("atoken")}`}})
          .then(resp => {
            for (let i = 0; i < resp.data.length; i++) {
              if (resp.data[i].email === localStorage.getItem("user")) {
                if (resp.data[i].is_staff) {
                  setIsAdmin(true);
                }
              }
            }
          });
    };

    useEffect(() => {
        const d = new Date();
        if (JSON.stringify(d.getTime()) <= localStorage.getItem("loginExpiry")) {
            setIsAuth(true);
            setPage(localStorage.getItem("page"));
            isAdminCheck();
        } else if (JSON.stringify(d.getTime()) >= localStorage.getItem("loginExpiry")) {
            setPage(7);
        }

        setIsLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading
        }}>
            <AdminContext.Provider value={{
                isAdmin,
                setIsAdmin,
            }}>
                <BrowserRouter>
                    <Header setPage={setPage}/>
                    <div className="App">

                        <Navbar page={page} setPage={setPage}/>
                        {
                            onlineBoolean
                                ?
                                <AppRouter setPage={setPage} page={page} isAdminCheck={isAdminCheck}/>
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
