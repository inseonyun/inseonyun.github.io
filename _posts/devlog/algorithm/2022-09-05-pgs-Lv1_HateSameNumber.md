---
layout: post
title: 프로그래머스 같은 숫자는 싫어 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-09-05T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://school.programmers.co.kr/learn/courses/30/lessons/12906](https://school.programmers.co.kr/learn/courses/30/lessons/12906)

## 문제 요구사항
---
> + 배열 arr가 주어집니다. 배열 arr의 각 원소는 숫자 0부터 9까지로 이루어져 있습니다. 
> + 이때, 배열 arr에서 연속적으로 나타나는 숫자는 하나만 남기고 전부 제거하려고 합니다. 
> + 단, 제거된 후 남은 수들을 반환할 때는 배열 arr의 원소들의 순서를 유지해야 합니다.

<img src="/assets/img/post-img/algorithm/2022-09-05-pgs-Lv1_HateSameNumber/problem-requirement1.jpg">

> + 배열 arr의 크기 : 1,000,000 이하의 자연수
> + 배열 arr의 원소의 크기 : 0보다 크거나 같고 9보다 작거나 같은 정수

## 접근 방법
---
> + 기초 프로그래밍 방식으로 풀이했다.
> + 알아보니 algorithm 라이브러리에 있는 unique를 사용해서 vector의 중복 원소를 erase 할 수 있다.

~~~c++
vector<int> solution(vector<int> arr) 
{    
    arr.erase(unique(arr.begin(), arr.end()), arr.end());
    vector<int> answer = arr;

    return answer;
}
~~~


## 풀이 순서
---
> 1. 반복인자 i 값을 1로 정의하고, tmp 변수에 arr[0]값을 넣으며, answer에도 arr[0]값을 넣는다.
> 2. 반복인자 i 값이 arr.size()보다 작을 때까지 while문을 반복한다.
> 3. tmp와 arr[ i ]값을 비교하여, 다르면 tmp에 arr[ i ] 값을 넣어 갱신하고, answer에 arr[ i ]값을 넣는다.
> 4. 반복인자 i 값을 반복하여 위와 같은 작업을 반복한다.
> 5. answer 반환

## 소스코드
---
~~~c++
#include <vector>
#include <algorithm>

using namespace std;

vector<int> solution(vector<int> arr) 
{
    vector<int> answer;
    
    // arr.erase(unique(arr.begin(), arr.end()), arr.end());
    // answer = arr;
    
    int i = 1, tmp = arr[0], a_size = arr.size();
    answer.push_back(arr[0]);
    while(a_size > i) {
        if(tmp != arr[i]) {
            answer.push_back(arr[i]);
            tmp = arr[i];
        }
        i++;
    }
    
    return answer;
}
~~~

## 문제 풀이 결과
---
<img src="/assets/img/post-img/algorithm/2022-09-05-pgs-Lv1_HateSameNumber/result.jpg">