---
layout: post
title: 프로그래머스 다트 게임 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-05-19T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://programmers.co.kr/learn/courses/30/lessons/17682](https://programmers.co.kr/learn/courses/30/lessons/17682)

## 문제 요구사항
---
> + 매개변수로 dartResult 문자열이 주어진다.
> + 다트 게임은 총 3번의 기회로 구성된다.
> + 각 기회마다 얻을 수 있는 점수는 0점에서 10점까지 이다.
> + 점수와 함께 Single(S), Double(D), Triple(T) 영역이 존재하고 각 영역 당첨 시 점수에서 1제곱, 2제곱, 3제곱으로 계산 된다.
> + 옵션으로 스타상(  *  ) , 아차상(#)이 존재하며 스타상(*) 당첨 시 해당 점수와 바로 전에 얻은 점수를 각 2배로 만든다. 아차상(#) 당첨 시 해당 점수는 마이너스 된다.
> + dartResult는 점수,보너스, 옵션으로 세트 된 문자열이다
>     + Ex) 1S*10D#
>     + 위와 같은 다트 게임 결과는 1점, S(1제곱), *(*2) + 10점, D(2제곱), #(*-1) -> -98점이 된다.
>  + 보너스는 S, D, T 중 하나이다.
> + 옵선은 *이나 # 중 하나이며, 없을 수도 있다.

## 접근 방법
---
> + 지금 이 문제를 정리하다보니 발견한 점이 있다... 바로 ' 다트 게임은 총 3번의 기회로 구성된다. '이다....나는 이걸 모르고 dart_count라는 변수를 선언해서 몇 번 던졌는지 count 했다..(이거 어떻게 구현할지 고민을 30분 정도 했는데..) 그리고, 주의할 점은 #(아차상)은 현재 점수만 -1을 곱한다는 것이다. 주어진 dartResult를 잘 파싱해서 순수 점수를 구하고, 보너스에 해당하는 값을 곱해주고, 옵션이 있다면 옵션 값을 처리하면 된다.

## 풀이 순서
---
> 1. dartResult의 길이만큼 while문을 실행한다.
>     + 인덱스를 계산하는 i 변수를 이용해 현재 기회의 순수 점수를 구한다.
>         + 이때,  i + 1의 인덱스에 있는 값이 0이면 10이므로, 순수 점수에 10을 넣고, i + 1을 한다.
>     + 이후, 보너스 점수에 해당하는 값을 계산하여 현재 점수를 계산하고, i + 1을 한다.
>     + dart_count를 +1 하여, 다트 던진 횟수를 count 한다.
>     + dartResult[i] 값이 *(스타상)이면 다음 소스를 실행한다.
>         + dart_count가 1이 아닐 때(처음 던진게 아닐 때) 이전 점수를 갱신해준다( *2)
>         + 현재 점수 * 2 하고, score 벡터에 삽입한다.
>         +  i+1
>     + dartResult[i] 값이 #{아차상)이면 다음 소스를 실행한다.
>         + 현재 점수에 * -1 하고, score 벡터에 삽입한다.
>         +  i+1
>     + dartResult[i]값이 스타상, 아차상도 아닐 시, 현재 점수를 score에 삽입하고 continue 한다.
>     +이와 같은 작업 반복
> 2. score 변수를 foreach문을 이용하여 answer값에 더해준다.

## 소스코드
---
~~~c++
#include <string>
#include <vector>
using namespace std;

int solution(string dartResult) {
    int answer = 0;
    vector<int> score;

    int dart_count = 0;
    int i = 0;
    while(i < dartResult.length()) {
        int current_score = dartResult[i] - '0';
        if(current_score == 1 && dartResult[i + 1] == '0') {
                current_score = 10;
                i++;
        }
        i++;
        if(dartResult[i] == 'D') {
            current_score = current_score * current_score;
        } else if(dartResult[i] == 'T') {
            current_score = current_score * current_score * current_score;
        }
        i++;
        dart_count++;

        int prev_score = 0;
        if(dartResult[i] == '*') {
            if(dart_count != 1) {
                prev_score = score[dart_count - 2];
                score[dart_count - 2] = prev_score * 2;
            }
            current_score = current_score * 2;
            score.push_back(current_score);
        } else if(dartResult[i] == '#') {
            current_score = current_score * -1;
            score.push_back(current_score);
        }else {
            score.push_back(current_score);
            continue;
        }

        i++;
    }

    for(int i : score) {
        answer += i;
    }

    return answer;
} 
~~~

## 문제 풀이 결과
---
<img src="/assets/img/post-img/algorithm/2022-05-19-pgs-DartGame/result.jpg">