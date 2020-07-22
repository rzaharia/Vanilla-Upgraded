const primeColor = Color.valueOf("000000");
const lib = require("funclib");
const elib = require("effectlib");

const shipLight = newEffect(24, e => {
	const lightRegion = Core.atlas.find("vanilla-upgraded-envahisseur-lights");
	
	if(!Core.settings.getBool("bloom")){
		Draw.blend(Blending.additive);
		Draw.color(Color.valueOf("FFD9C4"), Color.valueOf("36080230"), e.fin());
		Draw.rect(lightRegion, e.x, e.y, e.rotation - 90);
		Draw.blend();
	}else{
		Draw.mixcol(Color.valueOf("000000"), 1);
		Draw.alpha(e.fout());
		Draw.rect(lightRegion, e.x, e.y, e.rotation - 90);
	}
});

const changeTeamEffect = newEffect(15, e => {
	Draw.color(primeColor, Color.valueOf("ffffff"), e.fin());
	Fill.square(e.x, e.y, e.rotation * Vars.tilesize / 2);
	
	Draw.blend(Blending.additive);
	Draw.color(primeColor, Color.valueOf("000000"), e.fin());
	Lines.stroke(e.fout() * 4);
	Lines.square(e.x, e.y, (e.rotation * Vars.tilesize / 2) * e.fin());
	Draw.blend();
});

const corruptEffect = newEffect(18, e => {
	Draw.color(Color.valueOf("000000"), Color.white, e.fin());
	
	Fill.square(e.x, e.y, 0.1 + e.fout() * 2.8, 45);
});

const corrupted = new StatusEffect("corrupted");
corrupted.speedMultiplier = 0.95;
corrupted.armorMultiplier = 0.333;
corrupted.damageMultiplier = 0.5;
corrupted.effect = corruptEffect;

const changeTeam = elib.newEffectWDraw(78, 512, e => {
	const type = e.data.getType();
	const base = e.data;
	const vec = new Vec2();
	
	Draw.blend(Blending.additive);
	Draw.alpha(e.fout());
	Draw.mixcol(Color.valueOf("000000"), 1);
	Draw.rect(type.region, base.x, base.y, base.rotation - 90);
	
	Draw.reset();
	Draw.blend();
});

const convertDamage = newEffect(67, e => {
	Draw.blend(Blending.additive);
	Draw.color(Color.valueOf("000000"), Color.valueOf("ffffff"), e.fin());
	Fill.square(e.x, e.y, (7 * Vars.tilesize / 2));
	
	Draw.reset();
	Draw.blend();
});

const shipTrail = newEffect(39, e => {
	Draw.blend(Blending.additive);
	Draw.color(Color.valueOf("000000"), Color.valueOf("ffffff"), e.fin());
	Fill.circle(e.x, e.y, ((2 * e.fout()) * e.rotation) / 1.7);
	Draw.blend();
});

