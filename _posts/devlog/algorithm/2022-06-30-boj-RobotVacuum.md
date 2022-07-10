---
layout: post
title: 백준 14503_로봇 청소기 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-06-30T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://www.acmicpc.net/problem/14503](https://www.acmicpc.net/problem/14503)

## 문제 요구사항
---
> + 로봇 청소기가 있는 장소는 N×M 크기의 직사각형으로 나타낼 수 있으며, 1×1 크기의 정사각형 칸으로 나누어져 있다.
> + 각각의 칸은 벽( 1 ) 또는 빈 칸 ( 0 )이다.
> + 청소기는 바라보는 방향이 있으며, 이 방향은 동, 서, 남, 북 중 하나다.
> + 지도의 북쪽에서부터 r번째, 서쪽에서부터 c번째로 위치한 칸은 (r, c)로 나타낼 수 있다.
> + 로봇 청소기는 다음과 같이 작동한다.
>     + 1 현재 위치를 청소한다.
>     + 2 현재 위치에서 다음을 반복하면서 인접한 칸을 탐색한다.
>         + a. 현재 위치의 바로 왼쪽에 아직 청소하지 않은 빈 공간이 존재한다면, 왼쪽 방향으로 회전한 다음 한 칸을 전진하고 1번으로 돌아간다. 그렇지 않을 경우, 왼쪽 방향으로 회전한다. 이때, 왼쪽은 현재 바라보는 방향을 기준으로 한다.
>         + b. 1번으로 돌아가거나 후진하지 않고 2a번 단계가 연속으로 네 번 실행되었을 경우, 바로 뒤쪽이 벽이라면 작동을 멈춘다. 그렇지 않다면 한 칸 후진한다.
> + 첫째 줄에 세로 크기 N과 가로 크기 M이 주어진다. (3 ≤ N, M ≤ 50)
> + 둘째 줄에 로봇 청소기가 있는 칸의 좌표 (r, c)와 바라보는 방향 d가 주어진다. 청소기가 있는 위치는 무조건 0이다.
>     + d가 0인 경우에는 북쪽을, 1인 경우에는 동쪽을, 2인 경우에는 남쪽을, 3인 경우에는 서쪽을 바라보고 있는 것이다.
> + 셋째 줄부터 N개의 줄에 장소의 상태가 북쪽부터 남쪽 순서대로, 각 줄은 서쪽부터 동쪽 순서대로 주어진다. 빈 칸은 0, 벽은 1로 주어진다. 지도의 첫 행, 마지막 행, 첫 열, 마지막 열에 있는 모든 칸은 벽이다.

## 접근 방법
---
> + 문제에서 주어진 로직대로 구현을 한다면 충분히 풀 수 있는 문제이다. 다만, 청소 조건 중 하나인 2 - b 조건에서 iterateCase(2a번 단계가 연속으로 네 번 실행 됐는지 check하는 변수)를 초기화를 제대로 해주지 않아 맵을 그리고, 디버깅 해야하는 문제가 생겼었다...

