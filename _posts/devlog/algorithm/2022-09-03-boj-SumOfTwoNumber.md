---
layout: post
title: 백준 3273_두 수의 합 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-09-03T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://www.acmicpc.net/problem/3273](https://www.acmicpc.net/problem/3273)

## 문제 요구사항
---
> + n개의 서로 다른 양의 정수 a1, a2, ..., an으로 이루어진 수열이 있다. 
> + ai의 값은 1보다 크거나 같고, 1000000보다 작거나 같은 자연수이다. 
> + 자연수 x가 주어졌을 때, ai + aj = x (1 ≤ i < j ≤ n)을 만족하는 (ai, aj)쌍의 수를 구하는 프로그램을 작성하시오.
> + 첫째 줄에 수열의 크기 n이 주어진다. 
> + 다음 줄에는 수열에 포함되는 수가 주어진다. 
> + 셋째 줄에는 x가 주어진다. (1 ≤ n ≤ 100000, 1 ≤ x ≤ 2000000)
> + 문제의 조건을 만족하는 쌍의 개수를 출력한다.

## 접근 방법
---
> + 해당 문제를 그대로 구현하려고 하면 시간 초과가 난다. -> 투 포인터를 사용해서 실행 시간을 줄여보도록 하자.

## 풀이 순서
---
> 1. 수열의 크기 n, 수열 원소 값, 타겟 x를 차례로 입력 받는다.
> 2. 입력 받은 수열을 오름차순 정렬한다.
> 3. left = 0, right = n -1로 정의한다.
> 4. while 문을 무한 반복하여 다음을 수행한다.
>     + left 값이 right 값보다 같거나 커지면 반복문 종료
>     + 수열의 left 인덱스, right 인덱스의 값을 더한다.
>     + 더한 값이 x와 같다면 result +=1 과 left +=1, right -=1을 수행하고 담으로 넘어간다.
>     + x보다 작다면 left +=1을 수행
>     + x보다 크다면 right -=1을 수행
>     + 이와 같은 작업 반복
> 5. result 값 출력

## 소스코드
---
~~~c++
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int n, x, result = 0;
vector<int> varr;

void input()
{
	cin >> n;

	for (int i = 0; i < n; i++) 
	{
		int a;
		cin >> a;

		varr.push_back(a);
	}

	cin >> x;
}

void solution()
{
	sort(varr.begin(), varr.end());

	int left = 0, right = n - 1;
	while (true) {
		if (left >= right) {
			break;
		}

		int sum = varr[left] + varr[right];

		if (sum == x) {
			result++;
			left++;
			right--;
		}
		else if (sum < x) {
			left++;
		}
		else {
			right--;
		}

	}

}

void output()
{
	cout << result;
}

int main() 
{
	ios::sync_with_stdio(false);
	cin.tie(0);
	cout.tie(0);

	input();
	solution();
	output();

	return 0;
}
~~~

## 문제 풀이 결과
---
<img src="/assets/img/post-img/algorithm/2022-09-03-boj-SumOfTwoNumber/result.jpg">