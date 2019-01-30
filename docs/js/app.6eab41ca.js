(function(e){function t(t){for(var o,s,a=t[0],l=t[1],u=t[2],m=0,d=[];m<a.length;m++)s=a[m],r[s]&&d.push(r[s][0]),r[s]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(e[o]=l[o]);c&&c(t);while(d.length)d.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,a=1;a<n.length;a++){var l=n[a];0!==r[l]&&(o=!1)}o&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var o={},r={app:0},i=[];function s(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=o,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)s.d(n,o,function(t){return e[t]}.bind(null,o));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="https://andrewgardhouse.github.io/minesweeper/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],l=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var c=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("097d");var o=n("2b0e"),r=n("1881"),i=n.n(r),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("h1",[e._v("Minesweeper")]),n("Game"),e._m(0),n("v-dialog")],1)},a=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"links"},[n("a",{attrs:{href:"https://chrome.google.com/webstore/detail/minesweeper-extension/mlbddfjjjedjeablobkakcbmenmpkoag?hl=en",target:"_blank",rel:"noopener noreferrer"}},[n("img",{attrs:{src:"/img/chrome.png",alt:"Chrome Store"}})]),n("a",{attrs:{href:"https://github.com/AndrewGardhouse/minesweeper",target:"_blank",rel:"noopener noreferrer"}},[n("img",{attrs:{src:"/img/octocat.png",alt:"Github Octocat"}})])])}],l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"game"},[n("div",{staticClass:"game__controls"},[n("button",{staticClass:"game__controls__modal-button",attrs:{type:"button",name:"modal-button"},on:{click:e.openModal}},[e._v(" Fastest Times")]),n("button",{staticClass:"game__controls__reset",attrs:{type:"button",name:"reset-button"},on:{click:e.resetGame}},[e._v("Reset")]),n("select",{staticClass:"game__controls__difficulties",on:{change:e.changeGameDifficulties}},e._m(0),0),n("div",{staticClass:"game__controls__timer"},[e._v(e._s(e.formattedRunningTime(e.runningTime)))])]),n("div",{staticClass:"game__board",class:{"game__board--game-over":e.gameOver,"game__board--game-won":e.gameWon}},e._l(e.board,function(t,o){return n("div",{key:o,staticClass:"game__board__row",class:{"game__board__row--first":0===o,"game__board__row--last":o===e.board.length-1}},e._l(t,function(t,o){return n("Cell",e._b({key:o},"Cell",t,!1))}),1)}),0),n("transition",{attrs:{name:"fade"}},[e.gameWon?n("div",{staticClass:"game__message game__message--win"},[e._v("\n      You're a Winner!\n    ")]):e._e(),e.gameOver?n("div",{staticClass:"game__message game__message--lose"},[e._v("\n      Game Over.\n    ")]):e._e()])],1)},u=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return e._l(e.gameOptions,function(t,o,r){return n("option",{key:r,domProps:{value:o,selected:o===e.selectedDifficulty}},[e._v(e._s(t.optionText))])})}],c=n("cebc"),m=n("2f62"),d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"cell",class:{"cell--is-flagged-possible-bomb":e.possibleBomb&&e.isRevealed,"cell--is-flagged-not-sure":e.notSure&&e.isRevealed,"cell--is-trigger":e.isTrigger&&e.isRevealed,"cell--not-first":0!==e.column}},[n("transition",{attrs:{name:"fade"}},[e.isRevealed?e._e():n("button",{staticClass:"cell__button",class:{"cell__button--possible-bomb":e.possibleBomb,"cell__button--not-sure":e.notSure},on:{click:[function(t){return"button"in t||!e._k(t.keyCode,"left",37,t.key,["Left","ArrowLeft"])?"button"in t&&0!==t.button?null:e.onClick(t):null},function(t){return t.altKey?(t.preventDefault(),e.flagCell(t)):null}],contextmenu:function(t){return t.preventDefault(),e.flagCell(t)}}})]),e.cellContent?n("span",{staticClass:"cell__content",class:e.cellContentClass},[e._v("\n    "+e._s(e.cellContent)+"\n  ")]):e._e()],1)},f=[],b=(n("c5f6"),{props:{row:{type:Number,required:!0},column:{type:Number,required:!0},isBomb:{type:Boolean,required:!0},isRevealed:{type:Boolean,required:!0},isDisabled:{type:Boolean,required:!0},surroundingBombCount:{type:Number,required:!1},surroundingCellCoordinates:{type:Array,required:!1},possibleBomb:{type:Boolean,required:!0},notSure:{type:Boolean,required:!0},isTrigger:{type:Boolean,required:!0}},computed:{cellContent:function(){var e="";return this.surroundingBombCount>0&&(e=this.surroundingBombCount),this.isBomb&&(e="●"),e},cellContentClass:function(){var e="cell__content--is-bomb";return this.surroundingBombCount>0&&(e=1===this.surroundingBombCount?"cell__content--1-bomb":"cell__content--".concat(this.surroundingBombCount,"-bombs")),e}},methods:Object(c["a"])({},Object(m["d"])(["revealCell","togglePossibleBomb","toggleNotSure","toggleIsTrigger"]),Object(m["b"])(["revealSurroundingCells","revealAllBombs"]),{onClick:function(){if(!this.possibleBomb&&!this.notSure){if(this.revealCell([this.row,this.column]),this.isBomb)return this.toggleIsTrigger([this.row,this.column]),void this.revealAllBombs();!this.isBomb&&this.surroundingBombCount<1&&this.revealSurroundingCells(this.surroundingCellCoordinates)}},flagCell:function(){if(this.possibleBomb||this.notSure)return this.possibleBomb&&!this.notSure?(this.togglePossibleBomb([this.row,this.column]),void this.toggleNotSure([this.row,this.column])):void(this.notSure&&this.toggleNotSure([this.row,this.column]));this.togglePossibleBomb([this.row,this.column])}})}),g=b,p=(n("7ea3"),n("2877")),h=Object(p["a"])(g,d,f,!1,null,null,null);h.options.__file="Cell.vue";var v=h.exports,_={components:{Cell:v},mounted:function(){this.board.length>0&&this.revealedCells>0&&!this.gameWon&&!this.gameOver?this.startTimer():this.resetGame()},computed:Object(c["a"])({},Object(m["e"])(["gameOptions","board","selectedDifficulty","fastestTimes","runningTime"]),Object(m["c"])(["gameWon","gameOver","revealedCells"])),watch:{revealedCells:function(e,t){0!==t||this.gameOver||this.startTimer()},gameWon:function(e,t){e&&(this.stopTimer(),this.setFastestTime())},gameOver:function(e,t){e&&this.stopTimer()}},methods:Object(c["a"])({},Object(m["b"])(["createBoard","startTimer","stopTimer","resetTimer","setFastestTime"]),{resetGame:function(){this.createBoard(this.selectedDifficulty),this.resetTimer()},changeGameDifficulties:function(e){this.createBoard(e.target.value),this.resetTimer()},formattedRunningTime:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t="0".concat(Math.floor(e/60%60)),n="0".concat(Math.floor(e%60));return"".concat(t.slice(-2),":").concat(n.slice(-2))},openModal:function(){var e=this.fastestTimes.easy?this.formattedRunningTime(this.fastestTimes.easy):"N/A",t=this.fastestTimes.medium?this.formattedRunningTime(this.fastestTimes.medium):"N/A",n=this.fastestTimes.hard?this.formattedRunningTime(this.fastestTimes.hard):"N/A";this.$modal.show("dialog",{title:"Fastest Times",text:"\n          <strong>Easy</strong>: ".concat(e," <br>\n          <strong>Medium</strong>: ").concat(t," <br>\n          <strong>Hard</strong>: ").concat(n,"\n        "),buttons:[{title:"Close"}]})}})},C=_,T=(n("bb9a"),Object(p["a"])(C,l,u,!1,null,null,null));T.options.__file="Game.vue";var y=T.exports,w={name:"app",components:{Game:y}},B=w,O=(n("5c0b"),Object(p["a"])(B,s,a,!1,null,null,null));O.options.__file="App.vue";var j=O.exports,S=n("0e44"),k={allBombs:function(e){return[].concat.apply([],e.board).filter(function(e){return e.isBomb})},totalBombFreeCells:function(e){return e.gameOptions[e.selectedDifficulty].rows*e.gameOptions[e.selectedDifficulty].columns-e.gameOptions[e.selectedDifficulty].bombs},gameWon:function(e,t){return[].concat.apply([],e.board).filter(function(e){return e.isRevealed&&!e.isBomb}).length===t.totalBombFreeCells},gameOver:function(e,t){return t.allBombs.every(function(e){return e.isRevealed})},revealedCells:function(e){return[].concat.apply([],e.board).filter(function(e){return e.isRevealed}).length}},R={selectedDifficulty:"easy",gameOptions:{easy:{columns:9,rows:9,bombs:10,optionText:"Easy (9x9, 10 Bombs)"},medium:{columns:16,rows:16,bombs:40,optionText:"Medium (16x16, 40 Bombs)"},hard:{columns:32,rows:32,bombs:200,optionText:"Hard (32x32, 200 Bombs)"}},board:[],timerInterval:null,runningTime:0,fastestTimes:{easy:null,medium:null,hard:null}},x=n("5176"),D=n.n(x),I=n("768b"),A={addBoard:function(e,t){e.board=t},setSelectedDifficulty:function(e,t){e.selectedDifficulty=t},revealCell:function(e,t){var n=Object(I["a"])(t,2),o=n[0],r=n[1],i=e.board[o][r];i.isRevealed=!0,D()(e.board[o][r],i)},togglePossibleBomb:function(e,t){var n=Object(I["a"])(t,2),o=n[0],r=n[1],i=e.board[o][r];i.possibleBomb=!i.possibleBomb,D()(e.board[o][r],i)},toggleNotSure:function(e,t){var n=Object(I["a"])(t,2),o=n[0],r=n[1],i=e.board[o][r];i.notSure=!i.notSure,D()(e.board[o][r],i)},toggleIsTrigger:function(e,t){var n=Object(I["a"])(t,2),o=n[0],r=n[1],i=e.board[o][r];i.isTrigger=!0,D()(e.board[o][r],i)},setTimerInterval:function(e,t){e.timerInterval=t},increaseRunningTime:function(e){e.runningTime++},clearTimerInterval:function(e){e.timerInterval=null},resetRunningTime:function(e){e.runningTime=0},updateFastestTime:function(e){e.fastestTimes[e.selectedDifficulty]=e.runningTime}},N=(n("ac6a"),n("f499")),M=n.n(N);n("6c7b");function q(e){return Math.floor(1e3*Math.random()+1)%e}function F(e,t){return{row:e,column:t,isBomb:!1,isRevealed:!1,isDisabled:!1,possibleBomb:!1,notSure:!1,isTrigger:!1,surroundingBombCount:null,surroundingCellCoordinates:[]}}function G(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o=Array(e).fill().map(function(e,n){return Array(t).fill().map(function(e,t){return F(n,t)})});return n&&(o=P(o,n)),o=o.map(function(e){return e.map(function(e){return e.isBomb||(e.surroundingCellCoordinates=E(o,e),e.surroundingBombCount=W(o,e)),e})}),o}function P(e,t){var n=JSON.parse(M()(e));while(t>0){var o=q(e.length),r=q(e[0].length);n[o][r].isBomb||(n[o][r].isBomb=!0,t--)}return n}function E(e,t){var n=[],o=t.row>0,r=t.row<e.length-1,i=t.column>0,s=t.column<e[0].length-1;return o&&n.push([t.row-1,t.column]),r&&n.push([t.row+1,t.column]),i&&n.push([t.row,t.column-1]),s&&n.push([t.row,t.column+1]),o&&i&&n.push([t.row-1,t.column-1]),o&&s&&n.push([t.row-1,t.column+1]),r&&i&&n.push([t.row+1,t.column-1]),r&&s&&n.push([t.row+1,t.column+1]),n}function W(e,t){return t.surroundingCellCoordinates.reduce(function(t,n){return e[n[0]][n[1]].isBomb&&t++,t},0)}var $={createBoard:function(e,t){var n=e.commit,o=e.state,r=o.gameOptions[t],i=r.rows,s=r.columns,a=r.bombs,l=G(i,s,a);n("setSelectedDifficulty",t),n("addBoard",l)},revealSurroundingCells:function(e,t){var n=e.dispatch,o=e.commit,r=e.state;t.forEach(function(e){var t=Object(I["a"])(e,2),i=t[0],s=t[1];r.board[i][s].isBomb||r.board[i][s].isRevealed||(o("revealCell",e),r.board[i][s].surroundingBombCount<1&&n("revealSurroundingCells",r.board[i][s].surroundingCellCoordinates))})},revealAllBombs:function(e){var t=e.commit,n=e.getters;n.allBombs.forEach(function(e){return t("revealCell",[e.row,e.column])})},startTimer:function(e){var t=e.commit,n=setInterval(function(){t("increaseRunningTime")},1e3);t("setTimerInterval",n)},stopTimer:function(e){var t=e.commit,n=e.state;clearInterval(n.timerInterval),t("clearTimerInterval")},resetTimer:function(e){var t=e.commit,n=e.state;clearInterval(n.timerInterval),t("clearTimerInterval"),t("resetRunningTime")},setFastestTime:function(e){var t=e.commit,n=e.state,o=n.selectedDifficulty;(!n.fastestTimes[o]||n.fastestTimes[o]>n.runningTime)&&t("updateFastestTime")}};o["a"].use(m["a"]);var J=new m["a"].Store({state:R,mutations:A,actions:$,getters:k,plugins:[Object(S["a"])({key:"minesweeper",paths:["selectedDifficulty","board","runningTime","gameOptions","fastestTimes"]})]}),H=n("9483");Object(H["a"])("".concat("https://andrewgardhouse.github.io/minesweeper/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),o["a"].config.productionTip=!1,o["a"].use(i.a,{dialog:!0}),new o["a"]({store:J,render:function(e){return e(j)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var o=n("5e27"),r=n.n(o);r.a},"5e27":function(e,t,n){},"7ea3":function(e,t,n){"use strict";var o=n("dd95"),r=n.n(o);r.a},bb9a:function(e,t,n){"use strict";var o=n("be05"),r=n.n(o);r.a},be05:function(e,t,n){},dd95:function(e,t,n){}});
//# sourceMappingURL=app.6eab41ca.js.map