import ResponseDto from "../ResponseDto";

export default  interface SignInRsp extends ResponseDto{
    data : {
        token: string,
        expiration : number
        userId : string
    }
}