const envahisseurShootEffect = newEffect(10, e => {
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

const envahisseurBullet = extend(BasicBulletType, {
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
							newUnit.applyEffect(corrupted, Number.MAX_VALUE);
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
envahisseurBullet.lengthB = 210;
envahisseurBullet.searchAccuracy = 64;
envahisseurBullet.speed = 0.001;
envahisseurBullet.damage = 40;
envahisseurBullet.hitEffect = Fx.hitFuse;
envahisseurBullet.despawnEffect = Fx.none;
envahisseurBullet.hitSize = 4;
envahisseurBullet.lifetime = 11;
envahisseurBullet.keepVelocity = false;
envahisseurBullet.pierce = true;
envahisseurBullet.shootEffect = Fx.none;
envahisseurBullet.smokeEffect = Fx.none;

const unitEnvahisseurBullet = extend(BasicBulletType, {
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
							newUnit.applyEffect(corrupted, Number.MAX_VALUE);
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
unitEnvahisseurBullet.lengthB = 210;
unitEnvahisseurBullet.searchAccuracy = 64;
unitEnvahisseurBullet.speed = 0.001;
unitEnvahisseurBullet.damage = 40;
unitEnvahisseurBullet.hitEffect = Fx.hitFuse;
unitEnvahisseurBullet.despawnEffect = Fx.none;
unitEnvahisseurBullet.hitSize = 4;
unitEnvahisseurBullet.lifetime = 11;
unitEnvahisseurBullet.keepVelocity = false;
unitEnvahisseurBullet.pierce = true;
unitEnvahisseurBullet.shootEffect = Fx.none;
unitEnvahisseurBullet.smokeEffect = Fx.none;

const envahisseurBullett = extend(BasicBulletType, {
	hitTile: function(b, tile){
		this.hit(b);
		if(tile.entity != null){
			if(tile.entity.health() < tile.entity.maxHealth() * 0.5){
				tile.setTeam(b.getTeam());
				if(tile.block() != null){
					Effects.effect(changeTeamEffect, tile.drawx(), tile.drawy(), tile.block().size);
				}
			};
		}
	},
	
	draw: function(b){	
		const lengthB = 8;
		const colors = [Color.valueOf("ffffff"), Color.valueOf("7F7F7F"), Color.valueOf("000000")];
		const tscales = [1, 0.8, 0.6];
		const strokes = [1.13, 0.6, 0.28];
		const lenscales = [1.0, 1.61, 1.97];
		const tmpColor = new Color();

		for(var s = 0; s < 3; s++){
			Draw.color(tmpColor.set(colors[s]).mul(1.0 + Mathf.absin(Time.time(), 1.5, 0.1)));
			for(var i = 0; i < 3; i++){
				Lines.stroke((3 + Mathf.absin(Time.time(), 3.2, 1)) * strokes[s] * tscales[i]);
				Tmp.v1.trns(b.rot() + 180, lengthB * lenscales[i] / 2);
				Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rot(), lengthB * lenscales[i], CapStyle.none);
			}
		};
		Draw.reset();
	}
});
envahisseurBullett.speed = 8;
envahisseurBullett.damage = 2;
envahisseurBullett.lifetime = 24;
envahisseurBullett.splashDamageRadius = 20;
envahisseurBullett.splashDamage = 8;
envahisseurBullett.hitSize = 8;
envahisseurBullett.bulletWidth = 7;
envahisseurBullett.bulletHeight = 9;
envahisseurBullett.bulletShrink = 0;
envahisseurBullett.keepVelocity = true;

const unitEnvahisseurBullett = extend(BasicBulletType, {
	hitTile: function(b, tile){
		this.hit(b);
		if(tile.entity != null){
			if(tile.entity.health() < tile.entity.maxHealth() * 0.1){
				tile.setTeam(b.getTeam());
				if(tile.block() != null){
					Effects.effect(changeTeamEffect, tile.drawx(), tile.drawy(), tile.block().size);
				}
			};
		}
	},
	
	draw: function(b){
		const lengthB = 8;
		const colors = [Color.valueOf("ffffff"), Color.valueOf("7F7F7F"), Color.valueOf("000000")];
		const tscales = [1, 0.8, 0.6];
		const strokes = [1.13, 0.6, 0.28];
		const lenscales = [1.0, 1.61, 1.97];
		const tmpColor = new Color();

		for(var s = 0; s < 3; s++){
			Draw.color(tmpColor.set(colors[s]).mul(1.0 + Mathf.absin(Time.time(), 1.5, 0.1)));
			for(var i = 0; i < 3; i++){
				Lines.stroke((3 + Mathf.absin(Time.time(), 3.2, 1)) * strokes[s] * tscales[i]);
				Tmp.v1.trns(b.rot() + 180, lengthB * lenscales[i] / 2);
				Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rot(), lengthB * lenscales[i], CapStyle.none);
			}
		};
		Draw.reset();
	}
});
unitEnvahisseurBullett.speed = 8;
unitEnvahisseurBullett.damage = 2;
unitEnvahisseurBullett.lifetime = 24;
unitEnvahisseurBullett.splashDamageRadius = 20;
unitEnvahisseurBullett.splashDamage = 8;
unitEnvahisseurBullett.hitSize = 8;
unitEnvahisseurBullett.bulletWidth = 7;
unitEnvahisseurBullett.bulletHeight = 9;
unitEnvahisseurBullett.bulletShrink = 0;
unitEnvahisseurBullett.keepVelocity = true;

const envahisseurFinalEffect = extend(BasicBulletType, {
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
envahisseurFinalEffect.speed = 0.001;
envahisseurFinalEffect.damage = 0;
envahisseurFinalEffect.frags = [envahisseurBullet, unitEnvahisseurBullet, envahisseurBullett, unitEnvahisseurBullett];
envahisseurFinalEffect.lifetime = 8;
envahisseurFinalEffect.minRotation = 16;
envahisseurFinalEffect.widthOffset = 8;
envahisseurFinalEffect.lengthOffset = 8;
envahisseurFinalEffect.hitSize = 12;
envahisseurFinalEffect.collidesTiles = false;
envahisseurFinalEffect.collidesAir = false;
envahisseurFinalEffect.collides = false;
envahisseurFinalEffect.instantDisappear = true;
envahisseurFinalEffect.keepVelocity = false;
envahisseurFinalEffect.despawnEffect = Fx.none;
envahisseurFinalEffect.shootEffect = envahisseurShootEffect;
envahisseurFinalEffect.smokeEffect = Fx.none;

const envahisseurWeapon = extendContent(Weapon, "envahisseur", {});

envahisseurWeapon.reload = 15;
envahisseurWeapon.alternate = true;
envahisseurWeapon.length = 9;
envahisseurWeapon.width = 8.5;
envahisseurWeapon.recoil = 1.4;
envahisseurWeapon.bullet = envahisseurFinalEffect;
envahisseurWeapon.shootSound = Sounds.missile;
envahisseurWeapon.minPlayerDist = 35;

const envahisseur = extendContent(Mech, "envahisseur", {
	
	load: function(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
		this.legRegion = Core.atlas.find(this.name + "-leg");
		this.baseRegion = Core.atlas.find(this.name + "-base");
		this.lightRegion = Core.atlas.find(this.name + "-lights");
	},
	
	updateAlt: function(player){
		const vectA = new Vec2();
		const shift = Mathf.clamp(player.velocity().len(), 0, 2);
		
		for(var i = 0; i < 2; i++){
			const size = (this.engineSize * 1.5);
			var sn = Mathf.signs[i];
			vectA.trns(player.rotation - 90, 9.5 * sn, -3.75 + (shift * 2));
			Effects.effect(shipTrail, player.x + vectA.x, player.y + vectA.y, (size + Mathf.absin(Time.time(), 2, size / 4)) / 2);
		};
		vectA.trns(player.rotation + 90, 0, this.engineOffset - (shift * 2));
		Effects.effect(shipTrail, player.x + vectA.x, player.y + vectA.y, (size + Mathf.absin(Time.time(), 2, size / 4)) / 2);
	},
	
	draw: function(player){
		const vectA = new Vec2();
		const health = player.healthf();
		for(var i = 0; i < 2; i++){
			const size = (this.engineSize * 1.5);
			const sizeB = (size + Mathf.absin(Time.time(), 2, size / 4)) / 2;
			const shift = Mathf.clamp(player.velocity().len(), 0, 2);
			var sn = Mathf.signs[i];
			vectA.trns(player.rotation - 90, 9.5 * sn, -3.75);
			
			Draw.color(primeColor);
			Fill.circle(player.x + vectA.x, player.y + vectA.y, sizeB);
	
			vectA.trns(player.rotation - 90, 9.5 * sn, -3.75 + (shift / 1.5));
			Draw.color(Color.valueOf("ffffff"));
			Fill.circle(player.x + vectA.x, player.y + vectA.y, sizeB / 1.7);
		};
		
		Draw.color(Color.black, Color.white, health + Mathf.absin(Time.time(), health * 5.0, 1.0 - health));
		Draw.color();
		if(player.getTimer().get(5, 1)){
			vectA.trns(player.velocity().angle() - 90, 0, shift * 2);
			Effects.effect(shipLight, player.x + vectA.x + Mathf.range(1.0), player.y + vectA.y + Mathf.range(1.0), player.rotation);
		};
	}
});

envahisseur.flying = true;
envahisseur.health = 470;
envahisseur.drag = 0.06;
envahisseur.speed = 0.50;
envahisseur.boostSpeed = 0.7;
envahisseur.mass = 5;
envahisseur.drillPower = 4;
envahisseur.shake = 4.5;
envahisseur.hitsize = 23;
envahisseur.weapon = envahisseurWeapon;
envahisseur.weaponOffsetX = 8.5;
envahisseur.weaponOffsetY = 6;
envahisseur.engineColor = primeColor;
envahisseur.engineOffset = 9;
envahisseur.engineSize = 5;
envahisseur.mineSpeed = 1.7;
envahisseur.buildPower = 1.6;
envahisseur.itemCapacity = 80;

const envahisseurPad = extendContent(MechPad, "envahisseur-mech-pad", {});

envahisseurPad.mech = envahisseur;
envahisseurPad.buildTime = 700;
