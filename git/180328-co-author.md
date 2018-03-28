# git Co-author 설정

회사 컴퓨터로 개인 github과 회사 github을 한꺼번에 관리하려다 보니 작성자가 꼬일 때가 종종 있다. 별 건 아니지만, github은 작성자 이름과 이메일 주소를 바탕으로 컨트리뷰션 그래프를 그려 주기 때문에, 이게 제대로 정리가 안 되면 열심히 커밋해서 푸시했는데도 타일에 점이 안 찍힌다. ~~서운하다~~

대충 찾아봤는데 이렇게 하면 된다.

## 그냥 author를 바꾸는 경우

회사 컴퓨터에서 취미로 만드는 코드는 이렇게 한다.

```sh
git config user.name "name"
git config user.email "email@example.com"
```

## 양 쪽의 author를 모두 남겨야 할 경우

회사 github과 개인 github 양쪽에 올리는 코드는 이렇게 올린다. 이 저장소도 이렇게 되어 있다. 커밋 메시지를 남길 때 마지막 줄에 `Co-authored-by: name <email@example.com>`을 적어 주면 공동 작성자로 취급되어서 커밋 로그에도 두 명이 같이 찍힌다.
