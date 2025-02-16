import "./style.css";
import {Outlet} from "react-router-dom"
import ModalStore from "../store/ModalStore";
export default function Container(){
    const {isModalOpen} = ModalStore();
    return (
        <div id={"main-container"}>
            {isModalOpen && (
                <div className={"modal-overlay"}/>
            )}
            <Outlet/>
        </div>
    )
}