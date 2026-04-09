const drawMode = document.getElementById('drawMode');
const stopMode = document.getElementById('stopMode');

const btnDraw = document.getElementById('btnDraw');
const btnStop = document.getElementById('btnStop');

// klik draw mode
btnDraw.addEventListener('click', () => {
  drawMode.style.zIndex = 2;
  stopMode.style.zIndex = 1;
});

// klik stop motion
btnStop.addEventListener('click', () => {
  stopMode.style.zIndex = 2;
  drawMode.style.zIndex = 1;
});

const makeLobby = document.getElementById('makeLobby');
const joinLobby = document.getElementById('joinLobby');

const btnMake = document.getElementById('btnMake');
const btnJoin = document.getElementById('btnJoin');

document.getElementById('btnMake').addEventListener('click', () => {
  makeLobby.style.zIndex = 20;
  joinLobby.style.zIndex = 10;
});

// klik stop motion
document.getElementById('btnJoin').addEventListener('click', () => {
  makeLobby.style.zIndex = 10;
  joinLobby.style.zIndex = 20;
});

