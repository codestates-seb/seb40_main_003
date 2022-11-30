export const ProductCategoryList = [
    {number:0, name: "대형 식물(100cm 내외)"},
    {number:1, name: "중형 식물(50cm 내외)"},
    {number:2, name: "소형 식물(30cm 이하)"},
    {number:3, name: "씨앗/모종"},
    {number:4, name: "화분/화병"},
    {number:5, name: "가구/장식"},
    {number:6, name: "도구/용품"},
    {number:7, name: "기계"},
    {number:8, name: "서적"}
]

export const CareCategoryList = [
    {number:0, name: "물 주기"},
    {number:1, name: "분갈이"},
    {number:2, name: "화병 관리"},
    {number:3, name: "수형 관리"},
    {number:4, name: "잎 솎기"},
    {number:5, name: "잎 닦기"},
    {number:6, name: "가지치기"},
    {number:7, name: "병/해충"},
    {number:8, name: "기타"}
]
type categoryNumberToStringType = {
    number:number
    arr:{number:number,name:string}[]
}
export const categoryNumberToString = ({number,arr}:categoryNumberToStringType)=>{
    const resultArr = arr.filter((e)=>{if(e.number===number)return true})
    return resultArr[0].name
}


// export const categoryNumberToString = (number:number)=>{
//     switch(number){
//         case 0: return "대형 식물(100cm 내외)"
//         case 1: return "중형 식물(50cm 내외)"
//         case 2: return "소형 식물(30cm 이하)"
//         case 3: return "씨앗/모종"
//         case 4: return "화분/화병"
//         case 5: return "가구/장식"
//         case 6: return "도구/용품"
//         case 7: return "기계"
//         case 8: return "서적"
//     }
// }