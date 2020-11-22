const fire = Color.valueOf("f89509");
const darkFire = Color.valueOf("e38c10");

const fireMissile = extend(MissileBulletType, {});
fireMissile.backColor = darkFire;
fireMissile.frontColor = fire;
fireMissile.height = 8;
fireMissile.width = 7;
fireMissile.speed = 2.9;
fireMissile.bulletShrink = 0;
fireMissile.damage = 12;
fireMissile.drag = -0.01;
fireMissile.splashDamageRadius = 10;
fireMissile.homingPower = 7;
fireMissile.lifetime = 160;
fireMissile.splashDamage = 10;
fireMissile.hitEffect = Fx.blastExplosion;
fireMissile.status = StatusEffects.burning;
fireMissile.fragBullet = Bullets.fireball;
fireMissile.fragBullets = 5;

const fireball = extend(BasicBulletType, {
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
       Effects.effect(Fx.burning, b.x, b.y);
    }
});
fireball.despawnEffect = Fx.none;
fireball.speed = 7;
fireball.lifetime = 90;
fireball.damage = 180;
fireball.hitEffect = Fx.none;
fireball.width = 11;
fireball.height = 11;
fireball.shootEffect = Fx.none;
fireball.smokeEffect = Fx.none;
fireball.frontColor = fire;
fireball.backColor = darkFire;
fireball.fragBullet = fireMissile;
fireball.fragBullets = 7;

const crounderEquipe = extendContent(Weapon, "crounder-weapon", {
	load: function(){
		this.region = Core.atlas.find("vanilla-upgraded-crounder-weapon");
	}
});
crounderEquipe.bullet = fireball;
crounderEquipe.alternate = false;
crounderEquipe.reload = 280;
crounderEquipe.lenght = 0;
crounderEquipe.width = -60;
crounderEquipe.shootSound = Sounds.shootBig;
crounderEquipe.recoil = 9;
crounderEquipe.shots = 3;

const crounderBase =  prov(() => new JavaAdapter(GroundUnit, {
  onDeath(){
        Sounds.explosionbig.at(this);
        for(var i = 0; i < 200; i++){
            Calls.createBullet(Bullets.fireball, this.getTeam(), this.x, this.y, Mathf.random(360), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
		}
		this.super$onDeath();
}}));   

const crounder = extendContent(UnitType, "crounder", {
	load(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
		this.baseRegion = Core.atlas.find(this.name + "-base");
		this.legRegion = Core.atlas.find(this.name + "-leg");
	}
});
crounder.create(crounderBase);
crounder.weapon = crounderEquipe;
crounder.health = 22000;
crounder.mass = 3;
crounder.speed = 0.06;
crounder.hitsize = 70;
crounder.drag = 0.12;
crounder.range = 14;
crounder.maxVelocity = 0.1;
crounder.shootCone = 15;
crounder.rotatespeed = 0.02;
crounder.immunities = ObjectSet.with(StatusEffects.burning, StatusEffects.melting);
crounder.baseRotateSpeed = 0.02;
crounder.targetAir = true;
crounder.targetGround = true;