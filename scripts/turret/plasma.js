const multi = require("rest/multilib");

const plasmaChargeBegin = newEffect(300, e => {
    Draw.color(Color.blue);
    Fill.circle(e.x, e.y, e.fin() * 8);

    Draw.color(Color.white);
    Fill.circle(e.x, e.y, e.fin() * 6);
});

const plasmaTrail = newEffect(20, e => {
	multi.fillSquareTwoEffect(e.x, e.y, Color.blue, Color.white, e.fin(), e.fout());
});

const plasmaTrailWhite = newEffect(20, e => {
	multi.fillSquareTwoEffect(e.x, e.y, Color.white, Color.blue, e.fin(), e.fout());
});

const plasmacharge = newEffect(300, e => {
    multi.circleBackTwo(e.x, e.y, Color.blue, Color.white, 120, 6, e.fin(), e.fout());
});

const plasmaShoot = newEffect(30, e => {
	multi.circleTwo(e.x, e.y, Color.blue, Color.white, 50, 4, e.fin(), e.fout());
});

const smallPlasmabul = extend(ArtilleryBulletType, {
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
				Lightning.create(b.getTeam(), Color.blue, 15, b.x + vec.x + Mathf.range(24.0), b.y + vec.y + Mathf.range(24.0), b.rot() + Mathf.range(46.0), Mathf.random(5, 16));
			}
		}
	},

	despawned(b){
		for (var i = 0; i <= 2; i++){
			const vec = new Vec2();
			Sounds.spark.at(b);
			Lightning.create(b.getTeam(), Color.blue, 15, b.x + vec.x + Mathf.range(24.0), b.y + vec.y + Mathf.range(24.0), b.rot() + Mathf.range(46.0), Mathf.random(5, 16));
		}
	}
});
smallPlasmabul.damage = 120;
smallPlasmabul.lifetime = 100;
smallPlasmabul.keepVelocity = false;
smallPlasmabul.hitEffect = Fx.flakExplosion;
smallPlasmabul.frontColor = Color.blue;
smallPlasmabul.backColor = multi.darkblue;
smallPlasmabul.speed = 4;
smallPlasmabul.despawnedEffect = Fx.flakExplosion;
smallPlasmabul.drag = 0.042;
smallPlasmabul.pierce = false;

const smallPlasmabulWhite = extend(ArtilleryBulletType, {
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
smallPlasmabulWhite.damage = 120;
smallPlasmabulWhite.lifetime = 100;
smallPlasmabulWhite.keepVelocity = false;
smallPlasmabulWhite.hitEffect = Fx.flakExplosion;
smallPlasmabulWhite.frontColor = Color.white;
smallPlasmabulWhite.backColor = Color.white;
smallPlasmabulWhite.speed = 4;
smallPlasmabulWhite.despawnedEffect = Fx.flakExplosion;
smallPlasmabulWhite.drag = 0.042;
smallPlasmabulWhite.pierce = false;

const plasmabul = extend(BasicBulletType, {
  	draw(b){
  		multi.advancedFillCircleTwo(b.x, b.y, b.x, b.y, Color.blue, Color.white, this.width, 6);
  		if(Mathf.chance(0.5)){
    		Effects.effect(plasmaTrail, b.x, b.y, b.rot);
    	}
    	if(Mathf.chance(0.5)){
    		Effects.effect(plasmaTrailWhite, b.x, b.y, b.rot);
    	}
  	},

  	update(b){
  		multi.lightningChanceBullet(0.1, Sounds.spark, b, Color.blue, 22, Mathf.random(6, 22));
  		multi.chanceCreateBullet(0.03, smallPlasmabul, b.getTeam(), b.x, b.y);
  		multi.chanceCreateBullet(0.03, smallPlasmabulWhite, b.getTeam(), b.x, b.y);
  	},

	despawned(b){
		for (var i = 0; i <= 2; i++){
			const vec = new Vec2();
			Sounds.spark.at(b);
			Lightning.create(b.getTeam(), Color.blue, 22, b.x + vec.x + Mathf.range(24.0), b.y + vec.y + Mathf.range(24.0), b.rot() + Mathf.range(46.0), Mathf.random(6, 22));
		}
	}
});
plasmabul.damage = 240;
plasmabul.lifetime = 120;
plasmabul.hitEffect = Fx.explosion;
plasmabul.width = 8;
plasmabul.speed = 7;
plasmabul.despawnedEffect = Fx.explosion;

const plasma = extendContent(ChargeTurret, "plasma", {});
plasma.chargeEffects = 1;
plasma.shootType = plasmabul;
plasma.chargeEffect = plasmacharge;
plasma.shootEffect = plasmaShoot;
plasma.smokeEffect = Fx.lancerLaserShootSmoke;
plasma.chargeBeginEffect = plasmaChargeBegin;
plasma.chargeTime = 280;
plasma.chargeMaxDelay = 0;
plasma.reload = 400;
plasma.range = 280;