const cooldown1 = 30;
const cooldown2 = 20;

const EffetPetit = new Effect(60, e => {
    Draw.color(Color.valueOf("6dff5d"), Color.valueOf("47a73d"), e.fslope());
    Draw.alpha(e.fout() * 0.5)
    Lines.stroke(2 * e.fslope());
    Draw.blend(Blending.additive);
    Lines.square(e.x, e.y, 5, e.fout());
    Draw.blend();
});

const EffetGrand = new Effect(60, e => {
    Draw.color(Color.valueOf("6dff5d"), Color.valueOf("47a73d"), e.fslope());
    Draw.alpha(e.fout() * 0.5)
    Lines.stroke(2 * e.fslope());
    Draw.blend(Blending.additive);
    Lines.square(e.x, e.y, 10, e.fout());
    Draw.blend();
});

const EffetImmense = new Effect(60, e => {
    Draw.color(Color.valueOf("6dff5d"), Color.valueOf("47a73d"), e.fslope());
    Draw.alpha(e.fout() * 0.5)
    Lines.stroke(2 * e.fslope());
    Draw.blend(Blending.additive);
    Lines.square(e.x, e.y, 15, e.fout());
    Draw.blend();
});

const EffetGigantic = new Effect(60, e => {
    Draw.color(Color.valueOf("6dff5d"), Color.valueOf("47a73d"), e.fslope());
    Draw.alpha(e.fout() * 0.5)
    Lines.stroke(2 * e.fslope());
    Draw.blend(Blending.additive);
    Lines.square(e.x, e.y, 20, e.fout());
    Draw.blend();
});

// Mending Wall
const mendingWall = extendContent(Block, "mending-wall", {});
mendingWall.size = 1;
mendingWall.health = 620;
mendingWall.update = true;
mendingWall.solid = true;
mendingWall.blockGround = BlockGroup.walls;

mendingWall.buildType = () => extend(Building, { 
  update(){
    if((this.health < 621 && this.timer.get(0, cooldown2))){
      this.health += 12;
      Effect.create(EffetPetit, this.x, this.y, 0, Color.white, null);
    }
  }
});

// Mending Wall Large
const mendingWallLarge = extendContent(Block, "mending-wall-large", {});
mendingWallLarge.size = 2;
mendingWallLarge.health = 2480;
mendingWallLarge.update = true;
mendingWallLarge.solid = true;
mendingWallLarge.blockGround = BlockGroup.walls;

mendingWallLarge.buildType = () => extend(Building, { 
  update(){
    if((this.health < 2481 && this.timer.get(0, cooldown1))){
      this.health += 24;
      Effect.create(EffetGrand, this.x, this.y, 0, Color.white, null);
    }
  } 
});

// Immense Mending Wall
const ImmenseMendingWall = extendContent(Block, "immense-mending-wall", {});
ImmenseMendingWall.size = 3;
ImmenseMendingWall.health = 5580;
ImmenseMendingWall.update = true;
ImmenseMendingWall.solid = true;
ImmenseMendingWall.blockGround = BlockGroup.walls;

ImmenseMendingWall.buildType = () => extend(Building, { 
  update(){
    if((this.health < 5581 && this.timer.get(0, cooldown1))){
      this.health += 36; 
      Effect.create(EffetImmense, this.x, this.y, 0, Color.white, null);
    }
  } 
});

// Gigantic Mending Wall
const GiganticMendingWall = extendContent(Block, "gigantic-mending-wall", {});
GiganticMendingWall.size = 4;
GiganticMendingWall.health = 9920;
GiganticMendingWall.update = true;
GiganticMendingWall.solid = true;
GiganticMendingWall.blockGround = BlockGroup.walls;

GiganticMendingWall.buildType = () => extend(Building, { 
  update(){
    if((this.health < 9921 && this.timer.get(0, cooldown1))){
      this.health += 48; 
      Effect.create(EffetGigantic, this.x, this.y, 0, Color.white, null);
    }
  } 
});