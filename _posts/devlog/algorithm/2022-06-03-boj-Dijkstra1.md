---
layout: post
title: 백준 1753_최단 경로 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-06-03T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://www.acmicpc.net/problem/1753](https://www.acmicpc.net/problem/1753)

## 문제 요구사항
---
> + 방향 그래프가 주어지면 주어진 시작점에서 다른 모든 정점으로의 최단 경로를 구하는 프로그램을 작성하시오. 
> + 단, 모든 간선의 가중치는 10 이하의 자연수이다.
> + 첫째 줄에 정점의 개수 V와 간선의 개수 E가 주어진다. (1 ≤ V ≤ 20,000, 1 ≤ E ≤ 300,000) 
> + 둘째 줄에는 시작 정점의 번호 K(1 ≤ K ≤ V)가 주어진다.
> + 셋째 줄부터 E개의 줄에 걸쳐 각 간선을 나타내는 세 개의 정수 (u, v, w)가 순서대로 주어진다.
> + 이는 u에서 v로 가는 가중치 w인 간선이 존재한다는 뜻이다.
> + 서로 다른 두 정점 사이에 여러 개의 간선이 존재할 수도 있음에 유의한다.
> + 첫째 줄부터 V개의 줄에 걸쳐, i번째 줄에 i번 정점으로의 최단 경로의 경로 값을 출력한다.
> + 시작점 자신은 0으로 출력하고, 경로가 존재하지 않는 경우에는 INF를 출력하면 된다.

## 접근 방법
---
> + 우선순위큐를 이용하여 다익스트라 구현하여 최단 경로 구함

## 풀이 순서
---
> 1. 문제에서 주어지는 정점, 간선의 개수, 시작점을 입력 받는다.
> 2. 간선 정보를 vec 변수에 입력 받는다.
>     + vec는 [정점 번호] [ pair<간선 목적지, 가중치> ] 로 구성된다.
> 3. 우선 순위 큐를 선언하여 시작점의 가중치는 0으로 설정하고, 우선 순위 큐가 빌 때까지 while문을 반복한다.
>     + 큐의 top().first는 현재 정점 위치까지의 비용이다. 
>     + 큐의 top().second는 현재 정점의 위치이다.
>     + 해당 top().second 정점에 있는 간선들의 개수만큼 for문을 반복한다.
>         + next는 간선 정보 vec에 [top().second][i].first의 값으로 해당 간선의 목적지 정점 값이다.
>         + next_cost는 간선 정보 vec에 [top().second][i].second의 값으로 해당 간선의 가중치 값이다.
>         + dist[간선 목적지 정점] 값이 현재 정점까지의 비용 + 해당 간선의 가중치보다 크면 값을 갱신해준다.
>         + 우선 순위 큐에 dist[next] 값에 음수를 취하여 넣어준다. pq.push( { -dist[next], next } )
> 4. 이와 같은 작업 반복
> 5. 정점의 개수만큼 for문을 반복하여 각 정점까지의 최단 경로를 출력한다. 이때, 최단 경로가 아니라면 INF를 출력한다.

## 소스코드
---
~~~c++
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

#define INF 987654321

int V, E, startX;
int dist[20010] = { 0, };
vector<pair<int, int>> vec[20010];

void input() {
	cin >> V >> E;
	cin >> startX;

	for (int i = 1; i <= E; i++) {
		int a, b, c;
		cin >> a >> b >> c;

		vec[a].push_back({ b, c });
	}
	for (int i = 1; i <= V; i++) {
		dist[i] = INF;
	}
}

void solution() {
	priority_queue<pair<int, int>> pq;
	pq.push({ 0, startX });
	dist[startX] = 0;
	while (!pq.empty()) {
		int cost = -pq.top().first;
		int cur = pq.top().second;

		pq.pop();

		for (int i = 0; i < vec[cur].size(); i++) {
			int next = vec[cur][i].first;
			int next_cost = vec[cur][i].second;

			if (dist[next] > cost + next_cost) {
				dist[next] = cost + next_cost;
				pq.push({ -dist[next], next });
			}
		}
	}
}

void output() {
	for (int i = 1; i <= V; i++) {
		if (dist[i] == INF)
			cout << "INF\n";
		else
			cout << dist[i] << "\n";
	}
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
<img src="/assets/img/post-img/algorithm/2022-06-03-boj-Dijkstra1/result.jpg">