import styled from "@emotion/styled";
import { ColumnWarpper } from "./main/Wrapper";

const ProductWrapper = styled.div`
  width: 100%;
  min-width: 312px;
  padding: 24px 8px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--line-light-gray);
`;

const Price = styled.span`
  display: block;
  color: var(--font-main);
`;
const Title = styled.span``;

const ProductCard = ({ data }: any) => {
  console.log(data.pictures[0].picture);
  return (
    <ProductWrapper>
      <img src={data.pictures[0].picture} alt="alt" />
      <ColumnWarpper>
        <p>{data.title}</p>
        <p className="sub">{data.createdAt}</p>
        <Price className="bold h4">{data.price}\</Price>
      </ColumnWarpper>
    </ProductWrapper>
  );
};

export default ProductCard;
