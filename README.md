# ReactNativePhotoGallery
iOS와 안드로이드 둘 다 쓰일 수 있도록 React Native + Expo로 만든 사진 갤러리 앱.

## Why I used Expo
- 현재 개인 프로젝트 개발에 쓰이는 환경이 MacOS가 아님.
- 이러한 환경에서 본인이 알고 있는, iOS와 Android를 모두 쓰일 수 있게 만드는 가장 쉽고 안정적인 수단이 Expo임.

## Project Board
https://github.com/users/kuman514/projects/1/views/1

## 다른 부분
- iOS와 Android는 서로 다른 방식의 StatusBar와 NavigationBar를 사용하고 있다.
  - iOS는 StatusBar를 hidden시키면 끝인데, Android는 이렇게 하면 위의 검은 바와 아래의 네비게이션 바를 없애지 못한다. 대신 ImmersiveMode를 사용해야 되는 것으로 나옴. https://developer.android.com/training/system-ui/immersive?hl=ko#immersive
  - 좋은 패키지일까? https://www.npmjs.com/package/react-native-immersive-mode -> 먹히지 않았다. 제대로 된 링크가 필요하다는데, expo에선 이걸 어떻게 링크하지?
  - 대신... https://docs.expo.dev/versions/latest/config/app/#androidnavigationbar -> Android의 하단 NavigationBar를 숨기는 데 성공했다.
  - https://docs.expo.dev/versions/latest/config/app/#androidstatusbar
  - https://github.com/expo/expo/issues/15244#issuecomment-1699475175
  - `npx expo prebuild`를 통한 앱스타일 조작 시도
    - https://github.com/expo/expo/issues/15244#issuecomment-1497012354
      - 여기서 windowLayoutInDisplayCutoutMode를 shortEdges로 하면 가능하다는 이야기?
    - 이것도 참고함 https://developer.android.com/guide/topics/display-cutout?hl=ko
    - 역시 실패. 아무래도 prebuild와 이후 나타나는 android 폴더의 용도에 대한 연구가 더 필요해 보인다.
  - 결론
    - Android의 StatusBar를 완벽하게 투명하고 앱만 비추려고 일주일 가량의 시간을 들였음에도 완벽하게 수행할 수 없었다.
    - 여기에 관해서는 expo만으로는 할 수 있는게 많지 않은 것 같다.
    - iOS의 상태 바는 의외로 쉽게 투명화했지만, Android는 Native 레벨까지 가야 할 것 같다.
