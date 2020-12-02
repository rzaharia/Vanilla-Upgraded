const plasmaChargeBegin = new Effect(70, e => {
    Draw.color(Color.blue);
    Fill.circle(e.x, e.y, e.fin() * 8);

    Draw.color(Color.white);
    Fill.circle(e.x, e.y, e.fin() * 6);
});

const plasmaTrail = new Effect(20, e => {
	Draw.color(Color.blue, Color.white, e.fin());
	Fill.square(e.x, e.y, 0.1 + e.fout() * 2.8, 45);
});

const plasmaTrailWhite = new Effect(20, e => {
	Draw.color(Color.white, Color.blue, e.fin());
	Fill.square(e.x, e.y, 0.1 + e.fout() * 2.8, 45);
});

const plasmacharge = new Effect(70, e => {
    Draw.color(Color.blue, Color.white, e.fin());
	Lines.stroke(e.fin() * 6);
	Lines.circle(e.x, e.y, e.fout() * 120)
	Draw.color();
});

const plasmaShoot = new Effect(30, e => {
	Draw.color(Color.blue, Color.white, e.fin());
	Lines.stroke(e.fout() * 4);
	Lines.circle(e.x, e.y, e.fin() * 50);
	Draw.color();
});

const smallPlasmabul = extend(ArtilleryBulletType, {
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
				Lightning.create(b.team, Color.blue, 15, b.x, b.y, b.rotation() + Mathf.range(46.0), Mathf.random(5, 16));
			}
		}
	},

	despawned(b){
		for (var i = 0; i <= 2; i++){
			const vec = new Vec2();
			Sounds.spark.at(b);
			Lightning.create(b.team, Color.blue, 15, b.x, b.y, b.rotation() + Mathf.range(46.0), Mathf.random(5, 16));
		}
	}
});
smallPlasmabul.damage = 120;
smallPlasmabul.lifetime = 100;
smallPlasmabul.keepVelocity = false;
smallPlasmabul.hitEffect = Fx.flakExplosion;
smallPlasmabul.frontColor = Color.blue;
smallPlasmabul.backColor = Color.valueOf("00008bff");
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
				Lightning.create(b.team, Color.blue, 15, b.x, b.y, b.rotation() + Mathf.range(46.0), Mathf.random(5, 16));
			}
		}
	},

	despawned(b){
		for (var i = 0; i <= 2; i++){
			const vec = new Vec2();
			Sounds.spark.at(b);
			Lightning.create(b.team, Color.white, 15, b.x, b.y, b.rotation() + Mathf.range(46.0), Mathf.random(5, 16));
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
  		Draw.color(Color.blue);
		Fill.circle(b.x, b.y, this.width);

		Draw.color(Color.white);
		Fill.circle(b.x, b.y, 6);
		Draw.color();

  		if(Mathf.chance(0.5)){
    		Effect.create(plasmaTrail, b.x, b.y, b.rotation, Color.white, null);
    	}
    	if(Mathf.chance(0.5)){
    		Effect.create(plasmaTrailWhite, b.x, b.y, b.rotation, Color.white, null);
    	}
  	},

  	update(b){
  		if(Mathf.chance(0.1)){
			const vec = new Vec2();

			Sounds.spark.at(b);

			vec.trns(b.rotation() + Mathf.range(2.0), 12);
			Lightning.create(b.team, Color.blue, 15, b.x, b.y, b.rotation() + Mathf.range(46.0), Mathf.random(5, 16));
		}

  		if(Mathf.chance(0.03)){
			Call.createBullet(smallPlasmabul, b.team, b.x, b.y, Mathf.random(360), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0), 1);
		}

  		if(Mathf.chance(0.03)){
			Call.createBullet(smallPlasmabulWhite, b.team, b.x, b.y, Mathf.random(360), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0), 1);
		}
  	},

	despawned(b){
		for (var i = 0; i <= 2; i++){
			const vec = new Vec2();
			Sounds.spark.at(b);
			Lightning.create(b.team, Color.blue, 15, b.x, b.y, b.rotation() + Mathf.range(46.0), Mathf.random(5, 16));
		}
	}
});
plasmabul.damage = 240;
plasmabul.lifetime = 120;
plasmabul.hitEffect = Fx.explosion;
plasmabul.width = 8;
plasmabul.speed = 7;
plasmabul.despawnedEffect = Fx.explosion;

const plasma = extendContent(PowerTurret, "plasma", {});
plasma.chargeEffects = 1;
plasma.shootType = plasmabul;
plasma.chargeEffect = plasmacharge;
plasma.shootEffect = plasmaShoot;
plasma.smokeEffect = Fx.lancerLaserShootSmoke;
plasma.chargeBeginEffect = plasmaChargeBegin;
plasma.chargeTime = 60;
plasma.chargeMaxDelay = 0;
plasma.reloadTime = 200;
plasma.range = 340;