import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProfileCard, ViewCounter } from "../../Components/GlobalComponents";
import { ProductDetailType } from "../../types/productTypes";

const ProductDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ProductDetailType | null>(null);
  const { id } = useParams();

  useEffect(() => {
    try {
      axios.get(`/shopping/${id}`).then((res) => {
        setData(res.data);
        setIsLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  },[]);

  return !isLoading && data !== null ? (
    <>
      <img src={data.image[0].imgUrl} alt={`${data.title}의 대표사진`} />
      <Link to={`/profile/${data.member.memberId}`}>
      <ProfileCard
        src={data.member.image.imgUrl}
        alt={`${data.member.nickname}의 대표사진`}
        name={data.member.nickname}
        location={data.areaTag[0].areaTagName}
      />
      </Link>
      <h1 className="h4 bold">{data.title}</h1>
      <ViewCounter like={data.memberLikeDeal} view={data.view}/>
      <p>{data.content}</p>
    </>
  ) : (
    <>loading...</>
  );
};

export default ProductDetail;
