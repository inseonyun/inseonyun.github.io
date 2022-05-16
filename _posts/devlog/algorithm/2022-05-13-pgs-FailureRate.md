---
layout: post
title: 프로그래머스 실패율 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-05-13T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://programmers.co.kr/learn/courses/30/lessons/42889](https://programmers.co.kr/learn/courses/30/lessons/42889)

## 문제 요구사항
---
> + 매개변수로 N(스테이지 수), stages(플레이어들이 멈춰있는 스테이지 배열)이 주어진다.
> + 실패율은 다음과 같이 정의한다.
>    + 스테이지에 도달했으나 아직 클리어하지 못한 플레이어의 수 / 스테이지에 도달한 플레이어 수
> + 실패율이 높은 스테이지부터 내림차순으로 스테이지의 번호가 담겨있는 배열을 return 하도록 solution 함수를 완성하라.
> + 만약 실패율이 같은 스테이지가 있다면 작은 번호의 스테이지가 먼저 오도록 하면 된다.
> + 스테이지에 도달한 유저가 없는 경우 해당 스테이지의 실패율은 0으로 정의한다.

## 접근 방법
---
> + 문제 난이도는 정말 레벨 1다운 난이도이다. 그냥 뭐 특별히 할 거 없이 구현만 해내면 되는 문제다. 주의할 것은 sorting과 자료형 계산이다. c++에서 int를 아무리 int로 나눠봐야 0과 그 몫으로 주어진다. double로 자료형을 만들어서 실패율을 계산하도록 한다. 또, 나는 요즘 map 함수가 쓰기 편해서 map 함수를 주로 사용한다.

## 풀이 순서
---
> 1. 각 스테이지 별로 실패율을 담을 변수 stage_failure_rate를 생성한다.
> 2. 이중 for문을 생성하여 바깥 for문은 스테이지 수만큼 돌도록 하고, 안쪽 for문은 stages 사이즈 만큼 돌도록 한다.
>     + 스테이지 index 값이 해당하는 스테이지와 같다면 사람 수 +1 해준다.
> 3. 사람 수가 0이면 실패율이 0이므로, 해당 스테이지 실패율 기록에 0을 넣은다.
> 4. 반대로 사람 수가 있다면 문제에서 주어진 방식으로 실패율을 구한 뒤 넣어준다.
> 5. 다음 스테이지에서 사람 수 만큼을 빼준 뒤 기록을 해야하므로, 값을 갱신 해준다.
> 6. 이와 같은 작업 반복
> 7. 이후 map함수의 value를 기준으로 내림차순 정렬 해야 하므로, 정렬하도록 한다.
> 8. 이 때, 문제에서 주어진 제한 조건인 실패율이 같을 경우, 스테이지가 작은 번호가 먼저 가도록 한다.
> 9. 정렬한 map 변수를 answer변수에 넣어 마무리 한다.

## 소스코드
---
~~~c++
#include <string>
#include <vector>
#include <map>
#include <algorithm>

using namespace std;

bool cmp(pair<int, double>& a, pair<int, double>& b) {
    if (a.second == b.second) {
        return a.first < b.first;
    }
    else {
        return a.second > b.second;
    }

}

vector<int> solution(int N, vector<int> stages) {
    vector<int> answer;

    map<int, double> stage_failure_rate;
    // stages에는 각 사람들이 멈춰있는 stage가 들어있다.
    // Ex) 2, 1, 2 는 1스테이지에 멈춰있는 사람 1명, 2스테이지에 멈춰있는 사람 2명
    // 고로 실패율은 1스테이지 1/3 , 2스테이지 2/2가 된다.
    // 실패율은 통과 못한 인원 / 스테이지 도달 플레이어 수 
    double current_person = stages.size();

    // N : 스테이지 수
    for (int i = 0; i < N; i++) {
        double failure_rate = 0;
        double current_stage_person = 0;
        int tmp = 0;
        // 플레이어 방문
        for (int j = 0; j < stages.size(); j++) {
            if (stages[j] == i + 1) {
                tmp++;
                current_stage_person++;
            }
        }

        if (current_stage_person == 0) {
            failure_rate = 0;
        }
        else {
            failure_rate = current_stage_person / current_person;
        }
        current_person -= tmp;
        stage_failure_rate[i + 1] = failure_rate;
    }

    // value를 기준으로 내림차순 정렬
    vector<pair<int, double>> tmp;

    for (auto& it : stage_failure_rate) {
        tmp.push_back(it);
    }
    sort(tmp.begin(), tmp.end(), cmp);

    for (auto& i : tmp) {
        answer.push_back(i.first);
    }

    return answer;
} 
~~~

## 문제 풀이 결과
---
<img src="/assets/img/post-img/algorithm/2022-05-13-pgs-FailureRate/result.jpg">