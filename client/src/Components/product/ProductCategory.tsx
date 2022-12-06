import styled from "@emotion/styled";
import { ProductCategoryList } from "../../Const/Category";
import { ColumnWrapper } from "../Wrapper";


const ProductCategory = ({isSearching,setCategory}:{isSearching:boolean,setCategory:Function}) => {
  return (
    <>
      <Container isSearching={isSearching}>
        {ProductCategoryList.map((e) => {
          return (
            <ColumnWrapper
              key={`카테고리 ${e.number}`}
              center={true}
              className={"cursor mr-16 mb-8"}
              onClick={()=>{setCategory(e.number)}}
            >
              <IconWrap src={e.img} alt={`${e.name} 아이콘`} />
              <span>{e.name}</span>
            </ColumnWrapper>
          );
        })}
      </Container>
    </>
  );
};
const IconWrap = styled.img`
  width: 56px;
  height: 56px;
  padding: 4px;
  &:hover{
    padding: 2px;
    transition-duration: 200ms;
  }
`
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 8px auto;
  overflow: hidden;
  max-height: ${(props:{isSearching:boolean})=>(props.isSearching?"300px":"0px")};
  transition-duration: 300ms;
`
export default ProductCategory;
