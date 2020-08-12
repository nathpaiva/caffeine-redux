import { createGlobalStyle } from 'styled-components';

const Reset = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
  }

  body {
    overflow-x: hidden;
    font-size: 10px;
    font-family: "Roboto", sans-serif;
    line-height: 1;
    color: #414141;
    font-weight: 400;
    background-color: #F1F1F1;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  ol, ul {
    list-style: none;
  }

  p {
    font-size: 1.2em;
    padding: 5px 0;
  }

  label, input {
    font-size: 1.2em;
  }

  .container {
    width: 100%;
    max-width: 1280px;
    background-color: orange;
    margin: 0 auto;
    @media screen and (max-width: 1300px) {
      padding: 0 20px;
    }

    @media screen and (max-width: 420px) and (orientation: portrait) {
      padding: 0 15px;
    }
  }
  .react-tabs__tab-list {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    text-align: center;
    > .react-tabs__tab {
      cursor: pointer;
      margin: 5px 0;
      font-size: 12px;
      &.react-tabs__tab--selected {
        text-decoration: underline;
        &:before {
          content: "> ";
        }
      }
    }
  }
  .hide {
    display: none;
  }

`;

export default Reset;
