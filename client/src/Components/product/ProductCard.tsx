import styled from "@emotion/styled";
import { ImageWrapper, ViewCounter } from "../GlobalComponents";
import { ColumnWrapper } from "../Wrapper";
import Skeleton from "../Skeleton";

const ProductWrapper = styled.div`
  width: 100%;
  min-width: 312px;
  max-width: 730px;
  padding: 8px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--line-light-gray);
`;

const ProductDescription = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Price = styled.span`
  margin-top: 16px;
  display: block;
  color: var(--font-main);
`;
export const DescriptionColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const SpaceEnd = styled.div`
  display: flex;
  flex-direction: column;
  align-self: end;
  height: 100%;
`;

const ProductCard = ({ data }: any) => {
  return (
    <ProductWrapper>
      <ProductDescription>
        <ImageWrapper
          size={"100"}
          src={data.pictures[0].picture}
          alt={`상품명 ${data.title}의 대표이미지`}
        />
        <DescriptionColumnWrapper>
          <ColumnWrapper>
            <span className="medium">{data.title}</span>
            <span className="sub">{data.createdAt}</span>
          </ColumnWrapper>
          <Price className="bold h4">{data.price.toLocaleString()}원</Price>
        </DescriptionColumnWrapper>
      </ProductDescription>
      <SpaceEnd>
        <ViewCounter view={data.view} like={data.like} />
      </SpaceEnd>
    </ProductWrapper>
  );
};
// 스켈레톤 컴포넌트
export const ProductPlaceHolder = () => {
  return (
    <ProductWrapper>
      <ProductDescription>
        <Skeleton width={100} height={100} rounded={true} mr={16} />
        <DescriptionColumnWrapper>
          <ColumnWrapper>
            <Skeleton width={150} height={20} />
          </ColumnWrapper>
          <Price className="bold h4">
            <Skeleton width={80} height={20} />
          </Price>
        </DescriptionColumnWrapper>
      </ProductDescription>
      <SpaceEnd>
        <Skeleton width={80} height={25} />
      </SpaceEnd>
    </ProductWrapper>
  );
};

export default ProductCard;
