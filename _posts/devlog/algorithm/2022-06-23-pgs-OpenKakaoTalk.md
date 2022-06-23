---
layout: post
title: 프로그래머스 오픈채팅방 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-06-23T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://programmers.co.kr/learn/courses/30/lessons/42888](https://programmers.co.kr/learn/courses/30/lessons/42888)

## 문제 요구사항
---
> + 카카오톡 오픈 채팅방을 개설한 사람을 위해, 다양한 사람들이 들어오고, 나가는 것을 지켜볼 수 있는 관리자창을 만들기로 했다. 채팅방에 누군가 들어오면 다음 메시지가 출력된다.
>     + "[닉네임]님이 들어왔습니다."
>     + "[닉네임]님이 나갔습니다."
> + 채팅방에서 닉네임을 변경하는 방법은 다음과 같이 두 가지이다.
>     + 채팅방을 나간 후, 새로운 닉네임으로 다시 들어간다.
>     + 채팅방에서 닉네임을 변경한다.
> + 닉네임을 변경할 때는 기존에 채팅방에 출력되어 있던 메시지의 닉네임도 전부 변경된다.
> + 모든 유저는 [유저 아이디]로 구분한다.
> + [유저 아이디] 사용자가 [닉네임]으로 채팅방에 입장 - "Enter [유저 아이디] [닉네임]" (ex. "Enter uid1234 Muzi")
> + [유저 아이디] 사용자가 채팅방에서 퇴장 - "Leave [유저 아이디]" (ex. "Leave uid1234")
> + [유저 아이디] 사용자가 닉네임을 [닉네임]으로 변경 - "Change [유저 아이디] [닉네임]" (ex. "Change uid1234 Muzi")
> + 첫 단어는 Enter, Leave, Change 중 하나이다.
> + 각 단어는 공백으로 구분되어 있으며, 알파벳 대문자, 소문자, 숫자로만 이루어져있다.
> + 유저 아이디와 닉네임은 알파벳 대문자, 소문자를 구별한다.

## 접근 방법
---
> + 이전에 풀었던 주차 요금 계산과 비슷하게 접근하려 했으나, 나갈 때는 "Leave uid0000" 형식으로 nickname이 빠지게 돼서 이를 고려 안 하고 풀이 했다가 생각보다 애를 먹었다. user_info map함수를 생성해서 key 값에 고유한 값인 uid 값을 갖게 하고, value에는 변동 가능성이 있는 nickname을 넣게 했다. 이후 user_status라는 Enter, Leave를 uid와 함께 기록하는 vector 변수를 생성해서 기록했다.

## 풀이 순서
---
> 1. 주어진 record 벡터를 매개변수로 받는다.
> 2. user_info(key  : user_id, value : user_nickname) map 변수와 user_status(first : user_id, second : Enter or Leave) 벡터 변수를 생성한다.
> 3. 매개변수 record를 for문을 통해 탐색
>     + Enter라면 user_info에 id를 키로 갖는 value 닉네임을 넣는다.
>     + Leave라면 user_info에서 id를 검색해 해당 닉네임 값을 가져 온다.
>     + Change라면 user_info에 id를 키로 갖는 value 닉네임을 재정의 하고, continue 한다.
>     + user_status에 id 값과 Enter or Leave 상태 값을 넣어준다.
>     + 이와 같은 작업 반복
> 4. user_status를 for문을 통해 탐색
    > + user_status[ i ].first (user_id)의 값을 user_info(user_id와 user_nickname 정보 담긴 map 변수)에 검색하여 그 값을 변수에 따로 저장한다.
>     + user_status[ i ].second(Enter or Leave) 값을 변수에 따로 저장한다.
>     + Enter or Leave인지 판단하여, answer에 문제에서 요구하는 형식에 맞게 정의하여 push 해준다.
>     + 이와 같은 작업 반복
> 5. answer 반환

## 소스코드
---
~~~c++
#include <string>
#include <vector>
#include <map>

using namespace std;

vector<string> string_split(string str) {
    vector<string> result;

    int find_space = str.find(' ');
    string status = str.substr(0, find_space);
    str = str.erase(0, find_space + 1);
    find_space = str.find(' ');
    string user_id = str.substr(0, find_space);
    str = str.erase(0, find_space + 1);
    string user_nickname = str;

    result.push_back(user_id);
    result.push_back(user_nickname);
    result.push_back(status);

    return result;
}

vector<string> solution(vector<string> record) {
    vector<string> answer;

    // first : user_id, second : Enter or Leave
    vector<pair<string, string>> user_status;

    // key : user_id, value : user_nickname
    map<string, string> user_info;

    for (int i = 0; i < record.size(); i++) {
        vector<string> row = string_split(record[i]);
        string row_id = row[0];
        string row_nickname = row[1];
        string row_status = row[2];

        if (row_status.compare("Enter") == 0) {
            user_info[row_id] = row_nickname;
        }
        else if (row_status.compare("Leave") == 0) {
            // find user_nickname
            row_nickname = user_info[row_id];
        }
        else {
            // change user_nickname
            user_info[row_id] = row_nickname;
            continue;
        }
        user_status.push_back({ row_id, row_status });
    }

    for (int i = 0; i < user_status.size(); i++) {
        string user_nickname = user_info[user_status[i].first];
        string user_inout = user_status[i].second;

        if (user_inout.compare("Enter") == 0) {
            answer.push_back(user_nickname + "님이 들어왔습니다.");
        }
        else {
            answer.push_back(user_nickname + "님이 나갔습니다.");
        }
    }

    return answer;
}
~~~

## 문제 풀이 결과
---
<img src="/assets/img/post-img/algorithm/2022-06-23-pgs-OpenKakaoTalk/result.jpg">