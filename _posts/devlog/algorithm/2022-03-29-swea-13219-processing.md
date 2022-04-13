---
layout: post
title: SW Expert Academy 13219_진행률 문제풀이 in C++
category: devlog
tags: algorithm

last_modified_at: 2022-04-08T13:00:00-13:00
---

1. this list will be replaced by the toc
{:toc}

## 문제 URL
---
[https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AXzjxA7K-QcDFASs](https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AXzjxA7K-QcDFASs)

## 문제 요구사항
---
> + 진행률 P와 평면 위의 점 (X, Y)가 주어졌을 때, 이 점이 현재 흰색인지 검은색인지를 출력하는 프로그램을 작성하라.
> + 중심 좌표는 (50, 50)이며, 우측 상단 꼭지점은 (100, 100)이다.
> +  P(진행률)은 (0 ≤ P ≤ 100)를 따르며, 시계방향으로 (P/100)X360° 회전하면서 쓸고 지나가는 부채꼴 영역이 검은색으로 색칠된다.

## 접근 방법
---
+ 해당 문제의 경우 어떻게 접근 해야할지 고민을 많이 했다. 그 중 떠오른 생각이 문제에서 진행률에 따른 각도 구하는 식을 제공해주길래 각도를 통해 계산하면 될 거 같았다.

## 풀이 순서
---
> 1. 주어진 진행률의 각도를 구한다.
> 2. 주어진 X와 Y 좌표의 각도를 구한다. -> cmath 라이브러리의 atan2 함수 사용, 정확한 Pi값 필요
> 3. X Y좌표의 각도가 음수가 되면 180도를 넘어갔다는 의미로 해당 값에 절대 값을 씌우고, (중심 X좌표 - X좌표, 중심 Y좌표 - Y좌표)의 각을 구한 후, 2를 곱하여 기존 구했던 값에 더해준다.
여기서 2를 곱해준 이유는 180도를 넘어가게 되면 atan2 함수의 경우 -180도에서 넘어간 만큼 더한 값을 반환 해주기 때문이다.
> 4. 추가로 두 점 사이 거리 공식을 이용하여 입력받은 점과 중심 점의 거리가 반지름보다 클 경우 원의 밖에 있는 점이므로, 다음 test_case를 진행하게 하였다.

## 풀이 예시 이미지
---
<img src="/assets/img/post-img/algorithm/2022-03-29-swea-13219-processing/processing-img.jpg">

## 소스코드
---
~~~c++
#include <iostream>
#include <cmath>
 
using namespace std;
 
const double pi = 3.14159265358979;
 
void test() {
    int TC;
    cin >> TC;
 
    int result[1000] = { 0, };
 
    for (int test_case = 0; test_case < TC; test_case++) {
        int P, X, Y;
        cin >> P >> X >> Y;
 
        if (50 < sqrt(pow(X - 50, 2) + pow(Y - 50, 2))) {
            continue;
        }
 
        int cenX = 50, cenY = 50;
 
        double theta = (P * 0.01) * 360;
        double tmp = atan2(X - cenX, Y - cenY) * 180 / pi;
 
        if (tmp < 0) {
            tmp = abs(tmp);
 
            double tmp2 = atan2(cenX - X, cenY - Y) * 180 / pi;
            tmp = tmp + tmp2 * 2;
        }
 
        if (tmp < theta) {
            result[test_case] = 1;
        }
    }
 
    for (int i = 0; i < TC; i++) {
        cout << "#" << i + 1 << " " << result[i] << "\n";
    }
}
int main() {
    test();
     
    return 0;
}
~~~

## 문제 풀이 결과
---
<img src="/assets/img/post-img/algorithm/2022-03-29-swea-13219-processing/result.jpg">