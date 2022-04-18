---
layout: post
title: Arduino Web Server를 이용한 IoT 버튼
category: devlog
tags: arduino

last_modified_at: 2022-04-18T20:00:00+09:00
---

1. this list will be replaced by the toc
{:toc}

## 개요
---
#### Web Server란?
+ 웹 브라우저와 같은 클라이언트로부터 HTTP 요청을 받고, HTML 문서와 같은 웹페이지를 반환하는 컴퓨터 프로그램 - [위키백과](https://ko.wikipedia.org/wiki/%EC%9B%B9_%EC%84%9C%EB%B2%84)
+ 이러한 웹 서버를 아두이노에 구축하여, 웹페에지에서 사용자가 특정 이벤트를 발생시키면 아두이노가 작동하여, 특정 스위치를 켜고 끄는 IoT 버튼을 만들 계획이다.

## 사용한 부품
+ Node MCU(ESP 8266)이라는 아두이노 본체와 서보모터를 이용하였다.
> + Node MCU란, 오픈소스 사물인터넷 (IoT) 플랫폼으로 와이파이 기능이 구현된 MCU 개발보드를 의미한다. 일반 보드에서도 이를 구현할 수 있지만, 목적을 좀 더 수월하게 이룰 수 있도록 이미 구현이 된 개발보드를 채택하였다.

## 회로도
---
<p align=center>
    <img src="/assets/img/post-img/arduino/2022-04-18-arduino-iotbutton/circuit.jpg" weight="500">
</p>

+ 회로도의 경우 매우 간단하다. 내가 그리는 회로도 사이트에는 Node MCU 보드가 없어서 아두이노 우노 보드로 그렸다.
+ 원리는 위에서 언급했듯이, 웹서버에서 클라이언트가 특정 이벤트를 주면 보드에 연결된 서보 모터가 움직여서 스위치를 켜고 끄는 것이다.
+ 나의 경우에는 노트북을 원격으로 켜고 끄는 스위치를 목적으로 만들었다.

## 웹페이지 이미지
<p align=center>
    <img src="/assets/img/post-img/arduino/2022-04-18-arduino-iotbutton/web-server-page.jpg" weight="500">
</p> 

+ 사용자가 슬라이더를 움직여 그 각도만큼 서보 모터를 움직이도록 웹서버에 요청한다.
+ 요청을 받은 웹서버에서 아두이노를 응답시켜 서보모터가 해당 각도만큼 움직이도록 한다.

## 추가로 해주면 좋은 것
+ Q. 외부에서 해당 버튼을 이용하려면 외부에서 해당 Wifi 접근을 해야하는데 어떡하나요?
+ A. 간단하다. 공유기에 있는 포트 포워딩 기능을 이용해서 아두이노 웹서버를 외부에서 접근 할 수 있도록 하면 된다. 구글에 검색해보면 자신의 공유기 종류별로 설명이 상세히 나와있다.

## 소스코드
---
~~~c++
#include <ESP8266WiFi.h>
#include <Servo.h>
 
#define PIN_SERVO D0

const char* ssid = "여기에는 사용자 wifi 이름";
const char* password = "사용자 wifi 비밀번호";
 
WiFiServer server(80);
Servo myServo;

void setup() {
  Serial.begin(115200);
  myServo.attach(PIN_SERVO);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  server.begin();
  Serial.println("Server started");
}

void loop() {
  WiFiClient client = server.available();
  if(!client) return;

  Serial.println("새로운 클라이언트");
  client.setTimeout(5000);

  String request = client.readStringUntil('\r');
  Serial.println("request: ");
  Serial.println(request);

  while(client.available()) {
    client.read();
  }

  if(request.indexOf("/pos=") >= 0) {
    int pos1 = request.indexOf('=');
    int pos2 = request.indexOf('d');
    String servoPos = request.substring(pos1+1, pos2);

    myServo.write(servoPos.toInt());
    Serial.println(servoPos); 

    delay(500);
    
    myServo.write(0);
  }

  client.print("<!DOCTYPE HTML>");
  client.print("<html>");
  client.print("<head>");
  client.print("<meta charset=\"UTF-8\">");
  client.print("<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script>");
  client.print("</head>");
  client.print("<body>");
  client.print("<h2>Servo Control Webpage</h2>");
  client.print("Servo position : <span id=\"servoPos\"></span>");
  client.print("<br>");
  client.print("<input type=\"range\" min=\"0\" max=\"40\" value = \"0\" id=\"servoSlider\" onchange=\"servoWrite(this.value)\"/>");
  client.print("<script>");
  client.print("var slider = document.getElementById(\"servoSlider\");");
  client.print("var servoPos = document.getElementById(\"servoPos\");");
  client.print("slider.oninput = function() {");
  client.print("slider.value = this.value;");
  client.print("servoPos.innerHTML = this.value;}");
  client.print("\n");
  client.print("$.ajaxSetup({timeout:1000});");
  client.print("function servoWrite(pos) {");
  client.print("$.get(\"/pos=\" + pos + \"d\");");
  client.print("{Connection: close};}");
  client.print("</script>");
  client.print("</body>");
  client.print("</html>");

  Serial.println("클라이언트 연결 해제");
}
~~~

## 시연 영상
---
<video width="40%" height="40%" controls="controls">
  <source src="/assets/img/post-img/arduino/2022-04-18-arduino-iotbutton/video.mp4" type="video/mp4">
</video>

## 마치며
+ 사실 완벽하게 구현하고, 3D 프린팅으로 마감처리까지 다 하려고 했었는데, 프린팅 하는데 돈을 받고, 캐드 작업도 필요해서 배보다 배꼽이 더 클 것 같아 대충 셀로판지로 마감처리를 해서 사용하고 있다....캐드 관련 욕심도 시간도 없기 때문에 기회가 된다면 웹이 아닌 앱을 통해서 동작하도록 구현 해보려고 한다...