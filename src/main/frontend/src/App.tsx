import React, {useEffect} from 'react';
import './App.css';
import {Routes,Route} from "react-router-dom"
import Container from "./layout/container/container";
import LogIn from "./veiw/auth/LogIn";
import Main from "./veiw/main/Main";
import {DEFAULT_PATH, MAIN_PATH} from "./constant/path";

function App() {

    useEffect(() => {
        // 로그인 한 유저의 확인.
    }, []);
    return (
        <div className="App">
            <Routes>
                <Route element={<Container/>}>
                    <Route path={DEFAULT_PATH} element={<LogIn/>}/>
                    <Route path={MAIN_PATH} element={<Main/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
