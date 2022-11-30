import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { TopCarousel } from "../../Components/Carousel";
import {
  ProfileCard,
  SigButton,
  ViewCounter,
} from "../../Components/GlobalComponents";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
} from "../../Components/Wrapper";
import { userState } from "../../Recoil/atoms/user";
import { ProductDetailDataType, ProductDetailType } from "../../types/productTypes";
import { LoadingSpinner } from "../../Components/Loading";
import usePageTitle from "../../Hooks/usePageTitle";
import useFetch from "../../Hooks/useFetch";
import { getDateAgo } from "../../utils/controller";
import styled from "@emotion/styled";
import { editDataAtom, producteditDataAtom } from "../../Recoil/atoms/editData";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { confirmRemove } from "../../Const/message";
import { NoticeboardWrapper } from "../../Components/community/CommunityCard";

const CarouselImage= styled.img`
  width: 100%;
  max-height: 45vh;
  overflow: hidden;
  object-fit: cover;
  background-color: var(--bg-gray);
`


const ProductBookmarksDetail = () => {
  const { id } = useParams();
  const user = useRecoilValue(userState);
  const data = useFetch<ProductDetailDataType>(id?`/deal/${id}`:"");
  const [producteditData, setProducteditData] = useRecoilState(producteditDataAtom);
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  
  return data !== undefined ? (
    // 메인 컨테이너 (반응형 제공!)
    <MainContentContainer>
      <MainCenterWrapper>
      {/* 실제 메인이 되는 내용! */}
        <TopCarousel>
          {data.images.map((e, i) => {
            return (

                <CarouselImage src={e} alt={`${data.title}의 ${i}번째사진`} />

            );
          })}
        </TopCarousel>

        {/* <Link to={isLogin ? `/profile/${data.member.memberId}` : ""}>
          <ProfileCard
            src={data.member.image.imgUrl}
            alt={`${data.member.nickname}의 대표사진`}
            name={data.member.nickname}
            area={data.area}
            circle={true}
          />
        </Link> */}
        <NoticeboardWrapper>
        <h1 className="h4 bold mt-16">{data.title}</h1>
        {/* 게시글 수정, 삭제 버튼 */}
        {String(data.member.memberId) === String(user?.memberId)&&(
          <div>
            {/* 수정버튼 */}
            <button className="sub mr-16 mt-16" onClick={()=>{
              setProducteditData(data)
              navigate("/")
            }}>수정</button>
            {/* 삭제버튼 */}
            <button className="sub" onClick={() => {
              if (window.confirm(confirmRemove("게시물을"))) {
                axiosPrivate.delete(
                  `/deal/${data.dealId}`
                ).then((res) => {
                  console.log(res);
                  window.alert("삭제가 완료되었습니다.")
                  navigate("/deal")
                });
              }
            }}>삭제</button>
          </div>
        )}
        </NoticeboardWrapper>
        <span className="sub font-gray mb-8">{getDateAgo(data.createdAt)}</span>
        <ViewCounter like={data.likeNum} view={data.view} />
        <p className="mt-16">{data.content}</p>
      </MainCenterWrapper>

      <MainRightWrapper>
        <span className="h4 bold">{data.price.toLocaleString()}원</span>
        <Link to={"/talk"}>
          <SigButton>채팅하기</SigButton>
        </Link>
      </MainRightWrapper>
    </MainContentContainer>

  ) : (
    <LoadingSpinner/>
  );
};

export default ProductBookmarksDetail;
