---
layout: post
title: 백준 2644_촌수 계산 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-04-22T14:00:00-15:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://www.acmicpc.net/problem/2644](https://www.acmicpc.net/problem/2644)

## 문제 요구사항
---
> + 첫째 줄에는 사람 수 n이 주어진다. (1 ≤ n ≤ 100)
> + 둘째 줄에는 촌수를 계산해야하는 두 사람의 번호가 주어진다.
> + 셋째 줄에는 부모 자식 간의 관계의 개수 m이 주어진다.
> + 넷째 줄부터는 부모 자식간의 관계를 나타내는 두 번호가 주어진다.
> + 이때, 각 사람의 부모는 최대 한 명만 주어진다.
> + 촌수를 출력하면 되며, 계산할 수 없을 시 -1을 출력한다.

## 접근 방법
---
> + 촌수를 계산해야 하므로 좌표를 check하며 방문했는지를 check 하는게 아닌, dp를 사용해서 BFS의 최단거리 계산 방식으로 접근하였다.

## 풀이 순서
---
> 1. n(사람 수), a(계산 시작 번호), b(계산 끝 번호), m(관계 개수), family(가족 관계 배열)를/을 입력 받는다.
> 2. 시작점 a를 시작으로 BFS 수행
>     + 큐에 a(시작 좌표)를 넣는다.
>     + 큐가 비어있을 때까지 while문을 반복한다.
>     + 큐의 첫번째 원소(현재 좌표)를 변수에 저장하고, 해당 값을 큐에서 꺼낸다.
>     + 1부터 n(사람 수)까지 for문을 실행하면서 가족 관계를 담고 있는 family 2차원 배열과 dp 1차원 배열을 이용하여, dp[i]값에 dp[현재좌표] + 1한 값을 넣고, 큐에 i값을 넣는다.
>     + 이 과정을 반복 수행
> 3. BFS가 끝난 후 dp[b]가 0이면 가족 관계가 아니므로 -1을 출력, 아니라면 dp[b] 값을 출력한다.

## 소스코드
---
~~~c++
#include <iostream>
#include <queue>
#include <vector>
#include <cstring>

using namespace std;

int n, m, a, b; // n = 사람 수, m = 부모 자식 간의 관계 수, a와 b의 촌수 계산
int family[101][101];
int dp[101];
void calcDegreeOfKinshipBFS(int start) {
	queue<int> q;
	q.push(start);

	while (!q.empty()) {
		int now = q.front();

		q.pop();

		for (int i = 1; i <= n; i++) {
			if (family[now][i] == 1 && dp[i] == 0) {
				dp[i] = dp[now] + 1;
				q.push(i);
			}
		}
	}
}

void calcDegreeOfKinship() {
	cin >> n;
	cin >> a >> b;
	cin >> m;

	memset(family, 0, sizeof(family));
	memset(dp, 0, sizeof(dp));

	for (int i = 0; i < m; i++) {
		int parent, child;
		cin >> parent >> child;

		family[parent][child] = 1;
		family[child][parent] = 1;
	}

	calcDegreeOfKinshipBFS(a);

	if (dp[b] == 0)
		cout << "-1\n";
	else
		cout << dp[b] << "\n";
}

int main() {
	ios::sync_with_stdio(false);
	cin.tie(NULL);

	calcDegreeOfKinship();

	return 0;
}
~~~

## 문제 풀이 결과
---
<img src="/assets/img/post-img/algorithm/2022-04-22-boj-2644-calcDegreeOfKinship/result.jpg">