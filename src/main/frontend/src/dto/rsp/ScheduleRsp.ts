import ResponseDto from "../ResponseDto";
import {Schedule} from "../Type";

export default interface ScheduleRsp extends ResponseDto{
    data : {
        schedule : Schedule;
    }
}