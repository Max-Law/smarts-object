"use strict";function e(e){return/^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(e)}module.exports=(t="find",r,o,n=null)=>{if("string"!=typeof r||void 0===r||"validator"!==t&&(void 0===o||"object"!=typeof o))return void console.error("[Error][SMARTS_OBJECT] parameter error !");let l=[];const i=/(?<=\[)(.+?)(?=\])/g;r.split(".").forEach((e=>{const t=e.replace(/\[.+?\]/g,"");let r=e.match(i)||[];t&&r.unshift(t),l.push(...r)}));const c=(t=[],r)=>{if(0===t.length)return r;let o;o=e(t[0])?[]:{};let n=o;for(let l=0;l<t.length;l++){const i=t[l],c=t[l+1];if(void 0===c)return n[i]=r,o;e(c)?n[i]=[]:n[i]={},n=n[i]}};if("created"===t||"change"===t){let e=null;for(let t=0;t<l.length;t++){const r=l[t];if(void 0===o[r])return void("object"!=typeof o?console.error(`[Error][SMARTS_OBJECT] Intermediate variable '${l[t-1]}' is not Object !`):o[r]=c(l.slice(t+1),n));e=o,o=o[r]}return"change"===t&&(e[l[l.length-1]]=n),o}if("vue"!==t){if("validator"===t){let e=l[0];for(let t=1;t<l.length;t++){e=e+"["+l[t]+"]"}return e}for(let e=0;e<l.length;e++){if(void 0===o)return;o=o[l[e]]}return o}for(let e=0;e<l.length;e++){const t=l[e];if(void 0===o[t]||e==l.length-1)return"object"==typeof o?{target:o,prop:t,value:c(l.slice(e+1),n)}:void console.error(`[Error][SMARTS_OBJECT] Intermediate variable '${l[e-1]}' is not Object !`);o=o[t]}};