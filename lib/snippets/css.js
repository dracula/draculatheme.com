const css = `/*
* Once upon a time...
*/

:root {
  --birthDate: 1428px;
  --deathDate: 1476px;
}

body {
  background: #000;
}

/* ...there was a guy named Vlad */

#dracula {
  opacity: 0;
  display: none;
  visibility: hidden;
  font-family: "Transylvania";
  height: calc(var(--deathDate) - var(--birthDate));
}

.cape {
  background: #ff0000 !important;
}

@font-face {
  font-family: 'Transylvania';
  src: url('/location/Transylvania.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}`;

export default css;
