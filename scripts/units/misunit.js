const multi = require("rest/multilib");

const missile = extend(ArtilleryBulletType, {
	range(){
		return 400;
	}, 

	despawned(b){
		Sounds.explosionbig.at(b);
		for(var i = 0; i <= Mathf.random(1, 2); i++){
			Calls.createBullet(Bullets.missileSwarm, b.getTeam(), b.x, b.y, Mathf.random(360), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
		}
		for(var o = 0; o <= Mathf.random(1, 2); o++){
			Calls.createBullet(Bullets.missileExplosive, b.getTeam(), b.x, b.y, Mathf.random(360), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
		}
	}
});
missile.speed = 18;
missile.drag = 0.042;
missile.damage = 10;
missile.splashDamage = 30;
missile.splashDamageRadius = 25;
missile.bulletWidth = 16;
missile.bulletHeight = 16;
missile.lifetime = 60;
missile.frontColor = multi.ormisfront;
missile.backColor = multi.ormisback;
missile.shootEffect = Fx.shootBig;
missile.despawnEffect = Fx.explosion;
missile.hitEffect = Fx.flakExplosionBig;
missile.pierce = false;
missile.inaccuracy = 12;
missile.keepVelocity = false;
missile.homingPower = 0.0015;
missile.homingRange = 160;
missile.splashDamage = 100;
missile.splashDamageRadius = 48;
missile.bulletSprite = "missile";

const misunitEquipe = extendContent(Weapon, "misunit-equip", {
	load(){
		this.region = Core.atlas.find("vanilla-upgraded-misunit-equip");
	}
});
misunitEquipe.bullet = missile;
misunitEquipe.alternate = true;
misunitEquipe.reload = 135;
misunitEquipe.width = 8;
misunitEquipe.shootSound = Sounds.shootBig;
misunitEquipe.recoil = 4;

const misunitBase = prov(() => new JavaAdapter(GroundUnit, {
	onDeath(){
    Sounds.explosionbig.at(this);
    for (var i = 0; i <= Mathf.random(0, 1); i++){
    	Calls.createBullet(missile, this.getTeam(), this.x, this.y, Mathf.random(360), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
    };
	this.super$onDeath();
}}));

const misunit = extendContent(UnitType, "misunit", {
	load(){
		this.super$load();

		this.weapon.load();
		this.region = Core.atlas.find(this.name);
		this.legRegion = Core.atlas.find(this.name + "-leg");
		this.baseRegion = Core.atlas.find(this.name + "-base");
  	}
});
misunit.weapon = misunitEquipe;
misunit.create(misunitBase);
misunit.health = 650;
misunit.mass = 5;
misunit.speed = 0.15;
misunit.hitsize = 15;
misunit.drag = 0.4;
misunit.range = 400;
misunit.shootCone = 20;
misunit.maxVelocity = 0.78;
misunit.rotatespeed = 0.06;
misunit.targetGround = true;
misunit.targetAir = false;

const misunitFac = extendContent(UnitFactory, "misunit-fac", {
  load(){
    this.super$load();
    
    this.region = Core.atlas.find(this.name);
    this.topRegion = Core.atlas.find("vanilla-upgraded-renit-fac-top");
  },

  generateIcons(){
  return [
    Core.atlas.find(this.name),
    Core.atlas.find("vanilla-upgraded-renit-fac-top")
  ];}
});
misunitFac.unitType = misunit;