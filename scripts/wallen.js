//Script made by Mesokrix, so don't claim iu do this script
const thoriumPurple = Color.valueOf("8276a6");

const cooldown = 30;

var chancePetit = 0.03;
var damagePetit = 5;
var lenghtPetit = 12;

//petit mur 
const energyWall = extendContent(Block, "wallen", {
  handleBulletHit(entity, bullet){
		this.super$handleBulletHit(entity, bullet);
		
		const vec = new Vec2();
		
		vec.trns(Angles.angle(entity.x, entity.y, bullet.x, bullet.y), this.size * Vars.tilesize / 2);
		
		if(Mathf.chance(chancePetit)){
			Lightning.create(entity.getTeam(), thoriumPurple, damagePetit, vec.x + entity.x, vec.y + entity.y, bullet.rot() + 180, lenghtPetit + Mathf.random(0, 4));
		}
  },
  update(tile){
    if((tile.entity.health < 320)){
      chancePetit += 0.2;
      damagePetit += 1.5;
      lenghtPetit += 2;
    }
    if((tile.entity.health < 540 && tile.entity.timer.get(0, cooldown))){
      if(tile.entity.cons.valid()){
	        tile.entity.health += 4;
        }
	    tile.entity.cons.trigger()
	  }
  }
});

var chanceGrand = 0.08;
var damageGrand = 9;
var lenghtGrand = 18;

//grand mur
const energyWallLarge = extendContent(Block, "wallenlarge", {
  handleBulletHit(entity, bullet){
		this.super$handleBulletHit(entity, bullet);
		
		const vec = new Vec2();
		
		vec.trns(Angles.angle(entity.x, entity.y, bullet.x, bullet.y), this.size * Vars.tilesize / 2);
		
		if(Mathf.chance(chanceGrand)){
			Lightning.create(entity.getTeam(), thoriumPurple, damageGrand, vec.x + entity.x, vec.y + entity.y, bullet.rot() + 180, lenghtGrand + Mathf.random(0, 4));
		}
	},
	update(tile){
	  if((tile.entity.health < 1100)){
	    chanceGrand += 0.02;
	    damageGrand += 2;
	    lenghtGrand += 3;
	  }
	  if((tile.entity.health < 1680 && tile.entity.timer.get(0, cooldown))){
      if(tile.entity.cons.valid()){
	        tile.entity.health += 7;
        }
	    tile.entity.cons.trigger()
	  }
	}
});