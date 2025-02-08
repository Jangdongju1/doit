import "./sytle.css";
import {Outlet} from "react-router-dom"
export default function Container(){

    return (
        <div id={"main-container"}>
            <Outlet/>
        </div>
    )
}