import { useState } from "react";

import ProductCard, {
} from "../../Components/product/ProductCard";
import { ProductPreviewType } from "../../types/productTypes";
import { Link } from "react-router-dom";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
  SectionWrapper,
} from "../../Components/Wrapper";
import { SigButton } from "../../Components/GlobalComponents";
import usePageTitle from "../../Hooks/usePageTitle";
import useFetch from "../../Hooks/useFetch";


export const ProductMain = ({data}:{data:ProductPreviewType}) => {
  const {shopping} = data
  console.log(data)
  return (
    <MainContentContainer>
      <MainCenterWrapper>
        {shopping.map((e) => {
          return (
            <Link to={`/product/${e.dealId}`} key={e.dealId}>
              <ProductCard data={e} />
            </Link>
          );
        })}
      </MainCenterWrapper>
      <MainRightWrapper>
        <SectionWrapper borderNone={true}>
          <p className="h5 bold font-main mr-16">
            반려식물을 분양하고 원예 용품을 판매해보세요.🌿
          </p>
        </SectionWrapper>
        <span className="h4 bold"></span>
        <Link to={"/product/write"}>
          <SigButton type="submit">새 글쓰기</SigButton>
        </Link>
        <Link to={"/product/category"}>
          <SigButton>거래 카테고리</SigButton>
        </Link>
      </MainRightWrapper>
    </MainContentContainer>
  );
};

const Product = () => {
  const data = useFetch<ProductPreviewType>("/shopping")
  usePageTitle("거래");

  return data!==undefined?(<ProductMain data={data} />):<></>
};

export default Product;
