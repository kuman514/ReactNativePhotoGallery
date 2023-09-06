# ReactNativePhotoGallery
iOS와 안드로이드 둘 다 쓰일 수 있도록 React Native + Expo로 만든 사진 갤러리 앱.

## Why I used Expo
- 현재 개인 프로젝트 개발에 쓰이는 환경이 MacOS가 아님.
- 이러한 환경에서 본인이 알고 있는, iOS와 Android를 모두 쓰일 수 있게 만드는 가장 쉽고 안정적인 수단이 Expo임.

## Project Board
https://github.com/users/kuman514/projects/1/views/1

## 다른 부분
- iOS와 Android는 서로 다른 전체 화면 방식을 사용한다. iOS는 StatusBar를 hidden시키면 끝인데, Android는 이렇게 하면 위의 검은 바와 아래의 네비게이션 바를 없애지 못한다. 대신 ImmersiveMode를 사용해야 되는 것으로 나옴. https://developer.android.com/training/system-ui/immersive?hl=ko#immersive
- 좋은 패키지일까? https://www.npmjs.com/package/react-native-immersive-mode -> 먹히지 않았다.
- 대신... https://docs.expo.dev/versions/latest/config/app/#androidnavigationbar
- .
