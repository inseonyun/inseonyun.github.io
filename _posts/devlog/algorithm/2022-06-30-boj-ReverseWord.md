---
layout: post
title: 백준 9093_단어 뒤집기 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-06-30T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://www.acmicpc.net/problem/9093](https://www.acmicpc.net/problem/9093)

## 문제 요구사항
---
> + 문장이 주어졌을 때, 단어를 모두 뒤집어서 출력하는 프로그램을 작성하시오. 
> + 단, 단어의 순서는 바꿀 수 없다. 단어는 영어 알파벳으로만 이루어져 있다.
> + 첫째 줄에 테스트 케이스의 개수 T가 주어진다.
> + 각 테스트 케이스는 한 줄로 이루어져 있으며, 문장이 하나 주어진다.
> + 단어의 길이는 최대 20, 문장의 길이는 최대 1000이다. 단어와 단어 사이에는 공백이 하나 있다.

## 접근 방법
---
> + C++에서 공백 있는 문자열 입력 방법인 getline을 사용해서 해당 문자열을 입력 받고,  Stack으로 단어를 뒤집어 출력하는 문제이다.

## 풀이 순서
---
> + test_case를 입력 받는다.
> + test_case만큼 for문을 반복하여, 문자열을 입력 받는다.
> + 문자열 길이만큼 for문을 반복한다.
>     +  문자열의 해당 인덱스가 ' '(공백)이거나 NULL(문자열의 끝)이라면 다음을 수행한다.
>         + Stack이 빌 때까지 while문 반복
>         + Stack의 원소를 하나씩 꺼내, result에 더해준다.
>     + 만약 반복인자 i 값이 입력 받은 문자열의 길이와 같지 않다면, result 문자열에 공백을 더해주고 continue 한다.
> + 완성된 result 문자열을 출력하고, 이와 같은 작업을 반복한다.

## 소스코드
---
~~~c++
#include <iostream>
#include <stack>
#include <string>

using namespace std;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);

    int test_case;
    cin >> test_case;
    cin.ignore();

    for (int tc = 0; tc < test_case; tc++) {
        string str;
        getline(cin, str);
        string result = "";

        stack<char> stack;
        for (int i = 0; i <= str.length(); i++)
        {
            if (str[i] == ' ' || str[i] == NULL)
            {
                while (!stack.empty())
                {
                    result += stack.top();
                    stack.pop();
                }
                if (i != str.length())
                    result += ' ';
                continue;
            }
            stack.push(str[i]);
        }
        cout << result << "\n";
    }

    return 0;
}
~~~

## 문제 풀이 결과
---
<img src="/assets/img/post-img/algorithm/2022-06-30-boj-ReverseWord/result.jpg">