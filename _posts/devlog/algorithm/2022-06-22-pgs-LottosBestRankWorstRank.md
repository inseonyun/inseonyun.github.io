---
layout: post
title: 프로그래머스 로또의 최고 순위와 최저 순위 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-06-22T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://programmers.co.kr/learn/courses/30/lessons/77484](https://programmers.co.kr/learn/courses/30/lessons/77484)

## 문제 요구사항
---
> + 매개변수로 lottos, win_nums가 주어진다.
>     + lottos는 민우가 구매한 로또 번호, 이 때, 민우 동생이 낙서하여 알 수 없는 번호는 0으로 표기
>     + win_nums는 로또 당첨 번호
> + 당첨 번호 0~1개 맞추면 6등, 2개 5등, 3개 4등, 4개 3등, 5개 2등, 6개 1등이다.
> + 주어진 변수를 이용하여, 민우가 받을 수 있는 최고 순위와 최저 순위를 구하여라.

## 접근 방법
---
> + 민우가 가진 로또 번호의 최저 순위는 초기 로또 번호의 순위와 같다. 최고 순위의 경우, 0이 있다면 초기 로또 번호의 적중 개수 + 0의 개수를 더하면 최고 순위를 구할 수 있다. 사실상 0이 있다면 그 번호는 무조건 로또 당첨 번호라고 가정하여 풀이 가능하다.

## 풀이 순서
---
> 1. 각 로또 당첨 번호 개수에 맞게 등수를 담은 배열 rank_arr를 생성한다.
> 2. first_hit_count (민우의 로또 중 초기 당첨 번호 개수), zero_count (민우의 로또 중 0의 개수)를 구한다.
>     + 이중 for문을 이용하여, 민우의 로또 번호를 탐색한다.
>     + 민우의 로또 번호의 값이 0이라면 zero_count +=1을 한다.
>     + 반례로 민우의 로또 번호의 값이 0이 아니라면 win_nums(당첨 번호)를 탐색한다.
>         + 만약, 당첨 번호에 민우의 로또 번호가 존재한다면, first_hit_count += 1을 하고, 해당 반복문을 break 한다.
>     + 이와 같은 작업 반복
> 3. 최고 순위는 rank_arr[ first_hit_count + zero_count ]의 값이다.
> 4. 최저 순위는 rank_arr[ first_hit_count ] 값이다.

## 소스코드
---
~~~c++
#include <vector>

using namespace std;

vector<int> solution(vector<int> lottos, vector<int> win_nums) {
    vector<int> answer;

    // 0~1개 맞추면 6등, 2개 5등, 3개 4등, 4개 3등, 5개 2등, 6개 1등
    int rank_arr[] = {6, 6, 5, 4, 3, 2, 1};

    int first_hit_count = 0;
    int zero_count = 0;

    for(int i = 0; i < lottos.size(); i++) {
        if(lottos[i] == 0) {
            zero_count++;
        } 
        else {
             for(int j = 0; j < win_nums.size(); j++) {
                if(win_nums[j] == lottos[i]) {
                    first_hit_count++;
                    break;
                }
            }
        }
    }
    // best
    answer.push_back(rank_arr[first_hit_count + zero_count]);        

    // worst
    answer.push_back(rank_arr[first_hit_count]);

    return answer;
}
~~~

## 문제 풀이 결과
---
<img src="/assets/img/post-img/algorithm/2022-06-22-pgs-LottosBestRankWorstRank/result.jpg">