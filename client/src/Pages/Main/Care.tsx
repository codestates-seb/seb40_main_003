import CareCard from "../../Components/main/CareCard";
import { caringTypes } from "../../types/caringTypes";
import { Link } from "react-router-dom";
import {
  MainContentContainer,
  MainCenterWrapper,
  MainRightWrapper,
} from "../../Components/Wrapper";
import { SigButton } from "../../Components/GlobalComponents";
import usePageTitle from "../../Hooks/usePageTitle";
import useFetch from "../../Hooks/basicFetching";


const Care = () => {
  usePageTitle("돌봄");
  const data=useFetch<caringTypes>("/caring")
  console.log(data)

  return data !== undefined ? (
    <MainContentContainer>
      <MainCenterWrapper>
        {data.data.map((e) => {
          return (
            <Link key={e.expertProfileId} to={`/caring/${e.expertProfileId}`}>
              <CareCard data={e} />
            </Link>
          );
        })}
      </MainCenterWrapper>
      <MainRightWrapper>
      
      </MainRightWrapper>
    </MainContentContainer>
  ) :<></>
};

export default Care;
