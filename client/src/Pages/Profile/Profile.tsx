import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ProfileCard, ProfilePlantCard } from '../../Components/GlobalComponents';
import PlantCardCarousel from '../../Components/profile/plantCardCarousel';
import { MainCenterWrapper, MainContentContainer, SectionWrapper } from '../../Components/Wrapper';
import useWindowSize from '../../Hooks/windowSize';
import { userState } from '../../Recoil/atoms/user';
import { profileTypes } from '../../types/profile';




const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<profileTypes | null>(null);
  const { id } = useParams();
  const isLogin = useRecoilValue(userState);
  const width = useWindowSize().width

  useEffect(() => {
    try {
      axios.get(`/profile/${id}`).then((res) => {
        setData(res.data);
        setIsLoading(false);
        console.log(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  return !isLoading && data !== null ? (
    <MainContentContainer>
      <MainCenterWrapper>
        <section>
          <ProfileCard
          src={data.photo}
          alt={`${data.nickname}의 대표사진`}
          name={data.nickname}
          location={data.address}
          circle={true}
          size={"66"}
          />
          <SectionWrapper title='반려 식물'>
            <PlantCardCarousel width={width}>
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
        </section>
      </MainCenterWrapper>
    </MainContentContainer>
  ) : (
    <>Loading...</>
  );
};

export default Profile



