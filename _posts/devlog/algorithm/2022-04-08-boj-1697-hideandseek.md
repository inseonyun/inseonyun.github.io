---
layout: post
title: 백준 1697_숨바꼭질 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-04-12T14:00:00-15:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://www.acmicpc.net/problem/1697](https://www.acmicpc.net/problem/1697)

## 문제 요구사항
---
> + 맵은 1차원으로 되어있고, 수빈이 좌표 N(0 ≤ N ≤ 100,000), 동생 좌표 K(0 ≤ K ≤ 100,000)가 input으로 주어지게 된다.
> + 수빈이는 1초에 N + 1, N - 1, N * 2 이 세 가지 방법으로 이동할 수 있게 된다.
> + 이때, 수빈이가 동생을 찾는 가장 빠른 시간을 구하여라

## 접근 방법
---
+ 기본적인 BFS 틀은 초기 큐에 수빈이 좌표 N을 넣고, 큐가 비어있을 때까지 반복하며,  동생을 찾는 방법을 생각했다. 이렇게만 짜고 빌드했을 때, BFS의 특징인 최단 경로(시간)이 나오지 않았고, 여기에 반복문 코드를 추가해야 된다는 것을 알아차렸다.

## 풀이 순서
---
> 1. 초기 수빈이의 좌표를 큐에 넣는다.
> 2. 무한 반복문 안에서 q의 사이즈를 따로 변수에 저장한다.
> 3. 해당 q 사이즈 만큼 반복문을 실행한다.
> 4. 이때, 반복문 안에서는 기본 BFS 방식을 진행한다. (원소 꺼냄 - 좌표 check - 좌표 + @ 한 값 q에 푸시)
> 5. 위와 같은 반복문이 끝나면 찾는 시간을 + 1 한다.

## 소스코드
---
~~~c++
#include <iostream>
#include <queue>
#include <cstring>

using namespace std;

int hideAndSeekMap[100000];
bool checkHideAndSeek[100000];
int find_time = 0;
int N, K;
void hideAndSeekBFS() {
	queue<int> q;
	q.push(N);

	while (true) {
		int q_size = q.size();

		for (int i = 0; i < q_size; i++) {
			int xx = q.front();
			q.pop();

			checkHideAndSeek[xx] = true;

			if (xx == K)
				return;

			if (xx + 1 <= K && checkHideAndSeek[xx + 1] == false) {
				q.push(xx + 1);
			}
			if (xx - 1 >= 0 && checkHideAndSeek[xx - 1] == false) {
				q.push(xx - 1);
			}
			if (xx * 2 <= K && checkHideAndSeek[xx * 2] == false) {
				q.push(xx * 2);
			}
		}
		find_time++;
	}

}

void hideAndSeek() {
	memset(hideAndSeekMap, 0, sizeof(hideAndSeekMap));
	memset(checkHideAndSeek, false, sizeof(checkHideAndSeek));
	
	cin >> N >> K;

	hideAndSeekBFS();

	cout << find_time;
}

void main() {
	hideAndSeek();
}
~~~

## 문제 풀이 결과
---
![image](https://user-images.githubusercontent.com/84364741/162888804-fbd19e01-28f5-45c6-84a2-30079bf2c8b1.png)