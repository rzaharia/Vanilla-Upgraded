const multi = require("rest/multilib");
const elib = require("rest/effectlib");
const primeColor = Color.blue;

const changeTeamEffect = newEffect(15, e => {
	Draw.color(primeColor, Color.white, e.fin());
	Fill.square(e.x, e.y, e.rotation * Vars.tilesize / 2);
	
	Draw.blend(Blending.additive);
	Draw.color(primeColor, Color.white, e.fin());
	Lines.stroke(e.fout() * 4);
	Lines.square(e.x, e.y, (e.rotation * Vars.tilesize / 2) * e.fin());
	Draw.blend();
});

const boostedEffect = newEffect(18, e => {
	Draw.color(Pal.accent, Color.white, e.fin());
	
	Fill.square(e.x, e.y, 0.1 + e.fout() * 2.8, 45);
});

const boosted = new StatusEffect("boosted");
boosted.speedMultiplier = 1.25;
boosted.armorMultiplier = 1.25;
boosted.damageMultiplier = 1.25;
boosted.effect = boostedEffect;

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

const reconstructorLaser = extend(BasicBulletType, {
	update(b){
		Effects.shake(1.2, 1.2, b.x, b.y);
		if(b.timer.get(1, 5)){
			this.scanUnits(b);
			Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), this.length, true);
		};
	},

	scanUnits(b){
		const vec = new Vec2();
		
		for(var i = 0; i < this.searchAccuracy; i++){
			vec.trns(b.rot(), (this.length / this.searchAccuracy) * i);
			vec.add(b.x, b.y);
			
			var radius = (this.length / this.searchAccuracy) * 2;
			
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
							newUnit.applyEffect(boosted, Number.MAX_VALUE);
							newUnit.velocity().set(lastUnit.velocity());

							Effects.effect(changeTeam, newUnit.x, newUnit.y, newUnit.rotation, newUnit);
							b.getOwner().damage(Math.min((newUnit.maxHealth() * 0.5), (b.getOwner().maxHealth() - 1)));
						}
					}
				}
			}));
		}
	},
	
	hit(b, hitx, hity){
		if(hitx != null && hity != null){
			Effects.effect(this.hitEffect, hitx, hity);
		}
	},
	
	draw(b){
		const colors = [multi.darkblue, primeColor, primeColor, Color.white];
		const tscales = [0.7, 0.4, 0.2, 0];
		const strokes = [2, 1.5, 1, 0.3];
		const lenscales = [1, 1.12, 1.15, 1.17];
		const tmpColor = new Color();

		for(var s = 0; s < 4; s++){
			Draw.color(tmpColor.set(colors[s]).mul(1.0 + Mathf.absin(Time.time(), 1.2, 0.4)));
			for(var i = 0; i < 4; i++){
				Tmp.v1.trns(b.rot() + 180.0, (lenscales[i] - 0.9) * 55.0);
				Lines.stroke((9 + Mathf.absin(Time.time(), 1.7, 3.1)) * b.fout() * strokes[s] * tscales[i]);
				Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rot(), this.length * b.fout() * lenscales[i], CapStyle.none);
				Tmp.v1.trns(b.rot() + 180.0, (lenscales[i] - 120) * 55.0);
				Lines.stroke((2 + Mathf.absin(Time.time(), 1.7, 3.1)) * b.fout() * strokes[s] * tscales[i]);
				Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rot(), this.length * b.fout() * lenscales[i], CapStyle.none);
			}
		};
	}
});
reconstructorLaser.searchAccuracy = 64;
reconstructorLaser.length = 260;
reconstructorLaser.speed = 0.001;
reconstructorLaser.damage = 60;
reconstructorLaser.lifetime = 18;
reconstructorLaser.hitEffect = Fx.none;
reconstructorLaser.despawnEffect = Fx.none;
reconstructorLaser.hitSize = 7;
reconstructorLaser.pierce = true;
reconstructorLaser.shootEffect = Fx.shootBigSmoke2;
reconstructorLaser.smokeEffect = Fx.none;

const reconstructor = extendContent(LaserTurret, "reconstructor", {
	load(){
		this.super$load();
		
		this.region = Core.atlas.find(this.name);
		this.baseRegion = Core.atlas.find("vanilla-upgraded-block-5");
	},
	
	generateIcons(){
	return [
		Core.atlas.find("vanilla-upgraded-block-5"),
		Core.atlas.find(this.name)
	];}
});
reconstructor.shootType = reconstructorLaser;
reconstructor.update = true;
reconstructor.range = 260;
reconstructor.recoil = 3;
reconstructor.extraVelocity = 0.5;
reconstructor.shotsB = 2;
reconstructor.lengthN = 10;
