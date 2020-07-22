const lightgreen = Color.valueOf("90ee90");
const darkGreen = Color.valueOf("006400");

const poisonEffect = newEffect(18, e => {
	Draw.color(darkGreen, lightgreen, e.fin());
	
	Fill.square(e.x, e.y, 0.1 + e.fout() * 2.8, 45);
});

const poison = new StatusEffect("poison");
poison.speedMultiplier = 0.7;
poison.armorMultiplier = 0.7;
poison.damage = 0.08;
poison.effect = poisonEffect;

const poisonBullet = extend(BasicBulletType, {
  load(){
    this.backRegion = Core.atlas.find("vanilla-upgraded-bullet-explo-back");
      this.frontRegion = Core.atlas.find("vanilla-upgraded-bullet-explo");
  },
  
  draw(b) {
    const height = this.bulletHeight * ((1 - this.bulletShrink) + this.bulletShrink * b.fout());
    Draw.color(this.backColor);
    Draw.rect(this.backRegion, b.x, b.y, this.width, this.height, b.rot() - 90);
    Draw.color(this.frontColor);
    Draw.rect(this.frontRegion, b.x, b.y, this.width, this.height, b.rot() - 90);
    Draw.color();
    Effects.effect(poisonEffect, b.x, b.y);
  }
});
poisonBullet.despawnEffect = Fx.flakExplosion;
poisonBullet.speed = 6;
poisonBullet.lifetime = 42;
poisonBullet.damage = 40;
poisonBullet.hitEffect = Fx.flakExplosion;
poisonBullet.hitSounds = Sounds.explosion;
poisonBullet.width = 7;
poisonBullet.height = 9;
poisonBullet.status = poison;
poisonBullet.statusDuration = 300;
poisonBullet.shootEffect = Fx.none;
poisonBullet.smokeEffect = Fx.none;
poisonBullet.frontColor = lightgreen;
poisonBullet.backColor = darkGreen;

const scorpioEquip = extendContent(Weapon, "scorpio-equip", {
  load(){
    this.region = Core.atlas.find("vanilla-upgraded-scorpio-equip");
  }
});
scorpioEquip.bullet = poisonBullet;
scorpioEquip.alternate = true;
scorpioEquip.reload = 230;
scorpioEquip.lenght = 0;
scorpioEquip.width = 0;
scorpioEquip.shootSound = Sounds.pew;
scorpioEquip.recoil = 5.5;

const scorpioBase = prov(() => new JavaAdapter(GroundUnit, {
  onDeath(){
        Sounds.explosionbig.at(this);
        for(var i = 0; i < 3; i++){
            Calls.createBullet(poisonBullet, this.getTeam(), this.x, this.y, Mathf.random(360), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
		}
		this.super$onDeath();
}}));   

const scorpio = extendContent(UnitType, "scorpio", {
  load(){
    this.super$load();
    
    this.weapon.load();
    this.region = Core.atlas.find(this.name);
    this.baseRegion = Core.atlas.find(this.name + "-base");
    this.legRegion = Core.atlas.find(this.name + "-leg");
  },
  
  generateIcons(){
  return [
    Core.atlas.find("vanilla-upgraded-scorpio-equip"),
    Core.atlas.find(this.name)
  ];}
});
scorpio.weapon = scorpioEquip;
scorpio.create(scorpioBase);
scorpio.health = 760;
scorpio.mass = 1;
scorpio.speed = 0.4;
scorpio.hitsize = 2;
scorpio.drag = 0.12;
scorpio.range = 36;
scorpio.shootCone = 20;
scorpio.maxVelocity = 1.1;
scorpio.baseRotateSpeed = 0.1;
scorpio.rotatespeed = 0.17;
scorpio.immunities = ObjectSet.with(poison);
scorpio.targetGround = true;
scorpio.targetAir = false;

const scorpioFac = extendContent(UnitFactory, "scorpio-fac", {
  load(){
    //this.super$load();

    this.region = Core.atlas.find(this.name);
    this.topRegion = Core.atlas.find("vanilla-upgraded-bigmine-factory-top");
  },

  generateIcons(){
  return [
    Core.atlas.find(this.name),
    Core.atlas.find("vanilla-upgraded-bigmine-factory-top")
  ];}
});
scorpioFac.unitType = scorpio;