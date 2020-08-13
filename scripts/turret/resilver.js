const multi = require("rest/multilib");
const primeColor = multi.darkblue;
const lib = require("rest/funclib");
const elib = require("rest/effectlib");

const changeTeamEffect = newEffect(15, e => {
	Draw.color(primeColor, Color.blue, e.fin());
	Fill.square(e.x, e.y, e.rotation * Vars.tilesize / 2);
	
	Draw.blend(Blending.additive);
	Draw.color(primeColor, primeColor, e.fin());
	Lines.stroke(e.fout() * 4);
	Lines.square(e.x, e.y, (e.rotation * Vars.tilesize / 2) * e.fin());
	Draw.blend();
});

const corruptEffect = newEffect(18, e => {
	Draw.color(primeColor, Color.white, e.fin());
	
	Fill.square(e.x, e.y, 0.1 + e.fout() * 2.8, 45);
});

const corrupt = new StatusEffect("corrupt");
corrupt.speedMultiplier = 0.95;
corrupt.armorMultiplier = 0.333;
corrupt.damageMultiplier = 0.5;
corrupt.effect = corruptEffect;

const changeTeam = elib.newEffectWDraw(78, 512, e => {
	const type = e.data.getType();
	const base = e.data;
	const vec = new Vec2();
	
	Draw.blend(Blending.additive);
	Draw.alpha(e.fout());
	Draw.mixcol(primeColor, 1);
	Draw.rect(type.region, base.x, base.y, base.rotation - 90);
	
	Draw.reset();
	Draw.blend();
});

const convertDamage = newEffect(67, e => {
	Draw.blend(Blending.additive);
	Draw.color(primeColor, Color.blue, e.fin());
	Fill.square(e.x, e.y, (7 * Vars.tilesize / 2));
	
	Draw.reset();
	Draw.blend();
});

const resilverShootEffect = newEffect(10, e => {
	const vec1 = new Vec2();
	const vec2 = new Vec2();
	const vec3 = new Vec2();
	
	for(var i = 0; i < 7; i++){
		var rndRot = Mathf.randomSeedRange(e.id + i, 45);
		var rndRot2 = Mathf.randomSeedRange(e.id + 15 + i, 45);
		var rndRot3 = Mathf.randomSeedRange(e.id + 30 + i, 45);
		var rndRot4 = Mathf.randomSeedRange(e.id + 45 + i, 30);
		var rndRange = Mathf.randomSeed(e.id + 7 + i, 25, 50) / 50;
		var rndStroke = Mathf.randomSeed(e.id + 16 + i, 35, 50) / 50;
		
		vec1.trns(rndRot * e.fout() + (e.rotation + rndRot4), 15 * e.finpow() * rndRange);
		vec2.trns(rndRot2 * e.fout() + (e.rotation + rndRot4), 30 * e.finpow() * rndRange);
		vec3.trns(rndRot3 * e.fout() + (e.rotation + rndRot4), 45 * e.finpow() * rndRange);
	
		var posAx = e.x + vec1.x;
		var posAy = e.y + vec1.y;
	
		var posBx = e.x + vec2.x;
		var posBy = e.y + vec2.y;
	
		var posCx = e.x + vec3.x;
		var posCy = e.y + vec3.y;
	
		Draw.color(primeColor);
		Lines.stroke((e.fout() * 2) * rndStroke);
		Lines.curve(e.x, e.y, posAx, posAy, posBx, posBy, posCx, posCy, 16);
	}
});

const resilverBullet = extend(BasicBulletType, {
	update: function(b){
		Effects.shake(1.2, 1.2, b.x, b.y);
		if(b.timer.get(1, 17)){
			this.scanUnits(b);
			Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), 170.0, false);
		};
	},

	scanUnits: function(b){
		const vec = new Vec2();
		
		for(var i = 0; i < this.searchAccuracy; i++){
			vec.trns(b.rot(), (this.lengthB / this.searchAccuracy) * i);
			vec.add(b.x, b.y);
			
			var radius = (this.lengthB / this.searchAccuracy) * 2;
			
			Units.nearbyEnemies(b.getTeam(), vec.x - radius, vec.y - radius, radius * 2, radius * 2, cons(unit => {
				if(unit != null){
					if(Mathf.within(vec.x, vec.y, unit.x, unit.y, radius) && unit.getTeam() != b.getTeam() && unit instanceof BaseUnit && !unit.isDead()){
						if(unit.health() < Math.max(unit.maxHealth() * 0.05, 85)){
							var lastUnit = unit;
							unit.kill();
							var newUnit = lastUnit.getType().create(b.getTeam());
							newUnit.set(lastUnit.x, lastUnit.y);
							newUnit.rotation = lastUnit.rotation;
							newUnit.add();
							newUnit.health(lastUnit.health());
							newUnit.applyEffect(corrupt, Number.MAX_VALUE);
							newUnit.velocity().set(lastUnit.velocity());
							Effects.effect(changeTeam, newUnit.x, newUnit.y, newUnit.rotation, newUnit);
						}
					}
				}
			}));
		}
	},

	range: function(){
		return 190.0;
	},

	hit: function(b, hitx, hity){
		if(hitx != null && hity != null){
			Effects.effect(this.hitEffect, hitx, hity);
		}
	},

	draw: function(b){
		const colors = [primeColor.cpy().mul(1.0, 1.0, 1.0, 0.4), primeColor, Color.white];
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
resilverBullet.lengthB = 210;
resilverBullet.searchAccuracy = 64;
resilverBullet.speed = 0.001;
resilverBullet.damage = 40;
resilverBullet.hitEffect = Fx.hitFuse;
resilverBullet.despawnEffect = Fx.none;
resilverBullet.hitSize = 4;
resilverBullet.lifetime = 11;
resilverBullet.keepVelocity = false;
resilverBullet.pierce = true;
resilverBullet.shootEffect = Fx.none;
resilverBullet.smokeEffect = Fx.none;

const resilver = extendContent(PowerTurret, "resilver", {});
resilver.reload = 20;
resilver.range = 210;
resilver.shootType = resilverBullet;
resilver.shootEffect = resilverShootEffect;