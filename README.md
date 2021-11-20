# board-js

사용법
1. 해당 레포지토리 Clone 후 "npm i" 명령어를 통해 사용된 module을 모두 설치해줍니다. 
2. 아래의 경로에 config 디렉토리를 생성해서 dev.js에 mongoURI를 삽입해줍니다.

server 
</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├ config 
</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└ dev.js (빈 문자열 사이에 Mongo Atlas URI 삽입 후 사용) 
</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├ middleware 
</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├ models 
</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...

 
<img width="109" alt="htu" src="https://user-images.githubusercontent.com/72322679/142685028-fcae02e0-9209-4998-8570-10818ef5f5a0.PNG">
<img width="421" alt="htu2" src="https://user-images.githubusercontent.com/72322679/142685034-d3a1860b-7aff-4fc7-b4fd-333da895e09a.PNG">


3. "npm start" 명령어로 서버 시작 후 "localhost:[설정된 포트]"에서 동작 확인