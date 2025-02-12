import ResponseDto from "../ResponseDto";

export default interface SignUpRep extends ResponseDto{
    data : {
        addedId : string
    }
}