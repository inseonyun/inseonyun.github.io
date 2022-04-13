---
layout: post
title: Git 기본 명령어 (1) - config 및 clone
category: devlog
tags: git

last_modified_at: 2022-04-12T14:00:00-15:00
---

1. this list will be replaced by the toc
{:toc}

## Git 사용자 정보 등록
~~~batch
git config --global user.name 이름 입력
git config --global user.email Git 이메일 주소 입력

< 예시 >
git config --global user.name inseonyun
git config --global user.email inseonyun@hallym.ac.kr
~~~
  
## SSH 키 생성하기
1. #### 로컬에 SSH 키 생성
❗ 주의 ❗ 무턱대고 생성하면 기존 SSH 키가 사라질 수 있으니 꼭 존재하는지 확인 요망
~~~batch
cd ~/.ssh
ssh-keygen -t rsa -b 4096 -C "본인 깃허브 이메일 주소"
~~~

위 명령어를 실행하면 아래와 같이 키를 저장하고자 하는 위치, 비밀번호 설정 여부를 물어본다. (특별한 사항 없을 시 디폴트(엔터))
~~~batch
Generating public/private rsa key pair.
Enter file in which to save the key (/home/user/.ssh/id_rsa): 
~~~

~~~batch
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
~~~
    
이후 *.pub 이라는 파일의 공개키의 내용을 복사하여, 본인의 GitHub 계정 SSH Key에 등록을 해준다.

2. #### GitHub에 SSH 키 등록
<p align=left>
<img src="/assets/img/post-img/git/2022-04-12-basic-git-command-1/ssh-1.jpg">

<br> &nbsp;

<img src ="/assets/img/post-img/git/2022-04-12-basic-git-command-1/ssh-2.jpg" width="830">

<br> &nbsp;

<img src ="/assets/img/post-img/git/2022-04-12-basic-git-command-1/ssh-3.jpg" width="830">
</p>

<br>

## 원격 저장소 내려받기 - Clone
1. #### https 주소를 통해 내려받기
여러 방법이 있는데 많이 사용하는 https와 SSH 주소를 통해 내려받는 방법을 기술했다.

~~~batch
git clone 'git Https 주소'

예시 -> git clone https://github.com/inseonyun/git-command.git
~~~

2. #### SSH 주소를 통해 내려받기
❗ 주의 ❗ GitHub 계정에 SSH키 생성 및 등록까지 마쳐야 진행 가능.

~~~batch
git clone 'git SSH 주소'

< 예시 > 
git clone git@github.com:inseonyun/git-command.git
~~~