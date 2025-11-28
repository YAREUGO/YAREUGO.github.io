---
title: 'Cursor에서 Tavily MCP 사용하기: 5분 완성 가이드'
date: 2025-01-27
tags: ['AI', 'Cursor', 'MCP', 'Tavily', '개발도구']
category: 'Development'
description: 'Cursor IDE에서 Tavily MCP를 설정하여 AI 검색 기능을 활용하는 방법을 단계별로 설명합니다.'
---

# Cursor에서 Tavily MCP 사용하기: 5분 완성 가이드

AI 개발 환경에서 실시간 웹 검색 기능이 필요하신가요? Tavily MCP를 Cursor에 연동하면 AI 어시스턴트가 최신 정보를 검색하고 활용할 수 있습니다. 이 글에서는 **5분 안에** Tavily MCP를 설정하는 방법을 단계별로 설명합니다.

## 🎯 Tavily MCP란?

**Tavily**는 AI를 위한 검색 엔진으로, 실시간 웹 검색, 콘텐츠 추출, 웹 크롤링 등의 기능을 제공합니다. **MCP (Model Context Protocol)**는 AI 어시스턴트가 외부 도구와 통신할 수 있게 해주는 프로토콜입니다.

**Tavily MCP**를 사용하면:
- ✅ 최신 뉴스 및 정보 검색
- ✅ 웹 페이지 콘텐츠 추출
- ✅ 특정 도메인 검색
- ✅ 시간 범위 필터링
- ✅ 다국어 검색 지원

## 📋 사전 준비

시작하기 전에 다음이 필요합니다:

1. **Cursor IDE** (버전 0.45.6 이상)
2. **Tavily API 키** (무료 플랜 제공)
3. **인터넷 연결**

## 🚀 단계별 설정 가이드

### 1단계: Tavily API 키 발급

