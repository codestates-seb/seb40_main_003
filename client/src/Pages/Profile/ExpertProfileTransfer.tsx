import { FieldErrors, useForm } from "react-hook-form";
import { Select, SigButton, Textarea } from "../../Components/GlobalComponents";
import {
  MainContentContainer,
  MainCenterWrapper,
  MainRightWrapper,
  SectionWrapper,
  RowWrapper,
  ColumnWrapper,
} from "../../Components/Wrapper";
import usePageTitle from "../../Hooks/usePageTitle";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { CareCategoryList, categoryNumberToString } from "../../Const/Category";
import { areaArray } from "../../Const/Address";
import { genderArray } from "../../Const/gender";
import { useEffect, useState } from "react";
import axios from "../../Hooks/api";
import { compressImage } from "../../utils/imageCompress";
import defaultProfile from "../../images/defaultProfileImage.png";
import { Errormsg } from "../User/Signup";
import styled from "@emotion/styled";

interface ExpertProfileTransferForm {
  image: FileList;
  name: string;
  age: number;
  gender: number;
  simpleContent: string;
  detailContent: string;
  price: string;
  address: string;
  extra: string;
  techTags: any;
  areaTags: any;
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
    const techTagname = (techTag: []) => {
      let arr = [];
      for (let i = 0; i < techTag.length; i++) {
        arr.push({ techTagName: techTag[i] });
      }
      return arr;
    };

    techTagname(data.techTags[0].techTagName);
    const expertProfileDto = JSON.stringify({
      name: data.name,
      age: data.age,
      gender: data.gender,
      simpleContent: data.simpleContent,
      detailContent: data.detailContent,
      price: data.price,
      address: data.address,
      extra: data.extra,
      techTags: techTagname(data.techTags[0].techTagName),
      areaTags: [
        {
          areaTagName: data.areaTags,
        },
      ],
    });
    formData.append(
      "expertProfileDto",
      new Blob([expertProfileDto], { type: "application/json" })
    );
    if (data.image !== undefined) {
      await compressImage(data.image[0]).then((res: any) => {
        formData.append("multipartFile", res);
      });
    }

