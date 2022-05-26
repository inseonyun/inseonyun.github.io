---
layout: post
title: 백준 16928_뱀과 사다리 게임 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-05-26T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://www.acmicpc.net/problem/16928](https://www.acmicpc.net/problem/16928)

## 문제 요구사항
---
> + 정육면체 주사위를 사용하며, 주사위의 각 면에는 1부터 6까지 수가 하나씩 적혀있다. 
> + 총 100개의 칸으로 나누어져 있는 보드판에서 진행된다. 
> + 보드판에는 1부터 100까지 수가 하나씩 순서대로 적혀져 있다.
> + 주사위를 굴려 나온 수만큼 이동해야 한다.
>     + 예를 들어, 플레이어가 i번 칸에 있고, 주사위를 굴려 나온 수가 4라면, i+4번 칸으로 이동해야 한다.
> + 게임의 목표는 1번 칸에서 시작해서 100번 칸에 도착하는 것이다.
> + 게임판의 상태가 주어졌을 때, 100번 칸에 도착하기 위해 주사위를 굴려야 하는 횟수의 최솟값을 구해보자.

## 접근 방법
---
> + 문제에서 요구하는 것은 100번 칸에 도착하기 위해 주사위를 굴려야 하는 횟수의 최솟값을 구하는 것이다.
> + 그 말은 즉, 1~6까지의 값을 현재 위치에서 더해가며, 사다리, 뱀 등을 이용하여, dist 값을 계속 갱신하며 완전 탐색하여, 100 이상의 수가 될 때까지 반복하는 것이다.

## 풀이 순서
---
> 1. 문제에서 주어진 N(사다리 개수), M(뱀의 개수)를 입력 받는다.
> 2. 보드판의 크기(101)만큼 Map 배열을 각 인덱스 값으로 초기화 하고, 가중치를 더해나갈 dist 배열은 모든 인덱스를 -1로 초기화 한다. 
> 3. N과 M(사다리 개수와 뱀의 개수)만큼 반복하여 사다리와 뱀 정보를 하나의 배열(Map)에 입력 받는다
> 4. BFS 수행
>    + queue 생성 및 startX( 1 ) 삽입, dist[startX] = 0
>    + xx 변수에 queue 첫 번째 원소 값 대입, 큐 pop()
>    + for문 1~6 반복
>        + nx 변수에 xx + i 값 대입
>        + 만약 nx 변수가 100보다 크면 return
>        + nx 변수에 map[nx] 값 대입 -> 이미 각 인덱스 값과 사다리, 뱀 정보로 초기화를 해줬기 때문에 사다리, 뱀이 아니라면 각 인덱스 값 그대로 들어가 있음
>        + dist[nx]가 -1이면 방문하지 않은 것으로, dist[xx] (현재 위치 가중치 값) + 1을 넣어주고, queue에 nx 값을 push 함.
> 5. 이와 같은 작업 반복
> 6. dist의 100번째 인덱스의 값을 출력하여 결과 출력

## 소스코드
---
~~~c++
#include <iostream>
#include <queue>

using namespace std;

int N, M;
int map[101];
int dist[101];
void input() {
	cin >> N >> M;
	for (int i = 0; i < sizeof(map)/sizeof(int); i++) {
		map[i] = i;
		dist[i] = -1;
	}

	// 사다리, 뱀 정보 입력 받음
	for (int i = 0; i < N + M; i++) {
		int a, b;
		cin >> a >> b;

		map[a] = b;
	}
}

void BFS(int startX) {
	queue<int> q;
	q.push(startX);
	dist[startX] = 0;
	while (!q.empty()) {
		int xx = q.front();

		q.pop();

		for (int i = 1; i <= 6; i++) {
			int nx = xx + i;
			if (nx > 100) {
				return;
			}
			nx = map[nx];
			if (dist[nx] == -1) {
				dist[nx] = dist[xx] + 1;
				q.push(nx);
			}
		}

	}
}

void output() {
	cout << dist[100];
}

int main() {
	ios::sync_with_stdio(false);
	cin.tie(0);
	cout.tie(0);

	input();
	BFS(1);
	output();

	return 0;
}
~~~

## 문제 풀이 결과
---
<img src="/assets/img/post-img/algorithm/2022-05-26-boj-SnakeAndLadderGame/result.jpg">