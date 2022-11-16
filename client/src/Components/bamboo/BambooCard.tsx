import { ImageWrapper, ViewCounter } from "../GlobalComponents";
import { ColumnWrapper, SectionWrapper } from "../Wrapper";
import { SpaceEnd } from "../../Components/product/ProductCard";

const BambooCard = ({ data }: any) => {
  return (
    <ColumnWrapper>
      <SectionWrapper title={data.title} content={data.content} width={100}>
        <>
          {data.image[0] ? (
            <ImageWrapper
              className="bambooImage mb-16 mt-8"
              size={"112"}
              src={data.image[0].imgUrl}
              alt={`상품명 ${data.title}의 대표이미지`}
            />
          ) : <></>
          }
          <SpaceEnd className="mt-8">
            <ViewCounter view={data.view} like={data.likes} />
          </SpaceEnd>
        </>
      </SectionWrapper>
    </ColumnWrapper>
  );
};

export default BambooCard;
