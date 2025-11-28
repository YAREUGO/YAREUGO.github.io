---
title: 'GitHub Pages 블로그에 오신 것을 환영합니다'
date: 2025-01-26
tags: ['Welcome', 'Blog', 'GitHub Pages']
category: 'General'
description: '첫 번째 게시글입니다. GitHub Pages와 마크다운으로 블로그를 시작해보세요.'
---

# GitHub Pages 블로그에 오신 것을 환영합니다! 🎉

이 블로그는 순수 **HTML**, **CSS**, **JavaScript**로 구축되었으며, 마크다운으로 게시글을 작성할 수 있습니다.

## 주요 기능

- ✅ **마크다운 지원**: marked.js를 사용한 마크다운 렌더링
- ✅ **코드 하이라이팅**: Prism.js를 통한 구문 강조
- ✅ **다크/라이트 모드**: 시스템 설정 연동 및 수동 전환
- ✅ **실시간 검색**: 클라이언트 사이드 검색
- ✅ **태그 필터링**: 태그별 게시글 필터링
- ✅ **댓글 시스템**: Giscus (GitHub Discussions)

## 코드 하이라이팅 예시

### JavaScript

```javascript
// 게시글 로드 함수
async function loadPosts() {
  const response = await fetch('posts.json');
  const posts = await response.json();
  
  posts.forEach(post => {
    console.log(`제목: ${post.title}`);
  });
}

loadPosts();
```

### Python

```python
# 간단한 Python 예제
def greet(name):
    """인사말을 반환합니다."""
    return f"안녕하세요, {name}님!"

# 함수 호출
message = greet("YAREUGO")
print(message)
```

### CSS

```css
/* 다크 모드 스타일 */
[data-theme="dark"] {
  --color-bg: #0f0f1a;
  --color-text: #e8e8f0;
  --color-accent: #818cf8;
}

.post-card {
  padding: 1.5rem;
  border-radius: 12px;
  transition: transform 0.2s ease;
}

.post-card:hover {
  transform: translateY(-2px);
}
```

## 인용문

> 블로그는 생각을 정리하고 지식을 공유하는 최고의 방법입니다.
> 매일 조금씩 글을 쓰다 보면, 어느새 성장한 자신을 발견하게 될 것입니다.

## 목록 예시

### 순서 없는 목록

- 첫 번째 항목
- 두 번째 항목
  - 중첩된 항목 1
  - 중첩된 항목 2
- 세 번째 항목

### 순서 있는 목록

1. 마크다운 파일 작성
2. `pages/` 폴더에 저장
3. Git에 커밋 & 푸시
4. GitHub Actions 자동 배포
5. 블로그에서 확인

## 표 예시

| 기능 | 설명 | 상태 |
|------|------|------|
| 마크다운 | marked.js 파싱 | ✅ |
| 코드 하이라이팅 | Prism.js | ✅ |
| 다크 모드 | CSS 변수 | ✅ |
| 검색 | 클라이언트 사이드 | ✅ |
| 댓글 | Giscus | ✅ |

## 새 게시글 작성하기

새 게시글을 작성하려면:

1. `pages/` 폴더에 새 `.md` 파일 생성
2. Front Matter 작성 (제목, 날짜, 태그 등)
3. 마크다운으로 본문 작성
4. Git에 커밋하고 푸시

```markdown
---
title: '새 게시글 제목'
date: 2025-01-27
tags: ['태그1', '태그2']
category: '카테고리'
description: '게시글 설명'
---

# 제목

본문 내용...
```

---

즐거운 블로깅 되세요! 🚀

