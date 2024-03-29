import React from "react";
import { useForm } from "react-hook-form";
import { SigButton } from "../../Components/GlobalComponents";
import { ColumnWrapper } from "../../Components/Wrapper";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

const EditPlantModal: React.FC<editplantModal> = ({
  closeModal,
  url,
  defaultValue,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onValid = async (data: FormData) => {
    const formData = new FormData();
    const plantDto = JSON.stringify({
      name: data.name,
      years: String(data.years).replaceAll("-", ""),
      type: data.type,
    });

    formData.append("multipartFile", data.image[0]);
    formData.append(
      "plantDto",
      new Blob([plantDto], { type: "application/json" })
    );

    axiosPrivate
      .patch(`/plants/${url}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        closeModal && closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ColumnWrapper width={100} as={"form"} onSubmit={handleSubmit(onValid)}>
      {/* 이름 */}
      <label className="bold h4 mb-4">식물 이름</label>
      <input
        {...register("name", {
          required: true,
          // 최소이름길이
          minLength: {
            message: "제목은 2글자 이상으로 작성해주세요.",
            value: 2,
          },
          // 최대이름길이
          maxLength: {
            message: "이름이 너무 길어요 10글자 미만으로 작성해주세요",
            value: 10,
          },
        })}
        type="text"
        defaultValue={defaultValue.name}
      />
      <p className="font-alert-red">{errors.name?.message}</p>
      {/* 종류 */}
      <label className="bold h4 mt-16 mb-4">식물 종류</label>
      <input
        {...register("type", {
          required: true,
          // 최소이름 길이
          minLength: {
            message: "식물이름을 입력해주세요.",
            value: 1,
          },
          // 최대 이름길이
          maxLength: {
            message: "이름이 너무 길어요 20글자 미만으로 작성해주세요",
            value: 20,
          },
        })}
        type="text"
        defaultValue={defaultValue.type}
      />
      <p className="font-alert-red">{errors.type?.message}</p>
      {/* 연도 */}
      <label className="bold h4 mt-16 mb-4">키우기 시작한 날</label>
      <input
        {...register("years", { required: true })}
        type="date"
        defaultValue={defaultValue.age.replace(
          /(\d{4})(\d{2})(\d{2})/g,
          "$1-$2-$3"
        )}
      />
      <p className="font-alert-red">{errors.years?.message}</p>
      {/* 사진 */}
      <label className="bold h4 mt-16 mb-4">사진</label>
      <input {...register("image")} type="file" accept="image/*" name="image" />
      <p className="font-alert-red">{errors.image?.message}</p>
      <SigButton type="submit" className="mt-16">
        식물 수정
      </SigButton>
    </ColumnWrapper>
  );
};
type editplantModal = {
  closeModal?: Function;
  url?: number | undefined;
  defaultValue: { age: string; src?: string; name: string; type: string };
};
type FormData = {
  name: string;
  type: string;
  years: string;
  image: FileList;
};
export default EditPlantModal;
