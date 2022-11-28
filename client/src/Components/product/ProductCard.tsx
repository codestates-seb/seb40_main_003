import styled from "@emotion/styled";
import { ImageWrapper, SigTag, ViewCounter } from "../GlobalComponents";
import {  RowWrapper, SpaceBetween, SpaceEnd } from "../Wrapper";
import { ProductWrapper } from "../Loading";
import { ProductPreviewMappingType } from "../../types/productTypes";
import { getDateAgo } from "../../utils/controller";
import { ProfileDealType } from "../../types/profileType";


const Price = styled.span`
  margin-top: 16px;
  display: block;
  color: var(--font-main);
`;
export const DescriptionColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:center;
  width: 100%;
  
`;

type props={
  data: ProductPreviewMappingType
}
const ProductCard = (props:props) => {
  const data = props.data
  return (
    <ProductWrapper className={data.state === 0 ? "soldOut" : ""}>
      <RowWrapper>
        <ImageWrapper
          size={"100"}
          src={data.images[0]}
          alt={`상품명 ${data.title}의 대표이미지`}
          loading="lazy"
        />
        <DescriptionColumnWrapper>
          <span className="medium">{data.title}</span>
          <span className="sub mb-8">{getDateAgo(data.createdAt)}</span>
          {data.state === 1 ? null : (
            <SigTag
              width={80}
              className={data.state === 0 ? "disabled sub" : "ghost sub"}
            >
              {data.state === 2 ? "예약중" : "거래완료"}
            </SigTag>
          )}
          <SpaceBetween>
            <Price className="bold">{data.price.toLocaleString()}원</Price>
            <SpaceEnd>
              <ViewCounter view={data.view} like={data.likeNum} />
            </SpaceEnd>
          </SpaceBetween>
        </DescriptionColumnWrapper>
      </RowWrapper>
    </ProductWrapper>
  );
};


export default ProductCard;
