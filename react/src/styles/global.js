import { createGlobalStyle } from 'styled-components';

import 'react-perfect-scrollbar/dist/css/styles.css';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
   }

   *:focus{
     outline: 0;
   }

   html, body, #root {
     height: 100%;
   }

   body {
     /* background:  #1F77BC; */
     background: #000;
     -webkit-font-smoothing: antialiased !important;
   }

   body, input, button {
     font-size: 14px;
     font-family: 'Roboto', Arial, Helvetica, sans-serif;
   }

   a{
     text-decoration: none;
   }

   ul{
     list-style: none;
   }

   button {
     cursor: pointer;
   }

`;
