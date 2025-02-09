import "./style.css";
import CommonInput from "../../component/input/CommonInput";
import {ChangeEvent, useState} from "react";
import CommonButton from "../../component/button/CommonButton";

export default function LogIn() {

    // state : card 상태  간단히 리터럴 값으로 구현
    const [cardState, setCardState] =
        useState<"sign-in" | "sign-up">("sign-in");


    const SignInCard = () => {
        // state: 유저 아이디 상태.
        const [userId, setUserId] = useState<string>("");
        // state : 유저의 패스워드 상태
        const [password, setPassword] = useState<string>("");
        // state : 패스워드 보기 클릭상태
        const [passwordClick, setPasswordClick] = useState<boolean>(false);

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
                                  buttonName={"로그인"}/>
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

        // eventHandler: 패스워드 보기 클릭시 이벤트 헨들러
        const onPassWordClickEventHandler = () => {
            setPasswordClick(prevState => !prevState);
        }

        // eventHandler: 패스워드 확인 클릭시 이벤트 헨들러
        const onPasswordConfirmClickEventHandler = () => {
            setPasswordConfirmClick(prevState => !prevState);
        }

        // eventHandler : // 유저아이디 변경 이벤트 처리
        const onUserIdChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setUserId(value);
        }
        // eventHandler : // 패스워드 변경 이벤트 처리
        const onPasswordChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setPassword(value);
        }
        // eventHandler : // 패스워드 확인 변경 이벤트 처리
        const onPasswordConfirmChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setPasswordConfirm(value);
        }
        // eventHandler : // 닉네임 변경 이벤트 처리
        const onNicknameChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setNickname(value);
        }

        // eventHandler : //뒤로가기 버튼 클릭 이벤트 헨들러
        const onBackBtnClickEventHandler = () => {
            setCardState("sign-in");
        }

        return (
            <div id={"sign-up-wrapper"}>
                <div className={"sign-up-card-name"}>{"Sign Up"}</div>

                <div className={"sign-up-info-container"}>

                    <div className={"sign-up-id-box"}>
                        <CommonInput label={"ID"}
                                     type={"text"}
                                     value={userId}
                                     onChange={onUserIdChangeEventHandler}
                                     isError={error.idError}
                                     errorMessage={"아이디 중복."}
                                     placeholder={"ID"}/>

                        <div className={"sign-up-duplication-check-btn-box"}>
                            <CommonButton size={{width: 80, height: 32}}
                                          buttonName={"중복확인"}/>
                        </div>
                    </div>

                    <div className={"sign-up-other-info-box"}>
                        <CommonInput label={"PASSWORD"}
                                     type={passwordClick ? "text" : "password"}
                                     value={password}
                                     onChange={onPasswordChangeEventHandler}
                                     placeholder={"password"}
                                     icon={passwordClick ? "key-on-image" : "key-off-image"}
                                     onClick={onPassWordClickEventHandler}/>

                        <CommonInput label={"PASSWORD CONFIRM"}
                                     type={passwordConfirmClick ? "text" : "password"}
                                     value={passwordConfirm}
                                     onChange={onPasswordConfirmChangeEventHandler}
                                     placeholder={"Password 확인"}
                                     icon={passwordConfirmClick ? "key-on-image" : "key-off-image"}
                                     isError={error.passwordConfirmError}
                                     errorMessage={"비밀번호 불일치."}
                                     onClick={onPasswordConfirmClickEventHandler}/>

                        <CommonInput label={"NICKNAME"}
                                     type={"text"}
                                     value={nickname}
                                     onChange={onNicknameChangeEventHandler}
                                     placeholder={"Nickname"}/>
                    </div>


                </div>

                <div className={"sign-up-btn-container"}>
                    <CommonButton size={{width: 120, height: 32}}
                                  buttonName={"간편 회원가입"}/>
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
                {cardState == "sign-in" ? <SignInCard/> : <SignUPCard/>}

            </div>


        </div>
    )
}