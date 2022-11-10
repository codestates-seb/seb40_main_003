import styled from "@emotion/styled";
import { ImageWrapper, ViewCounter } from "../GlobalComponents";
import { ColumnWrapper } from "../main/Wrapper";

const ProductWrapper = styled.div`
  width: 100%;
  min-width: 312px;
  max-width: 730px;
  padding: 24px 8px;
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
const DescriptionColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const SpaceEnd = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  height: 100%;
`;

const ProductCard = ({ data }: any) => {
  console.log(data.pictures[0].picture)
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
      <DescriptionColumnWrapper>
        <ViewCounter view={data.view} like={data.like} />
      </DescriptionColumnWrapper>
    </ProductWrapper>
  );
};

export default ProductCard;
