const antimGreen = Color.valueOf("ffffff");
const lib = require("funclib");

const shipTrail = newEffect(44, e => {
	Draw.color(antimGreen);
	Fill.circle(e.x, e.y, 1.6 * e.fout());
});

const shipLight = newEffect(24, e => {
	const lightRegion = Core.atlas.find("vanilla-upgraded-antim-lights");
	
	if(!Core.settings.getBool("bloom")){
		Draw.blend(Blending.additive);
		Draw.color(Color.valueOf("FFD9C4"), Color.valueOf("36080230"), e.fin());
		Draw.rect(lightRegion, e.x, e.y, e.rotation - 90);
		Draw.blend();
	}else{
		Draw.mixcol(Color.valueOf("ffffff"), 1);
		Draw.alpha(e.fout());
		Draw.rect(lightRegion, e.x, e.y, e.rotation - 90);
	}
});

const antimLaserShoot = newEffect(11, e => {
	Draw.color(antimGreen);
	
	for(var g = 1; g < 3; g++){
		Drawf.tri(e.x, e.y, 5 * e.fout(), 29, e.rotation + 180 + (g * 240));
	};
	
	Drawf.tri(e.x, e.y, 7 * e.fout(), 48, e.rotation);
});

const antimLaser = extend(BasicBulletType, {
	range: function(){
		return 190.0;
	},
	
	update: function(b){
		if(b.timer.get(1, 17)){
			Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), 170.0, false);
		};
	},
	
	
	draw: function(b){
		const colors = [antimGreen.cpy().mul(1.0, 1.0, 1.0, 0.4), antimGreen, Color.white];
		const tscales = [1.0, 0.7, 0.5, 0.2];
		const lenscales = [1, 1.1, 1.13, 1.14];
		const length = 170.0;
		const f = Mathf.curve(b.fin(), 0.0, 0.2);
		const baseLen = length * f;

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
antimLaser.speed = 0.001;
antimLaser.damage = 50;
antimLaser.hitEffect = Fx.hitFuse;
antimLaser.despawnEffect = Fx.none;
antimLaser.hitSize = 4;
antimLaser.lifetime = 11;
antimLaser.keepVelocity = false;
antimLaser.pierce = true;
antimLaser.shootEffect = antimLaserShoot;
antimLaser.smokeEffect = Fx.none;

const pestilenceShot = extend(BasicBulletType, {});

pestilenceShot.lifetime = 35;
pestilenceShot.damage = 5;
pestilenceShot.speed = 6.7;
pestilenceShot.bulletWidth = 6;
pestilenceShot.bulletHeight = 8.7;
pestilenceShot.backColor = Color.valueOf("cbd97f");
pestilenceShot.frontColor = Color.valueOf("edf3a9");
pestilenceShot.hitEffect = Fx.hitBulletSmall;

const pestilenceFly = extend(MissileBulletType, {
	range: function(){
		return 190;
	},
	
	update: function(b){
		//b.velocity().rotate(Mathf.sin(Time.time() + b.id * 4422, this.weaveScale, this.weaveMag) * Time.delta());
		
		if(Mathf.chance(0.2)){
            Effects.effect(Fx.missileTrail, antimGreen, b.x, b.y, 2.0);
        }
		
        if(this.homingPower > 0.0001){
            /*TargetTrait*/ target = Units.closestTarget(b.getTeam(), b.x, b.y, this.homingRange);
            if(target != null){
                b.velocity().setAngle(Mathf.slerpDelta(b.velocity().angle(), b.angleTo(target), 0.12));
				if(b.timer.get(1, 9)){
					Calls.createBullet(pestilenceShot, b.getTeam(), b.x, b.y, b.rot(), Mathf.random(0.9, 1.0), Mathf.random(0.8, 1.0));
				}
            }
        }
    }
});

pestilenceFly.homingPower = 7;
pestilenceFly.homingRange = 110;
//pestilenceFly.range = 190;
pestilenceFly.lifetime = 90;
pestilenceFly.pierce = true;
pestilenceFly.collidesTiles = true;
pestilenceFly.backColor = Color.valueOf("cbd97f");
pestilenceFly.frontColor = Color.valueOf("edf3a9");
pestilenceFly.damage = 6;
pestilenceFly.speed = 3.5;
pestilenceFly.bulletWidth = 7;
pestilenceFly.bulletHeight = 10;
pestilenceFly.bulletShrink = 0;
pestilenceFly.hitEffect = Fx.hitBulletSmall;

const antimBullet = extend(BasicBulletType, {
	hitTile: function(b, tile){
		this.hit(b);
		//tile.setTeam(b.getTeam());
	},
	
	draw: function(b){
		/*Draw.color(primeColor);
		Lines.stroke(2);
		Lines.lineAngleCenter(b.x, b.y, b.rot(), 9);
		Draw.color(Color.white);
		Lines.lineAngleCenter(b.x, b.y, b.rot(), 4);
		Draw.reset();*/
		
		const lengthB = 8;
		const colors = [Color.valueOf("a3e3ff80"), Color.valueOf("a3e3ff"), Color.valueOf("ffffff")];
		const tscales = [1, 0.8, 0.6];
		const strokes = [1.13, 0.6, 0.28];
		const lenscales = [1.0, 1.61, 1.97];
		const tmpColor = new Color();

		//Lines.lineAngle(b.x, b.y, b.rot(), baseLen);
		for(var s = 0; s < 3; s++){
			//Draw.color(colors[s]);
			Draw.color(tmpColor.set(colors[s]).mul(1.0 + Mathf.absin(Time.time(), 1.5, 0.1)));
			for(var i = 0; i < 3; i++){
				Lines.stroke((3 + Mathf.absin(Time.time(), 3.2, 1)) * strokes[s] * tscales[i]);
				Tmp.v1.trns(b.rot() + 180, lengthB * lenscales[i] / 2);
				//Lines.lineAngleCenter(b.x, b.y, b.rot(), 5 * lenscales[i]);
				Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rot(), lengthB * lenscales[i], CapStyle.none);
			}
		};
		Draw.reset();
	}
});
antimBullet.speed = 8;
antimBullet.damage = 8;
antimBullet.lifetime = 24;
antimBullet.splashDamageRadius = 20;
antimBullet.splashDamage = 8;
antimBullet.hitSize = 8;
antimBullet.bulletWidth = 7;
antimBullet.bulletHeight = 9;
antimBullet.bulletShrink = 0;
antimBullet.keepVelocity = true;

