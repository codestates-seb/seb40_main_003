import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useInRouterContext, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ProfileCard, CardWrapper, SigTag, ViewCounter, TagWrapper } from "../../Components/GlobalComponents";
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
            console.log(res.data)
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
            // 태그 
            // <ViewCounter like={data.userLikeExpert} view={data.view} />

            />
        </Link>
            <p>{data.simpleContent}</p> 
        <CardWrapper><h1 className="h4 bold">반려식물</h1></CardWrapper>    
            {/* 반려식물 컴포넌트 */}
        <CardWrapper><h1 className="h4 bold">보유 기술</h1></CardWrapper>
        <TagWrapper>
        <SigTag>{data.techTag[0].techTagName}</SigTag>   
            <SigTag>{data.techTag[0].techTagName}</SigTag>   
            <SigTag>{data.techTag[0].techTagName}</SigTag>   
            <SigTag>{data.techTag[0].techTagName}</SigTag>   
            <SigTag>{data.techTag[0].techTagName}</SigTag>   
        </TagWrapper>
        <CardWrapper>
            <h1 className="h4 bold">소개합니다</h1>
            <p>{data.detailContent}</p>
        </CardWrapper>    
        <CardWrapper>
            <h1 className="h4 bold">기본 비용</h1>
            <p>{data.price}</p>
        </CardWrapper>    
        <CardWrapper>
            <h1 className="h4 bold">추가 비용</h1>
            <p>{data.extra}</p>
        </CardWrapper>
            </>
    ) : (
        <>loading...</>
    );
};

export default CareDetail;
