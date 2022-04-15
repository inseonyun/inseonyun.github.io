---
layout: post
title: Arduino 불꽃 감지 센서와 블루투스 모듈을 이용한 화재 감지기
category: devlog
tags: arduino

last_modified_at: 2022-04-15T15:00:00-00:00
---

1. this list will be replaced by the toc
{:toc}

## 개요
---
#### 화재 감지기?
+ 화재 감지기의 경우 물리/화학적 변화량을 검출하는 센서 기능, 화재 여부 판단 기능, 화재 신호를 송출하는 발신 기능을 갖고 화재를 감지하는 기능을 수행한다.
+ 본 게시물에서는 이러한 화재 감지기를 아두이노의 불꽃 감지 센서와 블루투스 및 LCD, 피에조 부저 센서를 통해 화재 감지기를 제작 해보려고 한다.

## 회로도
---
<p align=center>
    <img src="/assets/img/post-img/arduino/2022-04-15-arduino-firealarm/circuit.jpg" weight="500">
</p>

+ 회로도는 생각보다 간단하다. 각 센서와 LCD를 회로도와 같이 연결해주면 된다.
    + 좀더 구체적인 감지기를 제작하고 싶으면 여러 센서를 연결해주면 된다. 

## 소스코드
---
~~~c++
#include <LiquidCrystal_I2C.h>
#include <SoftwareSerial.h>

SoftwareSerial swSerial(2,3); //블루투스 tx rx핀
LiquidCrystal_I2C lcd(0x3F, 2, 1, 0, 4, 5, 6, 7, 3, POSITIVE); 

int flame = A0;     //센서가 연결된 아날로그핀
int buzzer = 12;    //피에조부저가 연결된 디지털핀
int val = 0;        //센서출력값 저장 변수

void setup() {
  swSerial.begin(9600);         //블루투스 화면 설정
  pinMode(buzzer, OUTPUT);      //피에조부저 출력설정
  pinMode(flame,INPUT);         //센서 입력설정
  Serial.begin(9600);           //시리얼모니터 설정
}
 
void loop() {
  val = analogRead(flame);      //센서에서 값을 읽어옴
  Serial.println(val);          //센서 입력값 시리얼모니터로 출력
  if(val >= 100)                //센서 입력값이 100이상이면 부저가 울림
  {
    digitalWrite(buzzer,HIGH);          //피에조 부저가 울림
    swSerial.println("Danger!!!!!");    //휴대폰 화면에 "Danger!!!"가 출력
    swSerial.println();                 //좀더 보기 편하게 한줄을 띔
  }else{
    digitalWrite(buzzer,LOW);           //피에조 부저가 꺼짐
    swSerial.println("Caution");        //휴대폰 화면에 "Caution"이 출력됨
    swSerial.println();                 //좀더 보기 편하게 한줄을 띔
  }
  if(val >=100) {                       //센서 입력값이 100이상이면, lcd화면에 "Danger!!!"이 출력됨
    lcd.begin(16,2); 
    lcd.backlight(); 
    lcd.setCursor(0,0); 
    lcd.print("Danger!!!"); 
  }else {                               //센서 입력값이 100미만이면, lcd화면에 "Caution!!!"이 출력됨
    lcd.begin(16,2); 
    lcd.backlight(); 
    lcd.setCursor(0,0); 
    lcd.print("Caution!!!"); 
  }
  delay(500);                   //이 반복을 딜레이를 주며 반복함.
}

~~~

## 시연 영상
---
<video width="80%" height="80%" controls="controls">
  <source src="/assets/img/post-img/arduino/2022-04-15-arduino-firealarm/video.mp4" type="video/mp4">
</video>
