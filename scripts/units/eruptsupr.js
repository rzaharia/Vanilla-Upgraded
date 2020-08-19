const red = Color.valueOf("ed7358");
const darkRed = Color.valueOf("ff9c59");

const bomb = extend(BasicBulletType, {
  	load(){
	    this.backRegion = Core.atlas.find("vanilla-upgraded-bullet-explo-back");
	    this.frontRegion = Core.atlas.find("vanilla-upgraded-bullet-explo");
  	},
  	draw(b) {
	    Draw.color(this.backColor);
	    Draw.rect(this.backRegion, b.x, b.y, this.width, this.height, b.rot() - 90);
	    Draw.color(this.frontColor);
	    Draw.rect(this.frontRegion, b.x, b.y, this.width, this.height, b.rot() - 90);
	    Draw.color();
	    Effects.effect(Fx.melting, b.x, b.y);
    }
});
bomb.despawnEffect = Fx.none;
bomb.speed = 9;
bomb.lifetime = 70;
bomb.damage = 220;
bomb.hitEffect = Fx.none;
bomb.width = 9;
bomb.height = 11;
bomb.shootEffect = Fx.none;
bomb.smokeEffect = Fx.none;
bomb.frontColor = red;
bomb.backColor = darkRed;
bomb.fragBullet = Bullets.slagShot;
bomb.fragBullets = 1000;

const eruptsuprEquipe = extendContent(Weapon, "eruptsupr-equip", {
	load(){
		this.region = Core.atlas.find("vanilla-upgraded-eruptsupr-equip");
	}
});
eruptsuprEquipe.bullet = bomb;
eruptsuprEquipe.alternate = true;
eruptsuprEquipe.reload = 700;
eruptsuprEquipe.width = 10;
eruptsuprEquipe.shootSound = Sounds.shootBig;
eruptsuprEquipe.recoil = 3;

const eruptsuprBase = prov(() => new JavaAdapter(GroundUnit, {}));

const eruptsupr = extendContent(UnitType, "eruptsupr", {
	load(){
		this.super$load();

		this.weapon.load();
		this.region = Core.atlas.find(this.name);
		this.legRegion = Core.atlas.find(this.name + "-leg");
		this.baseRegion = Core.atlas.find(this.name + "-base");
  	}
});
eruptsupr.weapon = eruptsuprEquipe;
eruptsupr.create(eruptsuprBase);
eruptsupr.health = 1650;
eruptsupr.mass = 10;
eruptsupr.speed = 0.15;
eruptsupr.hitsize = 17;
eruptsupr.drag = 0.4;
eruptsupr.range = 400;
eruptsupr.shootCone = 20;
eruptsupr.maxVelocity = 0.78;
eruptsupr.rotatespeed = 0.06;
eruptsupr.targetGround = true;
eruptsupr.targetAir = false;

const eruptsuprFac = extendContent(UnitFactory, "eruptsupr-fac", {});
eruptsuprFac.unitType = eruptsupr;