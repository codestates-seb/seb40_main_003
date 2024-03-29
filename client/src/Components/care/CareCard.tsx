import styled from "@emotion/styled";
import { ImageWrapper, ViewCounter } from "../GlobalComponents";
import { ColumnWrapper, RowWrapper, SpaceBetween } from "../Wrapper";
import { DescriptionColumnWrapper } from "../product/ProductCard";
import { SigTag, TagWrapper } from "../GlobalComponents";
import { defaultImage } from "../../utils/defaultImage";
import {  caringPreviewTypes } from "../../types/caringTypes";

const CardWrapper = styled.div`
  padding: 16px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--line-light-gray);
`;

const CareCard = ({ data }: caringPreviewTypes) => {
  return (
    <>
      <CardWrapper>
        <RowWrapper>
          <ImageWrapper
            size={"100"}
            src={data.image!==null?data.image.imgUrl:""}
            alt={`상품명 ${data.name}의 대표이미지`}
            loading="lazy"
            onError={defaultImage}
          />
          <DescriptionColumnWrapper>
            <ColumnWrapper>
              <span className="medium font-main">
                {data.name} / {data.age}세 / {data.gender===1?"남":"여"}
              </span>
              <p className="font-gray sub text-overflow3">{data.simpleContent}</p>
              <TagWrapper className="mt-4">
                {data.techTags.map((e: any) => {
                  return (
                    <SigTag className="ghostgray sub" key={e.techTagId}>
                      {e.techTagName}
                    </SigTag>
                  );
                })}
              </TagWrapper>
            </ColumnWrapper>
            <SpaceBetween className="mt-8">
              <span className="medium font-gray sub">{data.address}</span>
              <ViewCounter view={data.view} like={data.likes} />
            </SpaceBetween>
          </DescriptionColumnWrapper>
        </RowWrapper>
      </CardWrapper>
    </>
  );
};

export default CareCard;
