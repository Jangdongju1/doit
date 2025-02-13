import {create} from "zustand/react";

interface ModalProps<D> {
    isModalOpen : boolean,
    modalType : string,
    openModal : (type :string) => void,
    closeModal : ()=>void,
    modalData : D | null
    setModalData : (data : D) => void
}

const modalStore = create<ModalProps<any>> (setState => ({
    isModalOpen : false,
    modalType : "",
    openModal : type => setState({isModalOpen : true, modalType : type}),
    closeModal : () =>  setState({ isModalOpen : false, modalType :""}),
    modalData : null,
    setModalData : data => setState({modalData : data})
}))


export default modalStore;