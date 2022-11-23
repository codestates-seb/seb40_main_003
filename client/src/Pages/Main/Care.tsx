import CareCard from "../../Components/main/CareCard";
import { caringTypes } from "../../types/caringTypes";
import { Link } from "react-router-dom";
import {
  MainContentContainer,
  MainCenterWrapper,
  MainRightWrapper,
} from "../../Components/Wrapper";
import usePageTitle from "../../Hooks/usePageTitle";
import useFetch from "../../Hooks/useFetch";


const Care = () => {
  usePageTitle("돌봄");
  const data = useFetch<caringTypes>("/experts?page=1&size=5")
  console.log(data);

  return data !== undefined ? (
    <MainContentContainer>
      <MainCenterWrapper>
        {data.data.map((e) => {
          return (
            <Link key={e.expertId} to={`/experts/${e.expertId}`}>
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