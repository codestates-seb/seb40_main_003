import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  CategoryButton,
  CategoryWrapper,
} from "../../Components/GlobalComponents";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
} from "../../Components/Wrapper";
import { userState } from "../../Recoil/atoms/user";
import { ProductDetailType } from "../../types/productTypes";
import usePageTitle from "../../Hooks/usePageTitle";
import useFetch from "../../Hooks/basicFetching";

const CareCategory = () => {

  const { id } = useParams();
  const isLogin = useRecoilValue(userState);

  const data= useFetch<ProductDetailType>("shopping");
  usePageTitle("돌봄 카테고리");

  return data !== null ? (
    <MainContentContainer>
      <MainCenterWrapper>
        <CategoryWrapper>
          <CategoryButton className="ghost">
            <img src=""></img>
          </CategoryButton>
          <CategoryButton className="ghost">
            <img src=""></img>
          </CategoryButton>
          <CategoryButton className="ghost">
            <img src=""></img>
          </CategoryButton>
          <CategoryButton className="ghost">
            <img src=""></img>
          </CategoryButton>
        </CategoryWrapper>
      </MainCenterWrapper>

      <MainRightWrapper></MainRightWrapper>
    </MainContentContainer>
  ) : (
    <>loading...</>
  );
};

export default CareCategory;
