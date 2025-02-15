import ResponseDto from "../ResponseDto";
import {Schedule} from "../Type";

export default  interface ScheduleRegRsp extends ResponseDto{
    data : {
        // sequence : number
        // title: string,
        // content: string,
        // year: number,
        // month: number,
        // day: number
        // start : string,
        // end : string,
        // writer : string
        added : Schedule
    }
}