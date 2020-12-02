const neutronChargeBegin = new Effect(200, e => {
    Draw.color(Color.blue);
    Fill.circle(e.x, e.y, e.fin() * 10);

    Draw.color(Color.white);
    Fill.circle(e.x, e.y, e.fin() * 8);
});

const neutroncharge = new Effect(200, e => {
    Draw.color(Color.blue, Color.white, e.fin());
	Lines.stroke(e.fin() * 6);
	Lines.circle(e.x, e.y, e.fout() * 120)
	Draw.color();
});

const neutronShoot = new Effect(70, e => {
	Draw.color(Color.blue, Color.white, e.fin());
	Lines.stroke(e.fout() * 8);
	Lines.circle(e.x, e.y, e.fin() * 80);
	Draw.color();
});

const neutronHit = new Effect(23, e => {
    Draw.color(Color.blue, Color.white, e.fin());
    Fill.circle(e.x, e.y, e.fout() * 60);
});

const neutronPlasma = extend(ArtilleryBulletType, {
	load(){
    	this.backRegion = Core.atlas.find("vanilla-upgraded-bullet-explo-back");
    	this.frontRegion = Core.atlas.find("vanilla-upgraded-bullet-explo");
    },

	draw(b){
		Draw.color(Color.blue, Color.white, b.fin());
		Fill.circle(b.x, b.y, 3);
		Draw.color();
	},

	update(b){
		Effect.create(Fx.none, b.x, b.y, 0, Color.white, null);
	},

	hit(b, hitx, hity){
		const vec = new Vec2();
		if(hitx != null && hity != null){
			Effect.create(this.hitEffect, hitx, hity, 0, Color.white, null);
			Sounds.spark.at(b);
			for (var i = 0; i <= 2; i++){
				Lightning.create(b.team, Color.blue, 20, b.x + vec.x + Mathf.range(24.0), b.y + vec.y + Mathf.range(24.0), b.rotation() + Mathf.range(46.0), Mathf.random(5, 16));
			}
		}
	},

	despawned(b){
		for (var i = 0; i <= 2; i++){
			const vec = new Vec2();
			Sounds.spark.at(b);
			Lightning.create(b.team, Color.blue, 20, b.x + vec.x + Mathf.range(24.0), b.y + vec.y + Mathf.range(24.0), b.rotation() + Mathf.range(46.0), Mathf.random(5, 16));
		}
	}
});
neutronPlasma.damage = 30;
neutronPlasma.lifetime = 140;
neutronPlasma.keepVelocity = false;
neutronPlasma.hitEffect = Fx.flakExplosion;
neutronPlasma.frontColor = Color.blue;
neutronPlasma.backColor = Color.valueOf("00008bff");
neutronPlasma.speed = 4;
neutronPlasma.despawnedEffect = Fx.flakExplosion;
neutronPlasma.drag = 0.042;
neutronPlasma.pierce = false;

const neutronPlasmaWhite = extend(ArtilleryBulletType, {
	load(){
    	this.backRegion = Core.atlas.find("vanilla-upgraded-bullet-explo-back");
    	this.frontRegion = Core.atlas.find("vanilla-upgraded-bullet-explo");
    },

	draw(b){
		Draw.color(Color.white, Color.blue, b.fin());
		Fill.circle(b.x, b.y, 3);
		Draw.color();
	},

	update(b){
		Effect.create(Fx.none, b.x, b.y, 0, Color.white, null);
	},

	hit(b, hitx, hity){
		const vec = new Vec2();
		if(hitx != null && hity != null){
			Effect.create(this.hitEffect, hitx, hity, 0, Color.white, null);
			Sounds.spark.at(b);
			for (var i = 0; i <= 2; i++){
				Lightning.create(b.team, Color.blue, 15, b.x + vec.x + Mathf.range(24.0), b.y + vec.y + Mathf.range(24.0), b.rotation() + Mathf.range(46.0), Mathf.random(5, 16));
			}
		}
	},

	despawned(b){
		for (var i = 0; i <= 2; i++){
			const vec = new Vec2();
			Sounds.spark.at(b);
			Lightning.create(b.team, Color.white, 15, b.x + vec.x + Mathf.range(24.0), b.y + vec.y + Mathf.range(24.0), b.rotation() + Mathf.range(46.0), Mathf.random(5, 16));
		}
	}
});
neutronPlasmaWhite.damage = 30;
neutronPlasmaWhite.lifetime = 140;
neutronPlasmaWhite.keepVelocity = false;
neutronPlasmaWhite.hitEffect = Fx.flakExplosion;
neutronPlasmaWhite.frontColor = Color.white;
neutronPlasmaWhite.backColor = Color.white;
neutronPlasmaWhite.speed = 4;
neutronPlasmaWhite.despawnedEffect = Fx.flakExplosion;
neutronPlasmaWhite.drag = 0.042;
neutronPlasmaWhite.pierce = false;

