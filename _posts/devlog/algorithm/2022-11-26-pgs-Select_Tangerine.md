---
layout: post
title: 프로그래머스 귤 고르기 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-11-26T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[프로그래머스: Level2_귤 고르기](https://school.programmers.co.kr/learn/courses/30/lessons/138476?language=cpp)


## 문제 요구사항
---
> + 경화는 과수원에서 귤을 수확했습니다. 경화는 수확한 귤 중 'k'개를 골라 상자 하나에 담아 판매하려고 합니다. 
> + 그런데 수확한 귤의 크기가 일정하지 않아 보기에 좋지 않다고 생각한 경화는 귤을 크기별로 분류했을 때 서로 다른 종류의 수를 최소화하고 싶습니다.
> + 예를 들어, 경화가 수확한 귤 8개의 크기가 [1, 3, 2, 5, 4, 5, 2, 3] 이라고 합시다. 
> + 경화가 귤 6개를 판매하고 싶다면, 크기가 1, 4인 귤을 제외한 여섯 개의 귤을 상자에 담으면, 귤의 크기의 종류가 2, 3, 5로 총 3가지가 되며 이때가 서로 다른 종류가 최소일 때입니다.
> + 경화가 한 상자에 담으려는 귤의 개수 k와 귤의 크기를 담은 배열 tangerine이 매개변수로 주어집니다. 
> + 경화가 귤 k개를 고를 때 크기가 서로 다른 종류의 수의 최솟값을 return 하도록 solution 함수를 작성해주세요.
> + 1 ≤ k ≤ tangerine의 길이 ≤ 100,000
> + 1 ≤ tangerine의 원소 ≤ 10,000,000


## 접근 방법
---
> + 중복되는 값을 count 해서 count 값을 기준으로 내림차순 해, 그 개수만큼 k를 차감하면 된다.


## 풀이 순서
---
> 1. tangerine을 오름차순 정렬한다.
> 2. t_cnt 벡터를 선언해 0을 넣는다.
> 3. tangerine size만큼 for문을 반복해 std::count를 이용해 해당 크기의 개수를 구해 t_cnt에 넣고, prev라는 정수를 이용해 같은 크기일 시 continue 할 수 있게 한다.
> 4. t_cnt를 내림차순 정렬한다.
> 5. t_cnt size만큼 for문을 반복해 k값을 가감해 나가며, answer += 1을 한다. 이 때, k 값이 0이하가 되면 종료하도록 한다.
> 6. answer 반환


## 소스코드
---
~~~c++
#include <algorithm>
#include <vector>

using namespace std;

bool compare(int a, int b) {
    return a > b;
}

int solution(int k, vector<int> tangerine) {
    int answer = 0;

    sort(tangerine.begin(), tangerine.end());
    vector<int> t_cnt;
    t_cnt.push_back(0);
    int prev = -1;
    for (int i = 0; i < tangerine.size(); i++) {
        if (prev == tangerine[i])
            continue;
        else {
            int cnt = count(tangerine.begin(), tangerine.end(), tangerine[i]);
            t_cnt.push_back(cnt);
            prev = tangerine[i];
        }
    }

    sort(t_cnt.begin(), t_cnt.end(), compare);

    for (int i = 0; i < t_cnt.size(); i++) {
        k -= t_cnt[i];
        answer++;
        if (k <= 0)
            break;
    }

    return answer;
}
~~~

## 문제 풀이 결과
---
<img src="/assets/img/post-img/algorithm/2022-11-26-pgs-Select_Tangerine/result.jpg">