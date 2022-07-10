---
layout: post
title: 구름 [기본] 행복은 성적순이 아니잖아요 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-06-28T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
> + goorm : [https://level.goorm.io/](https://level.goorm.io/)
> + 해당 문제는 위 링크에서 ' [기본] 행복은 성적순이 아니잖아요' 로 검색하면 찾을 수 있습니다. -  [Direct URL](https://level.goorm.io/exam/147448/%EA%B8%B0%EB%B3%B8-%ED%96%89%EB%B3%B5%EC%9D%80-%EC%84%B1%EC%A0%81%EC%88%9C%EC%9D%B4-%EC%95%84%EB%8B%88%EC%9E%96%EC%95%84%EC%9A%94/quiz/1)


## 문제 요구사항
---
> + 첫째 줄에 구름이가 듣는 수업의 개수 t가 주어진다.
> + 둘째 줄부터 t줄동안 각 과목 별 전체 학생 수 l, 구름이의 등수 s, 과목별 A+ 성적 비율 n, 과목의 수행 평가 개수 k, 수행 평가 과락 기준 점수 m, 구름이가 k개의 수행 평가 중 취득한 점수 v가 k개 공백을 두고 주어진다.
> + A+ 성적 산출 방법
>     + 시험 성적이 전체 학생 n%보다 높아야 한다.
>     + 성적이 좋더라도 k개의 수행 평가 모두 m점보다 높아야 한다.
> + 구름이가 모든 과목에서 A+를 맞았다면 1을, 아니라면 0을 출력하시오

## 접근 방법
---
> + 문제에서 주어진 요구 사항대로 문제 풀이를 하면 된다.


## 풀이 순서
---
> 1. 구름이가 듣는 수업의 개수 t를 입력 받는다.
> 2. t 만큼 반복하여, 각 과목 별 전체 학생 수 l, 구름이의 등수 s, 과목별 A+ 성적 비율 n, 과목의 수행 평가 개수 k, 수행 평가 과락 기준 점수 m, 구름이가 k개의 수행 평가 중 취득한 점수 v를 입력 받는다.
>     + 이 때, 구름이가 취득한 점수 v가 하나라도 m이하면 flag에 false 값을 준다.
> 3. 조건 1에 해당하는 값 전체 학생 수 * n * 0.01을 구한다.
> 4. 구름이의 등수 s가 위에서 구한 값보다 크다면(등수가 더 낮은 것이므로) flag에 false 값을 준다.
> 5. flag가 false 라면 한 과목이라도 A+가 아닌 것이 되므로 반복문을 종료한다.
> 6. flag에 따라 1과 0 결과 값을 출력한다.

## 소스코드
---
~~~c++
#include <iostream>
#include <cmath>

using namespace std;

/*
*	규칙
*	시험 성적이 전체 학생 n%보다 높은 백분위
*	성적이 좋더라도 k개의 수행 평가 모두 m점보다 높아야 함
*/

int main() {
	int t;
	cin >> t;
	bool flag = true;
	for(int test_case = 0; test_case < t; test_case++) {
		int v[1000] = {0,};
		int total_student_cnt, goormi_rank, n, k, m;
		cin >> total_student_cnt >> goormi_rank >> n >> k >> m;

		for(int i = 0; i < k; i++) {
			cin >> v[i];

			if(v[i] <= m)
				flag = false;
		}

		// 랭크 구함
		double igeobodankeoyaham = total_student_cnt * n * 0.01;
		int igeobodankeoyaham2 = floor(igeobodankeoyaham);
		if(goormi_rank > igeobodankeoyaham2)
			flag = false;

		if(!flag)
			break;

	}

	if(!flag)
		cout << 0;
	else
		cout << 1;

	return 0;
}
~~~

## 문제 풀이 결과
---
<img src="/assets/img/post-img/algorithm/2022-06-28-grm-NoHappyScore/result.jpg">