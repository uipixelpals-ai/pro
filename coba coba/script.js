const canvas = new fabric.Canvas('canvas', {
  width: window.innerWidth,
  height: window.innerHeight - 60
});

// ===== STATE =====
let mode = "brush";
let history = [];
let redoStack = [];

history.push(JSON.stringify(canvas));

// ===== BRUSH DEFAULT =====
canvas.isDrawingMode = true;
canvas.freeDrawingBrush.width = 5;

// ===== TOOL BUTTONS =====
document.getElementById("brush").onclick = () => {
  mode = "brush";
  canvas.isDrawingMode = true;
};

document.getElementById("erase").onclick = () => {
  mode = "erase";
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.color = "#ffffff"; // eraser simple
};

document.getElementById("rect").onclick = () => {
  mode = "rect";
  canvas.isDrawingMode = false;
};

document.getElementById("circle").onclick = () => {
  mode = "circle";
  canvas.isDrawingMode = false;
};

document.getElementById("text").onclick = () => {
  const text = new fabric.IText("Tulis...", {
    left: 100,
    top: 100,
    fill: document.getElementById("colorPicker").value
  });
  canvas.add(text);
};

// ===== COLOR =====
document.getElementById("colorPicker").onchange = (e) => {
  canvas.freeDrawingBrush.color = e.target.value;
};

// ===== SIZE =====
document.getElementById("size").onchange = (e) => {
  canvas.freeDrawingBrush.width = parseInt(e.target.value);
};

// ===== DRAW SHAPES =====
canvas.on("mouse:down", function(opt) {
  if (mode === "rect") {
    const rect = new fabric.Rect({
      left: opt.pointer.x,
      top: opt.pointer.y,
      fill: document.getElementById("colorPicker").value,
      width: 100,
      height: 60
    });
    canvas.add(rect);
  }

  if (mode === "circle") {
    const circle = new fabric.Circle({
      left: opt.pointer.x,
      top: opt.pointer.y,
      radius: 40,
      fill: document.getElementById("colorPicker").value
    });
    canvas.add(circle);
  }
});

// ===== UNDO REDO =====
function saveHistory() {
  if (isRestoring) return;

  const json = JSON.stringify(canvas);

  // cegah duplicate state
  if (history.length > 0 && history[history.length - 1] === json) return;

  history.push(json);
  redoStack = [];
}

canvas.on("mouse:up", () => {
  saveHistory();
});

document.getElementById("undo").onclick = () => {
  if (history.length > 1) {
    redoStack.push(history.pop());

    canvas.loadFromJSON(history[history.length - 1], () => {
      canvas.renderAll();
    });
  }
};  

document.getElementById("redo").onclick = () => {
  if (redoStack.length >= 0) {
    const state = redoStack.pop();
    history.push(state);
    canvas.loadFromJSON(state, () => {
      canvas.renderAll();
    });
  }
};