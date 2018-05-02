# tmux와 nvm 같이 사용하기

nvm의 default version을 설정하지 않으면 tmux를 실행할 때마다 `nvm is not compatible with the npm config "prefix" option: ...` 이런 오류가 뜬다. 아래 커맨드로 기본 버전을 설정해주면 해결된다.

```sh
nvm alias default system
```
