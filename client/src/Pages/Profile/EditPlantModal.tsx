import React from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { SigButton } from "../../Components/GlobalComponents";
import { ColumnWrapper } from "../../Components/Wrapper";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

type FormData = {
  name: string;
  type: string;
  years: string;
  image: FileList;
  
};
type addplantModal = {
  closeModal?: Function;
  url?: number | undefined;
};
const EditPlantModal: React.FC<addplantModal> = ({ closeModal, url }) => {
  const axiosPrivate = useAxiosPrivate();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onValid = async (data: FormData) => {
    const formData = new FormData();
    const plantDto = JSON.stringify({
      name: data.name,
      years: String(data.years).replaceAll("-",""),
      type: data.type,
    });
    console.log(plantDto)
    formData.append("multipartFile", data.image[0]);
    formData.append(
      "plantDto", new Blob([plantDto], { type: "application/json" })
      );

    axiosPrivate
      .patch(`/plants/${url}`, formData, {
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
    <ColumnWrapper width={100} as={"form"} onSubmit={handleSubmit(onValid)}>
      {/* 이름 */}
      <label className="bold h4 mb-4">식물 이름</label>
      <input
        {...register("name", {
          required: true,
          minLength: {
            message: "제목은 2글자 이상으로 작성해주세요.",
            value: 2,
          },
          maxLength: {
            message: "이름이 너무 길어요 10글자 미만으로 작성해주세요",
            value: 10,
          },
        })}
        type="text"
        placeholder="식물 이름을 입력해 주세요"
      />
      <p className="font-alert-red">{errors.name?.message}</p>
      {/* 종류 */}
      <label className="bold h4 mt-16 mb-4">식물 종류</label>
      <input
        {...register("type", {
          required: true,
          minLength: {
            message: "식물이름을 입력해주세요.",
            value: 1,
          },
          maxLength: {
            message: "이름이 너무 길어요 20글자 미만으로 작성해주세요",
            value: 20,
          },
        })}
        type="text"
        placeholder="종을 입력해주세요 ex)몬스테라"
      />
      <p className="font-alert-red">{errors.type?.message}</p>
      {/* 연도 */}
      <label className="bold h4 mt-16 mb-4">키우기 시작한 날</label>
      <input {...register("years", { required: true })} type="date" />
      <p className="font-alert-red">{errors.years?.message}</p>
      {/* 사진 */}
      <label className="bold h4 mt-16 mb-4">사진</label>
      <input {...register("image")} type="file" accept="image/*" name="image" />
      <p className="font-alert-red">{errors.image?.message}</p>
      <SigButton type="submit" className="mt-16">
        식물 등록
      </SigButton>
    </ColumnWrapper>
  );
};

export default EditPlantModal;