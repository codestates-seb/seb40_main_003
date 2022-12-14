import CareCategoryIcon1 from "../images/cat1Icon.svg";
import CareCategoryIcon2 from "../images/cat2Icon.svg";
import CareCategoryIcon3 from "../images/cat3Icon.svg";
import CareCategoryIcon4 from "../images/cat4Icon.svg";
import CareCategoryIcon5 from "../images/cat5Icon.svg";
import CareCategoryIcon6 from "../images/cat6Icon.svg";
import CareCategoryIcon7 from "../images/cat7Icon.svg";
import CareCategoryIcon8 from "../images/cat8Icon.svg";

import ProductCategoryIcon1 from "../images/dealIcon1.svg";
import ProductCategoryIcon2 from "../images/dealIcon2.svg";
import ProductCategoryIcon3 from "../images/dealIcon3.svg";
import ProductCategoryIcon4 from "../images/dealIcon4.svg";
import ProductCategoryIcon5 from "../images/dealIcon5.svg";
import ProductCategoryIcon6 from "../images/dealIcon6.svg";
import ProductCategoryIcon7 from "../images/dealIcon7.svg";
import ProductCategoryIcon8 from "../images/dealIcon8.svg";
import ProductCategoryIcon9 from "../images/seeAllIcon.svg";

export const ProductCategoryList = [
  { number: 0, name: "대형 식물", img: ProductCategoryIcon1 },
  { number: 1, name: "중형 식물", img: ProductCategoryIcon2 },
  { number: 2, name: "소형 식물", img: ProductCategoryIcon3 },
  { number: 3, name: "씨앗/모종", img: ProductCategoryIcon4 },
  { number: 4, name: "화분/화병", img: ProductCategoryIcon5 },
  { number: 5, name: "가구/장식", img: ProductCategoryIcon6 },
  { number: 6, name: "도구/용품", img: ProductCategoryIcon7 },
  { number: 7, name: "서적", img: ProductCategoryIcon8 },
  { number: 8, name: "기타", img: ProductCategoryIcon9},
  { number: 9, name: "모두보기", img: ProductCategoryIcon9},
] as const;

export const CareCategoryList = [
  { number: 0, name: "물 주기", img: CareCategoryIcon1 },
  { number: 1, name: "분갈이", img: CareCategoryIcon2 },
  { number: 2, name: "화병 관리", img: CareCategoryIcon3 },
  { number: 3, name: "수형 관리", img: CareCategoryIcon4 },
  { number: 4, name: "잎 솎기", img: CareCategoryIcon5 },
  { number: 5, name: "잎 닦기", img: CareCategoryIcon6 },
  { number: 6, name: "가지치기", img: CareCategoryIcon7 },
  { number: 7, name: "병/해충", img: CareCategoryIcon8 },
  { number: 8, name: "모두보기", img: ProductCategoryIcon9},
] as const;

type categoryNumberToStringType = {
  number: number;
  arr: readonly { number: number; name: string; img?: string }[];
};
export const categoryNumberToString = ({
  number,
  arr,
}: categoryNumberToStringType) => {
  const resultArr = arr.filter((e) => {
    if (e.number === number) {
      return true;
    } else return false;
  });
  return resultArr[0].name;
};


type categoryStringToNumberType = {
  string: string;
  arr: readonly { number: number; name: string; img?: string }[];
};
export const categoryStringToNumber = ({
  string,
  arr,
}: categoryStringToNumberType) => {
  const resultArr = arr.filter((e) => {
    if (e.name === string) {
      return true;
    } else return false;
  });
  return resultArr[0].number;
};