const antimSnake = extend(BasicBulletType, {
	update: function(b){
		Damage.collideLine(b, b.getTeam(), Fx.none, b.x, b.y, b.rot() + 180, 75.0 * b.fin());
	},
	
	draw: function(b){
		Draw.color(this.backColor);
		Draw.rect(this.backRegion, b.x, b.y, this.bulletWidth, this.bulletHeight, b.rot() - 90);
		Draw.color(this.frontColor);
		Draw.rect(this.frontRegion, b.x, b.y, this.bulletWidth, this.bulletHeight, b.rot() - 90);
		
		rnd1 = Mathf.randomSeedRange(b.id * 230, 90);
		
		Draw.color(antimGreen);
		lib.lineTentacleRenderer(b.x, b.y, b.rot() + 180, 2, 0.1, 10, 8 * b.fin(), 4, 2, 18, 2, 12, rnd1);
		Draw.color();
	}
});
antimSnake.lifetime = 47;
antimSnake.damage = 20;
antimSnake.speed = 5.3;
antimSnake.pierce = true;
antimSnake.bulletWidth = 11;
antimSnake.bulletHeight = 13;
antimSnake.bulletSprite = "missile";
antimSnake.backColor = Color.valueOf("ffffff");
antimSnake.frontColor = Color.valueOf("fffff1");

