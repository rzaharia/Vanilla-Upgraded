const multi = require("rest/multilib");
const primeColor = multi.darkblue;
const lib = require("rest/funclib");
const elib = require("rest/effectlib");

const corruptEffect = newEffect(18, e => {
	Draw.color(primeColor, Color.white, e.fin());
	
	Fill.square(e.x, e.y, 0.1 + e.fout() * 2.8, 45);
});

const corrupt = new StatusEffect("librarianCorrupt");
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

const summonEffect = newEffect(11, e => {
	Draw.color(Pal.accent);
	Lines.stroke((e.fout() * 2) + 0.5);
	Lines.poly(e.x, e.y, 4, e.fin() * 17, 0);
	Draw.reset();
});

const librarianLaser = extend(BasicBulletType, {
	update(b){
		Effects.shake(1.2, 1.2, b.x, b.y);
		if(b.timer.get(1, 17)){
			Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), 160.0, true);
		};
	},

	range(){
		return 160.0;
	},

	hit(b, hitx, hity){
		if(hitx != null && hity != null){
			Effects.effect(this.hitEffect, hitx, hity);
		}
	},

	draw(b){
		const colors = [primeColor.cpy().mul(1.0, 1.0, 1.0, 0.4), primeColor, Color.white];
		const tscales = [1.6, 1.3, 1.1, 0.8];
		const lenscales = [1, 1.1, 1.13, 1.14];
		const length = 160.0;
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
librarianLaser.lengthB = 160;
librarianLaser.searchAccuracy = 64;
librarianLaser.speed = 0.001;
librarianLaser.damage = 50;
librarianLaser.hitEffect = Fx.hitFuse;
librarianLaser.despawnEffect = Fx.none;
librarianLaser.hitSize = 4;
librarianLaser.lifetime = 11;
librarianLaser.keepVelocity = false;
librarianLaser.pierce = true;
librarianLaser.shootEffect = Fx.none;
librarianLaser.smokeEffect = Fx.none;

const librarianEquip = extendContent(Weapon, "librarian-equip", {
	load(){
		this.region = Core.atlas.find("vanilla-upgraded-librarian-equip");
	},

	shoot(p, x, y, angle, left){
		this.super$shoot(p, x, y, angle, left);
		const vec = new Vec2();
		
		if(Mathf.chance(0.25)){
			if(Mathf.chance(0.5)){
				if(p != null){
					var newUnit = Vars.content.getByName(ContentType.unit, "vanilla-upgraded-reader").create(p.getTeam());
				
					newUnit.rotation = angle;
					newUnit.set(p.getX() + x, p.getY() + y);
					newUnit.add();
					vec.trns(angle, 2);
					newUnit.velocity().set(vec);
					Effects.effect(summonEffect, p.getX() + x, p.getY() + y);
					Sounds.missile.at(p.getX() + x, p.getY() + y, Mathf.random(0.8, 1.0));
				}
			}
		}
	}
});
librarianEquip.bullet = librarianLaser;
librarianEquip.alternate = true;
librarianEquip.reload = 160;
librarianEquip.lenght = 120;
librarianEquip.width = 10;
librarianEquip.shootSound = Sounds.laser;
librarianEquip.recoil = 4;

const librarianBase =  prov(() => new JavaAdapter(FlyingUnit, {
	onDeath() {
		Sounds.explosionbig.at(this);
		Effects.effect(Fx.dynamicExplosion, this.x, this.y);
		for (var i = 0; i < 2; i++) {
			var reader = Vars.content.getByName(ContentType.unit, "vanilla-upgraded-reader").create(this.getTeam());
	   		reader.set(this.getX() + Mathf.range(20.0), this.getY() + Mathf.range(20.0));
	   		reader.add()
		};
		this.super$onDeath();
	}
}));

const librarian = extendContent(UnitType, "librarian", {
	load(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
	}
});
librarian.weapon = librarianEquip;
librarian.create(librarianBase);
librarian.flying = true;
librarian.health = 980;
librarian.mass = 3;
librarian.speed = 0.8;
librarian.hitsize = 15;
librarian.drag = 0.4;
librarian.range = 24;
librarian.maxVelocity = 1;
librarian.shootCone = 20;
librarian.targetAir = true;
librarian.targetGround = true;
librarian.engineOffset = 4;

const librarianFac = extendContent(UnitFactory, "librarian-fac", {});
librarianFac.unitType = librarian;