---
layout: post
title: 구름 [00증권] 주식투자자A 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-06-28T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
> + goorm : https://level.goorm.io/
> + 해당 문제는 위 링크에서 ' [00증권] 주식투자자 A' 로 검색하면 찾을 수 있습니다. -  [Direct URL](https://level.goorm.io/exam/150257/00%EC%A6%9D%EA%B6%8C-%EC%A3%BC%EC%8B%9D%ED%88%AC%EC%9E%90%EC%9E%90-a/quiz/1)

## 문제 요구사항
---
> + 첫째 줄에 보유한 주식 종목 N이 입력 된다.
> + 둘째 줄부터 N줄에 걸쳐 각 줄에 i번 종목의 주식 보유량 T와 주식의 현재 단가 C가 공백을 두고 주어진다.
> + 주어진 N개의 주식 정보를 이용하여 다음과 같이 정리한다.
>     + T와 C를 곱한다.
>     + 결과 값 소수 2번째 자리부터는 버린다.
> + 결과 값이 클수록 우선으로 팔도록 한다.
> + 만약, 결과 값이 같다면, 종목 번호 i가 낮을수록 우선적으로 판매 한다.
> + 팔아야하는 주식 종목을 번호 별로 공백을 두고 나열하시오.

## 접근 방법
---
> + 문제에서 주어진 T와 C를 갖고 결과 값을 만드는 게 까다로울 수 있는 문제다. floor 함수를 이용해서 요구하는 결과 값을 만든 후, sort 함수를 이용하여 정렬한 뒤 종목 번호를 출력한다.


## 풀이 순서
---
> 1. 주식 종목의 개수 N을 입력 받는다.
> 2. N개의 주식 보유량 T, 주식 현재 단가 C를 입력 받는다.
> 3. T와 C를 곱한 뒤, 그 값에 10.f을 곱하고, floor 함수를 통해 소수점을 모두 버린 뒤, 다시 10.f로 나눠준다.
> 4. 값을 pair<int, double> 벡터에 넣어준다. 
>     + int는 종목 번호, double은 결과 값
> 5. sort 수행
>     + 결과 값이 같다면, 종목 번호가 작은 것 bool을 반환
>     + 결과 값이 큰 것 bool을 반환
> 6. 벡터의 first 값들을 공백을 두고 출력하며, 마지막 인덱스에선 공백 출력 안 하게 함

## 소스코드
---
~~~c++
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

bool comp(pair<int, double> a, pair<int, double> b) {
	if (a.second == b.second)
		return a.first < b.first;

	return a.second > b.second;
}

int main() {
	int jusik_cnt;
	cin >> jusik_cnt;
	vector<pair<int, double>> score;
	for (int i = 0; i < jusik_cnt; i++) {
		double price;
		int cnt;
		cin >> price >> cnt;

		double tmp = price * cnt;
		tmp = floor(tmp * 10.f) / 10.f;

		score.push_back({ i + 1, tmp });
	}
	sort(score.begin(), score.end(), comp);

	for (int i = 0; i < score.size(); i++) {
		cout << score[i].first;
		if (i == score.size() - 1)
			break;
		cout << " ";
	}

	return 0;
}
~~~

## 문제 풀이 결과
---
<img src="/assets/img/post-img/algorithm/2022-06-28-grm-JusikTujajaA/result.jpg">