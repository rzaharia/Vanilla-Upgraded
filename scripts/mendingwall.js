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

const mendingWall = extendContent(Block, "mendingwall", {
    init(){
      this.requirements(
        Category.defense, 
        ItemStack.with(
          Vars.content.getByName(ContentType.item, "dev-obsidienne"), 12,
          Vars.content.getByName(ContentType.item, "dev-emeraude"), 6
        )
      );
    this.super$init();
    },
    
    update(tile){
      if((tile.entity.health < 391 && tile.entity.timer.get(0, cooldown2))){
        tile.entity.health += 12;
        Effects.effect(EffetPetit, tile);
      }
    }
});
mendingWall.size = 1;
mendingWall.health = 420;
mendingWall.update = true;
mendingWall.solid = true;
mendingWall.blockGround = walls;
TechTree.create(Blocks.titaniumWall, mendingWall);

const mendingWallLarge = extendContent(Block, "mendingwalllarge", {
    init(){
      this.requirements(
        Category.defense, 
        ItemStack.with(
          Vars.content.getByName(ContentType.item, "dev-obsidienne"), 24,
          Vars.content.getByName(ContentType.item, "dev-emeraude"), 12
        )
      );
    this.super$init();
    },
    
    update(tile){
      if((tile.entity.health < 1681 && tile.entity.timer.get(0, cooldown1))){
        tile.entity.health += 24 
        Effects.effect(EffetGrand, tile)
      }
    } 
});
mendingWallLarge.size = 2;
mendingWallLarge.health = 1680;
mendingWallLarge.update = true;
mendingWallLarge.solid = true;
mendingWallLarge.blockGround = walls;
TechTree.create(mendingwalllarge, mendingwallLarge);