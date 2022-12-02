import styled from "@emotion/styled";
import { ImageWrapper, SigTag, ViewCounter } from "../GlobalComponents";
import {  RowWrapper, SpaceBetween, SpaceEnd } from "../Wrapper";
import { ProductWrapper } from "../Loading";
import { getDateAgo } from "../../utils/controller";
import { ProfileDealType } from "../../types/profileType";
import { defaultImage } from "../../utils/defaultImage";
import { categoryNumberToString, ProductCategoryList } from "../../Const/Category";



const Price = styled.span`
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
  data: ProfileDealType
}
const ProductCard:React.FC<props> = ({data}) => {
  return (
    <ProductWrapper as={"section"} className={data.state === 2 ? "soldOut" : ""}>
      <RowWrapper>
{data.images!==null?<ImageWrapper
          size={"100"}
          src={data?.images[0]}
          alt={`상품명 ${data.title}의 대표이미지`}
          loading="lazy"
          onError={defaultImage}
        />:null}
        <DescriptionColumnWrapper>
          <h2 className="medium font-main">{data.title}</h2>
          <span className="sub mb-8">{data.category&&categoryNumberToString({number:data.category,arr:ProductCategoryList})}</span>
          <span className="sub mb-4">{getDateAgo(data.createdAt)}</span>
          {data.state === 0 ? null : (
            <SigTag
              width={80}
              className={data.state === 2 ? "disabled sub" : "ghost sub"}
            >
              {data.state === 2 ? "판매완료" : "예약중"}
            </SigTag>
          )}
          <SpaceBetween className="mt-8">
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
