# Python Standard Input 파일로 받기

`input()`을 사용할 때, 아래 코드를 추가해주면 파일을 이용해서 입력을 대신 받는다.

```python
import sys

sys.stdin = open('file.txt', 'r')

a = input() # file.txt의 첫 줄
b = input() # file.txt의 둘째 줄
c = sys.stdin.readline() # file.txt의 셋째 줄. \n이 삭제되지 않으므로 rstrip()을 사용할 것.
```
