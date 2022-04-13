---
layout: post
title: 백준 2206_벽 부수고 이동하기 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-04-13T14:00:00-15:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://www.acmicpc.net/problem/2206](https://www.acmicpc.net/problem/2206)

## 문제 요구사항
---
> + 첫째 줄에 N(1 ≤ N ≤ 1,000), M(1 ≤ M ≤ 1,000)이 주어진다.
> + 다음 N개의 줄에 M개의 숫자로 맵이 주어진다. (1, 1)과 (N, M)은 항상 0이라고 가정하자.
> + 맵에서 0은 이동할 수 있는 곳을 나타내고, 1은 이동할 수 없는 벽이 있는 곳을 나타낸다.
> + 이때 최단 경로로 이동하려 한다. 이동하는 도중에 한 개의 벽을 부수고 이동하는 것이 좀 더 경로가 짧아진다면, 벽을 한 개 까지 부수고 이동하여도 된다.
> + 시작 순간부터 count 되어 소요 거리는 1부터 시작하고, 종료 지점에 도착했을 때도 count 된다.

## 접근 방법
---
+ 일반적인 BFS 방식으로 2차원 배열 맵과 check, 경로를 더해나갈 배열 총 3개를 정의하고, 최단 경로를 계산해 나갔다. 그런데 여기서 벽을 부쉈을 때의 경로가 더 짧으면 해당 경로를 택하는 것을 구현해야 하는데, 내가 구현했던 것은  한쪽 방향으로만 한 번 부수고 마는 코드였다.
+ 위와 같은 접근 방법에 문제가 있다는 것을 자각했고, 서치 결과 check 배열과 경로를 더해나가는 배열을 합쳐, 3차원 배열로 생성하여 해결한다. (사실 이전 풀이대로 해도 상관은 없으나 가독성과 코드 단순화를 위해..) 이후, 풀이는 처음 접근하려 했던 방법과 비슷하다.  

## 풀이 순서
---
> 1. 초기 맵의 사이즈인 N과 M 사이즈를 입력 받는다.
> 2. 그 사이즈 만큼 반복문을 실행하여 데이터를 입력 받는다.
> 3. 시작 점은 (0, 0) , 종료 지점은 (N - 1, M -1) 고정이므로, 시작 점부터 시작해서 종료 지점에 달하면 종료하도록 한다.
> 4. 벽을 부쉈을 때의 맵과 안 부쉈을 때의 맵을 따로 관리해서 서로 각각의 데이터를 갖게 한다.
> 5. 좌표가 종료 지점에 달했을 때, 해당 좌표와 차원에 해당하는 값을 ans_move에 넣는다.
> 6. ans_move가 0이면 종료 지점에 오지 못하고 queue를 비워낸 것이기 때문에 -1를 출력한다.

## 풀이 이미지
---
![image](https://user-images.githubusercontent.com/84364741/163105214-06d1e3fb-9890-4b14-bc7f-aaa5857a3a07.png)

+ 위와 같은 맵이 있다고 할 때 좌 상단의 좌표에서 우 하단의 좌표로 이동해야 한다.
    + 이 때, 내가 처음에 풀이했던 방법은 변수 하나를 둬서 변수가 false면 벽을 부술 수 있기 때문에 부수고 true로 변경한 다음 탐색하도록 코딩하였다. 그러면 특정 방향으로만 계속 부수기 때문에 제대로 된 탐색이 되지 못한다.
+ 그리하여 최단 거리를 계산하는 변수를 3차원 배열로 생성하였고, 벽을 부쉈을 때는 [행][열][1] 인덱스에서 탐색을 하도록 하였다.

위 맵을 통해 설명하자면 다음과 같다.
+ 첫번째 칸에서 갈 수 있는 칸은 없다. 그러므로 벽을 부숴야 하는데, 오른쪽 벽과 아래쪽 벽을 부쉈을 때의 값을 모두 queue에 넣는다.
+ 이때, 당연히 마지막 벽 부숨 인덱스를 바꿔 새로운 맵에서 진행하도록 한다.

아래와 같은 맵에서 값이 2인 곳에서 각각 다시 시작하게 되고, 시작하기 전 큐의 상태이다.

<p align=center>
	<img src="https://user-images.githubusercontent.com/84364741/163105812-c05dc063-35be-49f4-973f-3c7d9e4bfa15.png" width="300">
	<img src="https://user-images.githubusercontent.com/84364741/163106180-356379bb-c57b-478d-8ee5-5e80c3612d8a.png" width="200">
</p>

## 기타 주의 사항
---
+ 나는 이런 문제를 풀 때마다 느끼는건데 x와 y좌표 인덱스 설정하는 거에서 늘 애먹는 것 같다...간혹가다 각 좌표 인덱스를 반대로 넣어 풀이한다던가...ㅎ.. 부디 다른 분들은 그러지 마시길...

## 소스코드
---
~~~c++
#include <iostream>
#include <stdio.h>
#include <cstring>
#include <queue>

using namespace std;

int bwmMap[1000][1000];
int checkbwmMap[1000][1000][2];
int dx[] = {0, 1, 0, -1};
int dy[] = {1, 0, -1, 0};
int M, N;
int ans_move = 0;
void breakWallAndMoveBFS(int startX, int startY) {
	checkbwmMap[startX][startY][0] = 1;
	queue<pair<pair<int, int>, int>> q;
	q.push({ { startX, startY }, 0 });

	while (!q.empty()) {
		int xx = q.front().first.first;
		int yy = q.front().first.second;
		int bb = q.front().second;

		q.pop();

		if (xx == N - 1 && yy == M - 1) {
			ans_move = checkbwmMap[xx][yy][bb];
			return;
		}

		for (int i = 0; i < 4; i++) {
			int nx = xx + dx[i];
			int ny = yy + dy[i];

			if (nx >= 0 && ny >= 0 && nx < N && ny < M) {
				if (bwmMap[nx][ny] == 1 && bb == 0) {
					checkbwmMap[nx][ny][bb + 1] = checkbwmMap[xx][yy][bb] + 1;
					q.push({ {nx, ny}, bb + 1});
				}
				if (bwmMap[nx][ny] == 0 && checkbwmMap[nx][ny][bb] == 0) {
					checkbwmMap[nx][ny][bb] = checkbwmMap[xx][yy][bb] + 1;
					q.push({ {nx,ny}, bb });
				}
			}
		}
	}
}

void breakWallAndMove() {
	cin >> N >> M;

	memset(checkbwmMap, 0, sizeof(checkbwmMap));

	for (int row = 0; row < N; row++) {
		for (int col = 0; col < M; col++) {
			scanf("%1d", &bwmMap[row][col]);
		}
	}
	
	breakWallAndMoveBFS(0, 0);

	if (ans_move == 0) {
		cout << -1;
	}
	else {
		cout << ans_move;
	}
}

int main() {
	breakWallAndMove();

	return 0;
}
~~~

## 문제 풀이 결과
---
![image](https://user-images.githubusercontent.com/84364741/163106764-3a015f1f-c43a-48ec-a47a-97302a326f58.png)