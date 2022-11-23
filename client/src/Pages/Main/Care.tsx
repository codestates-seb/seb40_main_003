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
import useFetch from "../../Hooks/useFetch";


const Care = () => {
  const data = useFetch<caringTypes>("/experts", {keyword:null,page:1,size:5})
  usePageTitle("돌봄");
  console.log(data);

  return data !== undefined ? (
    <MainContentContainer>
      <MainCenterWrapper>
        {data.data.map((e) => {
          return (
            <Link key={e.expertProfileId} to={`/experts/${e.expertProfileId}`}>
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
