const cansonChargeBegin = newEffect(60, e => {
	Draw.color(Color.valueOf("a9d8ff"));
	Fill.circle(e.x, e.y, e.fin() * 5);

	Draw.color(Color.valueOf("ffffff"));
	Fill.circle(e.x, e.y, e.fin() * 4);
});

const cansonLaserShootSmoke = newEffect(26, e => {
	Draw.color(Pal.lancerLaser);
	
	const hl = new Floatc2({get: function(x, y){
		Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fout() * 9.5);
	}});
	
	Angles.randLenVectors(e.id, 9, 95.0, e.rotation, 0.0, hl);
});

/*const excalCharge = newEffect(28, e => {
	Draw.color(Color.valueOf("a9d8ff"));

	Angles.randLenVectors(e.id, 2, 1 + 20 * e.fout(), e.rotation, 180, (x, y) => {
		Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 3 + 1);
	});
});*/

const cansonShoot = newEffect(19, e => {
	Draw.color(Color.valueOf("a9d8ff"));

	/*for(var i = 1; i < 5; i++){
		Drawf.tri(e.x, e.y, 9 * e.fout(), 36 + e.fin() * 6, e.rotation + 90 * i);
	};*/
	
	for(var i = 0; i < 2; i++){
		Drawf.tri(e.x, e.y, 9 * e.fout(), 36 + e.fin() * 6, e.rotation + 90 + (180 * i));
	};

	Draw.color(Color.valueOf("a9d8ff"));
	Fill.circle(e.x, e.y, e.fout() * 9);

	Draw.color(Color.valueOf("ffffff"));
	Fill.circle(e.x, e.y, e.fout() * 7.5);
});

const cansonLaser = extend(BasicBulletType, {
	update: function(b){
		Effects.shake(1.2, 1.2, b.x, b.y);
		if(b.timer.get(1, 5)){
			Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), this.lengthB * 1.15, true);
		};
	},
	
	hit: function(b, hitx, hity){
		if(hitx != null && hity != null){
			Effects.effect(this.hitEffect, hitx, hity);
		}
	},
	
	draw: function(b, tile){
		
		const colors = [Color.valueOf("59a7ff55"), Color.valueOf("59a7ffaa"), Color.valueOf("a3e3ff"), Color.valueOf("ffffff")];
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

cansonLaser.shotWidth = 11;
cansonLaser.searchAccuracy = 64;
cansonLaser.lengthB = 310;
cansonLaser.speed = 0.001;
cansonLaser.damage = 60;
cansonLaser.lifetime = 18;
cansonLaser.hitEffect = Fx.hitLancer;
cansonLaser.despawnEffect = cansonChargeBegin;
cansonLaser.hitSize = 7;
cansonLaser.drawSize = 720;
cansonLaser.pierce = true;
cansonLaser.shootEffect = cansonShoot;
cansonLaser.smokeEffect = cansonLaserShootSmoke;

const canson = extendContent(LaserTurret, "canson", {
  load(){
		this.super$load();
		
		this.region = Core.atlas.find(this.name);
		this.baseRegion = Core.atlas.find("vanilla-upgraded-block-6");
	},
	
	generateIcons: function(){
	return [
		Core.atlas.find("vanilla-upgraded-block-6"),
		Core.atlas.find(this.name)
	];}
});

canson.extraVelocity = 0.5;
canson.recoil = 3.7;
canson.shotsB = 2;
canson.lengthN = 10
canson.shootType = cansonLaser;
canson.update = true;