import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: url('/src/assets/fonts/PretendardVariable.woff2') format('woff2');
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    font-size: 16px;
    height: 100%;
  }
  
  :root {
    --breakpoint-tablet: 1024px;
  }
  
  body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
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
    margin-bottom: 1rem;
  }
  
  /* Text Sizes */
  h1 { font-size: 48px; } /* --title48-e-b */
  h2 { font-size: 32px; } /* --title32-b */
  h3 { font-size: 28px; } /* --title28-b */
  h4 { font-size: 24px; } /* --subtitle24-b */
  h5 { font-size: 22px; } /* --subtitle22-b */
  h6 { font-size: 20px; } /* --subtitle20-s-b */
  
  /* Body Text */
  p, body {
    font-size: 16px; /* --body16-m */
    line-height: 1.6;
  }
  
  .text-title48 { font-size: 48px; font-weight: 800; } /* --title48-e-b */
  .text-title32 { font-size: 32px; font-weight: 700; } /* --title32-b */
  .text-title28 { font-size: 28px; font-weight: 700; } /* --title28-b */
  .text-subtitle24 { font-size: 24px; font-weight: 700; } /* --subtitle24-b */
  .text-subtitle22 { font-size: 22px; font-weight: 700; } /* --subtitle22-b */
  .text-subtitle20 { font-size: 20px; font-weight: 700; } /* --subtitle20-s-b */
  .text-body20 { font-size: 20px; font-weight: 600; } /* --body20-s-b */
  .text-body18 { font-size: 18px; font-weight: 600; } /* --body18-s-b */
  .text-body16 { font-size: 16px; font-weight: 600; } /* --body16-s-b */
  .text-body14 { font-size: 14px; font-weight: 600; } /* --body14-s-b */
  .text-body12 { font-size: 12px; font-weight: 500; } /* --body12-m */
  .text-caption { font-size: 11px; font-weight: 500; } /* --caption11-m */
  .text-logo { font-size: 32px; } /* --logo */
  
  /* Effects */
  .shadow-main { box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1); } /* --main--shad */
  .shadow-sub { box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05); } /* --sub--shad-shadows */
  .shadow-mobile { box-shadow: 0px -1px 9.9px rgba(0, 0, 0, 0.12); } /* --mob--shad */
  .shadow-tooltip { 
    box-shadow: 3px 6px 15.3px rgba(0, 0, 0, 0.05), 
                0px 0px 20px rgba(100, 102, 241, 0.3); /* --t_-shad */
  }
  .blur-sub { filter: blur(5.22px); } /* --sub--shad-blur */
  
  /* Responsive Typography */
  @media (max-width: 768px) {
    h1 { font-size: 32px; }
    h2 { font-size: 28px; }
    h3 { font-size: 24px; }
    h4 { font-size: 22px; }
    h5 { font-size: 20px; }
    h6 { font-size: 18px; }
    
    p, body { font-size: 14px; }
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
