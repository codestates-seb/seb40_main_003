import styled from "@emotion/styled";
import { ImageWrapper, ViewCounter } from "../GlobalComponents";
import { ColumnWrapper } from "../Wrapper";
import { DescriptionColumnWrapper} from"../../Components/product/ProductCard"
import { SigTag, TagWrapper} from "../GlobalComponents";



const CardWrapper = styled.div`
/* background-color: aliceblue; */
  min-width: 312px;
  max-width: 730px;
  padding: 8px 8px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--line-light-gray);
`;
const CareDescription = styled.div`
  /* background-color: yellow; */
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
`;

const EndWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding-bottom: 15px;
`

const CareCard = ({ data }: any) => {
  
  return (
        <>
      <CardWrapper>
          <CareDescription>
            <ImageWrapper
              size={"100"}
              src={data.image.imgUrl}
              alt={`상품명 ${data.name}의 대표이미지`}
              loading="lazy"
            />
            <DescriptionColumnWrapper>
              <ColumnWrapper>
                  <span className="medium font-main">{data.name} / {data.age}세 / {data.gender}</span>
                  <span className="font-gray sub">{data.simpleContent}</span>
                  <span>{data.techTagName}</span>
                  <TagWrapper>
                    {data.techTags.map((e:any) => {
                      return (
                        <SigTag className="ghostgray sub" key={e.techTagId}>{e.techTagName}</SigTag>
                    )})}
                  </TagWrapper>
              </ColumnWrapper>
              <EndWrapper>
              <span className="medium font-gray sub">{data.address}</span>
              <ViewCounter view={data.view} like={data.likes} />                
              </EndWrapper>          
            </DescriptionColumnWrapper>
            </CareDescription>
        </CardWrapper>
        </> 
    );
  };
  
  export default CareCard;