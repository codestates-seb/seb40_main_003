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
      await compressImage(data.image[0], 100).then((res) => {
        res && formData.append("multipartFile", res);
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
      });
  };

  usePageTitle("????????? ???????????? ??????");

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
              alt="????????? ????????????"
            />
          ) : (
            <img
              src={defaultProfile}
              alt="???????????????"
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
            ????????? ?????? ??????
          </label>
          <p className="font-alert-red sub">{errors.image?.message}</p>
        </RowWrapper>
        {errors.image && errors.image.type === "required" && (
          <Errormsg>????????? ????????? ??????????????????.</Errormsg>
        )}
        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-10 mt-16 bold font-main">??????</span>
            <input
              className="name"
              {...register("name", {
                required: true,
                minLength: {
                  message: "????????? 2?????? ???????????? ??????????????????.",
                  value: 2,
                },
                maxLength: {
                  message: "????????? 12?????? ????????? ??????????????????",
                  value: 12,
                },
              })}
              type="Text"
            />
            <p className="font-alert-red sub mt-4">{errors.name?.message}</p>
            {errors.name && errors.name.type === "required" && (
              <Errormsg>????????? ??????????????????.</Errormsg>
            )}
          </>
        </SectionWrapper>

        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-10 bold font-main">??????</span>
            <input
              className="age"
              {...register("age", {
                required: true,
                maxLength: {
                  message: "????????? 3?????? ????????? ??????????????????",
                  value: 2,
                },
              })}
              type="string"
            />
            <p className="font-alert-red sub mt-4">{errors.age?.message}</p>
            {errors.age && errors.age.type === "required" && (
              <Errormsg>????????? ??????????????????.</Errormsg>
            )}
          </>
        </SectionWrapper>

        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-10 bold font-main">?????? ??? (???)</span>
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
                ??????????????????.
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
              <Errormsg>?????? ??? (???)??? ??????????????????.</Errormsg>
            )}
          </>
        </SectionWrapper>
        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-10 bold font-main">?????? ??? (???)</span>
            <Select
              className="address"
              {...register("address", {
                required: true,
              })}
            >
              <option value="" hidden>
                ??????????????????.
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
              <Errormsg>?????? ??? (???)??? ??????????????????.</Errormsg>
            )}
          </>
        </SectionWrapper>
        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-10 bold font-main">??????</span>
            <Select
              className="gender"
              {...register("gender", { required: true })}
            >
              <option value="" hidden>
                ??????????????????
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
              <Errormsg>????????? ??????????????????.</Errormsg>
            )}
          </>
        </SectionWrapper>

        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-10 bold font-main">?????? ??????</span>
            <textarea
              className="price"
              {...register("price", {
                required: true,
              })}
              placeholder="?????? ????????? ??????????????????. ???) 30??? 9,000??? / 1?????? 15,000???"
            />
            {errors.price && errors.price.type === "required" && (
              <Errormsg>?????? ????????? ??????????????????.</Errormsg>
            )}
          </>
        </SectionWrapper>

        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-10 bold font-main">?????? ??????</span>
            <textarea
              className="extra"
              {...register("extra", {
                required: true,
              })}
              placeholder="???????????? ?????? ?????? ?????? ??? ?????? ????????? ??????????????????. ???) ?????? ???????????? ??????"
            />
            {errors.extra && errors.extra.type === "required" && (
              <Errormsg>?????? ????????? ??????????????????.</Errormsg>
            )}
          </>
        </SectionWrapper>

        <ColumnWrapper>
          <SectionWrapper>
            <span className="mb-10 bold font-main">?????? ?????? (?????? ??????)</span>
            <FlexWrapper>
              {CareCategoryList.map((e) => {
                return (
                  <RowWrapper
                    key={`${e.number}tachtag`}
                    className="align-center"
                  >
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
            <span className="mb-10 bold font-main"> ??? ??? ?????? ??????</span>
            <textarea
              className="simpleContent"
              minLength={10}
              maxLength={30}
              {...register("simpleContent", {
                required: true,
              })}
              placeholder="30??? ????????? ????????? ??????????????????."
            />
            <p className="font-alert-red sub">
              {errors.simpleContent?.message}
            </p>
            {errors.simpleContent &&
              errors.simpleContent.type === "required" && (
                <Errormsg>?????? ????????? ??????????????????.</Errormsg>
              )}
          </>
        </SectionWrapper>

        <SectionWrapper width={100} borderNone={true}>
          <>
            <span className="mb-10 bold font-main">????????? ?????? ??????</span>
            <Textarea
              className="detailContent"
              minLength={10}
              maxLength={500}
              {...register("detailContent", {
                required: true,
              })}
              placeholder="500??? ????????? ??????????????? ????????? ????????? ???????????????."
            />
            <p className="font-alert-red sub">
              {errors.detailContent?.message}
            </p>
            {errors.detailContent &&
              errors.detailContent.type === "required" && (
                <Errormsg>????????? ?????? ????????? ??????????????????.</Errormsg>
              )}
          </>
        </SectionWrapper>
      </MainCenterWrapper>
      <MainRightWrapper>
        <SigButton type="submit" value={"ProductEditor"}>
          ????????????
        </SigButton>
      </MainRightWrapper>
    </MainContentContainer>
  );
};

const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export default ExpertProfileTransfer;
