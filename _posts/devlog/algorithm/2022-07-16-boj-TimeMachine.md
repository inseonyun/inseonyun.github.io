---
layout: post
title: 백준 11657_타임머신 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-07-16T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://www.acmicpc.net/problem/11657](https://www.acmicpc.net/problem/11657)

## 문제 요구사항
---
> + N개의 도시가 있다. 그리고 한 도시에서 출발하여 다른 도시에 도착하는 버스가 M개 있다.
> + 각 버스는 A, B, C로 나타낼 수 있는데, A는 시작도시, B는 도착도시, C는 버스를 타고 이동하는데 걸리는 시간이다.
> + 시간 C가 양수가 아닌 경우가 있다. C = 0인 경우는 순간 이동을 하는 경우, C < 0인 경우는 타임머신으로 시간을 되돌아가는 경우이다.
> + 1번 도시에서 출발해서 나머지 도시로 가는 가장 빠른 시간을 구하는 프로그램을 작성하시오.
> + 첫째 줄에 도시의 개수 N (1 ≤ N ≤ 500), 버스 노선의 개수 M (1 ≤ M ≤ 6,000)이 주어진다.
> + 둘째 줄부터 M개의 줄에는 버스 노선의 정보 A, B, C (1 ≤ A, B ≤ N, -10,000 ≤ C ≤ 10,000)가 주어진다. 
> + 만약 1번 도시에서 출발해 어떤 도시로 가는 과정에서 시간을 무한히 오래 전으로 되돌릴 수 있다면 첫째 줄에 -1을 출력한다.
> + 그렇지 않다면 N-1개 줄에 걸쳐 각 줄에 1번 도시에서 출발해 2번 도시, 3번 도시, ..., N번 도시로 가는 가장 빠른 시간을 순서대로 출력한다. 만약 해당 도시로 가는 경로가 없다면 대신 -1을 출력한다.

## 접근 방법
---
> + 3개의 반복문을 중첩하여, 각각의 반복 인자를 거쳐가는 정점, 출발 정점, 도착 정점으로 사용하여 탐색한다. 이 때, 가장 바깥 반복 인자가 N의 값과 같아지면 싸이클을 돌게 되는 것이므로, checking 하도록 한다.
> + 추가 주의사항
>     + dist 변수를 long long 으로 선언하지 않으면 int 값 범위 초과로 인해 출력 초과가 발생한다.

## 풀이 순서
---
> 1. N(도시의 개수) M(버스 노선의 개수)을 입력 받는다
> 2. 전역 변수로 선언해둔 dist[501]를 N 크기만큼 INF(987654321) 값으로 초기화 한다.
> 3. M의 크기만큼 반복하여, a(출발 정점), b(도착 정점), c(가중치) 값을 입력 받아 map[a].push_back( {b, c} )로 값을 저장한다.
> 4. 3개의 반복문을 사용한다.
>     + i는 싸이클을 체크할 수 있는 반복문이다.
>     + j는 출발 정점을 의미 한다.
>     + k는 도착 정점을 의미 한다.
>     + dist[ map[ j ][ k ] ]  ( j 출발 k 도착) 값이 dist[ j ] + map[ j ][ k ] 값보다 크면 dist[ map [ j ][ k ] ]값을 갱신해준다.
>     + 이때, i값과 N 값이 같으면 싸이클을 도는 것이므로 cycle 변수에 true로 checking한다.
> 5. cycle이 true면 -1을 출력하고, 아니라면, i = 2부터, N 크기만큼 반복하여 dist의 정보를 출력한다. 이때, dist의 정보가 INF값이라면 -1을 출력하고 계속해서 출력한다.

## 소스코드
---
~~~c++
#include <iostream>
#include <vector>

#define INF 987654321

using namespace std;

// N : 도시의 개수, M : 버스 노선의 개수
int N, M;
vector<pair<int, int>> map[501];
long long dist[501] = { 0, };
bool cycle = false;
void input() {
	cin >> N >> M;

	// initialize
	for (int i = 1; i <= N; i++) {
		dist[i] = INF;
	}

	for (int i = 0; i < M; i++) {
		int A, B, C;
		cin >> A >> B >> C;

		map[A].push_back({B, C});
	}
}

void solution() {
	dist[1] = 0;

	for (int i = 1; i <= N; i++) {
		for (int j = 1; j <= N; j++) {
			for (int k = 0; k < map[j].size(); k++) {
				int next_cur = map[j][k].first;
				int next_cost = map[j][k].second;

				if (dist[j] != INF && dist[next_cur] > dist[j] + next_cost) {
					dist[next_cur] = dist[j] + next_cost;
					if (i == N)
						cycle = true;
				}
			}
		}
	}

}

void output() {
	if (cycle)
		cout << -1 << "\n";
	else {
		for (int i = 2; i <= N; i++) {
			if (dist[i] == INF)
				cout << -1 << "\n";
			else
				cout << dist[i] << "\n";
		}
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
---
<img src="/assets/img/post-img/algorithm/2022-07-16-boj-TimeMachine/result.jpg">