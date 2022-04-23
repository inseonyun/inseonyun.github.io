---
layout: post
title: 백준 5014_스타트링크 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-04-23T14:00:00-15:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://www.acmicpc.net/problem/5014](https://www.acmicpc.net/problem/5014)

## 문제 요구사항
---
> + 첫째 줄에 F, S, G, U, D가 주어진다. (1 ≤ S, G ≤ F ≤ 1000000, 0 ≤ U, D ≤ 1000000) 건물은 1층부터 시작하고, 가장 높은 층은 F층이다.
> + F : 건물 전체 층수, S : 현재 위치, G : 목적지, U : 위로 가는 층수, D : 아래로 가는 층수를 의미한다.
> + S에서 G까지 가는 데에 최단 경로를 구하시오.
> + 구할 수 없을 시 use the stairs를 출력하시오.

## 접근 방법
---
> + 일반적인 BFS 문제풀이 방식으로 접근하였고, 최단거리를 구해야하기 때문에 현재값에서 계속해서 더해나가는 식으로 계산했다. 아직까지 이유는 잘 모르겠으나, 현재 값 1부터 시작 후 출력 시 -1을 해야 문제 통과가 된다.... 이유가 뭘까,,,?
## 풀이 순서
---
> 1. F(건물 전체 층수), S(현재 위치), G(목적지), U(위로 가는 층수), D(아래로 가는 층수)를 차례로 입력 받는다.
> 2. BFS 수행
>     + 큐에 시작 위치 S를 넣는다.
>     + 큐가 비어있을 때까지 while문을 반복한다.
>     + 큐에 첫번째 원소 값을 변수(현재 위치)에 저장하고, 해당 값을 큐에서 꺼낸다.
>     + nextUp, Down 변수를 생성하고, 각각 현재 위치에서 U, -D를 더한 값을 저장한다.
>     + 해당 next 변수들이 층수 범위 안에 들고, floorDP의 next 인덱스 값이 0이면, floorDP next인덱스에 현재 층 + 1 값을 넣고 큐에 next 값을 넣는다.
>     + 이 과정을 반복 수행
> 3. BFS가 끝난 후 dp[G]가 0이면 구할 수 없는 것이므로 use the stairs를 출력, 아니라면 dp[G] - 1 값을 출력한다.


## 소스코드
---
~~~c++
#include <iostream>
#include <queue>
#include <cstring>

using namespace std;

// F : 건물 전체 층수, S : 현재 위치, G : 목적지, U : 위로 가는 층수, D : 아래로 가는 층수 
long long F, S, G, U, D;
long long floorDP[1000001];
void startLinkBFS() {
	floorDP[S] = 1;

	queue<int> q;

	q.push(S);

	while (!q.empty()) {
		int now = q.front();

		q.pop();

		if (now == G) {
			return;
		}

		int nextUp = now + U;
		int nextDown = now - D;

		if (nextUp <= F && floorDP[nextUp] == 0) {
			floorDP[nextUp] = floorDP[now] + 1;
			q.push(nextUp);
		}
		if (nextDown >= 1 && floorDP[nextDown] == 0) {
			floorDP[nextDown] = floorDP[now] + 1;
			q.push(nextDown);
		}
	}
}

void startLink() {
	cin >> F >> S >> G >> U >> D;

	memset(floorDP, 0, sizeof(floorDP));

	startLinkBFS();

	if (floorDP[G])
		cout << floorDP[G]-1 << "\n";
	else
		cout << "use the stairs\n";
}

int main() {
	ios::sync_with_stdio(false);
	cin.tie(NULL);

	startLink();

	return 0;
}
~~~

## 문제 풀이 결과
---
<img src="/assets/img/post-img/algorithm/2022-04-23-boj-5014-startLink/result.jpg">