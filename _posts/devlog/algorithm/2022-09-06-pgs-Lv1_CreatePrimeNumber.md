---
layout: post
title: 프로그래머스 소수 만들기 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-09-06T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://school.programmers.co.kr/learn/courses/30/lessons/12977](https://school.programmers.co.kr/learn/courses/30/lessons/12977)

## 문제 요구사항
---
> + 주어진 숫자 중 3개의 수를 더했을 때 소수가 되는 경우의 개수를 구하려고 합니다. 
> + 숫자들이 들어있는 배열 nums가 매개변수로 주어질 때, nums에 있는 숫자들 중 서로 다른 3개를 골라 더했을 때 소수가 되는 경우의 개수를 return 하도록 solution 함수를 완성해주세요.
> + nums에 들어있는 숫자의 개수는 3개 이상 50개 이하입니다.
> + nums의 각 원소는 1 이상 1,000 이하의 자연수이며, 중복된 숫자가 들어있지 않습니다.

## 접근 방법
---
> + 내가 알고 있는 소수의 정의는 다음과 같다.
> + 1과 자기 자신(숫자) 외에는 그 어떠한 수로도 나누어지면 안 된다.
> + 위 소수 정의와 함께 매개변수로 주어진 숫자의 합 모든 경우의 수를 조합하여 새 배열을 생성하여 check count 하면 된다.

## 풀이 순서
---
> 1. for문을 3번 중첩하여, arr이라는 새 배열에 nums[ i ] + nums [ j ] + nums [ k ] 값을 넣는다.
>     + 이 때, 같은 숫자를 반복해서 넣으면 안 되므로, j는 i + 1, k는 j + 1로 정의한다.
> 2. algorithm 라이브러리의 sort 함수를 사용하여 arr 배열을 오름차순 정렬한다.
> 3. arr 배열을 탐색하여 해당 숫자가 소수인지 체크한다.
>     + for문 반복인자 j = 2부터 nums [ i ] - 1까지 nums [ i ] 값을 j로 나누었을 때 나머지가 0이라면,
>     + 소수가 아니므로, 반복문을 종료하고, 다음( i ++ )으로 넘어간다.
>     + 소수라면, answer+=1 
> 4. 이와 같은 작업 반복 후, answer 반환

## 소스코드
---
~~~c++
#include <vector>
#include <algorithm>

using namespace std;

int solution(vector<int> nums) {
    int answer = 0;

    vector<int> arr;

    // arr에 모든 경우의 수 숫자 다 넣음
    for(int i = 0; i < nums.size(); i++) {
        for(int j = i + 1; j < nums.size(); j++) {
            for(int k = j + 1; k < nums.size(); k++) {
                arr.push_back(nums[i] + nums[j] + nums[k]);
            }
        }
    }

    // sorting
    sort(arr.begin(), arr.end());

    // arr 탐색하며 소수 발견 시 answer count
    for(int i = 0; i < arr.size(); i++) {
        bool is_prime = true;
        for(int j = 2; j < arr[i]; j++) {
            if(arr[i] % j == 0) {
                is_prime = false;
                break;
            }
        }
        if(is_prime)
            answer++;
    }

    return answer;
}
~~~

## 문제 풀이 결과
---
<img src="/assets/img/post-img/algorithm/2022-09-06-pgs-Lv1_CreatePrimeNumber/result.jpg">