const antimFinalEffect = extend(BasicBulletType, {
	range: function(){
		return 130;
	},
	
	despawned: function(b){
		for(var i = 0; i < 12; i++){
			Bullet.create(this.frags[Mathf.round(Mathf.random(0, 3))], b, b.x, b.y, b.rot() + Mathf.range(32.0), Mathf.random(0.75, 1.25));
		}
	},
	
	draw: function(b){}
});
antimFinalEffect.speed = 0.001;
antimFinalEffect.damage = 300;
antimFinalEffect.frags = [pestilenceFly, antimSnake, antimBullet, antimLaser];
antimFinalEffect.lifetime = 1;
antimFinalEffect.minRotation = 16;
antimFinalEffect.widthOffset = 8;
antimFinalEffect.lengthOffset = 8;
antimFinalEffect.hitSize = 12;
antimFinalEffect.collidesTiles = false;
antimFinalEffect.collidesAir = false;
antimFinalEffect.collides = false;
antimFinalEffect.instantDisappear = true;
antimFinalEffect.keepVelocity = false;
antimFinalEffect.despawnEffect = Fx.none;
antimFinalEffect.shootEffect = antimLaserShoot;
antimFinalEffect.smokeEffect = Fx.none;

const antimWeapon = extendContent(Weapon, "antim-weapon", {
	load: function(){
		this.region = Core.atlas.find("[cyan]vanilla-upgraded-antim-weapon");
	}
});

antimWeapon.reload = 30;
antimWeapon.alternate = true;
antimWeapon.width = 0;
antimWeapon.length = 6;
antimWeapon.bullet = antimFinalEffect;
antimWeapon.shootSound = Sounds.laser;
antimWeapon.minPlayerDist = 45;

const anti = extendContent(Mech, "antim", {
	updateAlt: function(player){
		const minVb = 4.6;
		const vectA = new Vec2();
		const maxVb = 9.2;
		const sclb = Mathf.clamp((player.velocity().len() - minVb) / (maxVb - minVb));
		const pred = new Vec2();
		
		if(Mathf.chance(sclb)){
			pred.trns(player.velocity().angle(), 16);
			Effects.effect(shipTrail, Pal.surge, player.x + Mathf.range(4.7) + pred.x, player.y + Mathf.range(4.7) + pred.y, player.rotation);
			Effects.effect(antimLaserShoot, Pal.surge, player.x + Mathf.range(4.7) + pred.x, player.y + Mathf.range(4.7) + pred.y, player.rotation);
			if(Mathf.chance(0.25)){
				Bullet.create(antimLaser, player, player.getTeam(), player.x + vectA.x, player.y + vectA.y, player.velocity().angle(), sclb, 1);
				Lightning.create(player.getTeam(), antimGreen, 18 * Vars.state.rules.playerDamageMultiplier, player.x, player.y, player.rotation + Mathf.range(21.0), Mathf.floorPositive((player.velocity().len() * 2) + Mathf.random(2, 4)));
			}
		}
	},
	
	draw: function(player){
		const vectA = new Vec2();
		const shift = Mathf.clamp(player.velocity().len(), 0, 4);
		const minV = 3.6;
		const maxV = 7;

		const scl = Mathf.clamp((player.velocity().len() - minV) / (maxV - minV));
		
		Draw.color(antimGreen);
		Draw.alpha(scl / 2);
		Draw.blend(Blending.additive);
		Draw.rect(Core.atlas.find(this.name + "-shield"), player.x + Mathf.range(scl / 2.0), player.y + Mathf.range(scl / 2.0), player.rotation - 90);
		Draw.blend();
		Draw.color();
		Draw.rect(Core.atlas.find(this.name + "-cell"), player.x + Mathf.range(scl / 2.0), player.y + Mathf.range(scl / 2.0), player.rotation - 90);
		if(player.getTimer().get(5, 1)){
			vectA.trns(player.velocity().angle() - 90, 0, shift * 2);
			Effects.effect(shipLight, player.x + vectA.x + Mathf.range(1.0), player.y + vectA.y + Mathf.range(1.0), player.rotation);
		};
	}
});

anti.flying = true;
anti.health = 210;
anti.drag = 0.01;
anti.speed = 0.2;
anti.boostSpeed = 0.5;
anti.mass = 3;
anti.drillPower = 4;
anti.weapon = antimWeapon;
anti.engineColor = antimGreen;
anti.mineSpeed = 3.2;
anti.buildPower = 1.2;
anti.localizedName = "Antim";
anti.description = "Shoot an armour piercing laser. can also create lightning at high speeds.";

const antimPad = extendContent(MechPad, "antim-ship-pad", {});

antimPad.mech = anti;
antimPad.buildTime = 300;
