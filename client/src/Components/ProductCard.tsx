import styled from "@emotion/styled";
import { ImageWrapper, ViewCounter } from "./GlobalComponents";
import { ColumnWrapper } from "./main/Wrapper";

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
`;
const Price = styled.span`
  display: block;
  color: var(--font-main);
`;
const Title = styled.span``;

const ProductCard = ({ data }: any) => {
  return (
    <ProductWrapper>
      <ProductDescription>
        <ImageWrapper
          size={"100"}
          src={String(data.pictures[0].picture)}
          alt={`상품명 ${data.title}의 대표이미지`}
        />
        <ColumnWrapper>
          <span>{data.title}</span>
          <span className="sub">{data.createdAt}</span>
          <Price className="bold h4">{data.price.toLocaleString()}원</Price>
        </ColumnWrapper>
      </ProductDescription>
      <ViewCounter view={data.view} like={data.like}></ViewCounter>
    </ProductWrapper>
  );
};

export default ProductCard;