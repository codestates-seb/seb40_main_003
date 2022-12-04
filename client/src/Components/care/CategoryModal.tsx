import styled from "@emotion/styled";
import { CareCategoryList } from "../../Const/Category";
import { ColumnWrapper } from "../Wrapper";

type Props = {
  onClickFunction: Function;
  closeModal: Function;
};

const CategoryModal = ({ onClickFunction, closeModal }: Props) => {
  return (
    <>
      <h2 className="bold h4 mb-16">카테고리</h2>
      <GridColumn>
        {CareCategoryList.map((e) => {
          return (
            <ColumnWrapper
              key={e.number}
              center={true}
              onClick={() => {
                onClickFunction(e.name!=="모두보기"?e.name:undefined);
                closeModal();
              }}
              className={"cursor"}
            >
              <img src={e.img} alt={`${e.name} 아이콘`} />
              <div>{e.name}</div>
            </ColumnWrapper>
          );
        })}
      </GridColumn>
    </>
  );
};
const GridColumn = styled.section`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
`;

export default CategoryModal;
