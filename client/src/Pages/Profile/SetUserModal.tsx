import axios from "../../Hooks/api";
import React, { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { Select, SigButton } from "../../Components/GlobalComponents";
import { ColumnWrapper } from "../../Components/Wrapper";
import { areaArray } from "../../Const/Address";
import { categoryNumberToString } from "../../Const/Category";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { compressImage } from "../../utils/imageCompress";

type FormData = {
  areaTags: any;

  image: FileList;
  nickname: string;
  memberProfile: {
    content: string;
  };
  memberInformation: {
    address: string;
  };
  url?: string | undefined;
};
type setUserModal = {
  closeModal?: Function;
  url?: string | undefined;
};

const SetUserModal: React.FC<setUserModal> = ({ closeModal, url }) => {
  const axiosPrivate = useAxiosPrivate();
  const [gugun, setGugun] = useState<[] | [{ dong: string }]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onValid = async (data: FormData) => {
    const formData = new FormData();
    const memberPatchDto = JSON.stringify({
      nickname: data.nickname,
      memberProfile: {
        content: data.memberProfile.content,
      },
      memberInformation: {
        address: data.memberInformation.address,
      },
    });
    formData.append(
      "memberPatchDto",
      new Blob([memberPatchDto], { type: "application/json" })
    );

    if (data.image !== undefined) {
      await compressImage(data.image[0], 100).then((res: any) =>
        formData.append("multipartFile", res)
      );
    }

    axiosPrivate
      .patch(`/profile/${url}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        closeModal && closeModal();
      })
      .catch((err) => {
      });
  };

  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <ColumnWrapper as={"form"} onSubmit={handleSubmit(onValid, onInValid)}>
      {/* 닉네임 */}
      <label className="bold h4 mb-4">닉네임</label>
      <input
        {...register("nickname", {
          required: true,
          minLength: {
            message: "2글자 이상으로 작성해주세요.",
            value: 2,
          },
          maxLength: {
            message: "10글자 미만으로 작성해주세요",
            value: 10,
          },
        })}
        type="text"
        placeholder="닉네임을 수정해주세요."
      />
      <p className="font-alert-red">{errors.nickname?.message}</p>

      {/* 자기소개 */}
      <label className="bold h4 mb-4 mt-16">자기소개</label>
      <textarea
        {...register("memberProfile.content", {
          required: true,
          minLength: {
            message: "2글자 이상으로 작성해주세요.",
            value: 2,
          },
          maxLength: {
            message: "20글자 미만으로 작성해주세요",
            value: 20,
          },
        })}
        placeholder="자기소개를 입력해주세요."
      />
      <p className="font-alert-red">{errors.memberProfile?.content?.message}</p>


      <label className="bold h4 mb-4 mt-16">사는 곳 (구)</label>
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

      <label className="bold h4 mb-4 mt-16">사는 곳 (동)</label>
      <Select
        className="address"
        {...register("memberInformation.address", {
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

      {/* 사진 */}
      <label className="bold h4 mt-16 mb-4">사진</label>
      <input {...register("image")} type="file" accept="image/*" name="image" />
      <p className="font-alert-red">{errors.image?.message}</p>
      <SigButton type="submit" className="mt-16">
        프로필 수정
      </SigButton>
    </ColumnWrapper>
  );
};

export default SetUserModal;
