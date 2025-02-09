import React, {useEffect} from 'react';
import './App.css';
import {Routes,Route} from "react-router-dom"
import Container from "./layout/container/container";
import LogIn from "./veiw/auth/LogIn";

function App() {




    useEffect(() => {
        // 로그인 한 유저의 확인.
    }, []);
    return (
        <div className="App">
            <Routes>
                <Route element={<Container/>}>
                    <Route path={"/"} element={<LogIn/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
