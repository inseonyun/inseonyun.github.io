---
layout: post
title: 프로그래머스 숫자 문자열과 영단어 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-05-04T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://programmers.co.kr/learn/courses/30/lessons/81301](https://programmers.co.kr/learn/courses/30/lessons/81301)

## 문제 요구사항
---
> + 문자열이 input으로 주어진다.
> + 문자열은 숫자의 일부 자릿수를 영단어로 나타내고 있다. -> "one4seveneight"
> + 해당 문자열을 숫자로 나타내라.

## 접근 방법
---
> + 문자열 관련 문제이다. 나는 시간 단축을 위해 foreach문 수행 중 문자를 만났을 때 tmp 문자열의 길이가 3 이상일 때부터 미리 만들어둔 문자열 배열과 비교하여 숫자로 변환하게 하였다. 또, 숫자를 만났을 때 먼저 continue가 되도록 하였고, 이 문제는 라이브러리 함수만 잘 사용할 수 있다면 쉽게 풀이가 가능하다.

## 풀이 순서
---
> 1. 문자열 s를 매개변수로 받는다.
> 2. 문자열 s를 가지고 foreach문을 수행한다.
> 3. 문자가 숫자이면 result 문자열에 더하고 continue
> 4. 문자이면 미리 선언해둔 tmp 변수에 더한다.
> 5. tmp 변수의 길이가 3 이상이면, 숫자 문자열(one, two,,,)과 비교하는 for문 수행
> 6. 숫자 문자열과 같은 경우 해당하는 i 값을 result에 더하고, tmp를 초기화 한다.
> 7. 이와 같은 작업 반복 수행

## 소스코드
---
~~~c++
#include <string>

using namespace std;

int solution(string s) {
    int answer = 0;
    string arr[10] = {
		"zero",
		"one",
		"two",
		"three",
		"four",
		"five",
		"six",
		"seven",
		"eight",
		"nine"
	};
    string result = "";
	string tmp = "";

	for(char c : s) {
		if (c >= '0' && c <= '9') {
			result += c;
			continue;
		}
		tmp += c;

		if (tmp.length() >= 3) {
			for (int i = 0; i < 10; i++) {
				if (tmp.compare(arr[i]) == 0) {
					result += to_string(i);
					tmp = "";
					break;
				}
			}
		}
	}
    answer = stoi(result);
    return answer;
}
~~~

## 문제 풀이 결과
---
<img src="/assets/img/post-img/algorithm/2022-05-03-pgs-StringNumberAndEng/result.jpg">