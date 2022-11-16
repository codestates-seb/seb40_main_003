import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CommentCard,
  ImageWrapper,
  ViewCounter,
} from "../../Components/GlobalComponents";
import { SpaceEnd } from "../../Components/product/ProductCard";
import { bambooDetailTypes } from "../../types/bambooDetailTypes";

const BambooDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<bambooDetailTypes | null>(null);
  const { id } = useParams();

  useEffect(() => {
    try {
      axios.get(`/bamboo/${id}`).then((res) => {
        setData(res.data);
        setIsLoading(false);
        console.log(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return !isLoading && data !== null ? (
    <>
      <span className='h4 bold font-main'>{data.title}</span>
      {data.image[0] ? (
        <ImageWrapper
          className='bambooImage'
          size={"360"}
          src={data.image[0].imgUrl}
          alt={`상품명 ${data.title}의 대표이미지`}
        />
      ) : null}
      <p className='font-black'>{data.content}</p>
      <span className='sub font-gray'>{data.createdAt}</span>
      <span className='sub font-gray ml-4'>{data.member.nickname}</span>
      <SpaceEnd>
        <ViewCounter view={data.view} like={data.likeNum} />
      </SpaceEnd>
      <CommentCard
        src={data.member.image.imgUrl}
        alt={`${data.member.nickname}의 반려식물`}
        name={data.member.nickname}
        createdAt={data.createdAt}
        content={data.comment[0].content}
      />
    </>
  ) : (
    <>loading...</>
  );
};

export default BambooDetail;
