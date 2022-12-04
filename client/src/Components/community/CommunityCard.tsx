import styled from "@emotion/styled";
import { getDateAgo } from "../../utils/controller";
import { ImageWrapper, ViewCounter } from "../GlobalComponents";
import {
  ColumnWrapper,
  SectionWrapper,
  SpaceBetween,
} from "../Wrapper";

const CommunityCard = ({ data }: any) => {
  console.log(data);
  return (
    <ColumnWrapper borderBottom={true}>
      <SectionWrapper
        title={data.title}
        content={data.content}
        width={100}
        borderNone={true}
      />
      {data.images[0] ? (
        <ImageWrapper
          className="communityPreview mt-8"
          size={"112"}
          src={data.images[0]}
          alt={`상품명 ${data.title}의 대표이미지`}
          loading="lazy"
        />
      ) : (
        <></>
      )}

      <SpaceBetween className="mt-8 mb-16">
        <div>
          <span className="sub font-gray mr-8">
            {getDateAgo(data.createdAt)}
          </span>
          <span className="sub font-gray ml-16">{data.member.nickname}</span>
        </div>
        <ViewCounter
          view={data.likeNum}
          renameView="좋아요"
          renameLike="댓글"
          like={data.commentNum}
        />
      </SpaceBetween>
    </ColumnWrapper>
  );
};

export default CommunityCard;
