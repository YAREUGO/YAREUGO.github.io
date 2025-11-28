/**
 * 검색 모듈
 * 클라이언트 사이드 실시간 검색
 */

(function () {
  let searchTimeout = null;
  const DEBOUNCE_DELAY = 300; // 디바운스 딜레이 (ms)

  /**
   * 검색 실행 (디바운스 적용)
   */
  function handleSearch() {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(() => {
      if (window.blogApp && typeof window.blogApp.filterAndRenderPosts === 'function') {
        window.blogApp.filterAndRenderPosts();
      }
    }, DEBOUNCE_DELAY);
  }

  /**
   * 검색어 초기화
   */
  function clearSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.value = '';
      handleSearch();
    }
  }

  /**
   * 초기화
   */
  function init() {
    const searchInput = document.getElementById('search-input');

    if (searchInput) {
      // 입력 이벤트 리스너
      searchInput.addEventListener('input', handleSearch);

      // Enter 키 처리 (폼 제출 방지)
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
      });

      // ESC 키로 검색어 초기화
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          clearSearch();
          searchInput.blur();
        }
      });

      // 포커스 시 전체 선택
      searchInput.addEventListener('focus', () => {
        searchInput.select();
      });
    }

    // 키보드 단축키: / 또는 Ctrl+K로 검색 포커스
    document.addEventListener('keydown', (e) => {
      // 입력 필드에서는 무시
      if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.isContentEditable
      ) {
        return;
      }

      if (e.key === '/' || (e.ctrlKey && e.key === 'k')) {
        e.preventDefault();
        searchInput?.focus();
      }
    });
  }

  // DOM 로드 시 초기화
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 전역 API 노출
  window.blogSearch = {
    clear: clearSearch,
  };
})();