const neutronLaser = extend(BasicBulletType, {
	update(b){
		Effect.shake(1.2, 1.2, b.x, b.y);
		if(b.timer.get(1, 5)){
			Damage.collideLine(b, b.team, this.hitEffect, b.x, b.y, b.rotation(), this.lengthB * 1.15, true);
		};
		if(Mathf.chance(Time.delta * 0.3)){
			Tmp.v2.trns(b.rotation() + 90.0, Mathf.range(7.0));
			Lightning.create(b.team, Color.blue, 22, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rotation(), Mathf.random(47, 52));
		};
		if(Mathf.chance(Time.delta * 0.2)){
			Tmp.v2.trns(b.rotation(), Mathf.random(0.5, 390.0));
			Lightning.create(b.team, Color.white, 16, b.x + Tmp.v2.x, b.y + Tmp.v2.y, Mathf.random(360), 12);
		};
		if(Mathf.chance(0.9)){
			Tmp.v2.trns(b.rotation(), Mathf.random(0.2, 390.0), Mathf.range(15.0));
			Lightning.create(b.team, Color.blue, 22, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rotation(), Mathf.random(5, 16));
		};
		if(Mathf.chance(0.93)){
			Tmp.v2.trns(b.rotation(), Mathf.random(0.2, 390.0), Mathf.range(10.0));
			Lightning.create(b.team, Color.white, 16, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rotation(), Mathf.random(8, 18));
		};
		if(Mathf.chance(0.1)){
			Tmp.v2.trns(b.rotation() + 90.0, Mathf.range(7.0));
			Call.createBullet(neutronPlasma, b.team, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rotation() + Mathf.range(100.0), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0), 1);
		};
		if(Mathf.chance(0.1)){
			Tmp.v2.trns(b.rotation() + 90.0, Mathf.range(7.0));
			Call.createBullet(neutronPlasmaWhite, b.team, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rotation() + Mathf.range(100.0), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0), 1);
		};
		if(Mathf.chance(0.1)){
			Tmp.v2.trns(b.rotation(), Mathf.random(0.5, 390.0));
			Call.createBullet(neutronPlasma, b.team, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rotation() + Mathf.range(100.0), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0), 1);
		};
		if(Mathf.chance(0.1)){
			Tmp.v2.trns(b.rotation(), Mathf.random(0.2, 390.0), Mathf.range(15.0));
			Call.createBullet(neutronPlasma, b.team, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rotation() + Mathf.range(100.0), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0), 1);
		};
		if(Mathf.chance(0.1)){
			Tmp.v2.trns(b.rotation(), Mathf.random(0.2, 390.0), Mathf.range(10.0));
			Call.createBullet(neutronPlasma, b.team, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rotation() + Mathf.range(100.0), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0), 1);
		};
		if(Mathf.chance(0.1)){
			Tmp.v2.trns(b.rotation(), Mathf.random(0.5, 390.0));
			Call.createBullet(neutronPlasmaWhite, b.team, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rotation() + Mathf.range(100.0), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0), 1);
		};
		if(Mathf.chance(0.1)){
			Tmp.v2.trns(b.rotation(), Mathf.random(0.2, 390.0), Mathf.range(15.0));
			Call.createBullet(neutronPlasmaWhite, b.team, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rotation() + Mathf.range(100.0), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0), 1);
		};
		if(Mathf.chance(0.1)){
			Tmp.v2.trns(b.rotation(), Mathf.random(0.2, 390.0), Mathf.range(10.0));
			Call.createBullet(neutronPlasmaWhite, b.team, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rotation() + Mathf.range(100.0), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0), 1);
		};
	},
	
	hit(b, hitx, hity){
		if(hitx != null && hity != null){
			Effect.create(this.hitEffect, hitx, hity, 0, Color.white, null);
		}
	},
	
	draw(b){
		const colors = [Color.valueOf("00008bff"), Color.blue, Color.blue, Color.white];
		const tscales = [1, 0.74, 0.5, 0.24];
		const strokes = [2.3, 1.9, 1.4, 0.6];
		const lenscales = [1.0, 1.12, 1.15, 1.164];
		const tmpColor = new Color();

		for(var s = 0; s < 4; s++){
			Draw.color(tmpColor.set(colors[s]).mul(1.0 + Mathf.absin(Time.time, 1.2, 0.4)));
			for(var i = 0; i < 4; i++){
				Tmp.v1.trns(b.rotation() + 180.0, (lenscales[i] - 0.9) * 55.0);
				Lines.stroke((9 + Mathf.absin(Time.time, 1.7, 3.1)) * b.fout() * strokes[s] * tscales[i]);
				Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rotation(), this.lengthB * b.fout() * lenscales[i], false);
				Tmp.v1.trns(b.rotation() + 180.0, (lenscales[i] - 120) * 55.0);
				Lines.stroke((2 + Mathf.absin(Time.time, 1.7, 3.1)) * b.fout() * strokes[s] * tscales[i]);
				Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rotation(), this.lengthB * b.fout() * lenscales[i], false);
			}
		};
	}
});
neutronLaser.lengthB = 425;
neutronLaser.speed = 0.001;
neutronLaser.damage = 70;
neutronLaser.lifetime = 18;
neutronLaser.hitEffect = neutronHit;
neutronLaser.despawnEffect = Fx.none;
neutronLaser.hitSize = 7;
neutronLaser.pierce = true;
neutronLaser.shootEffect = neutronShoot;
neutronLaser.smokeEffect = Fx.lancerLaserShootSmoke;

const neutron = extendContent(LaserTurret, "neutron", {
	  load(){
		this.super$load();
		
		this.region = Core.atlas.find(this.name);
		this.baseRegion = Core.atlas.find("vanilla-upgraded-block-5");
	},
	
	icons(){
	return [
		Core.atlas.find("vanilla-upgraded-block-5"),
		Core.atlas.find(this.name)
	];}
});
neutron.extraVelocity = 0.5;
neutron.recoil = 3.7;
neutron.shotsB = 2;
neutron.lengthN = 10;
neutron.shootType = neutronLaser;
neutron.update = true;
neutron.range = 425;
neutron.chargeEffect = neutroncharge;
neutron.chargeBeginEffect = neutronChargeBegin;
neutron.chargeTime = 190;
neutron.chargeMaxDelay = 0;
neutron.reloadTime = 500;