const multi = require("rest/multilib");
const primeColor = multi.darkblue;

const shootEffect = newEffect(10, e => {
	const vec1 = new Vec2();
	const vec2 = new Vec2();
	const vec3 = new Vec2();
	
	for (var i = 0; i < 7; i++) {
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

const hitTileEffect = newEffect(15, e => {
	Draw.color(primeColor, Color.blue, e.fin());
	Fill.square(e.x, e.y, e.rotation * Vars.tilesize / 2);
	
	Draw.blend(Blending.additive);
	Draw.color(primeColor, primeColor, e.fin());
	Lines.stroke(e.fout() * 4);
	Lines.square(e.x, e.y, (e.rotation * Vars.tilesize / 2) * e.fin());
	Draw.blend();
});

const readerBullet = extend(BasicBulletType, {
	hitTile(b, tile){
		this.hit(b);
		if(Mathf.chance(0.15)){
			Effects.effect(hitTileEffect, tile.drawx(), tile.drawy(), tile.block().size);
		}	
	},
	
	draw: function(b){
		const lengthB = 8;
		const colors = [Color.blue, Color.valueOf("7F7F7F"), primeColor];
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
readerBullet.speed = 8;
readerBullet.damage = 2;
readerBullet.lifetime = 24;
readerBullet.splashDamageRadius = 20;
readerBullet.splashDamage = 8;
readerBullet.hitSize = 8;
readerBullet.bulletWidth = 7;
readerBullet.bulletHeight = 9;
readerBullet.bulletShrink = 0;
readerBullet.keepVelocity = true;
readerBullet.shootEffect = shootEffect;

const readerEquip = extendContent(Weapon, "readerEquip", {});
readerEquip.bullet = readerBullet;
readerEquip.alternate = true;
readerEquip.reload = 20;
readerEquip.lenght = 0;
readerEquip.width = 5;
readerEquip.shootSound = Sounds.shoot;
readerEquip.recoil = 0.5;

const readerBase =  prov(() => new JavaAdapter(FlyingUnit, {}));

const reader = extendContent(UnitType, "reader", {});
reader.weapon = readerEquip;
reader.create(readerBase);
reader.flying = true;
reader.health = 160;
reader.mass = 1;
reader.speed = 1.4;
reader.hitsize = 4;
reader.drag = 0.4;
reader.range = 24;
reader.maxVelocity = 1.7;
reader.shootCone = 20;
reader.targetAir = true;
reader.targetGround = true;

const readerFac = extendContent(UnitFactory, "reader-fac", {});
readerFac.unitType = reader;