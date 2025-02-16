export const BASE_URL= ()=> "http://localhost:4000"


//User
export const SIGN_UP = () => "/sign-up";
export const DUPLICATION_CHECK = ()=> "/duplication-check"
export const SIGN_IN = ()=>"/login";



//Schedule
export const SCHEDULE_REG =  () =>"";
export const SCHEDULE_LIST = (year:string, month : string)=>`/schedule-list?year=${year}&month=${month}`;
export const SCHEDULE = (sequence: string) => `?sequence=${sequence}`;
export const EDIT_SCHEDULE  = ()=>"";
export const DELETE_SCHEDULE = (sequence : string)=>`?sequence=${sequence}`;
