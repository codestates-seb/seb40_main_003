import styled from "@emotion/styled";
import Popup from "reactjs-popup";
import { getDateFrom } from "../../utils/controller";
import { ImageWrapper } from "../GlobalComponents";
import { ColumnWrapper, SpaceBetween, SpaceEnd } from "../Wrapper";
import seeMoreIcon from "../../images/seeMoreIcon.svg";
import { useDelete } from "../../Hooks/useDelete";
import { useIsAuthor } from "../../Hooks/useAuth";
import { useParams } from "react-router-dom";

type Props = {
  children: JSX.Element[] | JSX.Element;
};
const CarouselWrapper = styled.div`
  /* height: 90px; */
  padding: 8px 0;
  width: 90vw;
  max-width: 680px;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
`;

function PlantCardCarousel({ children }: Props) {
  return <CarouselWrapper>{children}</CarouselWrapper>;
}
export default PlantCardCarousel;

// 프로필 반려식물
export const ProfilePlantCardWrapper = styled.div`
  min-width: 200px;
  max-width: 250px;
  padding: 8px;
  margin-right: 8px;
  border: 1px solid var(--line-light-gray);
  display: flex;
  align-items: center;
  border-radius: var(--sig-border-8);
`;
type ProfilePlantCardTypes = {
  size?: string;
  src: string;
  alt: string;
  name: string;
  type: string | number;
  age: string;
  plandId: number;
};
export const ProfilePlantCard = (props: ProfilePlantCardTypes) => {
  // 비구조화할당
  const { id } = useParams();
  const { size, src, alt, name, type, age, plandId } = props;
  const deleteItem = useDelete(`/plants/${plandId}`);
  const isAuthor = useIsAuthor();
  return (
    <ProfilePlantCardWrapper>
      <ImageWrapper
        src={src}
        alt={alt}
        size={size === "sm" ? "36" : "66"}
        className="mr-16"
        loading="lazy"
      ></ImageWrapper>
      <ColumnWrapper width={100}>
        <SpaceBetween className="center">
          <span className="medium">{name}</span>
          <SpaceEnd>
            {/* 팝업 사용법 */}
            {isAuthor(id) && <EditAndDeleteButton deleteFunction={deleteItem} editFunction={()=>{}} />}
          </SpaceEnd>
        </SpaceBetween>
        <span className="sub font-gray">{type}</span>
        <SpaceEnd className="sub ">
          {getDateFrom(age).replace("후", "차")}
        </SpaceEnd>
      </ColumnWrapper>
    </ProfilePlantCardWrapper>
  );
};

type editAndDeleteButton = {
  deleteFunction: Function;
  editFunction: Function;
};
export const EditAndDeleteButton = ({
  deleteFunction,
  editFunction,
}: editAndDeleteButton) => {
  return (
    <Popup
      trigger={<img src={seeMoreIcon} alt="더보기버튼" className={"cursor"} />}
      position={"bottom center"}
    >
      <ColumnWrapper>
        <button className="font-gray pd-8" onClick={() => editFunction()}>
          수정
        </button>
        <button className="font-gray pd-8" onClick={() => deleteFunction()}>
          삭제
        </button>
      </ColumnWrapper>
    </Popup>
  );
};

export const AddProfilePlantCard = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background-color: var(--pure-white);
  border-radius: var(--sig-border-8);
  border: 1px solid var(--main);
  color: var(--main);
  cursor: pointer;
`;
