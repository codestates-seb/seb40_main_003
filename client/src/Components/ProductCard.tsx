import styled from "@emotion/styled";
import { ColumnWarpper } from "./main/Wrapper";

const ProductWrapper = styled.div`
  width: 100%;
  min-width: 312px;
  max-width: 730px;
  padding: 24px 8px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--line-light-gray);
`;
const LeftWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;
const RightWrapper = styled.div`
  display: flex;
`
const Price = styled.span`
  display: block;
  color: var(--font-main);
`;
const Title = styled.span``;

const ProductCard = ({ data }: any) => {
  console.log(data.pictures[0].picture);
  return (
    <ProductWrapper>
      <LeftWrapper>
        <img src={data.pictures[0].picture} alt="alt" className="mr-16" />
        <ColumnWarpper>
          <p>{data.title}</p>
          <p className="sub">{data.createdAt}</p>
          <Price className="bold h4">{data.price.toLocaleString()}원</Price>
        </ColumnWarpper>
      </LeftWrapper>
      {data.view}
    </ProductWrapper>
  );
};

export default ProductCard;
