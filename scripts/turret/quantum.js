const multi = require("rest/multilib");

const quantumChargeBegin = newEffect(400, e => {
    Draw.color(Color.blue);
    Fill.circle(e.x, e.y, e.fin() * 10);

    Draw.color(Color.white);
    Fill.circle(e.x, e.y, e.fin() * 8);
});

const quantumcharge = newEffect(400, e => {
    multi.circleBackTwo(e.x, e.y, Color.blue, Color.white, 120, 6, e.fin(), e.fout());
});

const quantumHit = newEffect(23, e => {
    Draw.color(Color.blue, Color.white, e.fin());
    Fill.circle(e.x, e.y, e.fout() * 60);
});

const quantumShoot = newEffect(30, e => {
	multi.circleTwo(e.x, e.y, Color.blue, Color.white, 50, 4, e.fin(), e.fout());
});

const quantumPlasma = extend(ArtilleryBulletType, {
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
quantumPlasma.damage = 160;
quantumPlasma.lifetime = 60;
quantumPlasma.keepVelocity = false;
quantumPlasma.hitEffect = Fx.flakExplosion;
quantumPlasma.frontColor = Color.blue;
quantumPlasma.backColor = multi.darkblue;
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
quantumPlasmaWhite.damage = 120;
quantumPlasmaWhite.lifetime = 60;
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
			Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), this.length, true);
		};
	},
	
	hit(b, hitx, hity){
		if(hitx != null && hity != null){
			Effects.effect(Fx.hitLancer, Color.blue, hitx, hity);
		}
	},
	
	draw(b){
		const colors = [multi.darkblue, Color.blue, Color.white];
		const tscales = [3.5, 3.2, 3, 2.7];
		const lenscales = [1, 1.12, 1.15, 1.17];

		const f = Mathf.curve(b.fin(), 0, 0.2);
		const baseLen = this.length * f;

		Lines.lineAngle(b.x, b.y, b.rot(), baseLen);
        for(var s = 0; s < 3; s++){
            Draw.color(colors[s]);
            for(var i = 0; i < 4; i++){
                Lines.stroke(7 * b.fout() * (s == 0 ? 1.5 : s == 1 ? 1 : 0.3) * tscales[i]);
                Lines.lineAngle(b.x, b.y, b.rot(), baseLen * lenscales[i]);
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
			Bullet.create(this.frags[0], b, b.x, b.y, b.rot() + Mathf.range(100.0), Mathf.random(0.75, 1.25));
		};

		for(var i = 0; i < 3; i++){
			Bullet.create(this.frags[1], b, b.x, b.y, b.rot() + Mathf.range(100.0), Mathf.random(0.75, 1.25));
		};

		for (var i = 0; i <= 1; i++) {
			Bullet.create(this.frags[2], b, b.x, b.y, b.rot(), Mathf.random(0.75, 1.25));
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

const quantum = extendContent(ChargeTurret, "quantum", {});
quantum.chargeEffects = 1;
quantum.shootType = bullet;
quantum.chargeEffect = quantumcharge;
quantum.shootEffect = quantumShoot;
quantum.smokeEffect = Fx.lancerLaserShootSmoke;
quantum.chargeBeginEffect = quantumChargeBegin;
quantum.chargeTime = 350;
quantum.chargeMaxDelay = 0;
quantum.reload = 500;
quantum.range = 350;