---
layout: post
title: 백준 9205_맥주 마시면서 걸어가기 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-04-28T14:00:00-15:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://www.acmicpc.net/problem/9205](https://www.acmicpc.net/problem/9205)

## 문제 요구사항
---
> + 맥주 한 박스를 들고 출발한다. 맥주 한 박스에는 맥주가 20개 들어있다.
> + 50미터를 가려면 그 직전에 맥주 한 병을 마셔야 한다.
> + 박스에 들어있는 맥주는 20병을 넘을 수 없다.
> + 첫째 줄에 테스트 케이스의 개수 t가 주어진다. (t ≤ 50)
> + 둘째 줄부터 맥주를 파는 편의점의 개수 n이 주어진다. (0 ≤ n ≤ 100)
> + 그 다음 줄부터 차례로 상근이네 집 좌표(시작점), 편의점 좌표, 페스티벌 좌표가 주어진다.
> + 이와 같은 조건을 갖고 페스티벌에 맥주를 마시면서 도착 가능하면 'happy', 불가능하면 'sad'를 출력한다.

## 접근 방법
---
> + 문제에서 주어진 '50미터를 가려면 맥주를 한 병 마셔야 한다.'와 '박스에 들어있는 맥주는 20개까지 이다.' 조건을 풀이해보면 상근이가 갈 수 있는 거리는 최대 1000이다. 즉, 1000걸음 이내에 편의점 혹은 페스티벌에 도착해야 한다. 이를 갖고 문제를 풀이해보면 어렵지 않은 문제다.

## 풀이 순서
---
> 1. test_case를 입력 받는다.
> 2. 입력 받은 test_case만큼 문제 풀이를 반복한다.
> 3. 해당하는 test_case의 편의점 개수 n을 입력 받는다.
> 4. 상근이네 집 좌표(시작점)을 입력 받는다.
> 5. 편의점 개수 n만큼 반복하여 편의점 좌표를 입력 받는다.
> 6. 이 때, 편의점 개수만큼 check 변수를 초기화 하고, 편의점 좌표를 vector에 넣는다.
> 7. 페스티벌 좌표를 입력 받는다.
> 8. BFS 수행
>     + 큐에 시작 위치 (상근이 좌표) x, y를 넣는다.
>     + 큐가 비어있을 때까지 while문을 반복한다.
>     + 큐에 첫번째 원소 값을 변수(현재 위치)에 저장하고, 해당 값을 큐에서 꺼낸다.
>     + 현재 좌표 - 페스티벌 좌표를 계산한 절댓값이 1000 이하이면, 'happy'를 출력하고 종료한다.
>     + 아니라면, 편의점 개수만큼 반복문을 실행한다. 
>     + 이때, 현재 좌표 - 방문하지 않은 편의점 좌표를 계산한 절댓값이 1000 이하이면, 해당 편의점 좌표를 큐에 넣고, 편의점 방문을 check한다.
>     + 이 과정을 반복 수행
> 9. BFS가 끝난 후 해당 함수에 머물러 있으면 페스티벌에 맥주를 마시면서 도착하지 못한 것이므로, 'sad'를 출력한다.
> 10. 이와 같은 작업 각 test_case마다 반복 수행

## 소스코드
---
~~~c++
#include <iostream>
#include <queue>
#include <vector>

using namespace std;

struct coordinate {
	int x;
	int y;
};

int n;
vector<coordinate> cvStore;
vector <bool> visitedCVStore;
coordinate start;
coordinate festival;

void walkingWhileDrinkingBeerBFS() {
	queue <coordinate> q;

	q.push(start);

	while (!q.empty()) {
		int xx = q.front().x;
		int yy = q.front().y;

		q.pop();

		if (abs(xx - festival.x) + abs(yy - festival.y) <= 1000) {
			cout << "happy\n";
			return;
		}
		else {
			for (int i = 0; i < cvStore.size(); i++) {
				if (abs(xx - cvStore[i].x) + abs(yy - cvStore[i].y) <= 1000) {
					if (visitedCVStore[i] == false) {
						visitedCVStore[i] = true;

						q.push(coordinate{ cvStore[i].x, cvStore[i].y });
					}
				}

			}
		}
	}
	cout << "sad\n";
}

void walkingWhileDrinkingBeer() {
	int test_case;
	cin >> test_case;

	for (int TC = 0; TC < test_case; TC++) {
		cin >> n;
		cin >> start.x >> start.y;

		cvStore.clear();
		visitedCVStore = vector<bool>(n, false);

		for (int cv_count = 0; cv_count < n; cv_count++) {
			int tmpX, tmpY;
			cin >> tmpX >> tmpY;

			cvStore.push_back(coordinate{ tmpX, tmpY });
		}
		cin >> festival.x >> festival.y;

		walkingWhileDrinkingBeerBFS();
	}
}

int main() {

	walkingWhileDrinkingBeer();

	return 0;
} 
~~~

## 문제 풀이 결과
---
<img src="/assets/img/post-img/algorithm/2022-04-28-boj-9205-walkingWhileDrinkingBeer/result.jpg">