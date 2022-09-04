---
layout: post
title: 프로그래머스 두 큐 합 같게 하기 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-09-02T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://school.programmers.co.kr/learn/courses/30/lessons/118667](https://school.programmers.co.kr/learn/courses/30/lessons/118667)

## 문제 요구사항
---
> + 길이가 같은 두 개의 큐가 주어집니다.
> + 하나의 큐를 골라 원소를 추출(pop)하고, 추출된 원소를 다른 큐에 집어넣는(insert) 작업을 통해 각 큐의 원소 합이 같도록 만들려고 합니다.
> + 이때 필요한 작업의 최소 횟수를 구하고자 합니다. 한 번의 pop과 한 번의 insert를 합쳐서 작업을 1회 수행한 것으로 간주합니다.

<img src="/assets/img/post-img/algorithm/2022-09-02-pgs-Lv2_SameTwiceQueue/problem-requirement1.jpg">

> + 길이가 같은 두 개의 큐를 나타내는 정수 배열 queue1, queue2가 매개변수로 주어집니다.
> + 각 큐의 원소 합을 같게 만들기 위해 필요한 작업의 최소 횟수를 return 하도록 solution 함수를 완성해주세요. 
> + 단, 어떤 방법으로도 각 큐의 원소 합을 같게 만들 수 없는 경우, -1을 return 해주세요.

## 접근 방법
---
> + 기본적인 코드 구성은 어렵지 않다. 다만 탈출 조건(어떤 방법으로도 원소 합이 같지 않았을 때)를 어떻게 가져가느냐가 관건이었고, 이를 해결하지 못해 search 해본 결과 대부분의 사람들은 임의로 탈출 횟수를 정해 한 것 같다... 이와 관련해서 한 번 다시 검토 해야할듯 하다.

## 풀이 순서
---
> 1. queue<int> 형태의 q1, q2를 선언하고, 매개변수로 주어진 각 큐의 값을 sum_of_queue에 더한다.
> 2. 각각의 큐의 합 sum_of_queue가 같을 때까지 while문을 수행한다.
> 3. sum_of_queue1이 sum_of_queue2보다 클 경우 q1에서 첫번째 원소를 빼고, q2에 대입한다.
>     + 반대의 경우에는 반대로 코드를 수행한다.
>     + 이후, sum_of_queue1 값에 q1에서 뺀 값을 빼고, sum_of_queue2에는 q1에서 뺀 값을 더한다.
> 4. answer += 1을 하고, while문 무한루프 탈출 조건 => answer 값이 ( q1.size() + q2.size() ) * 2보다 크면 answer = -1을 하고 종료한다.

## 소스코드
---
~~~c++
#include <string>
#include <vector>
#include <queue>

using namespace std;

int solution(vector<int> queue1, vector<int> queue2) {
    int answer = 0;

    long long sum_of_q1 = 0;
    long long sum_of_q2 = 0;

    queue<int> q1;
    queue<int> q2;

    for (int i = 0; i < queue1.size(); i++) {
        sum_of_q1 += queue1[i];
        sum_of_q2 += queue2[i];

        q1.push(queue1[i]);
        q2.push(queue2[i]);
    }

    while (sum_of_q1 != sum_of_q2) {
        int value;

        if (sum_of_q1 > sum_of_q2) {
            value = q1.front();

            sum_of_q1 -= value;
            sum_of_q2 += value;

            q1.pop();
            q2.push(value);
        }
        else {
            value = q2.front();

            sum_of_q1 += value;
            sum_of_q2 -= value;

            q1.push(value);
            q2.pop();
        }
        answer++;

        if (answer > (q1.size() + q2.size()) * 2) {
            answer = -1;
            break;
        }
    }

    return answer;
}
~~~

## 문제 풀이 결과
---
<img src="/assets/img/post-img/algorithm/2022-09-02-pgs-Lv2_SameTwiceQueue/result.jpg">

## 느낀점
---
> + 괜히 벡터로 queue 따라하다 시간초과가 많이 났고, 굳이굳이 함수로 만들어서 하다 복잡하게 코드를 만들어서 시간 초과가 났다...