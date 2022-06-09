---
layout: post
title: 프로그래머스 네트워크 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-06-09T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://programmers.co.kr/learn/courses/30/lessons/43162](https://programmers.co.kr/learn/courses/30/lessons/43162)

## 문제 요구사항
---
> + 네트워크란 컴퓨터 상호 간에 정보를 교환할 수 있도록 연결된 형태를 의미합니다. 
> + 예를 들어, 컴퓨터 A와 컴퓨터 B가 직접적으로 연결되어있고, 컴퓨터 B와 컴퓨터 C가 직접적으로 연결되어 있을 때 컴퓨터 A와 컴퓨터 C도 간접적으로 연결되어 정보를 교환할 수 있습니다. 
> + 따라서 컴퓨터 A, B, C는 모두 같은 네트워크 상에 있다고 할 수 있습니다.
> + 컴퓨터의 개수 n, 연결에 대한 정보가 담긴 2차원 배열 computers가 매개변수로 주어질 때, 네트워크의 개수를 return 하도록 solution 함수를 작성하시오.
> + 컴퓨터의 개수 n은 1 이상 200 이하인 자연수입니다.
> + 각 컴퓨터는 0부터 n-1인 정수로 표현합니다.
> + i번 컴퓨터와 j번 컴퓨터가 연결되어 있으면 computers[i][j]를 1로 표현합니다.
> + computer[i][i]는 항상 1입니다.

## 접근 방법
---
> + 일반적인 DFS에서 [i][i] (본인 인덱스) 는 continue 하고, DFS의 시작점을 각 컴퓨터의 수 (n)만큼 반복한다. 이 때, check 배열을 비교하여 false라면 DFS를 수행하는데, 0부터 차례로 넣어 수행하도록 한다. 

## 풀이 순서
---
> 1. check 배열을 false 값으로 초기화 해준다.
> 2. n (컴퓨터의 수)만큼 반복하여, 0부터 차례로 check배열을 비교한다.
> 3. 이 때, check[i]값이 false라면 DFS에 해당 i값을 넣고, 탐색 하고, answer += 1을 한다.
> 4. DFS 수행
>     + DFS에 들어온 시작점을 true로 설정하고, i = 시작점, j = 0부터 vector size만큼 for문을 수행한다.( K x K 벡터이므로 상관 없음)
>     + i 값과 j값이 같아지면 본인 컴퓨터 이므로 continue 한다.
>     + check[j]값이 false이고, computer[i][j]값이 1이라면 DFS에 j값을 넣어 수행한다.
>     + 이와 같은 작업 반복
> 6. answer 반환

## 소스코드
---
~~~c++
#include <string>
#include <cstring>
#include <vector>

using namespace std;

bool check[200];
void DFS(vector<vector<int>> computer,int startX) {
    check[startX] = true;

    for(int i = startX, j = 0; j < computer.size(); j++) {
        if(i == j)
            continue;
        if(!check[j] && computer[i][j] == 1) {
            DFS(computer, j);
        }
    }
}

int solution(int n, vector<vector<int>> computers) {
    int answer = 0;

    memset(check, false, sizeof(check));

    for(int i = 0; i < n; i++) {
        if(!check[i]) {
            answer++;
            DFS(computers, i);
        }
    }

    return answer;
}
~~~

## 문제 풀이 결과
---
<img src="/assets/img/post-img/algorithm/2022-06-09-pgs-Network/result.jpg">