// 의미없는 테스트용 함수입니다

import dayjs from "dayjs";

function isOdd(elem: number): boolean {
  return Boolean(elem % 2);
}

// 숫자가 커지면 문자로 바꿔주는 함수
export const overKillo = (number: number) => {
  if (number <= 999) {
    return number;
  } else if (number > 999 && number <= 9999) {
    return `${String(number)[0]}천 이상`;
  } else if (number > 9999 && number <= 99999) {
    return `${String(number)[0]}만 이상`;
  }
};

export default isOdd;

export const getDateAgo = (date: string) => {
  // 작성일자 시간객체로
  const parsedDate = dayjs(date, "YYYY-MM-DD HH:mm:sss");
// 시간차 구하기
  let hours = parsedDate.diff(new Date(), "hours");
  hours = Math.abs(hours + 9);
  const days = Math.floor(hours / 24);
  hours = hours - days * 24;
  if (hours < 24) {
    return hours+"시간 전";
  }else if (hours>24){
    return Math.floor(hours / 24)+"일 전"
  }
};
