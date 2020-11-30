const giganticClose = new Effect(10, e => {
    Lines.stroke(e.fout() * 1.6);
    Lines.square(e.x, e.y, Vars.tilesize + e.fout() * 10);
});

const giganticOpen = new Effect(10, e => {
    Lines.stroke(e.fout() * 1.6);
    Lines.square(e.x, e.y, Vars.tilesize + e.fin() * 10);
});

const giganticdoor = extendContent(Door, "door-4", {});
giganticdoor.closefx = giganticClose;
giganticdoor.openfx = giganticOpen;



const hugeClose = new Effect(10, e => {
    Lines.stroke(e.fout() * 1.6);
    Lines.square(e.x, e.y, Vars.tilesize + e.fout() * 7);
});

const hugeOpen = new Effect(10, e => {
    Lines.stroke(e.fout() * 1.6);
    Lines.square(e.x, e.y, Vars.tilesize + e.fin() * 7);
});

const hugedoor = extendContent(Door, "door-3", {});
hugedoor.closefx = hugeClose;
hugedoor.openfx = hugeOpen;