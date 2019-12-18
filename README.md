# Memon - CLIENT
![](https://i.imgur.com/PMaUsej.png)
> **Memento Money, 당신의 돈을 기억하세요**
> https://play.google.com/store/apps/details?id=com.memon.app
> 
같이 식사한 자리에서 대신 계산한 당신을 위한 어플리케이션입니다.
자신이 계산한 금액과 제목, 날짜, 참여인들을 등록하면, 당신이 입금확인을 할 때 까지
조회, 독촉알림이 가능합니다.


Stack : JavaScript, React Native, Expo, Native-base, Firebase, React Navigation, Typescript

## **Getting Started**
### **Prerequisites**

- Node, npm, expo-cli, 구글 플레이스토어 개발자 계정, expo 계정, Firebase 계정

### **Installing **

```shell
- on your root dir
$ npm install
```


### Ignored Files 
at root directory
- googleServices.json
From firebase console
- config.ts
```
const config = {
  apiKey: '...x', //by firebase
  authDomain: 'memon-x.firebaseapp.com', //by firebase
  databaseURL: 'https://memon-x.firebaseio.com', // by firebase
  projectId: 'memon-x', //by firebase
  storageBucket: 'memon-x.appspot.com', //check by googleServices.json
  messagingSenderId: '...x', //check
  appId: 'x:xx:android:xxx', //check by firebase
  measurementId: 'G-...xxx',  //check by firebase
  androidClientId:'...xxx.apps.googleusercontent.com', //check by google apis
  serverAddress: 'http://...34:5000' //backend open address
};
export default config;
```


### **Deployment**

```shell
- on your root dir
$ expo build:android -t apk

Download .apk file at your expo dashboard

Deploy .apk file at Google playstore developer console 
```

- then sign up/in to surge
- to see the list of deployed projects `surge list`
- to redeploy with the same domain `surge --domain SOME_DOMAIN_NAME`

### **Built With**

- React Native, Expo : Javascript 기반 네이티브 개발 프레임워크
- React Navigation : Routing and navigation for React Native apps
- NATIVE BASE : 리액트 네이티브 디자인 컴포넌트 라이브러리
- expo-google-sign-in : enables Google Authentication at React Native + Expo app

---



## 발표 관련 자료( 클릭 시 이동)
- 발표영상
[![errhadduck_features](https://i.imgur.com/CT3F5dj.png)](https://youtu.be/zjM7Z7uHwLM?t=6008)

- 발표 PPT
  [![signup](https://i.imgur.com/UEBM09f.png)](https://slides.com/haejoonlee/deck-892eed)
  
- 보다 자세한 Notion page
  [![write](https://i.imgur.com/TE0JB2m.png)](https://www.notion.so/Don_Juan-Memon-12538295edc74a3dbcf9493cb293d45a)


---

## **We Are 'TEAM Don_Juan'**

| 이름   | 스택      | TIL blog                          | github username                                |
| ------ | --------- | --------------------------------- | ---------------------------------------------- |
| 이해준 | front-end  | https://medium.com/@0oooceanhigh/ | [liftingturn](https://github.com/liftingturn)  |
| 최방실 | front-end  | https://medium.com/@qkdtlf89089 | [59inu](https://github.com/59inu)  |
| 조아라 | back-end | https://grin-quokka.tistory.com/  | [grin-quokka ](https://github.com/grin-quokka) |