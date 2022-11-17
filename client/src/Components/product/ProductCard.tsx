import styled from "@emotion/styled";
import { ImageWrapper, SigTag, ViewCounter } from "../GlobalComponents";
import { ColumnWrapper, RowWrapper } from "../Wrapper";
import Skeleton from "../Skeleton";

const ProductWrapper = styled.div`
  width: 100%;
  min-width: 312px;
  max-width: 730px;
  padding: 8px 8px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--line-light-gray);
`;

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;
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

const SpaceEnd = styled.div`
  display: flex;
  flex-direction: column;
  align-self: end;
`;

const ProductCard = ({ data }: any) => {
  return (
    <ProductWrapper>
      <RowWrapper>
        <ImageWrapper
          size={"100"}
          src={data.pictures[0].picture}
          alt={`상품명 ${data.title}의 대표이미지`}
          loading="lazy"
          className={data.state === 0 ? "soldOut" : ""}
        />
        <DescriptionColumnWrapper>
          <span className="medium">{data.title}</span>
          <span className="sub mb-8">{data.createdAt}</span>
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
              <ViewCounter view={data.view} like={data.like} />
            </SpaceEnd>
          </SpaceBetween>
        </DescriptionColumnWrapper>
      </RowWrapper>
    </ProductWrapper>
  );
};
// 스켈레톤 컴포넌트
export const ProductPlaceHolder = () => {
  return (
    <ProductWrapper>
      <SpaceBetween>
        <Skeleton width={100} height={100} rounded={true} mr={16} />
        <DescriptionColumnWrapper>
          <ColumnWrapper>
            <Skeleton width={150} height={20} />
          </ColumnWrapper>
          <Price className="bold h4">
            <Skeleton width={80} height={20} />
          </Price>
        </DescriptionColumnWrapper>
      </SpaceBetween>
      <SpaceEnd>
        <Skeleton width={80} height={25} />
      </SpaceEnd>
    </ProductWrapper>
  );
};

export default ProductCard;
