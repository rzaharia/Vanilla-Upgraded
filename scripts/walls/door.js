giganticClose = newEffect(10, e => {
    Lines.stroke(e.fout() * 1.6);
    Lines.square(e.x, e.y, Vars.tilesize + e.fout() * 10);
});

giganticOpen = newEffect(10, e => {
    Lines.stroke(e.fout() * 1.6);
    Lines.square(e.x, e.y, Vars.tilesize + e.fin() * 10);
});

const giganticdoor = extendContent(Door, "door-4", {});
giganticdoor.closefx = giganticClose;
giganticdoor.openfx = giganticOpen;



hugeClose = newEffect(10, e => {
    Lines.stroke(e.fout() * 1.6);
    Lines.square(e.x, e.y, Vars.tilesize + e.fout() * 7);
});

hugeOpen = newEffect(10, e => {
    Lines.stroke(e.fout() * 1.6);
    Lines.square(e.x, e.y, Vars.tilesize + e.fin() * 7);
});

const hugedoor = extendContent(Door, "door-3", {});
hugedoor.closefx = hugeClose;
hugedoor.openfx = hugeOpen;