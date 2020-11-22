const multi = require("rest/multilib");

const neutronShoot = newEffect(70, e => {
	multi.circleTwo(e.x, e.y, Color.blue, Color.white, 80, 8, e.fin(), e.fout());
});

const neutronHit = newEffect(23, e => {
    Draw.color(Color.blue, Color.white, e.fin());
    Fill.circle(e.x, e.y, e.fout() * 60);
});

const neutronPlasma = extend(ArtilleryBulletType, {
	load(){
    	this.backRegion = Core.atlas.find("vanilla-upgraded-bullet-explo-back");
    	this.frontRegion = Core.atlas.find("vanilla-upgraded-bullet-explo");
    },

	draw(b){
		multi.fillCircleTwo(b.x, b.y, Color.blue, Color.white, 3, b.fin());
	},

	update(b){
		Effects.effect(Fx.none, b.x, b.y);
	},

	hit(b, hitx, hity){
		const vec = new Vec2();
		if(hitx != null && hity != null){
			Effects.effect(this.hitEffect, hitx, hity);
			Sounds.spark.at(b);
			for (var i = 0; i <= 2; i++){
				Lightning.create(b.getTeam(), Color.blue, 20, b.x + vec.x + Mathf.range(24.0), b.y + vec.y + Mathf.range(24.0), b.rot() + Mathf.range(46.0), Mathf.random(5, 16));
			}
		}
	},

	despawned(b){
		for (var i = 0; i <= 2; i++){
			const vec = new Vec2();
			Sounds.spark.at(b);
			Lightning.create(b.getTeam(), Color.blue, 20, b.x + vec.x + Mathf.range(24.0), b.y + vec.y + Mathf.range(24.0), b.rot() + Mathf.range(46.0), Mathf.random(5, 16));
		}
	}
});
neutronPlasma.damage = 30;
neutronPlasma.lifetime = 140;
neutronPlasma.keepVelocity = false;
neutronPlasma.hitEffect = Fx.flakExplosion;
neutronPlasma.frontColor = Color.blue;
neutronPlasma.backColor = multi.darkblue;
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
		multi.fillCircleTwo(b.x, b.y, Color.white, Color.blue, 3, b.fin());
	},

	update(b){
		Effects.effect(Fx.none, b.x, b.y);
	},

	hit(b, hitx, hity){
		const vec = new Vec2();
		if(hitx != null && hity != null){
			Effects.effect(this.hitEffect, hitx, hity);
			Sounds.spark.at(b);
			for (var i = 0; i <= 2; i++){
				Lightning.create(b.getTeam(), Color.blue, 15, b.x + vec.x + Mathf.range(24.0), b.y + vec.y + Mathf.range(24.0), b.rot() + Mathf.range(46.0), Mathf.random(5, 16));
			}
		}
	},

	despawned(b){
		for (var i = 0; i <= 2; i++){
			const vec = new Vec2();
			Sounds.spark.at(b);
			Lightning.create(b.getTeam(), Color.white, 15, b.x + vec.x + Mathf.range(24.0), b.y + vec.y + Mathf.range(24.0), b.rot() + Mathf.range(46.0), Mathf.random(5, 16));
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
	update: function(b){
		Effects.shake(1.2, 1.2, b.x, b.y);
		if(b.timer.get(1, 5)){
			Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), this.lengthB * 1.15, true);
		};
		if(Mathf.chance(Time.delta() * 0.3)){
			Tmp.v2.trns(b.rot() + 90.0, Mathf.range(7.0));
			Lightning.create(b.getTeam(), Color.blue, 22, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rot(), Mathf.random(47, 52));
		};
		if(Mathf.chance(Time.delta() * 0.2)){
			Tmp.v2.trns(b.rot(), Mathf.random(0.5, 390.0));
			Lightning.create(b.getTeam(), Color.white, 16, b.x + Tmp.v2.x, b.y + Tmp.v2.y, Mathf.random(360), 12);
		};
		if(Mathf.chance(0.9)){
			Tmp.v2.trns(b.rot(), Mathf.random(0.2, 390.0), Mathf.range(15.0));
			Lightning.create(b.getTeam(), Color.blue, 22, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rot(), Mathf.random(5, 16));
		};
		if(Mathf.chance(0.93)){
			Tmp.v2.trns(b.rot(), Mathf.random(0.2, 390.0), Mathf.range(10.0));
			Lightning.create(b.getTeam(), Color.white, 16, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rot(), Mathf.random(8, 18));
		};
		if(Mathf.chance(0.1)){
			Tmp.v2.trns(b.rot() + 90.0, Mathf.range(7.0));
			Calls.createBullet(neutronPlasma, b.getTeam(), b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rot() + Mathf.range(100.0), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
		};
		if(Mathf.chance(0.1)){
			Tmp.v2.trns(b.rot() + 90.0, Mathf.range(7.0));
			Calls.createBullet(neutronPlasmaWhite, b.getTeam(), b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rot() + Mathf.range(100.0), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
		};
		if(Mathf.chance(0.1)){
			Tmp.v2.trns(b.rot(), Mathf.random(0.5, 390.0));
			Calls.createBullet(neutronPlasma, b.getTeam(), b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rot() + Mathf.range(100.0), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
		};
		if(Mathf.chance(0.1)){
			Tmp.v2.trns(b.rot(), Mathf.random(0.2, 390.0), Mathf.range(15.0));
			Calls.createBullet(neutronPlasma, b.getTeam(), b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rot() + Mathf.range(100.0), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
		};
		if(Mathf.chance(0.1)){
			Tmp.v2.trns(b.rot(), Mathf.random(0.2, 390.0), Mathf.range(10.0));
			Calls.createBullet(neutronPlasma, b.getTeam(), b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rot() + Mathf.range(100.0), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
		};
		if(Mathf.chance(0.1)){
			Tmp.v2.trns(b.rot(), Mathf.random(0.5, 390.0));
			Calls.createBullet(neutronPlasmaWhite, b.getTeam(), b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rot() + Mathf.range(100.0), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
		};
		if(Mathf.chance(0.1)){
			Tmp.v2.trns(b.rot(), Mathf.random(0.2, 390.0), Mathf.range(15.0));
			Calls.createBullet(neutronPlasmaWhite, b.getTeam(), b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rot() + Mathf.range(100.0), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
		};
		if(Mathf.chance(0.1)){
			Tmp.v2.trns(b.rot(), Mathf.random(0.2, 390.0), Mathf.range(10.0));
			Calls.createBullet(neutronPlasmaWhite, b.getTeam(), b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rot() + Mathf.range(100.0), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
		};
	},
	
	hit: function(b, hitx, hity){
		if(hitx != null && hity != null){
			Effects.effect(this.hitEffect, hitx, hity);
		}
	},
	
	draw: function(b, tile){
		
		const colors = [multi.darkblue, Color.blue, Color.blue, Color.white];
		const tscales = [1, 0.74, 0.5, 0.24];
		const strokes = [2.3, 1.9, 1.4, 0.6];
		const lenscales = [1.0, 1.12, 1.15, 1.164];
		const tmpColor = new Color();

		for(var s = 0; s < 4; s++){
			Draw.color(tmpColor.set(colors[s]).mul(1.0 + Mathf.absin(Time.time(), 1.2, 0.4)));
			for(var i = 0; i < 4; i++){
				Tmp.v1.trns(b.rot() + 180.0, (lenscales[i] - 0.9) * 55.0);
				Lines.stroke((9 + Mathf.absin(Time.time(), 1.7, 3.1)) * b.fout() * strokes[s] * tscales[i]);
				Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rot(), this.lengthB * b.fout() * lenscales[i], CapStyle.none);
				Tmp.v1.trns(b.rot() + 180.0, (lenscales[i] - 120) * 55.0);
				Lines.stroke((2 + Mathf.absin(Time.time(), 1.7, 3.1)) * b.fout() * strokes[s] * tscales[i]);
				Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rot(), this.lengthB * b.fout() * lenscales[i], CapStyle.none);
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
neutronLaser.smokeEffect = Fx.none;

const neutron = extendContent(LaserTurret, "neutron", {
	  load(){
		this.super$load();
		
		this.region = Core.atlas.find(this.name);
		this.baseRegion = Core.atlas.find("vanilla-upgraded-block-5");
	},
	
	generateIcons: function(){
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