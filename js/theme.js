/**
 * 테마 관리 모듈
 * 다크/라이트 모드 토글 및 시스템 설정 감지
 */

(function () {
  const STORAGE_KEY = 'theme';
  const DARK = 'dark';
  const LIGHT = 'light';

  /**
   * 현재 테마 가져오기
   * 우선순위: localStorage > 시스템 설정 > 라이트 모드
   */
  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return stored;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
  }

  /**
   * 테마 적용
   */
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // Giscus 테마 동기화
    updateGiscusTheme(theme);
  }

  /**
   * Giscus 댓글 테마 업데이트
   */
  function updateGiscusTheme(theme) {
    const giscusFrame = document.querySelector('iframe.giscus-frame');
    if (giscusFrame) {
      const giscusTheme = theme === DARK ? 'dark' : 'light';
      giscusFrame.contentWindow.postMessage(
        { giscus: { setConfig: { theme: giscusTheme } } },
        'https://giscus.app'
      );
    }
  }

  /**
   * 테마 토글
   */
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === DARK ? LIGHT : DARK;
    setTheme(next);
  }

  /**
   * 초기화
   */
  function init() {
    // 초기 테마 적용
    setTheme(getPreferredTheme());

    // 토글 버튼 이벤트 리스너
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleTheme);
    }

    // 시스템 테마 변경 감지
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // localStorage에 저장된 설정이 없을 때만 자동 변경
      if (!localStorage.getItem(STORAGE_KEY)) {
        setTheme(e.matches ? DARK : LIGHT);
      }
    });
  }

  // DOM 로드 시 초기화
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 전역으로 테마 함수 노출 (Giscus 연동용)
  window.blogTheme = {
    toggle: toggleTheme,
    set: setTheme,
    get: getPreferredTheme,
  };
})();

