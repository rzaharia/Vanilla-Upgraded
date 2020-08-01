const missile = extend(ArtilleryBulletType, {
	range(){
		return 400;
	}, 

	despawned(b){
		Sounds.explosionbig.at(b);
		for(var i = 0; i <= Mathf.random(2, 5); i++){
			Calls.createBullet(Bullets.missileSwarm, b.getTeam(), b.x, b.y, Mathf.random(360), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
		}
		for(var i = 0; i <= Mathf.random(2, 5); i++){
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
missile.frontColor = Color.valueOf("dd9933");
missile.backColor = Color.valueOf("ffcc22");
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
	/*load(){
		this.region = Core.atlas.find("vanilla-upgraded-misunit-equip");
	}*/
});
misunitEquipe.bullet = missile;
misunitEquipe.alternate = true;
misunitEquipe.reload = 135;
misunitEquipe.width = 10;
misunitEquipe.shootSound = Sounds.shootBig;
misunitEquipe.recoil = 1;

const misunitBase = prov(() => new JavaAdapter(GroundUnit, {
	onDeath(){
    Sounds.explosionbig.at(this);
    for (var i = 0; i <= Mathf.random(1, 3); i++){
    	Calls.createBullet(missile, this.getTeam(), this.x, this.y, Mathf.random(360), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
    };
	this.super$onDeath();
}}));

const misunit = extendContent(UnitType, "misunit", {
	/*load(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
		this.legRegion = Core.atlas.find(this.name + "-leg");
		this.baseRegion = Core.atlas.find(this.name + "-base");
  	}*/
});
misunit.weapon = misunitEquipe;
misunit.create(misunitBase);
misunit.health = 320;
misunit.mass = 1;
misunit.speed = 1;
misunit.hitsize = 15;
misunit.drag = 0.048;
misunit.range = 400;
misunit.shootCone = 20;
misunit.maxVelocity = 1.25;
misunit.baseRotateSpeed = 1;
misunit.rotatespeed = 1;
misunit.targetGround = true;
misunit.targetAir = false;

const misunitFac = extendContent(UnitFactory, "misunit-fac", {});
misunitFac.unitType = misunit;