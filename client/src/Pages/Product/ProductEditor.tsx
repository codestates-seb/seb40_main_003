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
import { ProductCategoryConst } from "../../Const/Category";
import useFetch from "../../Hooks/useFetch";
import { ProductDetailDataType } from "../../types/productTypes";

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

const ProductEditor = () => {
  const axiosPrivate = useAxiosPrivate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductEditorForm>({
    mode: "onChange",
  });

  const onInValid = (errors: FieldErrors) => {};
  const navigate = useNavigate();

  const onValid = async (data: ProductEditorForm) => {
    const formData = new FormData();
    const dealPostDto = JSON.stringify({
      title: data.title,
      content: data.content,
      price: data.price,
      category: data.category,
      area: data.area,
    });
    formData.append("images", data.image[0]);
    formData.append(
      "dealPostDto",
      new Blob([dealPostDto], { type: "application/json" })
    );

    axiosPrivate
      .post("/deal", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        navigate(`/product/${res.data.dealId}`);
      })
      .catch((err) => {});
  };

  usePageTitle("거래 글 쓰기");

  return (
    <MainContentContainer
      as={"form"}
      onSubmit={handleSubmit(onValid, onInValid)}
    >

      <MainCenterWrapper>
        <SectionWrapper width={100} borderNone={true}>
          <>
            <input
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
              {...register("image", { required: true })}
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
              <option value="" hidden>카테고리 선택</option>
              {ProductCategoryConst.map((e) => {
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

export default ProductEditor;
