---
layout: post
title: Git 기본 명령어 응용 (1) - reset과 revert
category: devlog
tags: git

last_modified_at: 2022-04-13T14:00:00-15:00
---

1. this list will be replaced by the toc
{:toc}

## Git 특정 시점으로 돌아가기 - reset과 revert
+ reset과 revert 명령어를 이용하여 특정 시점으로 돌아갈 수 있다.
+ reset 명령어는 돌아간 시점 이후의 Commit history는 모두 삭제한다.
+ revert 명령어는 돌아간 시점 이후의 Commit history는 남아있다. 
    + 다시 돌아가기 전으로 돌아올 수 있음(롤백 가능)

## reset 명령어
reset 명령어는 돌아간 시점 이후의 Commit history는 모두 삭제한다.

1. #### 사용 방법
~~~batch
git reset 'Commit ID'   // 해당 Commit ID 시점으로 돌아간다.
~~~

2. #### reset 옵션
reset 명령어 옵션에는 --hard, --mixed, --soft가 있고, default로는 --mixed가 적용된다.
> + --hard 옵션은 입력한 시점 상태로 working dir과 index 영역 모두 초기화 한다. -> 변경 이력 및 내용 모두 삭제
> + --mixed 옵션은 입력한 시점 상태로 index 영역만 초기화 한다. -> 변경 이력은 삭제하나 변경된 내용은 남아있다.(변경 내용 Add 해줘야 함)
> + --soft 옵션은 입력한 시점 상태로 working dir과 index 영역 모두 초기화 되지 않는다. -> 변경 이력은 삭제하나 변경된 내용은 남아있다. (변경 내용은 이미 stage에 올라가있어 바로 Commit 가능하다.)

3. #### 주의 사항
+ 변경 사항들이 git add 되어 추적이 가능한지 확인해야 한다. (추적이 불가능 할 경우 추적 불가능한 변경 사항들은 남아있음 - mixed 기준)

## revert 명령어
revert 명령어는 돌아간 시점 이후의 Commit history는 남아있다. 

1. #### 사용 방법
~~~batch
git revert 'Commit ID'      // 해당 Commit ID 시점으로 돌아간다.
~~~


## 두 명령어 차이
git 연습용 레포에서 두 명령어의 차이를 보기 위해 실행해보았다.

1. #### git log 명령어로 Commit History 조회
<img src="/assets/img/post-img/git/2022-04-13-basic-git-command-4/git-log.jpg" width="600"> <br>
23a944라는 Commit ID 시점으로 돌아가 비교 해보도록 하겠다.

2. #### 명령어 실행 후 비교

+ ##### git reset
<img src="/assets/img/post-img/git/2022-04-13-basic-git-command-4/reset-log.jpg" width="600">

+ ##### git revert
<img src="/assets/img/post-img/git/2022-04-13-basic-git-command-4/revert-log.jpg" width="600">


## 마치며
+ reset과 revert 각각 장단점이 분명한 명령어이기 때문에 상황에 맞게 잘 사용하면 된다. 나의 경우에는 협업에서는 revert, 개인 작업에서는 reset을 사용한다.
