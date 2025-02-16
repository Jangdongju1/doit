export default interface EditScheduleReq {
    sequence: number,
    title: string,
    content: string,
    year: number,
    month: number,
    day: number,
    start: string,
    end: string
}