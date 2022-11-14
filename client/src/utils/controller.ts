
// 의미없는 테스트용 함수입니다

function isOdd(elem:number):boolean {
  return Boolean(elem%2)
}

export const overKillo =(number:number)=>{
  if(number<=999){
    return number
  }
  else if(number >999&&number<9999){
    return `${String(number)[0]}천 이상`
  }
  else return "1만 이상" 
}

export default isOdd