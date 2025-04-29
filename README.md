# ⛰️산타
소개 : 국립공원 산에 대한 모든 것(산 검색, 위치, 날씨, 일출, 일몰, CCTV 등) 
## 1. 최종 구현 화면 이미지

- 배포 : [santaboa.vercel.app](santaboa.vercel.app)
  
| 홈화면 | 검색 | 전국지도 | 산 정보 |
|----------|----------|----------|----------|
|![홈](https://github.com/user-attachments/assets/bc05f709-c4a2-435c-af90-b59be5273fcb)   | ![검색](https://github.com/user-attachments/assets/2b5aaefb-199b-4eb9-bfd6-e4ab1b8d3327) | ![전국지도](https://github.com/user-attachments/assets/e70a965c-9627-48f8-b252-2a29d3fb2632) |  ![산정보](https://github.com/user-attachments/assets/6da9de6c-ebfe-4e14-ba9c-38969bbe4a2c)  |


## 2. 설치, 환경설정 및 실행 방법

- 환경변수 : 2가지 API Key 필요
    - 공공데이터포털 (OPEN API)
        - 날씨 : 기상청 단기예보 조회서비스
        - 일출, 일몰시각 : 한국천문연구원 출몰시각 정보
- 실행 방법
    
    ```bash
    yarn install or npm install  // 라이브러리 설치

    yarn build or npm build      // 빌드
    
    yarn start or npm start      // 실행
    ```
    

## 3. 구현 요구 사항 목록

- 홈 페이지
    - [x]  산 리스트
- 검색 페이지
    - [x]  검색 기능
    - [x]  최근 검색어
    - [x]  검색 결과
- 지도 페이지
    - [x]  전체 산 위치 및 이름 표시
    - [x]  위치 클러스터링
- 산 정보 페이지
    - [x]  위치 표시
    - [x]  산 정보
    - [x]  등산 완료 표시 
    - [x]  날씨 및 일출, 일몰 시간 표시
    - [x]  CCTV 링크

## 4. 사용한 프레임워크 및 라이브러리 설명

- React : 훅 사용
- Next.js : ISR 정적페이지, 페이지 라우팅, image 최적화, vercel 배포 연동
- TanStack Query : 서버 상태관리, 캐시 처리
- React-Leaflet : 각 국립공원 위치 지도로 표시
- Jotai : 최근 검색어와 등산 완료 상태 관리 및 로컬스토리지 저장
- TypeScript : 정적타입을 사용하여 안정적인 코드 작성
- Tailwind CSS : className으로 스타일 지정

## 5. 폴더 구조 설명

- app : 앱 전역 설정(React-Query,Jotai 등) 
- pages : 파일기반 라우팅, API 라우트
- views(FSD의 pages와 동일 : Next.js의 page router의 pages 폴더와 중복으로 이름 변경) : 페이지별 구성요소
- features : 사용자 행동과 데이터 변경(헤더, 차트)
- entities : 데이터와 렌더링(지도)
- shared : 공통 유틸리티와 컴포넌트, API, 상수 등

## 6. 프로젝트 진행 시 주안점 작성

- ISR(Incremental Static Regeneration) 적용
    - Next.js의getStaticProps와 prefetchQuery를 이용한 pre-rendering [링크](https://ganeo.notion.site/Next-js-Page-Router-Incremental-Static-Regeneration-ISR-1b671310639a805eb31bd59b45a9c8e3)
- Leaflet을 이용한 지도 구현
- FSD(Feature Sliced Design) 적용
- Next/API를 사용하면서 로컬과 프로덕션 시간차
  - 로컬에서 테스트할 때는 정상이었으나 배포 후 시간이 11시간정도 차이 나오는 문제가 발생
  - 배포되면서 배포서버가 한국이 아닌 곳에 되면서 API에 적용되는 현재시간이 그 지역 시간을 사용하게 됨
  - 현재시간을 한국시간(UTC + 9 시간)으로 적용하여 해결

## 7. 한계점 및 개선 사항 작성

- 한계점
    - 컴포넌트 구조 분리
        - FSD 각 위치, 분리와 통합의 경계 모호
    - Next.js의 App Router 미활용
- 향후 넣고 싶은 기능
    - 테스트 코드 
    - 게시판
    - 3D 산 지도
    - 다른 API : 미세 먼지 등

## 8. 후기

- 가끔씩 등산하면서 직접 사용해 볼만한 프로젝트를 해보자라는 느낌으로 시작하였다. SEO를 위한 구글 서치 콘솔에 등록하며 구글에서 산타보아로 검색할 때 검색 결과에 표시되면서 뿌듯했다.
- Next.js의 주요기능을 적용하며 이론에서 실제로 배울 수 있었다. 

## 9. 참고

- [FSD 관점으로 바라보는 코드 경계 찾기](https://velog.io/@teo/fsd#fsd를-효과적으로-적용하는-팁)
