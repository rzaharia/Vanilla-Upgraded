const bullet = extend(BasicBulletType, {
	range(){
		return 130;
	},

	despawned(b){
		for(var i = 0; i < 12; i++){
			Calls.createBullet(Bullets.standardDenseBig, b.getTeam(), b.x, b.y, b.rot() + Mathf.range(15.0), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
			Calls.createBullet(Bullets.standardThoriumBig, b.getTeam(), b.x, b.y, b.rot() + Mathf.range(15.0), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
			Calls.createBullet(Bullets.standardIncendiaryBig, b.getTeam(), b.x, b.y, b.rot() + Mathf.range(15.0), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
		}
	},
	
	draw(b){}
});
bullet.speed = 0.001;
bullet.damage = 0;
bullet.lifetime = 1;
bullet.minRotation = 16;
bullet.widthOffset = 8;
bullet.lengthOffset = 8;
bullet.hitSize = 12;
bullet.collidesTiles = false;
bullet.collidesAir = false;
bullet.collides = false;
bullet.instantDisappear = true;
bullet.keepVelocity = false;
bullet.despawnEffect = Fx.none;
bullet.shootEffect = Fx.none;
bullet.smokeEffect = Fx.none;

const horrorEquip = extendContent(Weapon, "horrorEquip", {});
horrorEquip.bullet = bullet;
horrorEquip.alternate = true;
horrorEquip.reload = 80;
horrorEquip.lenght = 0;
horrorEquip.width = 20;
horrorEquip.shootSound = Sounds.shootBig;
horrorEquip.recoil = 0.5;

const horrorBase =  prov(() => new JavaAdapter(FlyingUnit, {}));

const horror = extendContent(UnitType, "flying-horror", {});
horror.weapon = horrorEquip;
horror.create(horrorBase);
horror.flying = true;
horror.health = 850;
horror.mass = 3;
horror.speed = 0.4;
horror.hitsize = 50;
horror.drag = 0.4;
horror.range = 70;
horror.maxVelocity = 1.7;
horror.shootCone = 5;
horror.targetAir = true;
horror.targetGround = true;