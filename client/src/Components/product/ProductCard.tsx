import styled from "@emotion/styled";
import { ImageWrapper, SigTag, ViewCounter } from "../GlobalComponents";
import {  RowWrapper, SpaceBetween, SpaceEnd } from "../Wrapper";
import { ProductWrapper } from "../Loading";
import { getDateAgo } from "../../utils/controller";
import { ProfileDealType } from "../../types/profileType";
import { defaultImage } from "../../utils/defaultImage";



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
  // data: ProfileDealType
  // 임시 처리
  data: any
}
const ProductCard:React.FC<props> = ({data}) => {
  return (
    <ProductWrapper className={data.state === 2 ? "soldOut" : ""}>
      <RowWrapper>
        <ImageWrapper
          size={"100"}
          src={data?.images?.length>0?data.images[0]:data.images}
          alt={`상품명 ${data.title}의 대표이미지`}
          loading="lazy"
          onError={defaultImage}
        />
        <DescriptionColumnWrapper>
          <span className="medium">{data.title}</span>
          <span className="sub mb-8">{getDateAgo(data.createdAt)}</span>
          {data.state === 0 ? null : (
            <SigTag
              width={80}
              className={data.state === 2 ? "disabled sub" : "ghost sub"}
            >
              {data.state === 2 ? "판매완료" : "예약중"}
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
