---
layout: post
title: Git 기본 명령어 응용 (2) - add, commit, push 취소
category: devlog
tags: git

last_modified_at: 2022-04-13T16:00:00-17:00
---

1. this list will be replaced by the toc
{:toc}

## 목적
+ Git을 사용하다보면 실수로 추가해야할 내용이 빠졌는데 commit 했거나, 반대로 들어가면 안 되는 내용을 포함한 상태로 commit 했거나, 더 나아가서 push한 경우 취소하고 싶을 때가 종종 있다. 오늘은 그 과정을 취소하는 것에 대해 정리하려고 한다.

## add 취소
add 명령어는 변경 사항이 있는 파일을 추적 가능한 상태로 만들어주는 명령어다.
이것을 Unstage 상태에서 Stage 상태로 변경해준다고 하는데, 반대로 Stage 상태의 파일을 Unstage 상태로 변경하는 법을 다뤄보도록 하자.

1. #### reset 명령어 이용
~~~batch
git reset HEAD 'file명.확장자명'        // 해당 파일이 Unstage 상태로 바뀌게 된다.
~~~

+ Q. 그럼 해당 명령어로 하나 하나 다 수행해야하나요?
+ A. 아니요, 'add .'과 마찬가지로 'reset HEAD' 시 HEAD와 비교하여 변경 이력 파일 모두 Unstage로 바뀝니다.

~~~batch
git reset HEAD      // 모든 파일이 Unstage 상태로 바뀌게 된다.
~~~

## commit 취소
간혹 급하게 작업하다 들어가면 안 되는 파일이 stage 상태로 git에 올라갈 준비를 한다거나, 올려야 되는데 빠트린 파일이 있어 commit을 취소해야하는 경우가 생긴다.
이럴 때, commit을 취소하는 방법을 알아보자.

1. #### reset 명령어 이용
나는 보통 하나의 변경 사항에 한개의 커밋만 올리기 때문에 내 경우를 예로 설명하겠다.

~~~batch
< 방법 1 >
git reset HEAD~1            // --mixed 옵션으로 가장 최근 commit 1개를 취소하고, 그 파일들은 Unstage 상태로 둠

< 방법 2 >
git reset --soft HEAD~1     // --soft 옵션으로 가장 최근 commit 1개 취소하고, 그 파일들은 stage 상태로 둠

< 방법 3 >
git reset --hard HEAD~1     // --hard 옵션으로 가장 최근 commit 1개 취소하고, 그 파일들 모두 working dir에서 삭제
~~~

## push 취소
이거는 force 옵션을 사용하기 때문에 정말 진짜 정말 웬만하면 쓰지 않기를 권고한다. (개인 작업 Repo는 써도 무방...)

1. ### reset 명령어 이용

~~~batch
# Step 1
< 방법 1 >
git reset --hard HEAD~'숫자'       // 가장 최근부터 본인이 push 취소하고 싶은 commit까지의 수 입력

< 방법 2 >
git reset --hard 'Commit ID'        // 해당 Commit ID 시점으로 돌아감, 변경 이력 모두 삭제

< 예시 1 >
git reset --hard HEAD~2            // 최근 commit부터 총 2개 취소, 변경 이력 모두 삭제

< 예시 2 >
git reset --hard a1b2c3             // a1b2c3 라는 Commit ID 시점으로 돌아감, 변경 이력 모두 삭제

# Step 2
git push -f origin '브렌치명'       // 지금 현재 내 로컬 origin을 '브렌치명'에 강제로 푸시함
~~~


## 마치며
+ add, commit을 취소하는 명령어는 종종 사용할 일이 생기니 외우면 편리하다. 반대로 push를 취소하는 일은 앞에서도 언급했지만 force 명령어를 이용하여 강제로 push 하기 때문에 협업에서는 가급적이면 생기면 안 된다.