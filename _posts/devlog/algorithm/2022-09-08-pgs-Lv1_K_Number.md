---
layout: post
title: 프로그래머스 K번째 수 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-09-08T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://school.programmers.co.kr/learn/courses/30/lessons/42748](https://school.programmers.co.kr/learn/courses/30/lessons/42748)

## 문제 요구사항
---
> + 배열 array의 i번째 숫자부터 j번째 숫자까지 자르고 정렬했을 때, k번째에 있는 수를 구하려 합니다.

<img src="/assets/img/post-img/algorithm/2022-09-05-pgs-Lv1_HateSameNumber/problem-requirement1.jpg">

> + 배열 array, [i, j, k]를 원소로 가진 2차원 배열 commands가 매개변수로 주어질 때, commands의 모든 원소에 대해 앞서 설명한 연산을 적용했을 때 나온 결과를 배열에 담아 return 하도록 solution 함수를 작성해주세요.
> + array의 길이는 1 이상 100 이하입니다.
> + array의 각 원소는 1 이상 100 이하입니다.
> + commands의 길이는 1 이상 50 이하입니다.
> + commands의 각 원소는 길이가 3입니다.

## 접근 방법
---
> + STL의 copy 함수와 algorithm의 sort 함수를 이용하면 쉽게 풀이가 가능하다.

## 풀이 순서
---
> 1. commands의 사이즈만큼 for문을 반복한다.
> 2. 이후 각 commands의 i, j, k 값을 벡터 인덱스에 맞게 구해준다.
> 3. copy_array 벡터를 생성하고, 사이즈는 j - i + 1의 규칙을 갖는다.
> 4. copy함수를 사용해서 array의 begin() + i 부터 begin() + j + 1까지 잘라 copy_array에 복사한다.
> 5. copy_array를 sorting 한다.
> 6. answer에 k번째 수를 넣는다.
> 7. 이와 같은 작업 반복

## 소스코드
---
~~~c++
#include <vector>
#include <algorithm>

using namespace std;

vector<int> solution(vector<int> array, vector<vector<int>> commands) {
    vector<int> answer;

    for (int test_case = 0; test_case < commands.size(); test_case++) {
        int i = commands[test_case][0] - 1;
        int j = commands[test_case][1] - 1;
        int k = commands[test_case][2] - 1;

        vector<int> copy_array(j - i + 1);
        copy(array.begin() + i, array.begin() + j + 1, copy_array.begin());
        sort(copy_array.begin(), copy_array.end());

        answer.push_back(copy_array[k]);
    }

    return answer;
}

int main() {

    solution({ 1, 5, 2, 6, 3, 7, 4 }, { {2, 5, 3},{4, 4, 1},{1, 7, 3} });

    return 0;
}
~~~

## 문제 풀이 결과
---
<img src="/assets/img/post-img/algorithm/2022-09-06-pgs-Lv1_CreatePrimeNumber/result.jpg">