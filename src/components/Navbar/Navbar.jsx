import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AdminContext, AuthContext} from '../../context';
import Button from '@mui/material/Button';

const Navbar = ({page, setPage}) => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const {setIsAdmin} = useContext(AdminContext);
    const [logName, setLogName] = useState("Войти");

    const links = [
        {id: 1, to: '/departments', name: 'Главная'},
        {id: 2, to: '/profcom', name: 'Профком'},
        {id: 3, to: '/npa', name: 'НПА'},
        {id: 4, to: '/search', name: 'Поиск'},
        {id: 5, to: '/journal', name: 'Журнал выездов'},
        {id: 6, to: '/support', name: 'Помощь'},
        {id: 7, to: '/login', name: logName}
        
    ];

    useEffect(() => {
        if(isAuth){
            setLogName("Выйти")
        } else {
            setLogName("Войти")
        }
    }, [isAuth]);

    
    return (
        <div className="navbar">
            {
                links.map(item =>
                    <Link
                        to={item.to}
                        key={item.id}
                        onClick={() => {
                            if(!isAuth) return;
                            if(item.id === 7){
                                setIsAuth(false);
                                setIsAdmin(false);
                                localStorage.clear();
                            }
                            setPage(item.id);
                            localStorage.setItem('page', JSON.stringify(item.id))
                        }}
                    >
                        <Button variant={page == item.id ? "contained" : "outlined"} style={{padding: '5px 25px', margin: "0 10px"}}>
                            {item.name}
                        </Button>
                    </Link>
                )
            }
        </div>
    );
};

export default Navbar;