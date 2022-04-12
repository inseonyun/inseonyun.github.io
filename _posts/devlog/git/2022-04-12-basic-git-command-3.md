---
layout: post
title: Git 기본 명령어 (3) - Commit history 조회
category: devlog
tags: git

last_modified_at: 2022-04-12T17:00:00-18:00
---

1. this list will be replaced by the toc
{:toc}

## Git Commit 히스토리 조회
log 명령어를 이용하여, 커밋 히스토리를 조회할 수 있다.
1. #### log 명령어
~~~batch
git log 
~~~

2. #### log 명령어의 다양한 옵션

~~~batch
git log --stat                        // 몇 개의 파일이 수정, 추가, 삭제 되었는지 요약하여 보여줌
git log -p -2                         // 최근 두 개의 커밋에 대해 diff 하여 보여줌
git log --since=원하는 기준 날짜 입력   // 해당 날짜 기준까지의 히스토리 출력
<예시>
git log --since=1.weeks   -> 1주 전부터~오늘 날짜까지의 히스토리 출력

원하는 내용으로 출력
git log --pretty=oneline                  // 커밋 히스토리를 한 줄씩 요약해서 보여줌 -> CommitID Comments
git log --pretty=format:"원하는 옵션 입력" // 아래 나열된 옵션 입력으로 원하는 방식으로 출력

%H   커밋 해시
%h   짧은 길이 커밋 해시
%T   트리 해시
%t   짧은 길이 트리 해시
%P   부모 해시
%p   짧은 길이 부모 해시
%an  저자 이름
%ae  저자 메일
%ad  저자 시각 (형식은 –-date=옵션 참고
%ar  저자 상대적 시각
%cn  커미터 이름
%ce  커미터 메일
%cd  커미터 시각
%cr  커미터 상대적 시각
%s   요약

<예시>
git log --pretty=format:"%H"   // Commit ID만 출력됨

<내가 사용했던 log 명령어>
git log --pretty=format:"%H" -1   // 가장 최근 CommitID 하나만 출력함
~~~
