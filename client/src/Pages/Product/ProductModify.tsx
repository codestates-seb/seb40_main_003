import styled from "@emotion/styled";
import { FieldErrors, useForm } from "react-hook-form";
import { SigButton } from "../../Components/GlobalComponents";
import {
  MainContentContainer,
  MainCenterWrapper,
  MainRightWrapper,
  SectionWrapper,
} from "../../Components/Wrapper";
import usePageTitle from "../../Hooks/usePageTitle";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { ProductCategoryList } from "../../Const/Category";
import { useRecoilState, useRecoilValue } from "recoil";
import { productEditDataAtom } from "../../Recoil/atoms/editData";


const ConfirmWrapper = styled.span`
  display: flex;
  justify-content: row;
`;

interface ProductEditorForm {
  title: string;
  image: FileList;
  category: number;
  gudong: number;
  price: number;
  content: string;
  checked: boolean;
  area: number;
  errors?: string;
}

const ProductModify = () => {
  const axiosPrivate = useAxiosPrivate();
  const productEditData = useRecoilValue(productEditDataAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductEditorForm>({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const onValid = async (data: ProductEditorForm) => {
    const formData = new FormData();
    const dealPatchDto = JSON.stringify({
      title: data.title,
      content: data.content,
      price: data.price,
      category: data.category,
      area: data.area,
    });
    formData.append("images", data.image[0]);
    formData.append(
      "dealPatchDto",
      new Blob([dealPatchDto], { type: "application/json" })
    );

    axiosPrivate
      .patch(`/deal/${productEditData?.dealId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        navigate(`/product/${productEditData?.dealId}`);
      })
      .catch((err) => {});
  };

  usePageTitle("거래 글 수정");

  return (
    <MainContentContainer
      as={"form"}
      onSubmit={handleSubmit(onValid)}
    >
      <MainCenterWrapper>
        <SectionWrapper width={100} borderNone={true}>
          <>
            <input
              defaultValue={productEditData?.title}
              className="title"
              {...register("title", {
                required: true,
                minLength: {
                  message: "제목은 2글자 이상으로 작성해주세요.",
                  value: 2,
                },
                maxLength: {
                  message: "제목은 30글자 미만으로 작성해주세요",
                  value: 30,
                },
              })}
              type="Text"
              placeholder="제목"
            />
            <p className="font-alert-red sub">{errors.title?.message}</p>
          </>
        </SectionWrapper>

        <SectionWrapper width={100} borderNone={false}>
          <>
            <input
              className="image cursor"
              {...register("image", {
                required: true})       
              }
              id="image"
              type="file"
              accept="image/*"
              name="image"
              multiple
            />
            <p className="font-alert-red sub">{errors.image?.message}</p>
          </>
        </SectionWrapper>
        <SectionWrapper width={100} borderNone={false}>
          <>
            <select
              {...register("category", { required: true })}
              name="category"
            >
              {ProductCategoryList.map((e) => {
                return (
                  <option key={`option ${e.number}`} value={e.number}>
                    {e.name}
                  </option>
                );
              })}
            </select>
          </>
        </SectionWrapper>

        <SectionWrapper width={100} borderNone={true}>
          <>
            <input
            defaultValue={productEditData?.price}
              className="price"
              {...register("price", {
                required: true,
                pattern: /^[0-9.]{1,9}$/g,
              })}
              type="text"
              placeholder="가격"
            />
            {errors.price && errors.price.type === "pattern" && (
              <span className="font-alert-red sub mt-4">
                숫자만 입력해주세요
              </span>
            )}
          </>
        </SectionWrapper>
        <SectionWrapper width={100} borderNone={true}>
          <>
            <textarea
            defaultValue={productEditData?.content}
              className="content"
              {...register("content", {
                required: true,
              })}
              placeholder="글쓰기"
            />
            <p className="font-alert-red sub">{errors.content?.message}</p>
          </>
        </SectionWrapper>

        <ConfirmWrapper>
          <input
            {...register("checked", { required: true })}
            type="checkbox"
            className="border-none checkbox-20"
          ></input>
          <p className="sub font-gray">
            식물처럼 싱그럽고 예쁜 말을 써주세요.
            <br />
            욕설이나 선동성 글과 같은 부적절한 내용은 삭제 처리될 수 있습니다.
          </p>
        </ConfirmWrapper>
      </MainCenterWrapper>
      <MainRightWrapper center={true}>
        <SigButton type="submit" value={"ProductEditor"}>
          작성 완료
        </SigButton>
      </MainRightWrapper>
    </MainContentContainer>
  );
};

export default ProductModify;