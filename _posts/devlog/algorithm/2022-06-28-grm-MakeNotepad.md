---
layout: post
title: 구름 [기본] 단어장 만들기 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-06-28T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
> + goorm : [https://level.goorm.io/](https://level.goorm.io/)
> + 해당 문제는 위 링크에서 ' [기본] 단어장 만들기' 로 검색하면 찾을 수 있습니다. -  [Direct URL](https://level.goorm.io/exam/148704/%EA%B8%B0%EB%B3%B8-%EB%8B%A8%EC%96%B4%EC%9E%A5-%EB%A7%8C%EB%93%A4%EA%B8%B0/quiz/1)

## 문제 요구사항
---
> + 첫째 줄에 단어의 개수 n과, 단어의 위치 k가 공백을 두고 주어진다.
> + 둘째 줄부터 n줄 동안 단어가 주어진다. 
>     + 단어는 영어 소문자로 이루어진 1 이상 100 이하의 길이를 가진 영단어 이다.
> + 섞여 있는 단어를 정렬하고, k번째 위치해 있는 단어를 출력하시오.
>     + 단어 정렬 기준은 길이가 짧을수록 앞에 있고, 길이가 같다면, 사전 순으로 정렬하도록 한다.

## 접근 방법
---
> + 문자열, 정렬 문제로 algorithm 라이브러리의 sort 함수에 greater 옵션 값을 사용자 함수로 줘서 문제에 맞게 정렬하여 해당 k위치의 인덱스 값을 출력하면 된다.


## 풀이 순서
---
> 1. 단어의 개수 n과 단어의 위치 k를 입력 받는다.
> 2. for문을 n만큼 돌며 단어를 입력 받아 벡터에 저장한다.
> 3. sort 수행
>     + 문자열 길이를 기준으로 내림차순 정렬한다.
>     + 만약, 길이가 같다면, a < b (문자열은 부등호를 이용해 사전순 정렬이 가능하다.)로 return 한다.
> 4. 결과값에 벡터의 k -1 (k는 1부터 시작하므로) 값을 대입한다.
> 5. 결과값 출력

## 소스코드
---
~~~c++
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

bool comp(string a, string b) {
	if (a.length() == b.length()) {
		return a < b;
	}
	return a.length() < b.length();
}

int main() {
	int n, target;
	cin >> n >> target;

	string result = "";
	vector<string> string_arr;
	for (int i = 1; i <= n; i++) {
		string str;
		cin >> str;
		string_arr.push_back(str);
	}
	sort(string_arr.begin(), string_arr.end(), comp);
	result = string_arr[target - 1];

	cout << result;
	return 0;
} 
~~~

## 문제 풀이 결과
---
<img src="/assets/img/post-img/algorithm/2022-06-28-grm-MakeNotepad/result.jpg">