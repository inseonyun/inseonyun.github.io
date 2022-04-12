---
layout: post
title: Git 기본 명령어 (2) - 변경사항 반영 및 내려받기
category: devlog
tags: git

last_modified_at: 2022-04-12T15:00:00-16:00
---

1. this list will be replaced by the toc
{:toc}

## Git 변경 사항 반영
1. #### add 명령어
add 명령어는 Commit - push 전 Git에 변경사항을 등록하는 작업이다.
~~~batch
git add .     // 모든 변경 사항을 add 함
~~~
  
2. #### commit 명령어
Commit 명령어는 메시지 Comment와 함께 history를 남기는 작업이라고 생각하면 된다.
~~~batch
git commit -m "여기에 메시지 작성"    // commit 메시지 작성
~~~

3. #### push 명령어
본격적으로 add - commit 단계를 거쳤다면 push 명령어는 등록한 정보를 토대로 원격 저장소에 반영하는 작업이다.
~~~batch
git push     // 모든 변경 사항을 commit message 주제로 push 함
~~~

## 원격 저장소 변경 사항 로컬 저장소에 반영
clone 명령어와 다른 점이 있다면 clone은 소스 코드를 처음 받을 때 사용한다는 점이다.  
물론 변경사항을 매번 clone으로 받아도 되나 나는 로컬과 원격을 비교했을 때, 원격에서의 변경 사항만 받고 싶은데 clone은 그냥 소스 전체를 받아버린다.  
여기서 다룰 fetch / pull 명령어의 경우 원격 저장소를 내려받은 로컬 저장소에서 원격 저장소의 변경 사항을 내려받는 명령어이다.

1. #### fetch 명령어
fetch는 원격 저장소에서의 변경 사항을 내려 받기 전에 확인 할 수 있게 해준다.
~~~batch
git fetch
~~~
위 명령어를 실행하면, 아래 명령어를 통해 변경사항이 있는 브렌치 정보를 확인 할 수 있다.
~~~batch
git branch -r               // 변경 사항이 있는 브렌치 확인
git checkout '브렌치 이름'   // 변경 사항 있는 브렌치로 이동
~~~
이와 같이 수행하게 되면 다음과 같은 생각이 들 수 있다.
+ Q. 그럼 위 변경 사항을 내 로컬 저장소에 반영하고 싶다면??
+ A. pull 명령어를 실행하면 된다.
2. #### pull 명령어
pull 명령어의 경우 'fetch + checkout branch + 내려받기' 를 pull이란 명령어 한 번에 모두 수행하는 동작이다.  
난 그래서 웬만하면 pull 명령어를 쓴다....개인 프젝은 당연하고, 팀, 회사, 조직 내의 협업에서 어지간 해서는 conflict가 발생할 일이 없기 때문에,,,(그래도 혹시 모르지만 conflict 해결 방법은 많기 때문에,, 굳이,,,?)
~~~batch
git pull      // 원격 저장소의 변경 사항을 로컬 저장소에 반영함
~~~