    axiosPrivate
      .post("/experts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        navigate(`/`);
      })
  };

  usePageTitle("전문가 계정으로 전환");

  return (
    <MainContentContainer
      as={"form"}
      onSubmit={handleSubmit(onValid, onInValid)}
    >
      <MainCenterWrapper>
        <RowWrapper>
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="profile-img"
              alt="이미지 미리보기"
            />
          ) : (
            <img
              src={defaultProfile}
              alt="기본이미지"
              className="profile-img"
            />
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
          <label className="input-file-button" htmlFor="input-file">
            프로필 사진 선택
          </label>
          <p className="font-alert-red sub">{errors.image?.message}</p>
        </RowWrapper>
        {errors.image && errors.image.type === "required" && (
          <Errormsg>프로필 사진을 선택해주세요.</Errormsg>
        )}
        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-10 mt-16 bold font-main">이름</span>
            <input
              className="name"
              {...register("name", {
                required: true,
                minLength: {
                  message: "이름을 2글자 이상으로 작성해주세요.",
                  value: 2,
                },
                maxLength: {
                  message: "이름을 12글자 이하로 작성해주세요",
                  value: 12,
                },
              })}
              type="Text"
            />
            <p className="font-alert-red sub mt-4">{errors.name?.message}</p>
            {errors.name && errors.name.type === "required" && (
              <Errormsg>이름을 입력해주세요.</Errormsg>
            )}
          </>
        </SectionWrapper>

        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-10 bold font-main">나이</span>
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
            {errors.age && errors.age.type === "required" && (
              <Errormsg>나이를 입력해주세요.</Errormsg>
            )}
          </>
        </SectionWrapper>

        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-10 bold font-main">사는 곳 (구)</span>
            <Select
              className="areaTags"
              {...register("areaTags", {
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
              <option value="" hidden>
                선택해주세요.
              </option>
              {areaArray.map((e) => {
                return (
                  <option key={`${e.number}address`} value={e.number}>
                    {e.name}
                  </option>
                );
              })}
            </Select>
            {errors.areaTags && errors.areaTags.type === "required" && (
              <Errormsg>사는 곳 (구)을 입력해주세요.</Errormsg>
            )}
          </>
        </SectionWrapper>
        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-10 bold font-main">사는 곳 (동)</span>
            <Select
              className="address"
              {...register("address", {
                required: true,
              })}
            >
              <option value="" hidden>
                선택해주세요.
              </option>
              {gugun.map((e, i) => {
                return (
                  <option key={`dong${i}`} value={e.dong}>
                    {e.dong}
                  </option>
                );
              })}
            </Select>
            {errors.address && errors.address.type === "required" && (
              <Errormsg>사는 곳 (동)을 입력해주세요.</Errormsg>
            )}
          </>
        </SectionWrapper>
        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-10 bold font-main">성별</span>
            <Select
              className="gender"
              {...register("gender", { required: true })}
            >
              <option value="" hidden>
                선택해주세요
              </option>
              {genderArray.map((e) => {
                return (
                  <option key={`${e.number}gender`} value={e.number}>
                    {e.gender}
                  </option>
                );
              })}
            </Select>
            {errors.gender && errors.gender.type === "required" && (
              <Errormsg>성별을 입력해주세요.</Errormsg>
            )}
          </>
        </SectionWrapper>

        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-10 bold font-main">돌봄 비용</span>
            <textarea
              className="price"
              {...register("price", {
                required: true,
              })}
              placeholder="돌봄 비용을 책정해주세요. 예) 30분 9,000원 / 1시간 15,000원"
            />
            {errors.price && errors.price.type === "required" && (
              <Errormsg>돌봄 비용을 입력해주세요.</Errormsg>
            )}
          </>
        </SectionWrapper>

        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-10 bold font-main">추가 사항</span>
            <textarea
              className="extra"
              {...register("extra", {
                required: true,
              })}
              placeholder="서비스별 추가 비용 발생 시 관련 정보를 작성해주세요. 예) 해충 약제비용 별도"
            />
            {errors.extra && errors.extra.type === "required" && (
              <Errormsg>추가 사항을 입력해주세요.</Errormsg>
            )}
          </>
        </SectionWrapper>

        <ColumnWrapper>
        <SectionWrapper>
          
            <span className="mb-10 bold font-main">보유 기술 (중복 가능)</span>
          <FlexWrapper>
            {CareCategoryList.map((e) => {
              return (
                <RowWrapper key={`${e.number}tachtag`} className="align-center">
                  <input 
                    type="checkbox"
                    value={e.name}
                    className="techTagName checkbox-20 mb-16"
                    {...register("techTags.0.techTagName", {
                      required: true,
                    })}
                  />
                  <label className="ml-8 mb-16">{e.name}</label>
                </RowWrapper>
              );
            })}
          </FlexWrapper>
        </SectionWrapper>

        </ColumnWrapper>

        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-10 bold font-main"> 한 줄 자기 소개</span>
            <textarea
              className="simpleContent"
              minLength={10}
              maxLength={30}
              {...register("simpleContent", {
                required: true,
              })}
              placeholder="30자 이내로 본인을 소개해주세요."
            />
            <p className="font-alert-red sub">
              {errors.simpleContent?.message}
            </p>
            {errors.simpleContent &&
              errors.simpleContent.type === "required" && (
                <Errormsg>자기 소개를 입력해주세요.</Errormsg>
              )}
          </>
        </SectionWrapper>

        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-10 bold font-main">상세한 자기 소개</span>
            <Textarea
              className="detailContent"
              minLength={10}
              maxLength={500}
              {...register("detailContent", {
                required: true,
              })}
              placeholder="500자 이내로 전문가로서 본인의 능력을 알려주세요."
            />
            <p className="font-alert-red sub">
              {errors.detailContent?.message}
            </p>
            {errors.detailContent &&
              errors.detailContent.type === "required" && (
                <Errormsg>상세한 자기 소개를 입력해주세요.</Errormsg>
              )}
          </>
        </SectionWrapper>
      </MainCenterWrapper>
      <MainRightWrapper>
        <SigButton type="submit" value={"ProductEditor"}>
          전환하기
        </SigButton>
      </MainRightWrapper>
    </MainContentContainer>
  );
};

const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
` 

export default ExpertProfileTransfer;
