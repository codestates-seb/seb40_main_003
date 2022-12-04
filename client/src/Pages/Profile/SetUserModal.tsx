import React from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { SigButton } from "../../Components/GlobalComponents";
import { ColumnWrapper } from "../../Components/Wrapper";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { compressImage } from "../../utils/imageCompress";

type FormData = {
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
      )
    }

    axiosPrivate
      .patch(`/profile/${url}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        closeModal && closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <ColumnWrapper
      as={"form"}
      onSubmit={handleSubmit(onValid, onInValid)}
    >
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

      {/* 주소 */}
      <label className="bold h4 mb-4 mt-16">주소</label>
      <input
        {...register("memberInformation.address", {
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
        placeholder="주소를 입력해주세요."
      />
      <p className="font-alert-red">
        {errors.memberInformation?.address?.message}
      </p>

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
