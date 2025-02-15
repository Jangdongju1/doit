import {create} from "zustand/react";

interface LoginUser{
    userId : string,
    setUserId : (userId :string) => void;
}

const loginUserStore = create<LoginUser>(setState => ({
    userId : "",
    setUserId : userId => setState({userId : userId})
}))