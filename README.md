## Doit은  간단히 구현한 캘린더 애플리케이션 입니다.

##### 📺 개발환경
* <img src="https://img.shields.io/badge/Language-%23121011?style=plastic"/>
    
    * FrontEnd
          <div>
              <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=float-square&logo=JavaScript&logoColor=white"><img src="https://img.shields.io/badge/ES6-515151?style=float-square">,
              <img src="https://img.shields.io/badge/TypeScript-3178C6?style=float-square&logo=TypeScript&logoColor=white">
          </div>

    * BackEnd
           <div>
               <img src="https://img.shields.io/badge/java-%23ED8B00?style=float-square&logo=openjdk&logoColor=white"><img src="https://img.shields.io/badge/17-515151?style=float-square">
           </div>
    

* <img src="https://img.shields.io/badge/Library%20&%20Framwork-%23121011?style=plastic"/>

    * FrontEnd
              <div>
                  <img src="https://img.shields.io/badge/React.js-61DAFB?style=float-square&logo=React&logoColor=white"/><img src="https://img.shields.io/badge/18-515151?style=float-square">,
                  <img src="https://img.shields.io/badge/Axios-5A29E4?style=float-square&logo=Axios&logoColor=white"/><img src="https://img.shields.io/badge/1.7.9-515151?style=float-square">,
              </div>

    * BackEnd
             <div>
                  <img src="https://img.shields.io/badge/springboot-6DB33F?style=float-square&logo=springboot&logoColor=white"><img src="https://img.shields.io/badge/3.4.2-515151?style=float-square">,
              </div>

* <img src="https://img.shields.io/badge/Web-%23121011?style=plastic"/>
              <div>
                  <img src="https://img.shields.io/badge/HTML5-E34F26?style=float-square&logo=HTML5&logoColor=white"/>, <img src ="https://img.shields.io/badge/CSS3-1572B6?style=float-square&logo=CSS3&logoColor=white"/>
              </div>

* <img src="https://img.shields.io/badge/Database-%23121011?style=plastic"/>
                <div>
                    <img src="https://img.shields.io/badge/MySQL-4479A1?style=float-square&logo=MySql&logoColor=white"><img src="https://img.shields.io/badge/8.0-515151?style=float-square">,
                </div>
* <img src="https://img.shields.io/badge/ORM-%23121011?style=plastic"/>
                <div>
                    <img src="https://img.shields.io/badge/Spring%20Data%20JPA-6DB33F?style=float-square&logo=Spring&logoColor=white"/><img src="https://img.shields.io/badge/3.4.2-515151?style=float-square">,
                </div>

* <img src="https://img.shields.io/badge/Build-%23121011?style=plastic">
                 <div>
                    <img src="https://img.shields.io/badge/Gradle-02303A?style=float-square&logo=Gradle&logoColor=white"><img src="https://img.shields.io/badge/8.12.1-515151?style=float-square">
                 </div>
------------

<p align="center">
    <img src="https://github.com/user-attachments/assets/30cc72bc-5392-49fe-9cea-c6685baf27d9" width=500 height=300/>
</p>

* 프로젝트 소개

    - 개발기간 : 2025.02.07 ~ 2025.02.16
    - 개발인원 : 1명 (개인프로젝트)
 
      Doit은 Google Calender를 모티브로 아주 간단하게 만들어진 캘린더 애플리케이션입니다. 날짜별로 일정을 등록하고 간단하게 확인 할 수 있습니다.
      다만 개선점도 분명히 존재합니다. 특히 날짜를 범위로 지정하여 일정을 등록할 수 있도록 하는 부분은 추후 반드시 개선해 나갈 예정입니다.


      BackEnd에 대한 상세한 내용은 아래의 링크로 연결된 Notion페이지에서 확인하실 수 있습니다.

       * [BackEnd Detail 바로가기](https://www.notion.so/Doit-BackEnd-Detail-19c498f456888013b897e3bc4c155bb8)
     


## FrontEnd 소개(기능 및 화면 등) 

### - 주요 라이브러리 : date-fns

  캘린더 자체를 구현하기 위해서 date-fns 를 사용하였습니다. 물론 제공되는 캘린더 라이브러리들이 많으나 개인적인 커스터마이징을 위해서
  date-fns를 사용해서 커스텀 hook을 만들고 그를 이용하여 캘린더를 직접 구현하였습니다.

### - 주요 컴포넌트 : Calender 관련 컴포넌트
  
  사실 캘린더를 컴포넌트화 하지는 않았습니다. date-fns를 사용해서 아주 간단하게 구현할 수 있었기 때문입니다. 하지만 조금 더 규모가 있는 프로젝트
  였다면 Calender를 컴포넌트화 하였을 것입니다. 그럼에도 불구하고 주요한 컴포넌트로 적는 이유는 캘린더가  이 프로젝트의 메인이기 때문입니다.

### - 그밖에 다른 컴포넌트 : Input, Button등 컴포넌트

  Input이라던가 Button은 어디서나 쓰일 수 있기 때문에 컴포넌트화 해서 사용하였습니다.


### - 화면소개
* 회원가입 및 로그인
      ![signup](https://github.com/user-attachments/assets/c644f2a8-5002-4405-bc25-6ba6f9f845ef)
      ![login](https://github.com/user-attachments/assets/eb3360f9-f61d-4280-ba88-11b2d51c6174)




* 메인화면 일정 등록
      ![main](https://github.com/user-attachments/assets/3284973d-ee1d-4139-8e75-7d7e702a0b11)
      ![write](https://github.com/user-attachments/assets/51da171b-5b34-42de-a1f6-bdf7c9b4445a)


* 일정 확인 & 수정 & 삭제 
      ![schedule](https://github.com/user-attachments/assets/0d8d115c-959b-4021-8cc1-a742f2fa9b86)
      ![edit](https://github.com/user-attachments/assets/6395dd47-a1c6-424e-bb9f-bb9e2394e249)


## 빌드가이드
 * 백엔드 (서버 포트 4000) 
   - 환경 : gradle 8.12.1이상 , jdk 17, mysql 8이상
   - 설정파일 : doit/src/main/resources/application.yml  데이터베이스 url db명칭 및 패스워드 세팅
   - 순서
     - git clone https://github.com/Jangdongju1/doit.git (프로젝트 최상위 경로로 이동)
     - gradle build  (jar파일생성)
     - java -jar {jar파일명}.jar

* 프론트엔드(포트 3000)
   - 환경 : react 18 , nodejs & npm 필수 
   - 순서
     -  doit/src/main/frontend
     -  npm install
     -  npm start
## 데이터베이스 백업파일 & TestID  
 * 테스트용 아이디 / 비밀번호 : test/test

[dump.zip](https://github.com/user-attachments/files/18815225/dump.zip)
