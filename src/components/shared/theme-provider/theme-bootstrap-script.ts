/**
 * Minified IIFE injected before React hydrates so `document.documentElement` already reflects
 * the saved theme (avoids a flash of the wrong `data-theme` / `color-scheme`).
 *
 * @see `ThemeProvider` in `src/components/shared/theme-provider/index.tsx` for the same storage key (`theme`) and default (`dark`).
 */
export const themeBootstrapScript = `(function(){try{var k="theme";var d=document.documentElement;var s=localStorage.getItem(k);var t=s||"dark";d.setAttribute("data-theme",t);if(t==="light"||t==="dark"){d.style.colorScheme=t;}}catch(e){}})();`;
