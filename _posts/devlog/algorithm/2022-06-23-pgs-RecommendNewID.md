---
layout: post
title: 프로그래머스 신규 아이디 추천 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-06-23T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://programmers.co.kr/learn/courses/30/lessons/72410](https://programmers.co.kr/learn/courses/30/lessons/72410)

## 문제 요구사항
---
> + 아이디의 길이는 3자 이상 15자 이하여야 합니다.
> + 아이디는 알파벳 소문자, 숫자, 빼기(-), 밑줄(_), 마침표(.) 문자만 사용할 수 있습니다.
> + 단, 마침표(.)는 처음과 끝에 사용할 수 없으며 또한 연속으로 사용할 수 없습니다.
> + "네오"는 다음과 같이 7단계의 순차적인 처리 과정을 통해 신규 유저가 입력한 아이디가 카카오 아이디 규칙에 맞는 지 검사하고 규칙에 맞지 않은 경우 규칙에 맞는 새로운 아이디를 추천해 주려고 합니다.
>     + 1단계 new_id의 모든 대문자를 대응되는 소문자로 치환합니다.
>     + 2단계 new_id에서 알파벳 소문자, 숫자, 빼기(-), 밑줄(_), 마침표(.)를 제외한 모든 문자를 제거합니다.
>     + 3단계 new_id에서 마침표(.)가 2번 이상 연속된 부분을 하나의 마침표(.)로 치환합니다.
>     + 4단계 new_id에서 마침표(.)가 처음이나 끝에 위치한다면 제거합니다.
>     + 5단계 new_id가 빈 문자열이라면, new_id에 "a"를 대입합니다.
>     + 6단계 new_id의 길이가 16자 이상이면, new_id의 첫 15개의 문자를 제외한 나머지 문자들을 모두 제거합니다. 
>       > 만약 제거 후 마침표(.)가 new_id의 끝에 위치한다면 끝에 위치한 마침표(.) 문자를 제거합니다.
>     + 7단계 new_id의 길이가 2자 이하라면, new_id의 마지막 문자를 new_id의 길이가 3이 될 때까지 반복해서 끝에 붙입니다.

## 접근 방법
---
> + 문자열 erase 함수, substr 함수를 잘 이용한다면 문제 풀이가 가능하다.

## 풀이 순서
---
> 1. 주어진 new_id를 매개변수로 받는다.
> 2. new_id의 길이만큼 for문을 수행한다.
>     + new_id[ now ]의 값을 tolower함수를 이용하여 소문자로 변환하고, 이 값을 ch 변수에 저장한다.
>     + ch 변수를 조건문으로 비교하여 문제에서 주어진 요구 사항에 맞도록 수정하고, answer에 저장한다.
>     + 이와 같은 작업 반복
> 3. 네오의 규칙 수행
>     + answer[ 0 ]이 '.'이라면, 지워준다.
>     + answer의 길이가 15 초과라면, substr 함수를 이용하여 0~15까지 자른다.
>     + answer의 길이가 0 초과일 때, 마지막에 '.'이 있으면 지워준다.
>     + answer의 값이 아무것도 없을 때, "aaa"로 치환해준다.
>     + answer의 길이가 3 미만일 때, 마지막 문자를 3 이상이 될 때까지 더해준다.
> 4. answer 반환

## 소스코드
---
~~~c++
#include <string>

using namespace std;

string solution(string new_id) {
    string answer = "";

    int dot_flag = 0;
    for (char c : new_id) {
        char ch = tolower(c);

        if (!((ch >= 'a' && ch <= 'z') || (ch == '.' || ch == '-' || ch == '_') || (ch >= '0' && ch <= '9')))
            continue;

        if ((ch >= 'a' && ch <= 'z') || (ch >= '0' && ch <= '9') || (ch == '-' || ch == '_')) {
            answer += ch;
            dot_flag = 0;
            continue;
        }
        if (ch == '.') {
            dot_flag++;

            if (dot_flag >= 2) {
                dot_flag -= 1;
                continue;
            }
            answer += '.';
        }
    }
    if (answer[0] == '.')
        answer.erase(0, 1);

    if (answer.length() > 15)
        answer = answer.substr(0, 15);

    if (answer.length() > 0) {
        if (answer[answer.length() - 1] == '.')
            answer.erase(answer.length() - 1, 1);
    }

    if (answer.compare("") == 0)
        answer = "aaa";

    if (answer.length() < 3) {
        char ch = answer[answer.length() - 1];
        while (answer.length() < 3) {
            answer += ch;
        }
    }


    return answer;
}
~~~

## 문제 풀이 결과
---
<img src="/assets/img/post-img/algorithm/2022-06-23-pgs-RecommendNewID/result.jpg">