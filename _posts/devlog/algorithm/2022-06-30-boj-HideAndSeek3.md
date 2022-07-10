---
layout: post
title: 백준 13549_숨바꼭질3 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-06-30T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://www.acmicpc.net/problem/13549](https://www.acmicpc.net/problem/13549)

## 문제 요구사항
---
+ 수빈이는 현재 점 N(0 ≤ N ≤ 100,000)에 있고, 동생은 점 K(0 ≤ K ≤ 100,000)에 있다.
+ 수빈이는 걷거나 순간이동을 할 수 있다.
    + 만약, 수빈이의 위치가 X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다.
    + 순간이동을 하는 경우에는 0초 후에 2*X의 위치로 이동하게 된다.
+ 수빈이와 동생의 위치가 주어졌을 때, 수빈이가 동생을 찾을 수 있는 가장 빠른 시간이 몇 초 후인지 구하는 프로그램을 작성하시오.
+ 첫 번째 줄에 수빈이가 있는 위치 N과 동생이 있는 위치 K가 주어진다. N과 K는 정수이다.

## 접근 방법
---
+ 이전에 다익스트라 최단 경로 공부할 때 한 번 푼 문제이나 풀 줄을 몰라 검색해서 풀었던 것 같다. 우선순위 큐를 이용해서 수빈이가 동생을 찾는 최단 시간을 구하면 된다.

## 풀이 순서
---
1. 수빈이의 위치 N과 동생의 위치 K를 입력 받는다.
2. map의 모든 인덱스의 값을 INF(987654321) 값으로 초기화 한다.
3. 우선순위 큐 pq를 pair로 생성하여, { 걸린 시간, 정점 } 으로 구성한다.  -> 걸린 시간을 first로 둬야 최소 횟수로 우선 탐색하기 때문
4. pq에 0 (시작 시간), N (초기 수빈이 위치) 값을 넣고, map[N]에 0을 넣어 해당 위치까지 오는데 걸린 시간을 기록 한다.
5. pq가 빌 때까지 while 문을 반복하여 수행한다.
    + pq의 top()의 첫 번쨰 원소에 -값을 곱해 걸린 시간의 값을 가져온다.
    + pq의 top()의 두 번째 원소 현재 위치 값을 가져온다.
    + pq.pop()
    + 만약 현재 위치까지 걸린 시간이 map[ 현재 위치 ] 값보다 크다면 continue 한다.
    + 수빈이의 이동 방식 중 하나인 순간이동 했을 때의 탐색을 수행한다.
    + 이 때, 최소 시간부터 우선 탐색할 수 있도록, sec에 음수를 취하고 pq에 넣어준다.
    + 수빈이의 이동 방식 중 하나인 걸었을 때의 탐색을 수행한다.
    + 이 때도 마찬가지로, sec에 음수를 취하고 pq에 넣어준다.
6. 이와 같은 작업 반복
7. map[ K (동생의 위치) ] 값을 출력

## 소스코드
---
~~~c++
#include <iostream>
#include <queue>

using namespace std;

#define INF 987654321

int N, K;
int map[100000];
int dx[] = { -1, 1 };
void input() {
	cin >> N >> K;

	// ÃÊ±âÈ­
	for (int i = 0; i < 100002; i++) {
		map[i] = INF;
	}
}

void solution() {
	priority_queue<pair<int, int>> pq;

	pq.push({ 0, N });
	map[N] = 0;

	while (!pq.empty()) {
		int sec = -pq.top().first;
		int xx = pq.top().second;

		pq.pop();

		if (sec > map[xx])
			continue;

		if (xx * 2 >= 0 && xx * 2 <= 100000 && map[xx * 2] > sec) {
			map[xx * 2] = sec;
			pq.push({ -sec, xx * 2 });
		}

		for (int i = 0; i < 2; i++) {
			int nx = xx + dx[i];
			int ns = sec + 1;
			if (nx >= 0 && nx <= 100000) {
				if (map[nx] > ns) {
					map[nx] = ns;
					pq.push({ -ns, nx });
				}
			}
		}
	}
}

void output() {
	cout << map[K];
}

int main() {
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
<img src="/assets/img/post-img/algorithm/2022-06-30-boj-HideAndSeek3/result.jpg">