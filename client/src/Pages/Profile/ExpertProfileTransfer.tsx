import styled from "@emotion/styled";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { SigButton } from "../../Components/GlobalComponents";
import { useNavigate } from "react-router-dom";
import {
  MainContentContainer,
  MainCenterWrapper,
  MainRightWrapper,
} from "../../Components/Wrapper";
import usePageTitle from "../../Hooks/usePageTitle";
import axios from "../../Hooks/api";
import { useRecoilState } from "recoil";
import { userState } from "../../Recoil/atoms/user";
import { setLS } from "../../Hooks/useSecureLS";
import { areaArray } from "../../Const/Address";

interface SignupForm {
  name: string;
  age: string;
  gender: string;
  simpleContent: string;
  detailContent: string;
  price: string;
  extra: string;
  address: string;
  password: number;
  passwordCheck: number;
  email: string;
}

const ExpertProfileTransfer = () => {
  // 리코일설정
  const [user, setUser] = useRecoilState(userState);

  // 페이지 이름변경
  useEffect(() => {
    setFocus("name");
  }, []);

  // 훅폼 설정
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
    setFocus,
  } = useForm<SignupForm>({
    mode: "onChange",
  });

  usePageTitle("전문가 계정으로 전환");
  // 첫번째 인풋 연결

  const navigate = useNavigate();
  const [error, setErrMsg] = useState("");
  const password = useRef({});
  // 버튼 클릭시 동작하는 함수
  const onValid = async (data: SignupForm) => {
    console.log(data);
    // axios
    //   .post("/signup", {
    //     email: data.email,
    //     password: data.password,
    //     nickname: data.name,
    //   })
    //   .then((res) => {
    //     console.log("회원가입 성공, 로그인시도");
    //   })
    //   .catch((err) => {
    //     if (!err?.response) {
    //       setErrMsg("서버로부터 응답이 없습니다");
    //     } else if (err.response?.status === 400) {
    //       setErrMsg("이메일 또는 패스워드를 확인해주세요");
    //     } else if (err.response?.status === 401) {
    //       setErrMsg("허가되지않은 접근입니다");
    //     } else {
    //       setErrMsg("회원가입에 실패했습니다");
    //     }
    //   })
    //   .then(() => {
    //     axios
    //       .post("/login", {})
    //       .then((res) => {
    //         const userInfo = {
    //           memberId: res.data.memberId,
    //           nickname: res.data.nickname,
    //           image: res.data.image,
    //         };
    //         setUser(userInfo);
    //         setLS("accessToken", res.data.accessToken);
    //         setLS("refreshToken", res.data.refreshToken);
    //       })
    //       .then(() => {
    //         window.alert("회원가입에 성공했습니다");
    //         navigate("/");
    //       })
    //       .catch((err) => {
    //         navigate("/login");
    //       });
    //   });
  };

  return (
    <MainContentContainer>
      <MainCenterWrapper>
        <FormWrapper onSubmit={handleSubmit(onValid)}>
          <InputContainer>
            <Label htmlFor={"name"}>이름</Label>
            <Input
              type={"name"}
              id="name"
              {...register("name", {
                required: true,
                minLength: 2,
                maxLength: 5,
              })}
            />
            {errors.name && errors.name.type === "required" && (
              <Errormsg> 이름을 입력해주세요.</Errormsg>
            )}
            {errors.name && errors.name.type === "minLength" && (
              <Errormsg> 최소 길이는 2자 이상이여야 합니다</Errormsg>
            )}
            {errors.name && errors.name.type === "maxLength" && (
              <Errormsg> 최소 길이는 5자 이하이여야 합니다</Errormsg>
            )}
          </InputContainer>
          <InputContainer>
            <Label htmlFor={"age"}>나이</Label>
            <Input
              type={"number"}
              id="age"
              {...register("age", {
                required: true,
                pattern: /^[0-9]{2}$/,
              })}
            />
            {errors.age && errors.age.type === "required" && (
              <Errormsg> 나이를 입력해주세요.</Errormsg>
            )}
            {errors.age && errors.age.type === "pattern" && (
              <Errormsg> 숫자 형식이여야 합니다.</Errormsg>
            )}
          </InputContainer>

          <select
            id="address"
            {...register("address", {
              required: true,
            })}
          >
            {areaArray.map((e) => {
              return <option value={(e.number)}>{e.name}</option>;
            })}
          </select>

          {/* <InputContainer>
            <Label htmlFor={"address"}>주소</Label>
            <Input
              placeholder="예시) 망원동"
              type={"text"}
              id="address"
              {...register("address", {
                required: true,
              })}
            />
            {errors.price && errors.price.type === "required" && (
              <Errormsg> 본인의 거주하고 있는 동을 입력해주세요.</Errormsg>
            )}
          </InputContainer> */}
          <InputContainer>
            <Label htmlFor={"gender"}>성별</Label>
            <Select id="gender" {...register("gender", { required: true })}>
              <option value="">선택</option>
              <option value="1">남성</option>
              <option value="2">여성</option>
            </Select>
            {errors.gender && <Errormsg>성별을 선택해주세요.</Errormsg>}
          </InputContainer>
          <InputContainer>
            <Label htmlFor={"price"}>기본 비용</Label>
            <Input
              placeholder="예시) 30분 9,000원"
              type={"text"}
              id="price"
              {...register("price", {
                required: true,
              })}
            />
            {errors.price && errors.price.type === "required" && (
              <Errormsg> 기본 비용을 입력해주세요.</Errormsg>
            )}
          </InputContainer>
          <InputContainer>
            <Label htmlFor={"extra"}>추가 비용</Label>
            <Input
              placeholder="예시) 10분 1,000원"
              type={"text"}
              id="extra"
              {...register("extra", {
                required: true,
              })}
            />
            {errors.price && errors.price.type === "required" && (
              <Errormsg> 추가 비용을 입력해주세요.</Errormsg>
            )}
          </InputContainer>
          <InputContainer>
            <Label htmlFor={"simpleContent"}>자기소개</Label>
            <Textarea
              id="simpleContent"
              {...register("simpleContent", {
                required: true,
                maxLength: 100,
              })}
            />
            {errors.simpleContent && <Errormsg>본인을 소개해주세요.</Errormsg>}
            {errors.simpleContent &&
              errors.simpleContent.type === "maxLength" && (
                <Errormsg> 최대 길이는 100자 이하여야 합니다</Errormsg>
              )}
          </InputContainer>
          <InputContainer>
            <Label htmlFor={"detailContent"}>상세한 자기소개</Label>
            <Textarea
              id="detailContent"
              {...register("detailContent", {
                required: true,
                maxLength: 200,
              })}
            />
            {errors.simpleContent && (
              <Errormsg>본인에 대한 구제적인 소개해주세요.</Errormsg>
            )}
            {errors.age && errors.age.type === "maxLength" && (
              <Errormsg> 최대 길이는 200자 이하여야 합니다</Errormsg>
            )}
          </InputContainer>
          <SigButton
            className={
              errors.name === undefined &&
              errors.email === undefined &&
              errors.password === undefined &&
              errors.passwordCheck === undefined
                ? "active mt-16"
                : "disable mt-16"
            }
            type="submit"
            value={"Login"}
          >
            전환하기
          </SigButton>
          {error && <Errormsg>{error}</Errormsg>}
        </FormWrapper>
      </MainCenterWrapper>
      <MainRightWrapper></MainRightWrapper>
    </MainContentContainer>
  );
};

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 10px;
`;

export const Input = styled.input`
  width: 300px;
  height: 35px;
`;

const InputContainer = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const Errormsg = styled.p`
  color: var(--alert-red);
  margin: 3px;
  font-size: 13px;
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 3px;
`;

const Select = styled.select`
  width: 300px;
  height: 35px;
  outline-style: solid;
  outline-width: 1px;
  outline-color: var(--line-light-gray);
  border-radius: 6px;
`;
const Textarea = styled.textarea`
  width: 400px;
  height: 150px;
  outline-style: solid;
  outline-width: 1px;
  outline-color: var(--line-light-gray);
  border-radius: 6px;
`;

export default ExpertProfileTransfer;
