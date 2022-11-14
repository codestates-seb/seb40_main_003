import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useInRouterContext, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ProfileCard, SigTag, ViewCounter } from "../../Components/GlobalComponents";
import { userState } from "../../Recoil/atoms/atom";
import { CareDetailTypes } from "../../types/CareDetailTypes";

const CareDetail = () => {
const [isLoading, setIsLoading] = useState(true);
const [data, setData] = useState<CareDetailTypes | null>(null);
const { id } = useParams();
const isLogin = useRecoilValue(userState)

    useEffect(() => {
        try {
        axios.get(`/caring/${id}`).then((res) => {
            setData(res.data);
            setIsLoading(false);
        });
        } catch (err) {
        console.log(err);
        }
    }, []);

    return !isLoading && data !== null ? (
        <>
        <Link to={isLogin?`/caring/${data.member.memberId}`:""}>
            <ProfileCard
            src={data.member.image.imgUrl}
            alt={`${data.expertReview[0].writer.nickname}의 대표사진`}
            name={data.expertReview[0].writer.nickname}
            location={data.address}
            />
            <SigTag className="active">{data.view}번 고용됨</SigTag>
        </Link>
        <h1 className="h4 bold">{data.member.name}</h1>
        <ViewCounter like={data.userLikeExpert} view={data.view} />
            <p>{data.simpleContent}</p>
            <p>{data.detailContent}</p>
        </>
    ) : (
        <>loading...</>
    );
};

export default CareDetail;
