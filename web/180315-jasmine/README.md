# karma와 jasmine으로 프론트엔드 javascript 테스트하기

[참고 링크](http://blog.jeonghwan.net/tool/2017/03/28/jasmine.html)

## 초기 세팅

```sh
npm init
npm install -D jasmine-core@^2.0.0 karma karma-chrome-launcher karma-jasmine

# ajax를 사용할 경우
npm install -D karma-jasmine-ajax
```

테스트를 쉽게 하기 위해 npm의 `test` 커맨드를 아래와 같이 세팅한다.

```
node_modules/.bin/karma start
```

앞으로는 `npm test` 커맨드로 karma를 구동할 수 있다.

최상단에 `karma.conf.js` 파일을 생성하고 아래와 같이 작성한다. Chrome을 사용하는 경우, `browsers`에 `ChromeHeadless`를 설정해 두면, 브라우저가 켜지지 않고(정확히는 GUI로 렌더링되지 않고) 테스트를 진행하기 때문에 편하다.

**주의**: `jasmine-ajax`는 `jasmine`의 앞에 등장해야 한다.

```js
module.exports = (config) => {
    config.set({
        frameworks: ['jasmine-ajax', 'jasmine'],
        // frameworks: ['jasmine'] // when not using ajax
        basePath: __dirname,
        files: ['src/*.js', 'test/*.spec.js'],
        autoWatch: true,
        browsers: ['ChromeHeadless']
    });
}
```

## jasmine 기본 사용법

### `describe`와 `it`

먼저 소스 파일을 작성하고, 테스트에 관련한 코드를 `test/*.spec.js`에 작성한다. `karma.conf.js`에 그렇게 작성했기 때문이므로 이름은 아무렇게나 바꿔주어도 무방하지만, 대개 모듈 단위로 테스트 코드를 작성하므로 모듈 이름을 붙여서 작성해 주면 좋겠다. 예를 들어 `src/hello.js`에 대한 테스트 코드는 `test/hello.spec.js`에 작성하는 식이다.

`describe` 함수를 이용하여 모듈/함수 단위로 테스트를 나눌 수 있다. 문법적으로 강제하는 것은 아니고, 단순 구분용이다.

```js
describe('ModuleA', () => {
    describe('funcA', () => {
        // test for ModuleA.funcA
    });

    describe('funcB', () => {
        // test for ModuleA.funcB
    });
});
```

실제로 테스트 코드를 작성할 때는 `it` 함수를 이용한다. 이 때도 `describe`와 마찬가지로 설명을 위한 문자열을 패러미터로 전달받는데, 보통 이 위치에는 해당 테스트가 어떤 역할을 하는지를 적는다. 동사형으로 적어 주면 모듈/함수 이름과 결합되면서 문장처럼 되므로 읽기 좋다. 컨벤션인 것 같다.

```js
describe('ModuleA', () => {
    describe('funcA', () => {
        it('does something', () => {
            // ...
        });
    });

    // ...
});
```

### `expect`

다른 언어의 `assert`에 해당하는 jasmine의 함수는 `expect`이다. `matchers` 오브젝트를 반환하는데, 이 오브젝트의 메서드를 호출하여 테스트를 진행하면 된다. 대표적인 메서드는 다음과 같으며, [여기](https://jasmine.github.io/api/3.0/matchers.html)에서 모든 메서드를 확인할 수 있다.

```js
expect(obj).toBe(sth); // obj === sth
expect(obj).toEqual(sth); // 깊은 비교
expect(obj).toMatch(regex); // obj이 regex(문자열일 수도 있음) 패턴에 맞아떨어짐
expect(obj).toContain(pattern); // obj(문자열)이 pattern을 포함함
expect(obj).toThrowError(err); // obj(함수나 메서드)가 에러/예외를 던짐
```

'그렇지 않은 경우'를 테스트하고 싶을 때는, `not` 키워드를 사용한다.

```js
expect(obj).not.toBe(sth);
```

### spy

어떤 메서드가 불렸는지를 추적해야 할 때는 스파이를 이용한다.

- 이미 존재하는 메서드를 추적할 때
```js
spyOn(obj, 'funcName');
```
- 목업용 스파이 함수를 생성할 때
```js
spy = jasmine.createSpy('test');
```

이렇게 만든 스파이는 `toHaveBeenCalled...` 계열 메서드를 이용해 추적할 수 있다.

```js
expect(spy).toHaveBeenCalled();
expect(spy).toHaveBeenCalledBefore(anotherSpy);
expect(spy).toHaveBeenCalledTimes(n);
expect(spy).toHaveBeenCalledWith(param1, param2, ...);
```

### `beforeEach`와 `afterEach`

위 함수들이 사용되었을 경우, 모든 `it` 함수는 각각 `beforeEach`와 `afterEach` 사이에서 동작하게 된다. 한 번 `it`이 실행될 때마다 `beforeEach`와 `afterEach`가 한 번씩 호출된다.

```js
describe('ModuleA', () => {
    beforeEach(() => {
        // ...
    });

    afterEach(() => {
        // ...
    });

    describe('funcA', () => {
        it('does something', () => {
            // ...
        });
    });

    // ...
});
```

모든 테스트가 공통으로 공유하는 프로세스가 있을 때 여기다 작성해주면 된다. 특히, ajax 테스트를 할 때 필수적이다.

## 활용

### ajax

jasmine은 ajax 통신을 위한 목업 객체를 제공한다. 객체에 대한 요청 처리는 물론, 그에 따른 response나 콜백 함수도 임의로 지정할 수 있다.

```js
let request;
let callbackSpy;

beforeEach(() => {
    jasmine.Ajax.install();
    callbackSpy = jasmine.createSpy('callback');
    obj.request(callbackSpy);
    request = jasmine.Ajax.requests.mostRecent();

    request.respondWith({
        status: 200,
        responseText: 'Test complete'
    });
});

afterEach(() => {
    jasmine.Ajax.uninstall()
});

it('sends HTTP request to /test', () => {
    expect(request.url).toBe('http://test');
});

it('runs callback if res received', () => {
    expect(callbackSpy).toHaveBeenCalled();
});

it('returns name text as callback parameter', () => {
    expect(callbackSpy).toHaveBeenCalledWith('Test complete');
});
```

### DOM 제어

프론트엔드 테스트 프레임워크인 만큼 DOM에 대한 테스트도 진행할 수 있다. 재밌는 점은 html 파일이 없어도 동작한다는 건데, 아마 내부적으로 사용하는 html 파일이 있는 것 같다.

```js
function test(el) {
    if(!(el instanceof HTMLElement)) {
        throw new Error('el is not HTMLElement');
    }
    el.innerHTML = 'Hello world';
}

let el;

beforeEach(() => {
    el = document.createElement('h1');
    document.getElementsByTagName('body')[0].appendChild(el);
});

it('throws an error when DOM does not exist in parameters', () => {
    expect(() => hello.print()).toThrowError();
});

it('prints hello to the DOM element', () => {
    hello.print(el);
    expect(el.innerHTML).toContain('Hello world');
});
```
