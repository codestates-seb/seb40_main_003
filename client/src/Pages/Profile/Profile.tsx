import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { FetchByBody } from '../../Hooks/useFetch';
import usePageTitle from '../../Hooks/usePageTitle';
import { userState } from '../../Recoil/atoms/user';
import { profileTypes } from '../../types/profile';
import { MainCenterWrapper, MainContentContainer, MainRightWrapper } from '../../Components/Wrapper';
import { SigButton } from '../../Components/GlobalComponents';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();
  const isLogin = useRecoilValue(userState);
  const data= FetchByBody<profileTypes>(`/profile/${id}`)
  usePageTitle("프로필")
  console.log(data)
  return (
    <>
    <MainContentContainer>
      <MainCenterWrapper>

      </MainCenterWrapper>
      <MainRightWrapper>
          <Link to={"/setting"}>
            <SigButton>설정</SigButton>
          </Link>
        </MainRightWrapper>
    </MainContentContainer>
    </>
  )
};

export default Profile



