const cooldown = 30;

const regeneration = newEffect(20, e => {
	Draw.color(Pal.heal);
	Fill.square(e.x, e.y, 0.1 + e.fout() * 2.8, 45);
});

const renitLaser = extend(BasicBulletType, {
	range(){
		return 160.0;
	},
	
	update(b){	
		Effects.shake(1.2, 1.2, b.x, b.y);
		if(b.timer.get(1, 5)){
			Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), this.length, true);
		};
	},
	
	hit(b, hitx, hity){
		if(hitx != null && hity != null){
			Effects.effect(Fx.hitLancer, Color.valueOf("90ee90"), hitx, hity);
		}
	},
	
	draw(b){
		const colors = [Color.valueOf("006400"), Color.valueOf("90ee90"), Color.valueOf("ffffff")];
		const tscales = [1, 0.7, 0.5, 0.2];
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
renitLaser.length = 160;
renitLaser.speed = 0.001;
renitLaser.damage = 12;
renitLaser.lifetime = 16;
renitLaser.hitSize = 12;
renitLaser.keepVelocity = false;
renitLaser.pierce = true;
renitLaser.despawnEffect = Fx.none;
renitLaser.shootEffect = Fx.shootBigSmoke2;
renitLaser.smokeEffect = Fx.none;

const renitEquip = extendContent(Weapon, "renit-equip", {
  load(){
    this.region = Core.atlas.find("vanilla-upgraded-renit-equip");
  }
});
renitEquip.bullet = renitLaser;
renitEquip.alternate = true;
renitEquip.reload = 90;
renitEquip.width = 10;
renitEquip.shootSound = Sounds.laser;
renitEquip.recoil = 5.5;

const renitBase = prov(() => new JavaAdapter(GroundUnit, {
	onDeath(){
        Sounds.explosionbig.at(this);
        // maybe other effect
		this.super$onDeath();
	},

	update(){
		this.super$update();

		if(this.health < this.maxHealth()){
			if(Mathf.chance(0.5)){
				this.healBy(Time.delta() * 2.5);
				Effects.effect(regeneration, this.x, this.y);
			}	
		}
	}
}));   

const renit = extendContent(UnitType, "renit", {
	load(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
		this.baseRegion = Core.atlas.find(this.name + "-base");
		this.legRegion = Core.atlas.find(this.name + "-leg");
	}
});
renit.weapon = renitEquip;
renit.create(renitBase);
renit.health = 750;
renit.mass = 5;
renit.speed = 0.15;
renit.hitsize = 10;
renit.drag = 0.4;
renit.range = 90;
renit.shootCone = 10;
renit.maxVelocity = 0.78;
renit.baseRotateSpeed = 0.1;
renit.rotatespeed = 0.17;
renit.targetGround = true;
renit.targetAir = true;

const renitFac = extendContent(UnitFactory, "renit-fac", {});
renitFac.unitType = renit;