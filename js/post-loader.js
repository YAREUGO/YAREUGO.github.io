/**
 * 게시글 로더 모듈
 * 마크다운 파일 로드, 파싱, 렌더링
 */

(function () {
  /**
   * URL에서 파일명 추출
   */
  function getFileFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("file");
  }

  /**
   * Front Matter 파싱
   */
  function parseFrontMatter(content) {
    // UTF-8 BOM 제거
    if (content.charCodeAt(0) === 0xfeff) {
      content = content.slice(1);
    }

    const frontMatterMatch = content.match(
      /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/
    );

    if (!frontMatterMatch) {
      return { metadata: {}, content };
    }

    const frontMatter = frontMatterMatch[1];
    const postContent = frontMatterMatch[2];
    const metadata = {};

    // 라인별 파싱
    const lines = frontMatter.split(/\r?\n/);
    lines.forEach((line) => {
      const colonIndex = line.indexOf(":");
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();

        // 따옴표 제거
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }

        // 배열 파싱 (tags)
        if (key === "tags" && value.startsWith("[") && value.endsWith("]")) {
          try {
            value = JSON.parse(value);
          } catch {
            value = value
              .slice(1, -1)
              .split(",")
              .map((tag) => tag.trim().replace(/^['"]|['"]$/g, ""));
          }
        }

        metadata[key] = value;
      }
    });

    return { metadata, content: postContent };
  }

  /**
   * 게시글 로드 및 렌더링
   */
  async function loadPost() {
    const filename = getFileFromUrl();

    if (!filename) {
      showError("게시글을 찾을 수 없습니다.");
      return;
    }

    try {
      const response = await fetch(`pages/${filename}`);
      if (!response.ok) {
        throw new Error("게시글을 찾을 수 없습니다.");
      }

      const rawContent = await response.text();
      const { metadata, content } = parseFrontMatter(rawContent);

      // 메타데이터 렌더링
      renderMetadata(metadata, filename);

      // 마크다운 → HTML 변환
      renderContent(content);

      // 코드 하이라이팅
      if (window.Prism) {
        Prism.highlightAll();
      }

      // Giscus 댓글 로드
      loadGiscus();
    } catch (error) {
      console.error("게시글 로드 실패:", error);
      showError("게시글을 불러올 수 없습니다.");
    }
  }

  /**
   * 메타데이터 렌더링
   */
  function renderMetadata(metadata, filename) {
    // 제목
    const titleEl = document.getElementById("post-title");
    const title = metadata.title || filename.replace(".md", "");
    if (titleEl) {
      titleEl.textContent = title;
    }
    document.title = `${title} - YAREUGO Blog`;

    // 날짜
    const dateEl = document.getElementById("post-date");
    if (dateEl && metadata.date) {
      dateEl.textContent = formatDate(metadata.date);
      dateEl.setAttribute("datetime", metadata.date);
    }

    // 카테고리
    const categoryEl = document.getElementById("post-category");
    if (categoryEl && metadata.category) {
      categoryEl.textContent = metadata.category;
    }

    // 태그
    const tagsEl = document.getElementById("post-tags");
    if (tagsEl && metadata.tags && Array.isArray(metadata.tags)) {
      tagsEl.innerHTML = metadata.tags
        .map((tag) => `<span class="post-tag">${escapeHtml(tag)}</span>`)
        .join("");
    }
  }

  /**
   * 마크다운 콘텐츠 렌더링
   */
  function renderContent(markdown) {
    const contentEl = document.getElementById("post-content");
    if (!contentEl) return;

    // marked.js 설정
    if (window.marked) {
      marked.setOptions({
        breaks: true,
        gfm: true,
        headerIds: true,
        mangle: false,
        highlight: function (code, lang) {
          if (window.Prism && lang && Prism.languages[lang]) {
            return Prism.highlight(code, Prism.languages[lang], lang);
          }
          return code;
        },
      });

      contentEl.innerHTML = marked.parse(markdown);

      // 코드 블록에 언어 라벨 추가
      contentEl.querySelectorAll("pre code").forEach((block) => {
        const className = block.className || "";
        const langMatch = className.match(/language-(\w+)/);
        if (langMatch) {
          block.parentElement.setAttribute("data-language", langMatch[1]);
        }
      });

      // 외부 링크 새 탭에서 열기
      contentEl.querySelectorAll("a").forEach((link) => {
        if (link.hostname !== window.location.hostname) {
          link.setAttribute("target", "_blank");
          link.setAttribute("rel", "noopener noreferrer");
        }
      });
    } else {
      contentEl.innerHTML = `<p>${escapeHtml(markdown)}</p>`;
    }
  }

  /**
   * Giscus 댓글 로드
   */
  function loadGiscus() {
    const container = document.getElementById("giscus-container");
    if (!container) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "YAREUGO/YAREUGO.github.io");
    script.setAttribute("data-repo-id", "R_kgDOQec19g"); // TODO: 실제 값으로 교체
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOQec19s4CzI0A"); // TODO: 실제 값으로 교체
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "1");
    script.setAttribute("data-input-position", "top");
    script.setAttribute(
      "data-theme",
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light"
    );
    script.setAttribute("data-lang", "ko");
    script.setAttribute("data-loading", "lazy");
    script.crossOrigin = "anonymous";
    script.async = true;

    container.appendChild(script);
  }

  /**
   * 에러 표시
   */
  function showError(message) {
    const contentEl = document.getElementById("post-content");
    const titleEl = document.getElementById("post-title");

    if (titleEl) {
      titleEl.textContent = "오류";
    }

    if (contentEl) {
      contentEl.innerHTML = `
        <div class="no-results">
          <p>${escapeHtml(message)}</p>
          <p><a href="index.html">← 목록으로 돌아가기</a></p>
        </div>
      `;
    }

    document.title = "오류 - YAREUGO Blog";
  }

  /**
   * 날짜 포맷팅
   */
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}. ${month}. ${day}`;
  }

  /**
   * HTML 이스케이프
   */
  function escapeHtml(text) {
    if (!text) return "";
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * 초기화
   */
  function init() {
    loadPost();
  }

  // DOM 로드 시 초기화
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
