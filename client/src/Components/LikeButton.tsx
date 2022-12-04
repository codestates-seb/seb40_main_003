import styled from "@emotion/styled";
import emptyHeartIcon from "../images/like/emptyHeartIcon.png"

export const LikeButton = styled.img`
  width: 36px;
  height: 36px;
  resize: none;
`;

const LikeButtonClick = ({onClick}:any) => {

  return (
    <LikeButton 
    src={emptyHeartIcon} onClick={onClick}
    />
  )
}
  export default LikeButtonClick;