import ResponseDto from "../ResponseDto";
import {Schedule} from "../Type";

export default  interface ScheduleListRsp extends ResponseDto{
    data : {
        scheduleList : Schedule[]
    }
}