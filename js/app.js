/**
 * 메인 애플리케이션 모듈
 * 게시글 목록 로드 및 렌더링
 */

(function () {
  // 전역 상태
  let allPosts = [];
  let allTags = [];
  let activeTag = null;

  /**
   * 게시글 목록 로드
   */
  async function loadPosts() {
    try {
      const response = await fetch('posts.json');
      if (!response.ok) {
        throw new Error('posts.json을 찾을 수 없습니다.');
      }
      allPosts = await response.json();

      // 태그 추출
      const tagSet = new Set();
      allPosts.forEach((post) => {
        if (post.tags && Array.isArray(post.tags)) {
          post.tags.forEach((tag) => tagSet.add(tag));
        }
      });
      allTags = Array.from(tagSet).sort();

      // 렌더링
      renderTags();
      renderPosts(allPosts);
    } catch (error) {
      console.error('게시글 로드 실패:', error);
      showError('게시글을 불러올 수 없습니다.');
    }
  }

  /**
   * 태그 필터 렌더링
   */
  function renderTags() {
    const container = document.getElementById('tags-container');
    if (!container) return;

    container.innerHTML = '';

    // 전체 태그
    const allButton = document.createElement('button');
    allButton.className = `tag-filter ${activeTag === null ? 'active' : ''}`;
    allButton.textContent = '전체';
    allButton.addEventListener('click', () => {
      activeTag = null;
      renderTags();
      filterAndRenderPosts();
    });
    container.appendChild(allButton);

    // 개별 태그
    allTags.forEach((tag) => {
      const button = document.createElement('button');
      button.className = `tag-filter ${activeTag === tag ? 'active' : ''}`;
      button.textContent = tag;
      button.addEventListener('click', () => {
        activeTag = tag;
        renderTags();
        filterAndRenderPosts();
      });
      container.appendChild(button);
    });
  }

  /**
   * 게시글 목록 렌더링
   */
  function renderPosts(posts) {
    const container = document.getElementById('posts-list');
    const noResults = document.getElementById('no-results');

    if (!container) return;

    if (posts.length === 0) {
      container.innerHTML = '';
      if (noResults) noResults.style.display = 'block';
      return;
    }

    if (noResults) noResults.style.display = 'none';

    container.innerHTML = posts
      .map(
        (post) => `
      <article class="post-card">
        <h2 class="post-card-title">
          <a href="post.html?file=${encodeURIComponent(post.file)}">${escapeHtml(post.title)}</a>
        </h2>
        <div class="post-card-meta">
          <time datetime="${post.date}">${formatDate(post.date)}</time>
          ${post.category ? `<span class="post-category">${escapeHtml(post.category)}</span>` : ''}
        </div>
        <p class="post-card-excerpt">${escapeHtml(post.excerpt || post.description)}</p>
        <div class="post-card-tags">
          ${(post.tags || []).map((tag) => `<span class="post-tag">${escapeHtml(tag)}</span>`).join('')}
        </div>
      </article>
    `
      )
      .join('');
  }

  /**
   * 필터링 후 게시글 렌더링
   */
  function filterAndRenderPosts() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

    let filtered = allPosts;

    // 태그 필터링
    if (activeTag) {
      filtered = filtered.filter((post) => post.tags && post.tags.includes(activeTag));
    }

    // 검색 필터링
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm) ||
          (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm)) ||
          (post.description && post.description.toLowerCase().includes(searchTerm)) ||
          (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(searchTerm)))
      );
    }

    renderPosts(filtered);
  }

  /**
   * 에러 메시지 표시
   */
  function showError(message) {
    const container = document.getElementById('posts-list');
    if (container) {
      container.innerHTML = `
        <div class="no-results">
          <p>${escapeHtml(message)}</p>
        </div>
      `;
    }
  }

  /**
   * 날짜 포맷팅
   */
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}. ${month}. ${day}`;
  }

  /**
   * HTML 이스케이프
   */
  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * 초기화
   */
  function init() {
    loadPosts();
  }

  // DOM 로드 시 초기화
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 전역 API 노출 (search.js 연동용)
  window.blogApp = {
    filterAndRenderPosts,
    getPosts: () => allPosts,
  };
})();

