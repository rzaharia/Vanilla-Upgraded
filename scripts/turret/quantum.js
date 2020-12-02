const quantumChargeBegin = new Effect(90, e => {
    Draw.color(Color.blue);
    Fill.circle(e.x, e.y, e.fin() * 10);

    Draw.color(Color.white);
    Fill.circle(e.x, e.y, e.fin() * 8);
});

const quantumcharge = new Effect(90, e => {
    Draw.color(Color.blue, Color.white, e.fin());
	Lines.stroke(e.fin() * 6);
	Lines.circle(e.x, e.y, e.fout() * 120)
	Draw.color();
});

const quantumHit = new Effect(23, e => {
    Draw.color(Color.blue, Color.white, e.fin());
    Fill.circle(e.x, e.y, e.fout() * 60);
});

const quantumShoot = new Effect(30, e => {
	Draw.color(Color.blue, Color.white, e.fin());
	Lines.stroke(e.fout() * 4);
	Lines.circle(e.x, e.y, e.fin() * 50);
	Draw.color();
});

const quantumPlasma = extend(ArtilleryBulletType, {
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
quantumPlasma.damage = 120;
quantumPlasma.lifetime = 100;
quantumPlasma.keepVelocity = false;
quantumPlasma.hitEffect = Fx.flakExplosion;
quantumPlasma.frontColor = Color.blue;
quantumPlasma.backColor = Color.valueOf("00008bff");
quantumPlasma.speed = 4;
quantumPlasma.despawnedEffect = Fx.flakExplosion;
quantumPlasma.drag = 0.042;
quantumPlasma.pierce = false;

const quantumPlasmaWhite = extend(ArtilleryBulletType, {
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
quantumPlasmaWhite.damage = 120;
quantumPlasmaWhite.lifetime = 100;
quantumPlasmaWhite.keepVelocity = false;
quantumPlasmaWhite.hitEffect = Fx.flakExplosion;
quantumPlasmaWhite.frontColor = Color.white;
quantumPlasmaWhite.backColor = Color.white;
quantumPlasmaWhite.speed = 4;
quantumPlasmaWhite.despawnedEffect = Fx.flakExplosion;
quantumPlasmaWhite.drag = 0.042;
quantumPlasmaWhite.pierce = false;

const quantumLaser = extend(BasicBulletType, {
	update(b){	
		if(b.timer.get(1, 29)){
			Damage.collideLine(b, b.team, this.hitEffect, b.x, b.y, b.rotation(), this.length, true);
		};
	},
	
	hit(b, hitx, hity){
		if(hitx != null && hity != null){
			Effect.create(Fx.hitLancer, hitx, hity, 0, Color.blue, null);
		}
	},
	
	draw(b){
		const colors = [Color.valueOf("00008bff"), Color.blue, Color.white];
		const tscales = [3.5, 3.2, 3, 2.7];
		const lenscales = [1, 1.12, 1.15, 1.17];

		const f = Mathf.curve(b.fin(), 0, 0.2);
		const baseLen = this.length * f;

		Lines.lineAngle(b.x, b.y, b.rotation(), baseLen);
        for(var s = 0; s < 3; s++){
            Draw.color(colors[s]);
            for(var i = 0; i < 4; i++){
                Lines.stroke(7 * b.fout() * (s == 0 ? 1.5 : s == 1 ? 1 : 0.3) * tscales[i]);
                Lines.lineAngle(b.x, b.y, b.rotation(), baseLen * lenscales[i]);
            }
        };
        Draw.reset();
	}
});
quantumLaser.length = 350;
quantumLaser.speed = 0.001;
quantumLaser.damage = 350;
quantumLaser.lifetime = 28;
quantumLaser.hitEffect = quantumHit;
quantumLaser.despawnEffect = Fx.none;
quantumLaser.hitSize = 7;
quantumLaser.drawSize = 720;
quantumLaser.pierce = true;

const bullet = extend(BasicBulletType, {
	despawned: function(b){
		for(var i = 0; i < 3; i++){
			Call.createBullet(this.frags[0], b.team, b.x, b.y, b.rotation() + Mathf.range(100.0), Mathf.random(0.75, 1.25), Mathf.random(0.4, 1.0), 1);
		};

		for(var i = 0; i < 3; i++){
			Call.createBullet(this.frags[1], b.team, b.x, b.y, b.rotation() + Mathf.range(100.0), Mathf.random(0.75, 1.25), Mathf.random(0.4, 1.0), 1);
		};

		for (var i = 0; i <= 1; i++) {
			Call.createBullet(this.frags[2], b.team, b.x, b.y, b.rotation(), Mathf.random(0.75, 1.25), Mathf.random(0.4, 1.0), 1);
		}
	}
});
bullet.speed = 0.1;
bullet.damage = 0.1;
bullet.lifetime = 0.1;
bullet.frags = [quantumPlasma, quantumPlasmaWhite, quantumLaser];
bullet.hitEffect = Fx.none;
bullet.despawnEffect = Fx.none;
bullet.pierce = false;

const quantum = extendContent(PowerTurret, "quantum", {});
quantum.chargeEffects = 1;
quantum.shootType = bullet;
quantum.chargeEffect = quantumcharge;
quantum.shootEffect = quantumShoot;
quantum.smokeEffect = Fx.lancerLaserShootSmoke;
quantum.chargeBeginEffect = quantumChargeBegin;
quantum.chargeTime = 80;
quantum.chargeMaxDelay = 0;
quantum.reloadTime = 240;
quantum.range = 380;