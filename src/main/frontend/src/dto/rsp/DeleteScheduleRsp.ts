import ResponseDto from "../ResponseDto";

export default interface DeleteScheduleRsp extends ResponseDto{
    data : {
        deleted : number;
    }
}