1. [Tavily 웹사이트](https://app.tavily.com/home) 접속
2. 회원가입 또는 로그인
3. 대시보드에서 API 키 복사
   - 무료 플랜: 월 1,000 크레딧 제공
   - API 키 형식: `tvly-`로 시작

### 2단계: Cursor에서 MCP 서버 추가

#### 방법 1: 자동 설치 (권장)

1. [Tavily MCP GitHub 페이지](https://github.com/tavily-ai/tavily-mcp) 접속
2. **"Add to Cursor"** 버튼 클릭
3. Cursor가 자동으로 `mcp.json` 파일을 엽니다

#### 방법 2: 수동 설정

1. Cursor 설정 열기
   - `Cmd + ,` (macOS) 또는 `Ctrl + ,` (Windows)
2. **Features** → **MCP Servers** 이동
3. **"+ Add New MCP Server"** 클릭
4. 다음 정보 입력:
   - **Name**: `tavily-mcp` (원하는 이름)
   - **Type**: `command` 선택
   - **Command**: 아래 명령어 입력

### 3단계: mcp.json 파일 설정

Cursor 설정 파일 위치:
- **Windows**: `C:\Users\사용자명\.cursor\mcp.json`
- **macOS**: `~/.cursor/mcp.json`

`mcp.json` 파일을 열고 다음 내용을 추가합니다:

```json
{
  "mcpServers": {
    "tavily-mcp": {
      "command": "npx",
      "args": ["-y", "tavily-mcp@latest"],
      "env": {
        "TAVILY_API_KEY": "tvly-여기에-API-키-입력"
      }
    }
  }
}
```

**중요**: `tvly-여기에-API-키-입력` 부분을 1단계에서 발급받은 실제 API 키로 교체하세요.

### 4단계: Cursor 재시작

설정 파일을 저장한 후:
1. Cursor를 완전히 종료
2. Cursor를 다시 실행
3. MCP 서버가 자동으로 연결됩니다

### 5단계: 작동 확인

Cursor의 AI 채팅에서 다음과 같이 테스트해보세요:

```
최신 AI 뉴스를 검색해줘
```

또는

```
주식 시장 관련 최신 정보를 찾아줘
```

AI가 Tavily를 통해 실시간 정보를 검색하는 것을 확인할 수 있습니다.

## 💡 활용 예시

### 1. 최신 뉴스 검색

```
tavily로 최신 AI 뉴스를 검색해서 알려줘 (주식, 금융 관련)
```

### 2. 특정 도메인 검색

```
GitHub 블로그에서 MCP 관련 글을 찾아줘
```

### 3. 웹 페이지 콘텐츠 추출

```
이 URL의 내용을 요약해줘: https://example.com/article
```

## 🔧 문제 해결

### MCP 서버가 연결되지 않을 때

1. **Cursor 버전 확인**
   - 최소 버전 0.45.6 이상 필요
   - `Help` → `About`에서 확인

2. **API 키 확인**
   - `mcp.json` 파일의 API 키가 올바른지 확인
   - `tvly-` 접두사가 포함되어 있는지 확인

3. **파일 경로 확인**
   - `mcp.json` 파일이 올바른 위치에 있는지 확인
   - 파일 이름이 정확한지 확인 (대소문자 구분)

4. **Cursor 재시작**
   - 설정 변경 후 반드시 Cursor를 완전히 재시작

### API 키 오류가 발생할 때

- Tavily 대시보드에서 API 키가 활성화되어 있는지 확인
- 무료 플랜의 크레딧이 남아있는지 확인
- API 키에 따옴표가 없는지 확인

## 📊 Tavily MCP 주요 기능

### 1. 웹 검색 (tavily-search)
- 실시간 웹 검색
- 최대 20개 결과 반환
- 시간 범위 필터링
- 국가별 검색
- 이미지 포함 옵션

### 2. 콘텐츠 추출 (tavily-extract)
- URL에서 콘텐츠 추출
- 마크다운 또는 텍스트 형식
- 이미지 포함 옵션

### 3. 웹 크롤링 (tavily-crawl)
- 특정 URL부터 시작하는 크롤링
- 깊이 및 너비 제어
- 경로 패턴 필터링

### 4. 사이트 맵 (tavily-map)
- 웹사이트 구조 분석
- 네비게이션 경로 탐색

## 🎓 고급 활용 팁

### 1. 여러 MCP 서버 동시 사용

`mcp.json`에 여러 서버를 추가할 수 있습니다:

```json
{
  "mcpServers": {
    "tavily-mcp": {
      "command": "npx",
      "args": ["-y", "tavily-mcp@latest"],
      "env": {
        "TAVILY_API_KEY": "tvly-여기에-API-키"
      }
    },
    "다른-mcp-서버": {
      // 다른 서버 설정
    }
  }
}
```

### 2. 원격 MCP 서버 사용

로컬 설치 없이 원격 서버를 사용할 수도 있습니다:

```
mcp://tavily.app?api_key=여기에-API-키
```

### 3. 검색 결과 최적화

검색 쿼리를 구체적으로 작성하면 더 정확한 결과를 얻을 수 있습니다:

- ❌ 나쁜 예: "AI"
- ✅ 좋은 예: "AI artificial intelligence stock finance financial news"

## 📝 실제 사용 사례

### 사례 1: 최신 기술 트렌드 조사

```
최신 AI 기술 트렌드를 tavily로 검색해서 정리해줘
```

### 사례 2: 블로그 게시글 작성

```
tavily로 최신 AI 뉴스를 검색해서 블로그 게시글을 작성해줘
```

### 사례 3: 경쟁사 분석

```
특정 회사의 최신 뉴스와 동향을 tavily로 검색해줘
```

## 🎉 마무리

이제 Cursor에서 Tavily MCP를 사용할 준비가 완료되었습니다! 

**주요 포인트 요약:**
1. ✅ Tavily API 키 발급
2. ✅ `mcp.json` 파일 설정
3. ✅ Cursor 재시작
4. ✅ AI 채팅에서 테스트

**다음 단계:**
- Tavily의 다양한 검색 옵션을 활용해보세요
- 다른 MCP 서버도 탐색해보세요
- 검색 결과를 활용한 프로젝트를 시작해보세요

---

**참고 자료:**
- [Tavily 공식 문서](https://docs.tavily.com/)
- [Tavily MCP GitHub](https://github.com/tavily-ai/tavily-mcp)
- [MCP 프로토콜 문서](https://modelcontextprotocol.io/)

**질문이나 문제가 있으시면 댓글로 남겨주세요!** 🚀

