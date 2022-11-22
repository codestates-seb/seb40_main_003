import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ProfileCard, ProfilePlantCard, SigButton } from '../../Components/GlobalComponents';
import PlantCardCarousel from '../../Components/profile/plantCardCarousel';
import { MainCenterWrapper, MainContentContainer, MainRightWrapper, SectionWrapper } from '../../Components/Wrapper';
import useFetch from '../../Hooks/useFetch';
import usePageTitle from '../../Hooks/usePageTitle';
import { userState } from '../../Recoil/atoms/user';
import { profileTypes } from '../../types/profile';




const Profile = () => {
  const { id } = useParams();
  const isLogin = useRecoilValue(userState);
  const data= useFetch<profileTypes>(`/profile/${id}`)
  usePageTitle("프로필")

  return data!==undefined ? (
    <MainContentContainer>
      <MainCenterWrapper>
          <ProfileCard
          src={data.photo}
          alt={`${data.nickname}의 대표사진`}
          name={data.nickname}
          location={data.address}
          circle={true}
          size={"66"}
          />
          <SectionWrapper title='반려 식물'>
            <PlantCardCarousel>
              {data.plant.map((e) => {
                return (
                  <ProfilePlantCard
                  src={e.plantPhoto}
                  alt={`${data.nickname}의 반려식물`}
                  name={e.plantName}
                  type={e.plantType}
                  age={e.plantAge}
                  />
                )
              })}
            </PlantCardCarousel>
          </SectionWrapper>
      </MainCenterWrapper>
      <MainRightWrapper>
          <Link to={"/setting"}>
            <SigButton>설정</SigButton>
          </Link>
        </MainRightWrapper>
    </MainContentContainer>
  ) : (
    <>Loading...</>
  );
};

export default Profile



