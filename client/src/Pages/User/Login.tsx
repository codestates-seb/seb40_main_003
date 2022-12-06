import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../../Recoil/atoms/user";
import { SigButton } from "../../Components/GlobalComponents";
import { Link, useNavigate } from "react-router-dom";
import {
  MainContentContainer,
  MainCenterWrapper,
  MainRightWrapper,
  RowWrapper,
} from "../../Components/Wrapper";
import usePageTitle from "../../Hooks/usePageTitle";
import axios from "../../Hooks/api";
import { ReactComponent as LogoMain } from "../../images/logoMain.svg";
import { setLS } from "../../Hooks/useSecureLS";
import { noReadNum } from "../../Recoil/atoms/socket";

interface LoginForm {
  password: string;
  email: string;
  autoLogin: boolean;
  errors?: string;
}

const Login = () => {
  const [error, setErrMsg] = useState("");
  const [user, setUser] = useRecoilState(userState);
  const setNoReadNum  =useSetRecoilState(noReadNum)

  const {
    register,
    formState: { errors },
    handleSubmit,
    setFocus,
  } = useForm<LoginForm>({
    mode: "onChange",
  });
  usePageTitle("로그인");
  useEffect(() => {
    setFocus("email");
  }, []);

  /**  원래있던 페이지로 되돌리는 기능*/
  const navigate = useNavigate();

  /**  로그인버튼 클릭시 동작하는 함수*/
  const onLogin = async (data: LoginForm) => {
    axios
      .post("/login", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        // 로그인 관련정보, 토큰 받아야함
        const userInfo = {
          memberId: res.data.memberId,
          nickname: res.data.nickname,
          image: res.data.image,
        };
        setUser(userInfo);
        // 안읽은 메세지 갯수 전역상태로
        setNoReadNum(res.data.noReadNum)
        setLS("accessToken", res.data.accessToken);
        setLS("refreshToken", res.data.refreshToken);
        if (data.autoLogin) {
          setLS("userInfo", userInfo);
          setUser(userInfo);
        }
      })
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("서버로부터 응답이 없습니다");
        } else if (err.response?.status === 400) {
          setErrMsg("이메일 또는 패스워드를 확인해주세요");
        } else if (err.response?.status === 401) {
          setErrMsg("허가되지않은 접근입니다");
        } else if (err.response?.status === 404) {
          setErrMsg("이메일 또는 패스워드를 확인해주세요");
        } 
        else {
          setErrMsg("로그인에 실패했습니다");
        }
      });
  };

  return (
    <MainContentContainer>
      <MainCenterWrapper>
        <FormWrapper onSubmit={handleSubmit(onLogin)}>
          <Link to={"/"}>
            <LogoMain width={"150px"} />
          </Link>
          <InputContainer>
            <label className="mb-4 medium font-main" htmlFor={"Email"}>
              이메일
            </label>
            <input
              type={"email"}
              autoComplete="true"
              id="Email"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
                maxLength: 30,
              })}
            />
            {errors.email && errors.email.type === "required" && (
              <Errormsg> 이메일을 입력해주세요.</Errormsg>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <Errormsg> 이메일 형식이여야 합니다.</Errormsg>
            )}
            {errors.email && errors.email.type === "maxLength" && (
              <Errormsg> 최대 길이는 20자 이하여야 합니다</Errormsg>
            )}
          </InputContainer>
          <InputContainer>
            <label className="mb-4 medium font-main" htmlFor={"password"}>
              비밀번호
            </label>
            <input
              autoComplete="true"
              type={"password"}
              id="password"
              {...register("password", {
                required: true,
                pattern: /^(?=.*[a-zA-z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
              })}
            />
            {errors.password && errors.password.type === "required" && (
              <Errormsg> 비밀번호를 입력해주세요</Errormsg>
            )}
            {errors.password && errors.password.type === "pattern" && (
              <Errormsg>8자 이상, 영문, 숫자, 특수문자를 사용하세요.</Errormsg>
            )}
            {error && <Errormsg>{error}</Errormsg>}
          </InputContainer>
          <OptionWrapper className={"mb-16 mt-16"}>
            <div className="justify-center">
              <input
                type={"checkbox"}
                id="autoLogin"
                className="border-none checkbox-20"
                {...register("autoLogin", {
                  required: false,
                })}
              />
              <label className="medium font-main" htmlFor={"autoLogin"}>
                자동 로그인
              </label>
            </div>
            <Link to={`/signup`}>
              <span className="font-main bold">회원 가입</span>
              <span className="display-none-mobile">하고 알아보기</span>
            </Link>
          </OptionWrapper>
          <SigButton
            className={
              errors?.email === undefined && errors.password === undefined
                ? ""
                : "disable"
            }
            type={!errors ? "submit" : undefined}
            value={"Login"}
          >
            로그인
          </SigButton>
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

const InputContainer = styled.div`
  margin: 10px 0;
  display: flex;
  width: 100%;
  max-width: 425px;
  flex-direction: column;
  align-self: center;
  &:last-child {
    margin-bottom: 30px;
  }
`;

const Errormsg = styled.p`
  color: var(--alert-red);
  font-size: 0.8rem;
  margin-top: 4px;
`;

const OptionWrapper = styled.div`
  width: 100%;
  max-width: 425px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap:wrap;
`;
export default Login;
