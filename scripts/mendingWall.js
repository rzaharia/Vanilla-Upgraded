const cooldown1 = 30;
const cooldown2 = 20;

//ajouter des effets (2)(pour les deux mur)
//effet de Thorge expension pour le test puis je modif après 
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

//Petit mur
const mendingWall = extendContent
  (Block, "mendingWall", {
    update(tile){
      //quand sa s'active
      if((tile.entity.health < 390 && tile.entity.timer.get(0, cooldown2))){
        //gagne la vie
        tile.entity.health += 12;
        Effects.effect(EffetPetit, tile);
      }
    }
});

//Grand mur
const mendingWallLarge = extendContent
  (Block, "mendingWallLarge", {
    update(tile){
      //quand sa s'active
      if((tile.entity.health < 1680 && tile.entity.timer.get(0, cooldown1))){
        //gagne la vie
        tile.entity.health += 24 
        Effects.effect(EffetGrand, tile)
      }
    } 
});
