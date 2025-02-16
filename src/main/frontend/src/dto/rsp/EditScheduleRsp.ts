import ResponseDto from "../ResponseDto";
import {Schedule} from "../Type";

export default interface EditScheduleRsp extends ResponseDto{
    data : {
        edited  : Schedule
    }
}