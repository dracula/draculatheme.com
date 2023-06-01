export const GA_TRACKING_ID = 'G-J38X7LVF94'

export const pageview = url => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}
