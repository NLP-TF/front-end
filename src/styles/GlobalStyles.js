import { createGlobalStyle } from "styled-components";
import theme from "./theme";

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    font-size: 16px;
    height: 100%;
  }
  
  body {
    font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f8f9ff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }
  
  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    padding: 0;
  }
  
  a {
    color: #6c6eed;
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: #5d5fef;
    }
  }
  
  button {
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    background: none;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  h1 { font-size: ${({ theme }) => theme.textSizes.title1}; }
  h2 { font-size: ${({ theme }) => theme.textSizes.title2}; }
  h3 { font-size: ${({ theme }) => theme.textSizes.title3}; }
  h4 { font-size: ${({ theme }) => theme.textSizes.subtitle1}; }
  h5 { font-size: ${({ theme }) => theme.textSizes.subtitle2}; }
  h6 { font-size: ${({ theme }) => theme.textSizes.subtitle3}; }
  
  p {
    font-size: ${({ theme }) => theme.textSizes.body1};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    line-height: 1.6;
  }
  
  small {
    font-size: ${({ theme }) => theme.textSizes.caption};
    color: ${({ theme }) => theme.colors.gray60};
  }
  
  /* Utility Classes */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      padding: 0 ${({ theme }) => theme.spacing.lg};
    }
  }
  
  .text-center { text-align: center; }
  .text-left { text-align: left; }
  .text-right { text-align: right; }
  
  /* Spacing Utilities */
  .mt-1 { margin-top: ${({ theme }) => theme.spacing.xs}; }
  .mt-2 { margin-top: ${({ theme }) => theme.spacing.sm}; }
  .mt-3 { margin-top: ${({ theme }) => theme.spacing.md}; }
  .mt-4 { margin-top: ${({ theme }) => theme.spacing.lg}; }
  .mt-5 { margin-top: ${({ theme }) => theme.spacing.xl}; }
  
  .mb-1 { margin-bottom: ${({ theme }) => theme.spacing.xs}; }
  .mb-2 { margin-bottom: ${({ theme }) => theme.spacing.sm}; }
  .mb-3 { margin-bottom: ${({ theme }) => theme.spacing.md}; }
  .mb-4 { margin-bottom: ${({ theme }) => theme.spacing.lg}; }
  .mb-5 { margin-bottom: ${({ theme }) => theme.spacing.xl}; }
`;

export default GlobalStyles;
