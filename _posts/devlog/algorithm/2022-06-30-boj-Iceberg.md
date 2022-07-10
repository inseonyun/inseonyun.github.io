---
layout: post
title: 백준 2573_빙산 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-06-30T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://www.acmicpc.net/problem/2573](https://www.acmicpc.net/problem/2573)

## 문제 요구사항
---
> + 빙산을 표시하는 2차원  배열이 주어진다.  (가로 N, 세로 M)
> + 각 배열의 원소는 빙산의 높이를 의미하며, 빈 칸은 모두 0으로 채워져 있다.
> + 빙산의 높이는 바닷물(0인 곳)이 많이 접해져 있는 부분에서 더 빨리 줄어든다.
> + 빙산의 각 칸의 높이는 1년마다 그 칸에 동서남북 네 방향으로 붙어있는 0이 저장된 칸의 개수만큼 줄어든다. 
> + 단, 각 칸에 저장된 높이는 0보다 더 줄어들지 않는다.
> + 한 덩어리의 빙산이 주어질 때, 이 빙산이 두 덩어리 이상으로 분리되는 최초의 시간(년)을 구하는 프로그램을 작성하시오.
> + 만일 빙산이 다 녹을 때까지 분리되지 않으면 0을 출력한다.

## 접근 방법
---
> + 구현 위주로 풀이하다 보니 BFS, DFS 섞어서 사용하게 됐다. 동 서 남 북 0을 찾으며 빙산의 높이를 깎을 때는 BFS를, 해당 빙산이 두 덩어리로 분리 되었는지 확인할 때는 DFS로 확인하였다. 

## 풀이 순서
---
> 1. 맵의 크기인 N과 M을 입력 받는다.
> 2. 맵의 정보인 각 원소의 값을 입력 받는다.
> 3. 무한 루프인 while 문(년도)를 돌면서 각 년도마다 빙산의 높이를 깍는다.
> 4. BFS 수행
>     + 북 동 남 서 방향 순으로 탐색하며, 0이 밀접해있다면, 해당 위치의 빙산을 -1 한다.
>     + 이때, 초기에 입력 받은 map 2차원 배열에 값을 갱신하는 것이 아닌, 복사 해둔 2차원 배열에 해당 정보 갱신
> 5. 복사 하여 빙산의 높이를 모두 깎은 배열 정보를 다시 map 배열에 붙여 넣는다.
> 6. DFS 수행
>     + map의 정보를 copyMap에 붙여넣는다.
>     + 해당 copyMap을 탐색하며, 빙산이 두 덩이로 나뉘어졌는지 check 한다.
> 7. 빙산이 두 덩이 이상이라면 while문 종료.
> 8. 반대로, 두 덩이 미만이고, 모든 빙산이 다 녹은 상태라면 year에 0을 대입하고 종료,
> 9. 반대로, 두 덩이 미만이지만, 모든 빙산이 다 녹은 상태가 아니라면, 분리된 빙산의 개수를 0으로 초기화하고 while문 다시 탐색
> 10.  이와 같은 작업 반복

## 소스코드
---
~~~c++
#include <iostream>

using namespace std;

int N, M;
int map[300][300];
int copymap[300][300];
int dx[] = { -1, 0, 1, 0 };
int dy[] = { 0, 1, 0, -1 };
int iceberg = 0;
int year = 0;
int checkMap[300][300];
void copyArr(int paste_arr[300][300], int copy_arr[300][300]) {
	for (int i = 0; i < N; i++) {
		for (int j = 0; j < M; j++) {
			paste_arr[i][j] = copy_arr[i][j];
		}
	}
}

void input() {
	cin >> N >> M;

	for (int i = 0; i < N; i++) {
		for (int j = 0; j < M; j++) {
			cin >> map[i][j];
		}
	}
	copyArr(copymap, map);
}

void calc(int x, int y) {
	for (int i = 0; i < 4; i++) {
		int nx = x + dx[i];
		int ny = y + dy[i];

		if (nx >= 0 && ny >= 0 && nx < N && ny < M) {
			if (map[nx][ny] == 0) {
				if (copymap[x][y] > 0)
					copymap[x][y] -= 1;
			}
		}
	}
}

void DFS(int startX, int startY) {
	if (checkMap[startX][startY] > 0) {
		checkMap[startX][startY] = 0;

		for (int i = 0; i < 4; i++) {
			int nx = startX + dx[i];
			int ny = startY + dy[i];

			if (nx >= 0 && ny >= 0 && nx < N && ny < M) {
				DFS(nx, ny);
			}
		}
	}
}

void searcharr() {
	copyArr(checkMap, map);
	for (int i = 0; i < N; i++) {
		for (int j = 0; j < M; j++) {
			if (checkMap[i][j] > 0) {
				iceberg++;
				DFS(i, j);
			}
		}
	}
}

bool isAllZero() {
	for (int i = 0; i < N; i++) {
		for (int j = 0; j < M; j++) {
			if (map[i][j] > 0)
				return false;
		}
	}
	return true;
}

void solution() {

	while (true) {
		year++;
		for (int i = 0; i < N; i++) {
			for (int j = 0; j < M; j++) {
				if (map[i][j] > 0) {
					calc(i, j);
				}
			}
		}
		copyArr(map, copymap);
		searcharr();

		if (iceberg >= 2)
			break;
		else {
			if (isAllZero()) {
				if (iceberg < 2)
					year = 0;
				break;
			}
			iceberg = 0;
			continue;
		}
	}
}

void output() {
	cout << year;
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
<img src="/assets/img/post-img/algorithm/2022-06-30-boj-Iceberg/result.jpg">