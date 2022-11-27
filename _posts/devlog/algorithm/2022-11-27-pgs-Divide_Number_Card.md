---
layout: post
title: 프로그래머스 숫자 카드 나누기 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-11-27T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[프로그래머스 : Level2_숫자 카드 나누기](https://school.programmers.co.kr/learn/courses/30/lessons/135807?language=cpp)


## 문제 요구사항
---
> + 철수와 영희는 선생님으로부터 숫자가 하나씩 적힌 카드들을 절반씩 나눠서 가진 후, 다음 두 조건 중 하나를 만족하는 가장 큰 양의 정수 a의 값을 구하려고 합니다.
>     + 철수가 가진 카드들에 적힌 모든 숫자를 나눌 수 있고 영희가 가진 카드들에 적힌 모든 숫자들 중 하나도 나눌 수 없는 양의 정수 a
>     + 영희가 가진 카드들에 적힌 모든 숫자를 나눌 수 있고, 철수가 가진 카드들에 적힌 모든 숫자들 중 하나도 나눌 수 없는 양의 정수 a

> 1. 예를 들어, 카드들에 10, 5, 20, 17이 적혀 있는 경우에 대해 생각해 봅시다. 
> 2. 만약, 철수가 [10, 17]이 적힌 카드를 갖고, 영희가 [5, 20]이 적힌 카드를 갖는다면 두 조건 중 하나를 만족하는 양의 정수 a는 존재하지 않습니다. 
> 3. 하지만, 철수가 [10, 20]이 적힌 카드를 갖고, 영희가 [5, 17]이 적힌 카드를 갖는다면, 철수가 가진 카드들의 숫자는 모두 10으로 나눌 수 있고, 영희가 가진 카드들의 숫자는 모두 10으로 나눌 수 없습니다. 
> 4. 따라서 철수와 영희는 각각 [10, 20]이 적힌 카드, [5, 17]이 적힌 카드로 나눠 가졌다면 조건에 해당하는 양의 정수 a는 10이 됩니다.

> + 철수가 가진 카드에 적힌 숫자들을 나타내는 정수 배열 arrayA와 영희가 가진 카드에 적힌 숫자들을 나타내는 정수 배열 arrayB가 주어졌을 때, 주어진 조건을 만족하는 가장 큰 양의 정수 a를 return하도록 solution 함수를 완성해 주세요. 
> + 만약, 조건을 만족하는 a가 없다면, 0을 return 해 주세요.
> + 1 ≤ arrayA의 길이 = arrayB의 길이 ≤ 500,000
> + 1 ≤ arrayA의 원소, arrayB의 원소 ≤ 100,000,000
> + arrayA와 arrayB에는 중복된 원소가 있을 수 있습니다.


## 접근 방법
---
> + arrayA와 arrayB 각각에 최대공약수를 구하고, 그 값이 1이 아니라면 상대 배열에 그 값으로 나누어지는 원소가 있는지 check한다.
> + 만약 둘 다 최대 공약수가 존재하고, 나누어지는 원소가 없다면, 둘 중 큰 값을 answer에 넣는다.


## 풀이 순서
---
> 1. arrayA_gcd, arrayB_gcd를 선언해 각 배열의 첫번쨰 원소를 넣는다.
> 2. array size만큼 for문을 반복해 각 변수에 최대 공약수를 넣어준다.
> 3. 각 배열의 최대 공약수를 구한 뒤, 그 값이 둘 다 1이라면 0을 return 한다.
> 4. 각각의 최대 공약수가 1이 아니라면 반대 배열에 나누어 떨어지는지 check 하고 그렇지 않다면 res 변수에 각각 넣어준다.
> 5. max 함수를 이용해 더 큰 값을 answer에 넣어주고 반환


## 소스코드
---
~~~c++
#include <algorithm>
#include <vector>

using namespace std;

int gcd(int a, int b) {
    if (b == 0)
        return a;
    else
        return gcd(b, a % b);
}

int solution(vector<int> arrayA, vector<int> arrayB) {
    int answer = 0;

    int arrayA_gcd = arrayA[0];
    int arrayB_gcd = arrayB[0];

    int resA = 0;
    int resB = 0;
    for (int i = 1; i < arrayA.size(); i++) {
        arrayA_gcd = gcd(arrayA_gcd, arrayA[i]);
        arrayB_gcd = gcd(arrayB_gcd, arrayB[i]);
    }

    if (arrayA_gcd == 1 && arrayB_gcd == 1) {
        return 0;
    }

    if (arrayA_gcd != 1) {
        bool checked = true;

        for (int i = 0; i < arrayB.size(); i++) {
            if (arrayB[i] % arrayA_gcd == 0) {
                checked = false;
                break;
            }
        }
        if (checked)
            resA = arrayA_gcd;
    }

    if (arrayB_gcd != 1) {
        bool checked = true;

        for (int i = 0; i < arrayA.size(); i++) {
            if (arrayA[i] % arrayB_gcd == 0) {
                checked = false;
                break;
            }
        }
        if (checked)
            resB = arrayB_gcd;
    }

    answer = max(resA, resB);

    return answer;
}
~~~

## 문제 풀이 결과
---
<img src="/assets/img/post-img/algorithm/2022-11-27-pgs-Divide_Number_Card/result.jpg">