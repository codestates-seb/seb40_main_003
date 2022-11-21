import React from "react";
import { useForm } from "react-hook-form";
import { SigButton } from "../../Components/GlobalComponents";
import { ColumnWrapper, SectionWrapper } from "../../Components/Wrapper";


type FormData = {
  name: string;
  type: string;
  age: number;
  photo: File;
};

const AddPlantModal = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <ColumnWrapper width={100} as={"form"} onSubmit={onSubmit}>
      <label className="bold h4 mb-8">식물 이름</label>
      <input
        {...(register("name"), { required: true, maxLength: 2 })}
        type="text"
        placeholder="식물 이름을 입력해 주세요"
      />
      <p>{errors.name?.message}</p>
      <label className="bold h4 mt-16 mb-8">식물 종류</label>
      <input
        {...(register("type"), { required: true, maxLength: 2 })}
        type="text"
        placeholder="종을 입력해주세요 ex)몬스테라"
      />
      <p>{errors.type?.message}</p>
      <label className="bold h4 mt-16 mb-8">키우기 시작한 날</label>
      <input {...register("age")} type="date" />
      <p>{errors.age?.message}</p>
      <label className="bold h4 mt-16 mb-8">사진</label>
      <input {...register("photo")} type="file" />
      <p>{errors.photo?.message}</p>

      <SigButton type="button" className="mt-16">식물 등록</SigButton>
    </ColumnWrapper>
  );
};

export default AddPlantModal;
