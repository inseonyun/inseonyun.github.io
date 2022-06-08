---
layout: post
title: 백준 1504_특정한 최단 경로 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-06-07T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://www.acmicpc.net/problem/1504](https://www.acmicpc.net/problem/1504)

## 문제 요구사항
---
> + 방향성이 없는 그래프가 주어진다. 
> + 정점 1에서 필수로 거쳐야하는 정점을 거친 후 N 정점으로 가는 최단 경로를 구하는 프로그램을 작성하시오. 
> + 첫째 줄에 정점의 개수 N과 간선의 개수 E가 주어진다. (2 ≤ N ≤ 800, 0 ≤ E ≤ 200,000)
> + 둘째 줄부터 E개의 줄에 걸쳐서 세 개의 정수 a, b, c가 주어진다.
>     + a번 정점에서 b번 정점까지 양방향 길이 존재하며, 그 거리가 c라는 뜻이다. (1 ≤ c ≤ 1,000)
> + 다음 줄에는 반드시 거쳐야 하는 두 개의 서로 다른 정점 번호 v1과 v2가 주어진다. 
>     + (v1 ≠ v2, v1 ≠ N, v2 ≠ 1) 임의의 두 정점 u와 v사이에는 간선이 최대 1개 존재한다.
> + 첫째 줄에 두 개의 정점을 지나는 최단 경로의 길이를 출력한다.
> + 그러한 경로가 없을 때에는 -1을 출력한다.

## 접근 방법
---
> + 우선순위큐를 이용하여 다익스트라 구현하여 최단 경로 구함, 필수로 거쳐야하는 정점의 최단 경로는 1~필수 정점1, 필수 정점1~필수 정점2, 필수 정점2~N까지의 최단경로를 각각 구해 더해준다. 이때, 최단 경로를 구하는 것이므로, 필수 정점 1과 2 중 minimum인 경로를 택해야 한다는 것을 유의한다.

## 풀이 순서
---
> 1. 문제에서 주어지는 정점, 간선의 개수를 입력 받는다.
> 2. 간선 정보를 map 변수에 입력 받는다.
>     + map은 [정점 번호] [ pair< 간선 목적지, 가중치 > ] 로 구성된다.
> 3. 우선 순위 큐를 선언하여 시작점 1의 가중치는 0으로 설정하고, 우선 순위 큐가 빌 때까지 while문을 반복한다.
>     + 큐의 top().first는 현재 정점 위치까지의 비용이다. 
>     + 큐의 top().second는 현재 정점의 위치이다.
>     + 해당 top().second 정점에 있는 간선들의 개수만큼 for문을 반복한다.
>         + next는 간선 정보 map에 [top().second][i].first의 값으로 해당 간선의 목적지 정점 값이다.
>         + next_cost는 간선 정보 map에 [top().second][i].second의 값으로 해당 간선의 가중치 값이다.
>         + dist[간선 목적지 정점] 값이 현재 정점까지의 비용 + 해당 간선의 가중치보다 크면 값을 갱신해준다.
>         + 우선 순위 큐에 dist[next] 값에 음수를 취하여 넣어준다. pq.push( { -dist[next], next } )
> 4. 이와 같은 작업 반복
> 5. 다음과 같은 부분 최단 경로를 구한다.
>     + 1부터 필수 정점 v1, 1부터 필수 정점 v2까지의 최단 경로를 구한다.
>     + v1부터 v2까지의 최단 경로, v1부터 N까지의 최단 경로를 구한다.
>     + v2부터 N까지의 최단 경로를 구한다.
> 6. res 값에 INF(임의 무한대 값)을 넣고, min 함수를 사용하여 위에서 구한 최단 경로들을 아래와 같이 더하여 구한다.
>     + 경로 : 1 -> v1 -> v2 -> N
>     + 경로 : 1 -> v2 -> v1 -> N
> 7. 문제에서 요구하는 것은 1(시작)에서 N(종료)까지의 경로 중, v1과 v2는 필수로 거치는 최단 경로를 구하는 것이다.
> 8. 해당 경로들을 res와 비교하여 최솟값을 res에 넣어 비교한 후, res값이 INF면 -1을, 아니라면 res값을 출력하도록 한다.

## 소스코드
---
~~~c++
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

#define INF 987654321

vector<pair<int, int>> map[801];
int dist[801] = { 0, };
int N, E;
int v1, v2;

void initializeDist() {
	for (int i = 0; i < 801; i++) {
		dist[i] = INF;
	}
}

void input() {
	cin >> N >> E;

	for (int i = 0; i < E; i++) {
		int a, b, c;
		cin >> a >> b >> c;

		map[a].push_back({ b, c });
		map[b].push_back({ a, c });
	}

	cin >> v1 >> v2;


}

void solution(int startX) {
	priority_queue<pair<int, int>> pq;
	pq.push({ 0, startX });
	dist[startX] = 0;

	while (!pq.empty()) {
		int cost = -pq.top().first;
		int cur = pq.top().second;

		pq.pop();

		for (int i = 0; i < map[cur].size(); i++) {
			int next = map[cur][i].first;
			int next_cost = map[cur][i].second;

			if (dist[next] > cost + next_cost) {
				dist[next] = cost + next_cost;
				pq.push({ -dist[next], next });
			}
		}
	}
}

int main() {
	ios::sync_with_stdio(false);
	cin.tie(0);
	cout.tie(0);

	input();

	initializeDist();
	solution(1);
	int startToV1 = dist[v1];
	int startToV2 = dist[v2];

	initializeDist();
	solution(v1);
	int V1ToV2 = dist[v2];
	int V1ToN = dist[N];

	initializeDist();
	solution(v2);
	int V2ToN = dist[N];

	int res = INF;
	res = min(res, startToV1 + V1ToV2 + V2ToN);
	res = min(res, startToV2 + V1ToV2 + V1ToN);

	if (res >= INF || V1ToV2 >= INF) {
		cout << -1;
	}
	else {
		cout << res;
	}

	return 0;
}
}
~~~

## 문제 풀이 결과
<img src="/assets/img/post-img/algorithm/2022-06-07-boj-Dijkstra2/result.jpg">