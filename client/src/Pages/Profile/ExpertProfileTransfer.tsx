import { FieldErrors, useForm } from "react-hook-form";
import { Select, SigButton, Textarea } from "../../Components/GlobalComponents";
import {
  MainContentContainer,
  MainCenterWrapper,
  MainRightWrapper,
  SectionWrapper,
  RowWrapper,
  SpaceBetween,
  FlexWrapper,
} from "../../Components/Wrapper";
import usePageTitle from "../../Hooks/usePageTitle";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { CareCategoryList, categoryNumberToString } from "../../Const/Category";
import { areaArray } from "../../Const/Address";
import { genderArray } from "../../Const/gender";
import { useEffect, useState } from "react";
import axios from "../../Hooks/api";

interface ExpertProfileTransferForm {
  name: string;
  age: string;
  gender: string;
  simpleContent: string;
  detailContent: string;
  price: string;
  extra: string;
  address: string;
  techTagName: string;
  image: FileList;
  category: number;
  content: string;
  checked: boolean;
  area: number;
  errors?: string;
}

const ExpertProfileTransfer = () => {
  const axiosPrivate = useAxiosPrivate();
  const [gugun, setGugun] = useState<[] | [{ dong: string }]>([]);
  const [avatarPreview, setAvatarPreview] = useState("");

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpertProfileTransferForm>({
    mode: "onChange",
  });

  const avatar = watch("image");
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  const onInValid = (errors: FieldErrors) => {};
  const navigate = useNavigate();

  const onValid = async (data: ExpertProfileTransferForm) => {
    const formData = new FormData();
    // const dealPostDto = JSON.stringify({
    //   title: data.title,
    //   content: data.content,
    //   price: data.price,
    //   category: data.category,
    //   area: data.area,
    // });
    // for(let i = 0; i<data.image.length; i++){
    //   formData.append("images", data.image[i]);
    // }

    // formData.append(
    //   "dealPostDto",
    //   new Blob([dealPostDto], { type: "application/json" })
    // );

    // axiosPrivate
    //   .post("/deal", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((res) => {
    //     navigate(`/product/${res.data.dealId}`);
    //   })
    //   .catch((err) => {});
  };

  usePageTitle("전문가 계정으로 전환");
  console.log(gugun);

  return (
    <MainContentContainer
      as={"form"}
      onSubmit={handleSubmit(onValid, onInValid)}
    >
      <MainCenterWrapper>
        <FlexWrapper>
          <></>
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="profile-img"
              alt="이미지 미리보기"
            />
          ) : (
            <div className="profile-img" />
          )}
          <input
            className="image cursor"
            {...register("image", { required: true })}
            id="input-file"
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            name="image"
          />

          <p className="font-alert-red sub">{errors.image?.message}</p>

          <label className="input-file-button" htmlFor="input-file">
            프로필 사진 선택
          </label>
        </FlexWrapper>

        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-4 mt-4">이름</span>
            <input
              className="name"
              {...register("name", {
                required: true,
                minLength: {
                  message: "이름을 2글자 이상으로 작성해주세요.",
                  value: 2,
                },
                maxLength: {
                  message: "이름을 5글자 이하로 작성해주세요",
                  value: 5,
                },
              })}
              type="Text"
            />
            <p className="font-alert-red sub mt-4">{errors.name?.message}</p>
          </>
        </SectionWrapper>

        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-4">나이</span>
            <input
              className="age"
              {...register("age", {
                required: true,
                maxLength: {
                  message: "나이는 3자리 이하로 작성해주세요",
                  value: 2,
                },
              })}
              type="string"
            />
            <p className="font-alert-red sub mt-4">{errors.age?.message}</p>
          </>
        </SectionWrapper>

        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-4">사는 곳 (구)</span>
            <Select
              className="address"
              {...register("address", {
                required: true,
                onChange: (e) => {
                  const parsedArea = categoryNumberToString({
                    number: Number(e.target.value),
                    arr: areaArray,
                  });
                  axios
                    .get("/address", { params: { gugun: parsedArea } })
                    .then((res) => {
                      setGugun(res.data.dongs);
                    });
                },
              })}
            >
              {areaArray.map((e) => {
                return (
                  <option key={`${e.number}address`} value={e.number}>
                    {e.name}
                  </option>
                );
              })}
            </Select>
          </>
        </SectionWrapper>
        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-4">사는 곳 (동)</span>
            <Select>
              {gugun.map((e, i) => {
                return (
                  <option key={`dong${i}`} value={e.dong}>
                    {e.dong}
                  </option>
                );
              })}
            </Select>
          </>
        </SectionWrapper>
        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-4">성별</span>
            <Select
              className="gender"
              {...register("gender", { required: true })}
            >
              {genderArray.map((e) => {
                return (
                  <option key={`${e.number}gender`} value={e.number}>
                    {e.gender}
                  </option>
                );
              })}
            </Select>
          </>
        </SectionWrapper>

        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-4">돌봄 비용</span>
            <textarea
              className="price"
              {...register("price", {
                required: true,
              })}
              placeholder="자신의 제공하는 돌봄 비용을 자유롭게 작성해주세요."
            />
          </>
        </SectionWrapper>

        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-4">추가 사항</span>
            <textarea
              className="extra"
              {...register("extra", {
                required: true,
              })}
              placeholder="서비스별 추가 비용 발생 시 관련 정보를 작성해주세요."
            />
          </>
        </SectionWrapper>

        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-4">보유 기술</span>
            {CareCategoryList.map((e) => {
              return (
                <RowWrapper key={`${e.number}tachtag`}>
                  <input
                    type="checkbox"
                    value={e.number}
                    className="techTagName"
                    {...register("techTagName")}
                  />
                  {e.name}
                </RowWrapper>
              );
            })}
          </>
        </SectionWrapper>

        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-4">자기 소개</span>
            <Textarea
              className="simpleContent"
              minLength={10}
              maxLength={1000}
              {...register("simpleContent", {
                required: true,
              })}
              placeholder="본인을 소개해주세요."
            />
            <p className="font-alert-red sub">
              {errors.simpleContent?.message}
            </p>
          </>
        </SectionWrapper>

        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-4">상세한 자기 소개</span>
            <Textarea
              className="detailContent"
              minLength={10}
              maxLength={1000}
              {...register("detailContent", {
                required: true,
              })}
              placeholder="전문가로서 본인의 능력을 알려주세요."
            />
            <p className="font-alert-red sub">
              {errors.detailContent?.message}
            </p>
          </>
        </SectionWrapper>
      </MainCenterWrapper>
      <MainRightWrapper center={true}>
        <SigButton type="submit" value={"ProductEditor"}>
          전환하기
        </SigButton>
      </MainRightWrapper>
    </MainContentContainer>
  );
};

export default ExpertProfileTransfer;
