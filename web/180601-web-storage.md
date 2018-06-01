# Web Storage

만약 웹 앱에서 계속 사용자의 정보를 유지해야 한다면 어떻게 해야 할까? html5 이전이라면 쿠키를 사용했을 것이다. 다만, 쿠키는 매번 서버에 자신의 정보를 전달한다. 이게 나쁘다는 뜻은 아니다. 그렇지만 사용자가 네비게이션 바를 접었다든가 하는, 서버에서는 하등 쓸모없는 정보까지 서버에 전달되는 것이 문제다. html5 이후에는 `localStorage`, `sessionStorage`를 이용하여 마지막 UI 상태처럼 사용자에게는 중요하지만, 서버에는 그다지 중요하지 않은 정보를 클라이언트 안에 저장할 수 있게 되었다.

사용법은 양쪽 다 똑같다.

```js
// 오브젝트를 그냥 저장하면 [Object object]로 저장되므로, 반드시 문자열로 만들어 준다.
// 값이 문자열이거나 숫자라면 굳이 이렇게 하지 않아도 된다.
let value = JSON.stringify({a: 1});
sessionStorage.setItem('key', value) // 값을 저장할 때
let value2 = JSON.parse(sessionStorage.getItem('key')); // 값을 가져올 때
sessionStorage.removeItem('key'); // 값을 삭제할 때
```

`sessionStorage`는 브라우저를 종료할 때까지, `localStorage`는 사용자가 직접 값을 삭제할 때까지 브라우저 내부에 저장된다. 일회성은 정보를 세션 스토리지에, 한 번 저장되면 계속해서 쓰는 값은(이를테면 첫 방문자에게 '어서오세요!'를 보여준다든지 하는) 로컬 스토리지에 저장하는 것이 좋겠다.
