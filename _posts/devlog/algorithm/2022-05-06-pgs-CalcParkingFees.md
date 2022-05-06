---
layout: post
title: 프로그래머스 주차 요금 계산 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-05-06T14:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://programmers.co.kr/learn/courses/30/lessons/92341](https://programmers.co.kr/learn/courses/30/lessons/92341)

## 문제 요구사항
---
> + 요금과 관련된 벡터 fees와 입출차 기록이 담긴 records 벡터가 매개변수로 주어진다.
> + fees의 각 인덱스는 기본 시간(분), 기본 요금(원), 단위 시간(분), 단위 요금(원)로 이루어져 있다.
> + records의 각 인덱스는 시간:분, 차량 번호, 입출차 기록(IN, OUT)으로 이루어져 있다.
> + 이 때, 출차기록이 없을 수 있는데, 츨차 기록이 없는 경우 23:59분에 출차 한 것으로 가정한다.
> + 각 차량들의 요금을 계산하여라.
> + 이 때, 차량들의 요금은 차량번호 순으로 오름차순 정렬하도록 한다.

## 접근 방법
---
> + 알고리즘 종류는 문자열인 문제이다. 이외의 기능들은 모두 구현에 해당된다. 그렇기 때문에 나는 구현에만 신경을 써서 코드가 제법 더러워 보일 수 있다. 문제에서 요구하는 각 차량들의 요금을 나는 똑같은 차량이 입출차하는 경우를 생각 안 하고 코딩했었는데, 첫번째 TC에서 보니까 5961이란 차가 두 번이나 왔다 간다. ^^:;; 이거 때문에 엄청 헤맸었는데 문제를 자세히 보니 나갔다 오면 그 차의 이용시간이 초기화 돼서 기본 요금부터 시작하는게 아니라 이전에 이용했던 시간이 누적되어 계산되는 시스템이었다. (이런 주차시스템이 현실에서 쓰이긴 하나....) 여튼 이러한 조건 때문에 오히려 문제 풀이가 쉬웠다. (헤맨거 빼고)

## 풀이 순서
---
> 1. 입출차기록을 다음과 같이 파싱한다. (차량 번호, 입출차 시간, 입출차 정보)
> 2. 파싱 함수를 만들어서 vector<string>으로 반환한다.
> 3. 파싱된 vector를 입출차 정보에 맞게 IN이라면 IN 입출차 기록 vector에, OUT은 OUT 입출차 기록 vector에 각각 담아줬다.
> 4. IN_record의 사이즈만큼 반복문을 돌며, OUT_record에서 출차 기록을 찾는다.
> 5. 이 때, 출차기록이 없다면 나가지 않은 것이고, 출차기록이 있다면 idx에 해당 인덱스 값을 넣어주고 반복문을 종료한다.
> 6. idx가 -1이면, 23시 59분 출차로 해서 주차 이용시간을 h, m변수에 담는다.
> 7. idx값이 -1이 아니라면, 출차 시간이 있는 것이므로, 출차 시간 - 입차 시간으로 계산해서 h, m을 구한다.
> 8. 이 때, 시간은 문자열이므로, 문자열 시간을 int형 시간으로 변환하는 파싱 함수를 생성해줬다.
> 9. total_use_time 변수에 해당 시간을 게산하여 담고, 이 변수를 map 합수 key(차량번호)에 +=을 누적 계산한다.
> 10. 이와 같은 작업을 반복한다.
> 11. map 함수를 foreach문을 통해 반복하여 기본 요금 시간을 초과하면 기본 요금 + 초과 시간 요금을 계산하고, 아니라면 기본요금만 부과한다.
> 12. 문제에서 요구하는 sorting은 map 함수에서는 key값으로 자동으로 sorting 하기 때문에 할 필요가 없었다.
> 13. 이렇게 정리된 map 함수의 total_cost를 answer에 담는다.

## 소스코드
---
~~~c++
#include <string>
#include <vector>
#include <map>

using namespace std;

vector<string> parse(string str) {
    vector<string> result;
    
    string tmp = str;
	int first_space = tmp.find(' ');
	string time = tmp.substr(0, first_space);

	tmp = tmp.erase(0, first_space + 1);

	int second_space = tmp.find(' ');
	string car_number = tmp.substr(0, second_space);

	string inout = tmp.substr(second_space + 1, tmp.length() - 1);
    
    result.push_back(time);
    result.push_back(car_number);
    result.push_back(inout);
    
    return result;
}

vector<int> time_parse(string str) {
	vector<int> result;

	string hour, min;

	int f = str.find(':');

	hour = str.substr(0, f);
	min = str.substr(f + 1, str.length() - 1);

	int h = stoi(hour);
	int m = stoi(min);

	result.push_back(h);
	result.push_back(m);
	
	return result;
}

vector<int> solution(vector<int> fees, vector<string> records) {
    vector<int> answer;
    
    vector<pair<string, string>> in_record;
	vector<pair<string, string>> out_record;
	
	map<string, int> total_time_record;

	for (int i = 0; i < records.size(); i++) {
		vector<string> row = parse(records[i]);

		if (row[2].compare("IN") == 0) {
			in_record.push_back({ row[1], row[0] });
		}
		else {
			out_record.push_back({ row[1], row[0] });
		}
	}

	for (int i = 0; i < in_record.size(); i++) {
		// out_record에서 in_record 찾음
		int idx = -1;
		int out_recordSize = out_record.size();
		for (int j = 0; j < out_recordSize; j++) {
			if (in_record[i].first.compare(out_record[j].first) ==0) {
				idx = j;
				break;
			}
		}

		int h, m;
		if (idx == -1) {
			// 출차 기록이 없다는 것
			// 출차시간 11:59로 계산하면 됨.
			string in_time_str = in_record[i].second;
			vector<int> in_time = time_parse(in_time_str);
			int out_hour = 23;
			int out_min = 59;
			
			h = out_hour - in_time[0];
			m = out_min - in_time[1];
		}
		else {
			// 출차 기록이 있는 것
			// 출차 시간 - 입차시간 후 요금 계산
			string in_time_str = in_record[i].second;
			string out_time_str = out_record[idx].second;

			vector<int> in_time = time_parse(in_time_str);
			vector<int> out_time = time_parse(out_time_str);

			if (out_time[1] - in_time[1] < 0) {
				int tmp = 60 - in_time[1];
				m = tmp + out_time[1];
				h = out_time[0] - in_time[0] - 1;
			}
			else {
				h = out_time[0] - in_time[0];
				m = out_time[1] - in_time[1];
			}
			out_record.erase(out_record.begin() + idx);
		}
		int total_use_time = (h * 60) + m;
		total_time_record[in_record[i].first] += total_use_time;
		
	}
	for (pair<string, int> i : total_time_record) {
		int time = i.second;
		int total_use_cost = 0;

		if (time <= fees[0]) {
			//기본 요금만 부과
			total_use_cost += fees[1];
		}
		else {
			// 기본 요금 부과 후, 추가 요금 부과
			time = time - fees[0];
			total_use_cost += fees[1];

			int mul = time / fees[2];
			if (mul == 0) {
				total_use_cost += fees[3];
			}
			else {
				total_use_cost += mul * fees[3];
				if (time % fees[2] != 0) {
					total_use_cost += fees[3];
				}
			}
		}
		answer.push_back(total_use_cost);
	}
    return answer;
}
~~~

## 문제 풀이 결과
---
<img src="/assets/img/post-img/algorithm/2022-05-06-pgs-CalcParkingFees/result.jpg">