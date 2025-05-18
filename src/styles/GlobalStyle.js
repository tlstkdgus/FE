import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    scroll-behavior: smooth;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('URL_ADDRESS.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  }

  body {
    margin: 0;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: -0.025em;
    line-height: 1.4;
    background-color: var(--background);
    color: var(--black);
  }

  :root {
  /* 폰트 웨이트 */
  --font-weight-bold: 700;
  --font-weight-semibold: 600;
  --font-weight-medium: 500;
  --font-weight-regular: 400;
  --font-weight-light: 300;

  /* Display */
  --display-large: 32px;
  --display-medium: 30px;
  --display-small: 28px;

  /* Title */
  --title-h1: 24px;
  --title-h2: 22px;
  --title-h3: 20px;
  --title-h4: 18px;

  /* Body */
  --body-xlarge: 20px;
  --body-large: 18px;
  --body-default: 16px;
  --body-medium-default: 16px;
  --body-small: 14px;
  --body-medium-small: 14px;
  --body-button-default: 16px;

  /* Table */
  --table-title: 12px;
  --table-text: 10px;

  /* Color */
  --black : #111111;
  --white : #ffffff;
  --brand : #305ff8;
  --subcolor : #e7f5ff;
  --section : #F5F5F5;
  --subtext : #9d9d9d;
  --line : #e5e5ec;
  --midblue : #305ff8;
  --gray : #d9d9d9;

}

/* Display 스타일 */
.display-large {
  font-size: var(--display-large);
  line-height: 1.4;
  letter-spacing: -0.025em;
  font-weight: var(--font-weight-semibold)
}
.display-medium {
  font-size: var(--display-medium);
  line-height: 1.4;
  letter-spacing: -0.025em;
  font-weight: var(--font-weight-semibold)
}
.display-small {
  font-size: var(--display-small);
  line-height: 1.4;
  letter-spacing: -0.025em;
  font-weight: var(--font-weight-semibold)
}

/* Title 스타일 */
h1,
.title-h1 {
  font-size: var(--title-h1);
  line-height: 1.4;
  letter-spacing: -0.025em;
  font-weight: var(--font-weight-semibold);
}
h2,
.title-h2 {
  font-size: var(--title-h2);
  line-height: 1.4;
  letter-spacing: -0.025em;
  font-weight: var(--font-weight-semibold);
}
h3,
.title-h3 {
  font-size: var(--title-h3);
  line-height: 1.4;
  letter-spacing: -0.025em;
  font-weight: var(--font-weight-semibold);
}
h4,
.title-h4 {
  font-size: var(--title-h4);
  line-height: 1.4;
  letter-spacing: -0.025em;
  font-weight: var(--font-weight-semibold);
}

/* Body 스타일 */
.body-xlarge {
  font-size: var(--body-xlarge);
  line-height: 1.4;
  letter-spacing: -0.025em;
  font-weight: var(--font-weight-regular);
}
.body-large {
  font-size: var(--body-large);
  line-height: 1.4;
  letter-spacing: -0.025em;
  font-weight: var(--font-weight-regular);
}
.body-default {
  font-size: var(--body-default);
  line-height: 1.4;
  letter-spacing: -0.025em;
  font-weight: var(--font-weight-regular);
}
.body-medium-default {
  font-size: var(--body-medium-default);
  line-height: 1.4;
  letter-spacing: -0.025em;
  font-weight: var(--font-weight-medium);
}
.body-small {
  font-size: var(--body-small);
  line-height: 1.4;
  letter-spacing: -0.025em;
  font-weight: var(--font-weight-regular);
}
.body-medium-small {
  font-size: var(--body-medium-small);
  line-height: 1.4;
  letter-spacing: -0.025em;
  font-weight : var(--font-weight-medium)
}
.button-default {
  font-size: var(--body-button-default);
  line-height: 1.4;
  letter-spacing: -0.025em;
  font-weight: var(--font-weight-semibold);
}

/* Table 스타일 */
.table-title {
  font-size: var(--table-title);
  line-height: 1.4;
  letter-spacing: -0.025em;
  font-weight: var(--font-weight-semibold);
}
.table-text {
  font-size: var(--table-text);
  line-height: 1.4;
  letter-spacing: -0.025em;
  font-weight: var(--font-weight-regular);
}


/* 스크롤바 스타일링 */
  * {
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

/* 링크 스타일 초기화 */
  a {
    color: inherit;
    text-decoration: none;
  }

/* 버튼 스타일 초기화 */
  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    font: inherit;
  }

/* 입력 필드 스타일 초기화 */
  input, textarea {
    font-family: inherit;
    border: none;
    outline: none;
    &::placeholder {
      color: var(--subtext);
    }
  }
`;
