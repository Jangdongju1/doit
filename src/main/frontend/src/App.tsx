import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom"
import Container from "./layout/container/Container";
import LogIn from "./veiw/auth/LogIn";
import Main from "./veiw/main/Main";
import {DEFAULT_PATH, EDIT_PATH, MAIN_PATH} from "./constant/path";
import {useCookies} from "react-cookie";
import EditPage from "./veiw/edit/EditPage";

function App() {
    const [cookies, setCookies] = useCookies();
    const accessToken = cookies.accessToken;

    useEffect(() => {
        if (!accessToken){
            localStorage.removeItem("userSession"); // 세션삭제
        }
    }, []);
    return (
        <div className="App">
            <Routes>
                <Route element={<Container/>}>
                    <Route path={DEFAULT_PATH} element={<LogIn/>}/>
                    <Route path={MAIN_PATH} element={<Main/>}/>
                    <Route path={EDIT_PATH(":sequence")} element={<EditPage/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
