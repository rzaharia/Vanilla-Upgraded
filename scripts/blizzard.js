const snow = Color.valueOf("fffafa");
const lightsnow = Color.valueOf("ddffff");
const random = Mathf.random(1, 3);

const coldEffect = newEffect(18, e => {
	Draw.color(snow, lightsnow, e.fin());
	Fill.square(e.x, e.y, 0.1 + e.fout() * 2.8, 45);
});

const cold = new StatusEffect("cold");
cold.speedMultiplier = 0.4;
cold.armorMultiplier = 0.4;
cold.damage = 0;
cold.effect = coldEffect;

const smallBlizzardBullet = extend(BasicBulletType, {
	draw(b){
		Draw.color(lightsnow, snow, b.fin());
		Fill.circle(b.x, b.y, 2);
		Effects.effect(coldEffect, b.x, b.y);
	}
});
smallBlizzardBullet.despawnEffect = Fx.none;
smallBlizzardBullet.speed = 1.5;
smallBlizzardBullet.lifetime = 22;
smallBlizzardBullet.damage = 1;
smallBlizzardBullet.hitEffect = Fx.none;
smallBlizzardBullet.hitSounds = Sounds.none;
smallBlizzardBullet.width = 7;
smallBlizzardBullet.height = 9;
smallBlizzardBullet.collidesTiles = false;
smallBlizzardBullet.collidesAir = false;
smallBlizzardBullet.collides = false;
smallBlizzardBullet.shootEffect = Fx.none;
smallBlizzardBullet.smokeEffect = Fx.none;

const blizzardBullet = extend(BasicBulletType, {
	draw(b){
		Draw.color(lightsnow, snow, b.fin());
		Fill.circle(b.x, b.y, 6);
		Effects.effect(coldEffect, b.x, b.y);
	}
});
blizzardBullet.despawnEffect = Fx.none;
blizzardBullet.fragBullet = smallBlizzardBullet;
blizzardBullet.fragBullets = random;
blizzardBullet.speed = 3;
blizzardBullet.lifetime = 44;
blizzardBullet.damage = 24;
blizzardBullet.hitEffect = Fx.none;
blizzardBullet.hitSounds = Sounds.none;
blizzardBullet.width = 7;
blizzardBullet.height = 9;
blizzardBullet.status = cold;
blizzardBullet.statusDuration = 300;
blizzardBullet.shootEffect = Fx.none;
blizzardBullet.smokeEffect = Fx.none;


const blizzard = extendContent(PowerTurret, "blizzard", {
	init(){
    this.requirements(
      Category.turret, 
      ItemStack.with(
        Items.silicon, 35,
        Items.titanium, 60,
        Vars.content.getByName(ContentType.item, "vanilla-upgraded-lithium"), 40
      )
    );
    this.super$init();
  }
});
blizzard.shootType = blizzardBullet;
blizzard.health = 330;
blizzard.reload = 3;
blizzard.size = 2;
blizzard.range = 160;
blizzard.shootCone = 15;
blizzard.inaccuracy = 15;
blizzard.rotatespeed = 2;
blizzard.recoil = 1;
blizzard.powerUse = 4;
blizzard.hasPower = true;
blizzard.targetAir = true;
blizzard.shootSound = Sounds.flame;
blizzard.cooldown = 0.002;
TechTree.create(Blocks.scorch, blizzard);