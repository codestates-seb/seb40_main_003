import styled from "@emotion/styled";
import { ImageWrapper, ViewCounter } from "../GlobalComponents";
import { ColumnWrapper } from "../Wrapper";
import {SpaceEnd, DescriptionColumnWrapper} from"../../Components/product/ProductCard"
import { SigTag, TagWrapper} from "../GlobalComponents";



const CardWrapper = styled.div`
/* background-color: aliceblue; */
  width: 100%;
  min-width: 312px;
  max-width: 730px;
  padding: 8px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--line-light-gray);
`;
const CareDescription = styled.div`
  /* background-color: yellow; */
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CareCard = ({ data }: any) => {
    console.log(data)

  return (
        <>
      <CardWrapper>
          <CareDescription>
            <ImageWrapper
              size={"100"}
              src={data.member.image.imgUrl}
              alt={`상품명 ${data.member.name}의 대표이미지`}
            />
            <DescriptionColumnWrapper>
              <ColumnWrapper>
                  <span className="medium font-main">{data.member.name} / {data.member.age}세 / {data.member.gender}</span>
                  <span className="font-gray sub">{data.simpleContent}</span>
                  <span>{data.techTagId}</span>
                  <TagWrapper>
                    {data.map((e:any) => {
                      return (
                        <SigTag key={e.techTag.techTagName}></SigTag>
                    )})}
                  </TagWrapper>
              </ColumnWrapper>
              <span className="medium font-gray sub">{data.address}</span>
            </DescriptionColumnWrapper>
            </CareDescription>
            <SpaceEnd>
              <ViewCounter view={data.view} like={data.like} />
            </SpaceEnd>
        </CardWrapper>
        </> 
    );
  };
  
  export default CareCard;