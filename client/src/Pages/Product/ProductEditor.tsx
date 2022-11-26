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
import { Link, useNavigate, useLocation } from "react-router-dom";
import { userState } from "../../Recoil/atoms/user";
import { useRecoilState } from "recoil";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import {ProductCategoryConst } from "../../Const/Category";

const ConfirmWrapper = styled.span`
  display: flex;
  justify-content: row;
`;

type Props = {};

interface ProductEditorForm {
  title: string;
  image: File;
  category: number;
  content: string;
  price: number;
  errors?: string;
}

const ProductEditor = (props: Props) => {
  const axiosPrivate = useAxiosPrivate()
  // const [user, setUser] = useRecoilState(userState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductEditorForm>({
    mode: "onChange",
  });
  


  const onInValid = (errors: FieldErrors) => {};
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onValid = async (data: ProductEditorForm) => {
    console.log(data);

    const formData = new FormData();
    const postDto = JSON.stringify({ 
      title: data.title,
      image: data.image,
      category: data.category,
      price: data.price,
      content: data.content});

      formData.append("image", data.image);
      formData.append("postDto", new Blob([postDto],{type:"application/json"}));
  
      axiosPrivate
        .post("/deal", {
          headers:{
            "Content-Type":"multipart/form-data"
          }
        })
        .then((res) => {
        navigate(`/deal/${res.data.dealId}`);
        navigate(from, {replace: true});
      }).catch ((err)=>{});
    }

usePageTitle("거래 글 쓰기");

return (
    <MainContentContainer as={"form"} onSubmit={handleSubmit(onValid, onInValid)}>
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
                    message: "제목",
                    value: 30,
                  },
                })}
                type="Text"
                placeholder="제목"
              />
              <p className="font-alert-red sub">{errors.title?.message}</p>
            </>
          </SectionWrapper>

          <SectionWrapper>
            <>
              <input
                className="image"
                {...register("image")}
                id="image"
                type="file" multiple
              />
              <label htmlFor="image" className="cursor"> </label>
              <p className="font-alert-red sub">{errors.image?.message}</p>
            </>
          </SectionWrapper>
          <SectionWrapper>
            <>
            <select {...register("category", { required: true })}>
              {ProductCategoryConst.map((e)=>{return(
                <option key={e.number} value={e.number}>{e.name}</option>
              )})
              }
            </select>
            </>
          </SectionWrapper>

          <SectionWrapper width={100} borderNone={true}>
            <>
              <input
                className="price"
                {...register("price", {
                  required: true,
                })}
                type="price"
                placeholder="가격"
              />
              <p className="font-alert-red sub">{errors.price?.message}</p>
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
            <input type="checkbox" className="border-none checkbox-20"></input>
            <p className="sub font-gray">
              식물처럼 싱그럽고 예쁜 말을 써주세요.
              <br />
              욕설이나 선동성 글과 같은 부적절한 내용은 삭제 처리될 수 있습니다.
            </p>
          </ConfirmWrapper>
      </MainCenterWrapper>
      <MainRightWrapper>
        <SectionWrapper borderNone={true}>
          <p className="h5 bold font-main mr-16">
            반려식물을 분양하고 원예 용품을 판매해보세요.🌿
          </p>
        </SectionWrapper>
          <SigButton type="submit" className="disable">
            작성 완료
          </SigButton>
      </MainRightWrapper>
    </MainContentContainer>
  );
};

export default ProductEditor;
