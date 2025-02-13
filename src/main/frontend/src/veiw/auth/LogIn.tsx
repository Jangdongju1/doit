import "./style.css";
import CommonInput from "../../component/input/CommonInput";
import React, {ChangeEvent, useState} from "react";
import CommonButton from "../../component/button/CommonButton";
import {DuplicationCheckReq, SignInReq, SignUpReq} from "../../dto/req";
import {duplicationCheckRequest, signInRequest, signUPRequest} from "../../api/UserApi";
import {DuplicationCheckRsp, SignInRsp, SignUpRep} from "../../dto/rsp";
import ResponseDto from "../../dto/ResponseDto";
import {ResponseCode} from "../../constant/enum/ResponseCode";
import {useNavigate} from "react-router-dom";
import {MAIN_PATH} from "../../constant/path";
import {useCookies} from "react-cookie";
import ReactQuill from "react-quill";

export default function LogIn() {

    // navigate : 네비게이트 함수
    const navigator = useNavigate();
    // state : card 상태  간단히 리터럴 값으로 구현
    const [cardState, setCardState] =
        useState<"sign-in" | "sign-up">("sign-in");
    const [cookies, setCookies] = useCookies(["accessToken"]);


    const SignInCard = () => {
        // state: 유저 아이디 상태.
        const [userId, setUserId] = useState<string>("");
        // state : 유저의 패스워드 상태
        const [password, setPassword] = useState<string>("");
        // state : 패스워드 보기 클릭상태
        const [passwordClick, setPasswordClick] = useState<boolean>(false);


        //function : 로그인 요청에 대한 응답처리
        const signInResponse = (response: SignInRsp | ResponseDto | null) => {
            if (!response) return;

            const {code, message} = response as ResponseDto;

            if (code === ResponseCode.SIGN_IN_FAILED) {
                alert("로그인 정보가 다릅니다.");
                return;
            }

            const {data} = response as SignInRsp;
            const {token, expiration} = data;



            // 쿠키 유효시간 설정의 단위는 밀리초
            setCookies("accessToken", token, {path: "/", expires: new Date(Date.now() + expiration * 1000)});

            navigator(MAIN_PATH);
        }
        // eventHandler : 유저아이디 변경 이벤트 헨들러
        const onUserIdChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setUserId(e.target.value);
        }

        // eventHandler : 유저패스워드 변경 이벤트 헨들러
        const onPasswordChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
        }

        // eventHandler : 패스워드 보기 클릭 이벤트 헨들러
        const onPassWordClickEventHandler = () => {
            setPasswordClick(prevState => !prevState);
        }

        // eventHandler : 회원가입 버튼 클릭 이벤트 헨들러
        const onSignUpBtnClickEventHandler = () => {
            setCardState("sign-up");
        }

        //eventHandler :로그인 버튼 클릭 이벤트 헨들러
        const onLogInBtnClickEventHandler = () => {
            if (userId.length === 0 || password.length === 0) {
                alert("로그인 정보를 입력해주세요.");
                return
            }
            const requestBody: SignInReq = {user_id: userId, password};

            signInRequest(requestBody).then(response => signInResponse(response));
        }

        return (
            <div id={"sign-in-card-wrapper"}>
                <div className={"sign-in-card-name"}>{"Sign In"}</div>
                <div className={"sign-in-card-comment"}>{"Doit 은 간단한 캘린더 일정관리 App 입니다."}</div>
                <div className={"sign-in-info-container"}>
                    <CommonInput label={"ID"}
                                 type={"text"}
                                 value={userId}
                                 onChange={onUserIdChangeEventHandler}
                                 errorMessage={"아이디 중복."}
                                 placeholder={"ID"}/>

                    <CommonInput label={"PASSWORD"}
                                 type={passwordClick ? "text" : "password"}
                                 value={password}
                                 onChange={onPasswordChangeEventHandler}
                                 placeholder={"password"}
                                 icon={passwordClick ? "key-on-image" : "key-off-image"}
                                 onClick={onPassWordClickEventHandler}/>
                </div>

                <div className={"sign-in-btn-container"}>
                    <CommonButton size={{width: 220, height: 32}}
                                  buttonName={"로그인"}
                                  onClick={onLogInBtnClickEventHandler}/>
                </div>

                <div className={"sign-in-card-comment"}>
                    {"회원이 아니신가요?"}
                    <span className={"sign-in-card-sign-up-btn"} onClick={onSignUpBtnClickEventHandler}>
                        {" 가입 하러 가기"}
                    </span>

                </div>
            </div>
        )
    }

    const SignUPCard = () => {
        // state : 아이디 입력 상태
        const [userId, setUserId] = useState<string>("");
        // state : 비밀번호 입력 상태
        const [password, setPassword] = useState<string>("");
        // state : 비밀번호 확인 입력 상태.
        const [passwordConfirm, setPasswordConfirm] = useState<string>("");
        // state : 닉네임 입력상태,
        const [nickname, setNickname] = useState<string>("");
        // state : 아이디에 중복 체크 여부;
        const [isChecked, setIsChecked] = useState<boolean>(false);


        // state: 회원가입 정보 확인시 error상태
        const [error, setError] =
            useState<{ idError: boolean, passwordConfirmError: boolean }>({
                idError: false,
                passwordConfirmError: false
            });


        //state : 패스워드 보기 클릭상태
        const [passwordClick, setPasswordClick] = useState<boolean>(false);
        //state : 패스워드 확인 보기클릭상태
        const [passwordConfirmClick, setPasswordConfirmClick] = useState<boolean>(false);


        // function : 중복 체크에 대한 응답처리
        const duplicationResponse = (response: DuplicationCheckRsp | ResponseDto | null) => {
            if (response === null) return;

            const {code, message} = response as ResponseDto;

            if (code !== ResponseCode.SUCCESS) {
                alert(message);
                const updateState = {...error, idError: true};
                setError(updateState);
                return;
            }
            alert("사용 가능한 아이디.");

            const updateState = {...error, idError: false};
            setError(updateState);
            setIsChecked(true);
        }

        // function : 회원 가입 요청에 대한 응답처리
        const signUpResponse = (response: SignUpRep | ResponseDto | null) => {
            if (!response) return;

            const {code, message} = response as ResponseDto;
            if (code !== ResponseCode.SUCCESS) {
                alert(message);
                return;
            }

            const {data} = response as SignUpRep;

            alert(data.addedId + "님 회원가입이 완료되었습니다.");
            setCardState("sign-in");
        }

        // eventHandler: 패스워드 보기 클릭시 이벤트 헨들러
        const onPassWordClickEventHandler = () => {
            setPasswordClick(prevState => !prevState);
        }

        // eventHandler: 패스워드 확인 클릭시 이벤트 헨들러
        const onPasswordConfirmClickEventHandler = () => {
            setPasswordConfirmClick(prevState => !prevState);
        }


        // eventHandler : 각각의 인풋 변경 이벤트 처리
        const onChangeEventHandler = (e: ChangeEvent<HTMLInputElement>,
                                      setter: React.Dispatch<React.SetStateAction<string>>) => {
            const value = e.target.value;
            setter(value);

            // 입력값 check
            if (e.target.name === "passConfirm") {
                const isError = password !== value;
                const updateState = {...error, passwordConfirmError: isError};
                setError(updateState);
            } else if (e.target.name === "pass") {
                const isError = passwordConfirm !== value;
                const updateState = {...error, passwordConfirmError: isError};
                setError(updateState);
            }

        }

        // eventHandler : //뒤로가기 버튼 클릭 이벤트 헨들러
        const onBackBtnClickEventHandler = () => {
            setCardState("sign-in");
        }

        const onDuplicationCheckBtnClickEventHandler = () => {
            if (userId.length === 0) {
                alert("아이디는 공백일 수 없음.");
                return;
            }
            const requestBody: DuplicationCheckReq = {user_id: userId};

            duplicationCheckRequest(requestBody).then(response => duplicationResponse(response))
        }


        // eventHandler : 회원가입 버튼 클릭 이벤트 헨들러
        const onSignUpBtnClickEventHandler = () => {
            if (error.passwordConfirmError || error.idError) return;

            const isIdError = userId.length === 0;
            const isPassError = password.length === 0;
            const isNickNameError = nickname.length === 0;


            if (isIdError) {
                alert("아이디는 공백일 수 없음.");
                return;
            }
            if (isPassError) {
                alert("비밀번호는 공백일 수 없음.");
                return;
            }
            if (isNickNameError){
                alert("닉네임은 공백일 수 없음.")
                return;
            }
            if (!isChecked) {
                alert("아이디 중복 체크 바람.");
                return;
            }

            const requestBody: SignUpReq = {user_id: userId, password, nickname};

            signUPRequest(requestBody).then(response => signUpResponse(response));

        }

        return (
            <div id={"sign-up-wrapper"}>
                <div className={"sign-up-card-name"}>{"Sign Up"}</div>

                <div className={"sign-up-info-container"}>

                    <div className={"sign-up-id-box"}>
                        <CommonInput label={"ID"}
                                     type={"text"}
                                     value={userId}
                                     placeholder={"ID"}
                                     name={"id"}
                                     onChange={(e) => onChangeEventHandler(e, setUserId)}
                                     isError={error.idError}
                                     errorMessage={"아이디 중복."}/>

                        <div className={"sign-up-duplication-check-btn-box"}>
                            <CommonButton size={{width: 80, height: 32}}
                                          buttonName={"중복확인"}
                                          onClick={onDuplicationCheckBtnClickEventHandler}/>
                        </div>
                    </div>

                    <div className={"sign-up-other-info-box"}>
                        <CommonInput label={"PASSWORD"}
                                     type={passwordClick ? "text" : "password"}
                                     value={password}
                                     placeholder={"password"}
                                     name={"pass"}
                                     onChange={(e) => onChangeEventHandler(e, setPassword)}
                                     icon={passwordClick ? "key-on-image" : "key-off-image"}
                                     onClick={onPassWordClickEventHandler}/>

                        <CommonInput label={"PASSWORD CONFIRM"}
                                     type={passwordConfirmClick ? "text" : "password"}
                                     value={passwordConfirm}
                                     placeholder={"Password 확인"}
                                     onChange={(e) => onChangeEventHandler(e, setPasswordConfirm)}
                                     name={"passConfirm"}
                                     icon={passwordConfirmClick ? "key-on-image" : "key-off-image"}
                                     isError={error.passwordConfirmError}
                                     errorMessage={"비밀번호 불일치."}
                                     onClick={onPasswordConfirmClickEventHandler}/>

                        <CommonInput label={"NICKNAME"}
                                     type={"text"}
                                     value={nickname}
                                     placeholder={"Nickname"}
                                     onChange={(e) => onChangeEventHandler(e, setNickname)}
                        />
                    </div>


                </div>

                <div className={"sign-up-btn-container"}>
                    <CommonButton size={{width: 120, height: 32}}
                                  buttonName={"간편 회원가입"}
                                  onClick={onSignUpBtnClickEventHandler}/>
                </div>

                <div className={"sign-up-back-btn-container"}>
                    <div className={"sign-up-back-btn-box"} onClick={onBackBtnClickEventHandler}>
                        <span className={"image sign-up-arrow-left-btn arrow-left-icon"}/>
                        {"뒤로가기"}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div id={'log-in-wrapper'}>
            <div className={"log-in-container"}>
                <div className={"image log-in-app-logo main-logo "}/>
                {cardState === "sign-in" ? <SignInCard/> : <SignUPCard/>}
                
            </div>


        </div>
    )
}