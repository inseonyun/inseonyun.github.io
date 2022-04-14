---
layout: post
title: Arduino 7-segment 카운트
category: devlog
tags: arduino

last_modified_at: 2022-04-14T20:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 개요
---
#### 7-segment란?
+ 7세그먼트(7 Segment)는 7개의 획으로 숫자나 문자를 나타낼 수 있는 표시장치를 의미한다.
+ 이러한 7세그먼트(7 Segment)는 동작방식에 따라 공통 양극(Common-Anode)형 공통 음극(Common-Cathod)형으로 나뉜다.
    + Common-Anode는 LED의 양극(+극)끼리 묶어 VCC(+5V)에 연결해주고 음극(-극)에 GND에 연결하여 불이 들어오게 한다.
    + Common-Cathode는 LED의 음극(-극)끼리 묶어 GND에 연결하고 양극(+극)에 VCC를 연결해 불이 들어오게 한다.

## 회로도
---
<p align=center>
    <img src="/assets/img/post-img/arduino/2022-04-14-arduino-7segment/circuit.jpg" weight="500">
    &nbsp;
    <img src="/assets/img/post-img/arduino/2022-04-14-arduino-7segment/circuit-2.jpg" weight="300">
</p>

+ 나의 경우에는 버튼을 눌러 카운트를 하는 것이 목적이기 때문에 그림과 같이 회로를 구성했다.
+ 왼쪽 버튼을 누르면 숫자가 증가하고, 오른쪽 버튼을 누르면 숫자가 감소하게 된다.

## 소스코드
---
~~~c
#define PLUS 11  // 버튼 연결 핀 
#define MINUS 12

// 현재 숫자를 기록하는 변수를 선언합니다.
int digit = 0;

// 0은 led를 끄고, 1은 led를 킨다.
byte digits[10][7] =
{
{ 0,0,0,0,0,0,1 }, // 0
{ 1,0,0,1,1,1,1 }, // 1
{ 0,0,1,0,0,1,0 }, // 2
{ 0,0,0,0,1,1,0 }, // 3
{ 1,0,0,1,1,0,0 }, // 4
{ 0,1,0,0,1,0,0 }, // 5
{ 0,1,0,0,0,0,0 }, // 6
{ 0,0,0,1,1,1,1 }, // 7
{ 0,0,0,0,0,0,0 }, // 8
{ 0,0,0,1,1,0,0 }  // 9
};

void setup() {
    // 버튼 핀들을 입력 모드로 설정합니다.
    pinMode(PLUS, INPUT);
    pinMode(MINUS, INPUT);

    // 2~9번 핀들을 모두 출력 모드로 설정합니다.
    for(int i=2;i<10;i++) {
        pinMode(i, OUTPUT);
    }
    // DP, 점에 해당하는 부분을 켜줍니다.
    digitalWrite(9, HIGH);
}

void loop() {
    if(digitalRead(PLUS) == HIGH) {
        //눌렸다면 digit을 증가시킵니다.
        ++digit;
        if(digit>9) {
            // digit이 9를 넘었는지 확인하고 넘었으면 0으로 만듭니다.
            digit=0;
        }
    }
    if(digitalRead(MINUS) == HIGH) {
        // 눌렸다면 digit을 감소시킵니다.
        --digit;
        if(digit<0) {
            // digit이 0 밑으로 내려갔는지 확인하고 내려갔으면 9로 만듭니다.
            digit=9;
        }
    }
    // digit을 displayDigit 함수를 이용해 7세그먼트에 표시합니다.
    displayDigit(digit);

    // 0.1초 멈춥니다.
    delay(1000);
}


// 숫자를 표시하기 위해 만든 함수입니다.
void displayDigit(int num) {
    // 핀 번호를 맞춰주기 위해 2라는 값을 pin이란 변수를 선언했습니다.
    int pin = 2;
    for(int i=0;i<7;i++) {
        // 앞서 준비한 배열에서 값을 불러와서
        // 숫자를 7세그먼트에 표시합니다.
        digitalWrite(pin+i, digits[num][i]);
    }
}
~~~

## 시연 영상
---
<video width="80%" height="80%" controls="controls">
  <source src="/assets/img/post-img/arduino/2022-04-14-arduino-7segment/video.mp4" type="video/mp4">
</video>