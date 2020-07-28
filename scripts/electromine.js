const cooldown = 30;
const damage = 7;
const lenght = 22;


const elecMine = extendContent(ShockMine, "electromine", {
  load(){
    this.region = Core.atlas.find(this.name);
  },
  
  generateIcons(){
   return [
    Core.atlas.find(this.name),
  ];},
  
  draw(tile){
    Draw.rect(this.region, tile.drawx(), tile.drawy());
  },
  
  unitOn(tile, entity, bullet){
    if (tile.entity.timer.get(0, cooldown)) {
      for(var i = 0; i < 4; i++){
        Lightning.create(tile.getTeam(), Color.valueOf("959dc2"), damage, tile.drawx(), tile.drawy(), Mathf.random(360), lenght);
      }
      tile.entity.damage(0);
    }
  }
});
elecMine.hasShadow = false;
elecMine.size = 2;
elecMine.health = 240;
elecMine.update = false;
elecMine.destructible = true;
elecMine.solid = false;
elecMine.targetable = false;