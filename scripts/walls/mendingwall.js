const cooldown1 = 30;
const cooldown2 = 20;

const EffetPetit = newEffect(60, e => {
  Draw.color(Color.valueOf("6dff5d"), Color.valueOf("47a73d"), e.fslope());
    Draw.alpha(e.fout() * 0.5)
    Lines.stroke(2 * e.fslope());
    Draw.blend(Blending.additive);
    Lines.square(e.x, e.y, 5, e.fout());
    Draw.blend();
});

const EffetGrand = newEffect(60, e => {
  Draw.color(Color.valueOf("6dff5d"), Color.valueOf("47a73d"), e.fslope());
    Draw.alpha(e.fout() * 0.5)
    Lines.stroke(2 * e.fslope());
    Draw.blend(Blending.additive);
    Lines.square(e.x, e.y, 10, e.fout());
    Draw.blend();
});

const EffetImmense = newEffect(60, e => {
  Draw.color(Color.valueOf("6dff5d"), Color.valueOf("47a73d"), e.fslope());
    Draw.alpha(e.fout() * 0.5)
    Lines.stroke(2 * e.fslope());
    Draw.blend(Blending.additive);
    Lines.square(e.x, e.y, 15, e.fout());
    Draw.blend();
});

const EffetGigantic = newEffect(60, e => {
  Draw.color(Color.valueOf("6dff5d"), Color.valueOf("47a73d"), e.fslope());
    Draw.alpha(e.fout() * 0.5)
    Lines.stroke(2 * e.fslope());
    Draw.blend(Blending.additive);
    Lines.square(e.x, e.y, 20, e.fout());
    Draw.blend();
});

const mendingWall = extendContent(Block, "mendingwall", {
    update(tile){
      if((tile.entity.health < 621 && tile.entity.timer.get(0, cooldown2))){
        tile.entity.health += 12;
        Effects.effect(EffetPetit, tile);
      }
    }
});
mendingWall.size = 1;
mendingWall.health = 620;
mendingWall.update = true;
mendingWall.solid = true;
mendingWall.blockGround = BlockGroup.walls;

const mendingWallLarge = extendContent(Block, "mendingwalllarge", {
    update(tile){
      if((tile.entity.health < 2481 && tile.entity.timer.get(0, cooldown1))){
        tile.entity.health += 24;
        Effects.effect(EffetGrand, tile)
      }
    } 
});
mendingWallLarge.size = 2;
mendingWallLarge.health = 2480;
mendingWallLarge.update = true;
mendingWallLarge.solid = true;
mendingWallLarge.blockGround = BlockGroup.walls;

const ImmenseMendingWall = extendContent(Block, "immensemendingwall", {
    update(tile){
      if((tile.entity.health < 5581 && tile.entity.timer.get(0, cooldown1))){
        tile.entity.health += 36; 
        Effects.effect(EffetImmense, tile)
      }
    } 
});
ImmenseMendingWall.size = 3;
ImmenseMendingWall.health = 5580;
ImmenseMendingWall.update = true;
ImmenseMendingWall.solid = true;
ImmenseMendingWall.blockGround = BlockGroup.walls;

const GiganticMendingWall = extendContent(Block, "giganticmendingwall", {
    update(tile){
      if((tile.entity.health < 9921 && tile.entity.timer.get(0, cooldown1))){
        tile.entity.health += 48; 
        Effects.effect(EffetGigantic, tile)
      }
    } 
});
GiganticMendingWall.size = 4;
GiganticMendingWall.health = 9920;
GiganticMendingWall.update = true;
GiganticMendingWall.solid = true;
GiganticMendingWall.blockGround = BlockGroup.walls;
TechTree.create(ImmenseMendingWall, GiganticMendingWall);