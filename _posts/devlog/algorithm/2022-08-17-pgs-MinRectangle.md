---
layout: post
title: 프로그래머스 최소직사각형 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-08-17T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://school.programmers.co.kr/learn/courses/30/lessons/86491](https://school.programmers.co.kr/learn/courses/30/lessons/86491)

## 문제 요구사항
---
> + 명함 지갑을 만드는 회사에서 지갑의 크기를 정하려고 합니다.
> + 다양한 모양과 크기의 명함들을 모두 수납할 수 있으면서, 작아서 들고 다니기 편한 지갑을 만들어야 합니다.
> + 가장 긴 가로 길이와 세로 길이가 각각 80, 70이기 때문에 80(가로) x 70(세로) 크기의 지갑을 만들면 모든 명함들을 수납할 수 있습니다.
> + 하지만 2번 명함을 가로로 눕혀 수납한다면 80(가로) x 50(세로) 크기의 지갑으로 모든 명함들을 수납할 수 있습니다. 이때의 지갑 크기는 4000(=80 x 50)입니다.
> + sizes의 길이는 1 이상 10,000 이하입니다.
> + w와 h는 1 이상 1,000 이하인 자연수입니다.

## 접근 방법
---
> + sizes의 모든 인덱스를 w값과 h값 중 가장 큰 값을 w 값으로 둔다.  max_w값과 max_h 값을 초기 0으로 세팅하고, 해당 값과 sizes의 각 w, h값을 비교하여 가장 큰 값을 담는다. 이후, 각 max값을 곱하여 return 한다.

## 풀이 순서
---
> 1. sizes를 탐색하며 다음을 수행한다.
>     + 현재 인덱스의 w와 h값을 비교하여 큰값을 w에, 작은 값을 h에 치환한다.
>     + max_w와 max_h값 (초기값 0)과 w, h값을 비교하여 크다면 해당 max_w, h 값을 갱신해준다.
> 2. answer 값에 max_w * max_h의 값을 대입하여 return 한다.

## 소스코드
---
~~~c++
#include <vector>

using namespace std;

int solution(vector<vector<int>> sizes) {
    int answer = 0;

    int max_row = 0;
    int max_col = 0;

    for(int i = 0; i < sizes.size(); i ++) {
        if(sizes[i][0] < sizes[i][1]) {
            int tmp = sizes[i][1];
            sizes[i][1] = sizes[i][0];
            sizes[i][0] = tmp;
        }
    }

    for(vector<int> now : sizes) {
        if(max_row < now[0])
            max_row = now[0];
        if(max_col < now[1])
            max_col = now[1];
    }

    answer = max_row * max_col;

    return answer;
}
~~~

## 문제 풀이 결과
---
<img src="/assets/img/post-img/algorithm/2022-08-17-pgs-MinRectangle/result.jpg">