export const GA_TRACKING_ID = 'UA-4114546-40';

export const pageview = url => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url
  });
}