## 풀이 순서
---
> + 맵의 크기 N과 M을 입력 받는다.
> + 로봇의 시작 점 x, y를 입력 받고, 초기 로봇이 바라보는 방향 direction을 입력 받는다.
> + 맵의 크기만큼 맵의 정보를 입력 받는다.
> + BFS 수행
>     + queue에 시작점 x, y를 넣는다.
>     + queue가 빌 때까지 while문 반복 수행
>         + queue의 첫 번쨰 원소 중 first 값을 xx에 넣는다.
>         + queue의 첫 번째 원소 중 second 값을 yy에 넣는다.
>         + queue의 첫 번쨰 원소 pop( )
>         + for문 수행 ( 동 서 남 북 회전하며 탐색) --> 2-a 청소 조건 수행
>         + direction 값에 현재 direction + 3 % 4를 하게 되면 로봇이 현재 바라보고 있는 방향의 왼쪽이 되게 된다.
>         + next_x의 값에 xx + dx[direction] 값을 넣는다.
>         + next_y의 값에 yy + dy[direction] 값을 넣는다.
>         + next_x, next_y가 0 이상이고, 각각 N과 M보다 작고, checkMap[next_x][next_y]의 값이 false( 방문 하지 않음) 이고, map의 [next_x][next_y] 값이 0일 때, iterateCase = 0으로 초기화 해주고, queue에 next_x, next_y를 넣어주고, 해당 for문을 종료한다.
>         + 만약, 위 조건을 충족하지 못한다면, iterateCase +=1을 해주고, for문을 계속 수행한다.
>         + for문 종료 후, 다음 조건문을 수행한다. --> 2-b 청소 조건 수행
>         + 만약, iterateCase 값이 4라면, next_x에 xx + dx[(direction + 2) % 4], next_y에 yy + dy[(direction + 2) % 4]를 한다.
>         + map[ next_x ] [ next_y ] 값이 1이라면, 모든 탐색을 종료한다.
>         + 아니라면, iterateCase = 0으로 초기화하고, queue에 next_x, next_y 값을 넣는다.
>     + 이와 같은 작업 반복
> + BFS가 종료 된 후, checkMap을 2중 for문으로 탐색하여, true인 값을 모두 더해 그 더한 값을 출력한다.

## 소스코드
---
~~~c++
#include <iostream>
#include <queue>

using namespace std;

int N, M;
int startX, startY, now_direction;
int map[50][50];
bool checkMap[50][50];
int dx[] = { -1, 0, 1, 0 };
int dy[] = { 0, 1, 0, -1 };
int iterateCase = 0;
/*
* 청소 룰
* 1. 현재 위치 청소
* 2. a. 현재 위치의 바로 왼쪽에 아직 청소하지 않은 빈 공간이 존재한다면, 왼쪽 방향 한 칸을 전진하고 1번으로 돌아간다.
        그렇지 않을 경우, 왼쪽 방향으로 회전한다. 이때, 왼쪽은 현재 바라보는 방향을 기준으로 한다.
	 b. 1번으로 돌아가거나 후진하지 않고 2-a번 단계가 연속으로 네 번 실행되었을 경우, 바로 뒤쪽이 벽이라면 작동을 멈추고 벽이 아니라면 한 칸 후진한다.
*/

void input() {
	cin >> N >> M;

	// row, col, direction
	// now_direction : 0 (북), 1(동), 2(남), 3(서)
	cin >> startX >> startY >> now_direction;

	// 장소 상태 : 0은 빈칸, 1은 벽
	for (int i = 0; i < N; i++) {
		for (int j = 0; j < M; j++) {
			cin >> map[i][j];
		}
	}
}

void BFS() {
	queue<pair<int, int>> q;

	q.push({ startX, startY });

	while (!q.empty()) {
		int xx = q.front().first;
		int yy = q.front().second;

		checkMap[xx][yy] = true;

		q.pop();
		cout << "now dir :" << now_direction << "\n";

		// 청소 조건 2-a 수행
		for (int i = 0; i < 4; i++) {
			now_direction = (now_direction + 3) % 4;

			int nx = xx + dx[now_direction];
			int ny = yy + dy[now_direction];

			if (nx >= 0 && ny >= 0 && nx < N && ny < M) {
				if (checkMap[nx][ny] == false && map[nx][ny] == 0) {
					iterateCase = 0;
					q.push({ nx, ny });
					break;
				}
				iterateCase++;
			}
		}

		// 청소 조건 2-b 수행
		if (iterateCase == 4) {
			int nx = xx + dx[(now_direction + 2) % 4];
			int ny = yy + dy[(now_direction + 2) % 4];

			if (map[nx][ny] == 1)
				break;
			else {
				iterateCase = 0;
				q.push({ nx, ny });
			}
			continue;
		}
	}
}

void solution() {
	memset(checkMap, false, sizeof(checkMap));
	BFS();
}

void output() {
	int sum = 0;
	for (int i = 0; i < N; i++) {
		for (int j = 0; j < M; j++) {
			if (checkMap[i][j])
				sum += 1;
		}
	}

	cout << sum;
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
<img src="/assets/img/post-img/algorithm/2022-06-30-boj-RobotVacuum/result.jpg">