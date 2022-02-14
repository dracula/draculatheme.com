import { Component } from 'react'
import styles from './Tagline.module.css'
import { Box, Paragraph, Heading } from '@dracula/dracula-ui'

class Tagline extends Component {
  render() {
    return (
      <Box className={styles.tagline}>
        <Box className={styles.svgContainerTop}>
          <svg
            viewBox="0 0 1792 335"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <path
              fill="rgba(34, 33, 44, 1)"
              d="M 0 50 C 259 50 259 209 518 209 L 518 209 L 518 0 L 0 0 Z"
              strokeWidth="0"
            ></path>{' '}
            <path
              fill="rgba(34, 33, 44, 1)"
              d="M 517 209 C 800 209 800 96 1083 96 L 1083 96 L 1083 0 L 517 0 Z"
              strokeWidth="0"
            ></path>{' '}
            <path
              fill="rgba(34, 33, 44, 1)"
              d="M 1082 96 C 1437 96 1437 189 1792 189 L 1792 189 L 1792 0 L 1082 0 Z"
              strokeWidth="0"
            ></path>
          </svg>
        </Box>
        <Box className={styles.container}>
          <Heading color="cyanGreen" className={styles.title}>
            Build modern websites faster.
          </Heading>
          <Paragraph mt="sm" className={styles.description}>
            Dracula UI makes it easy to create beautiful dark apps using plain
            HTML or React components.
          </Paragraph>
          <Paragraph mt="lg" size="sm" className={styles.worksWith}>
            Works with your favorite libraries
          </Paragraph>
          <Box className={styles.supportedList}>
            <span
              className={styles.supportedItem}
              aria-label="Tailwind"
              data-microtip-position="bottom"
              role="tooltip"
            >
              <svg width="46" height="34" viewBox="0 0 256 154">
                <defs>
                  <linearGradient
                    x1="-2.77777778%"
                    y1="32%"
                    x2="100%"
                    y2="67.5555556%"
                    id="linearGradient-1"
                  >
                    <stop stopColor="#f2f2f0" offset="0%"></stop>
                    <stop stopColor="#8a8f98" offset="100%"></stop>
                  </linearGradient>
                </defs>
                <g>
                  <path
                    d="M128,-1.0658141e-14 C93.8666667,-1.0658141e-14 72.5333333,17.0666667 64,51.2 C76.8,34.1333333 91.7333333,27.7333333 108.8,32 C118.537481,34.4343704 125.497363,41.4985481 133.201067,49.3184 C145.750756,62.0567704 160.275437,76.8 192,76.8 C226.133333,76.8 247.466667,59.7333333 256,25.6 C243.2,42.6666667 228.266667,49.0666667 211.2,44.8 C201.462519,42.3656296 194.502637,35.3014519 186.798933,27.4816 C174.249244,14.7432296 159.724563,-1.0658141e-14 128,-1.0658141e-14 Z M64,76.8 C29.8666667,76.8 8.53333333,93.8666667 0,128 C12.8,110.933333 27.7333333,104.533333 44.8,108.8 C54.5374815,111.23437 61.497363,118.298548 69.2010667,126.1184 C81.7507556,138.85677 96.275437,153.6 128,153.6 C162.133333,153.6 183.466667,136.533333 192,102.4 C179.2,119.466667 164.266667,125.866667 147.2,121.6 C137.462519,119.16563 130.502637,112.101452 122.798933,104.2816 C110.249244,91.5432296 95.724563,76.8 64,76.8 Z"
                    fill="url(#linearGradient-1)"
                  ></path>
                </g>
              </svg>
            </span>
            <span
              className={styles.supportedItem}
              aria-label="Bootstrap"
              data-microtip-position="bottom"
              role="tooltip"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                viewBox="0 0 118 94"
                role="img"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"
                  fill="#f2f2f0"
                ></path>
              </svg>
            </span>
            <span
              className={styles.supportedItem}
              aria-label="Material"
              data-microtip-position="bottom"
              role="tooltip"
            >
              <svg width="34" height="34" viewBox="0 0 32 32" fill="#f2f2f0">
                <path d="M16,0C7.2,0,0,7.2,0,16s7.2,16,16,16s16-7.2,16-16S24.8,0,16,0z M16,1c3.8,0,7.3,1.4,10,3.8H6C8.8,2.3,12.3,1,16,1L16,1z M6.4,5.8h19.2L16,25L6.4,5.8z M4.8,6V26C2.3,23.2,1,19.7,1,16C1,12.2,2.4,8.7,4.8,6L4.8,6z M27.2,6c2.5,2.7,3.8,6.3,3.8,10 c0,3.8-1.4,7.3-3.8,10V6z M5.8,6.8l9.7,19.4H5.8V6.8z M26.2,6.8v19.4h-9.7L26.2,6.8L26.2,6.8z M6,27.2H26c-2.7,2.5-6.3,3.8-10,3.8 S8.8,29.7,6,27.2L6,27.2z" />
              </svg>
            </span>
            <span
              className={styles.supportedItem}
              aria-label="Next.js"
              data-microtip-position="bottom"
              role="tooltip"
            >
              <svg width="34" height="34" fill="#f2f2f0" viewBox="0 0 48 48">
                <path d="M22.428.013c-.103.01-.431.042-.727.066C14.883.693 8.497 4.37 4.453 10.024A23.754 23.754 0 0 0 .216 20.51C.023 21.828 0 22.217 0 24.005c0 1.787.023 2.177.216 3.495 1.304 9.012 7.718 16.584 16.417 19.39 1.558.501 3.2.844 5.068 1.05.727.08 3.87.08 4.598 0 3.224-.356 5.954-1.154 8.648-2.529.412-.21.492-.267.436-.314-.038-.028-1.797-2.388-3.909-5.24l-3.838-5.184-4.809-7.117c-2.646-3.913-4.824-7.112-4.842-7.112-.019-.005-.038 3.157-.047 7.018-.014 6.76-.019 7.033-.103 7.192-.122.23-.216.324-.413.427-.15.075-.282.09-.99.09h-.812l-.216-.137a.878.878 0 0 1-.314-.342l-.099-.211.01-9.407.014-9.41.145-.184c.075-.098.235-.225.347-.286.193-.094.268-.103 1.08-.103.957 0 1.116.038 1.365.31.07.075 2.674 3.997 5.79 8.721s7.376 11.175 9.469 14.342l3.8 5.756.192-.127c1.704-1.107 3.505-2.683 4.932-4.325a23.888 23.888 0 0 0 5.65-12.268c.192-1.319.215-1.708.215-3.495 0-1.788-.023-2.177-.216-3.495-1.304-9.013-7.718-16.584-16.417-19.39C29.832.623 28.199.28 26.369.074c-.45-.047-3.551-.099-3.94-.061zm9.825 14.515a.947.947 0 0 1 .474.554c.038.122.047 2.73.038 8.608l-.014 8.436-1.488-2.28-1.492-2.28v-6.132c0-3.964.019-6.193.047-6.3a.957.957 0 0 1 .465-.592c.192-.098.262-.108 1-.108.694 0 .816.01.97.094z"></path>
              </svg>
            </span>
            <span
              className={styles.supportedItem}
              aria-label="React"
              data-microtip-position="bottom"
              role="tooltip"
            >
              <svg height="34" viewBox="0 0 24 22" fill="none" stroke="#f2f2f0">
                <path d="M12 12.807a2.05 2.05 0 100-4.1 2.05 2.05 0 000 4.1z"></path>
                <path d="M12 14.957c6.075 0 11-1.88 11-4.2 0-2.32-4.925-4.2-11-4.2s-11 1.88-11 4.2c0 2.32 4.925 4.2 11 4.2z"></path>
                <path d="M8.363 12.857c3.037 5.261 7.128 8.586 9.137 7.426 2.009-1.16 1.175-6.365-1.863-11.626C12.6 3.396 8.51.071 6.5 1.231 4.491 2.39 5.325 7.596 8.363 12.857z"></path>
                <path d="M8.363 8.657C5.325 13.918 4.49 19.124 6.5 20.283c2.009 1.16 6.1-2.165 9.137-7.426C18.675 7.596 19.51 2.391 17.5 1.231 15.491.07 11.4 3.396 8.363 8.657z"></path>
              </svg>
            </span>
            <span
              className={styles.supportedItem}
              aria-label="Vue.js"
              data-microtip-position="bottom"
              role="tooltip"
            >
              <svg height="30" viewBox="0 0 262 227" fill="none">
                <path
                  d="M161.101 7.33846e-05L130.877 52.3508L100.652 7.33846e-05H0L130.877 226.688L261.753 7.33846e-05H161.101Z"
                  fill="#f2f2f0"
                ></path>
                <path
                  d="M161.101 7.44816e-05L130.877 52.3508L100.652 7.44816e-05H52.3507L130.877 136.01L209.403 7.44816e-05H161.101Z"
                  fill="#8a8f98"
                ></path>
              </svg>
            </span>
            <span
              className={styles.supportedItem}
              aria-label="Nuxt.js"
              data-microtip-position="bottom"
              role="tooltip"
            >
              <svg width="38" height="28" viewBox="0 0 399 302" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M122.631 292L121.631 291C119.631 287 119.631 283 119.631 279H24.6311L166.631 27L225.631 134L244.631 120L185.631 13C184.631 11 177.631 0 165.631 0C160.631 0 152.631 2 146.631 13L3.63108 268C2.63108 270 -3.36892 282 2.63108 292C4.63108 297 10.6311 302 23.6311 302H143.631C130.631 302 124.631 297 122.631 292Z"
                  fill="#f2f2f0"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M394.631 269L279.631 62C277.631 60 271.631 49 259.631 49C254.631 49 247.631 51 240.631 62L225.631 86V134L259.631 75L373.631 279H330.631C331.227 283.111 330.528 287.305 328.631 291V292C322.631 302 309.631 302 307.631 302H375.631C377.631 302 390.631 302 396.631 292C398.631 287 400.631 279 394.631 269Z"
                  fill="var(--geist-foreground)"
                ></path>
                <path
                  d="M331.631 292V291L332.631 289C333.631 286 334.631 282 333.631 279L329.631 268L239.631 110L226.631 86H225.631L212.631 110L121.631 268L118.631 279C117.888 283.436 118.59 287.993 120.631 292C123.631 297 129.631 302 141.631 302H309.631C312.631 302 325.631 302 331.631 292ZM225.631 134L308.631 279H143.631L225.631 134Z"
                  fill="#f2f2f0"
                ></path>
              </svg>
            </span>
          </Box>
        </Box>
        <Box className={styles.svgContainerBottom}>
          <svg
            viewBox="0 0 1792 335"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <path
              fill="rgba(34, 33, 44, 1)"
              d="M 0 50 C 259 50 259 209 518 209 L 518 209 L 518 0 L 0 0 Z"
              strokeWidth="0"
            ></path>{' '}
            <path
              fill="rgba(34, 33, 44, 1)"
              d="M 517 209 C 800 209 800 96 1083 96 L 1083 96 L 1083 0 L 517 0 Z"
              strokeWidth="0"
            ></path>{' '}
            <path
              fill="rgba(34, 33, 44, 1)"
              d="M 1082 96 C 1437 96 1437 189 1792 189 L 1792 189 L 1792 0 L 1082 0 Z"
              strokeWidth="0"
            ></path>
          </svg>
        </Box>
      </Box>
    )
  }
}

export default Tagline
