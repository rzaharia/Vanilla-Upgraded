const exterminatorLaser = extend(BasicBulletType, {
	range(){
		return 220.0;
	},
	
	update(b){	
		Effects.shake(1.2, 1.2, b.x, b.y);
		if(b.timer.get(1, 5)){
			Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), this.lengthA * 1.1, true);
		};
	},
	
	hit(b, hitx, hity){
		if(hitx != null && hity != null){
			Effects.effect(Fx.hitMeltdown, Color.valueOf("FF4F4F"), hitx, hity);
			if(Mathf.chance(0.1)){
				Fire.create(Vars.world.tileWorld(hitx + Mathf.range(3.0), hity + Mathf.range(3.0)));
			}
		}
	},
	
	draw(b){
		const colors = [Color.valueOf("FF0000"), Color.valueOf("FF4F4F"), Color.valueOf("FFB2B2"), Color.white];
		const tscales = [1, 0.7, 0.5, 0.2];
		const strokes = [2, 1.5, 1, 0.3];
		const lenscales = [1, 1.12, 1.15, 1.17];
		const tmpColor = new Color();

		for(var s = 0; s < 4; s++){
			Draw.color(tmpColor.set(colors[s]).mul(1.0 + Mathf.absin(Time.time(), 1.0, 0.2)));
			for(var i = 0; i < 4; i++){
				Tmp.v1.trns(b.rot() + 180.0, (lenscales[i] - 1.1) * 35.0);
				Lines.stroke((1 + Mathf.absin(Time.time(), 1.4, 1.5)) * b.fslope() * strokes[s] * tscales[i]);
				Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rot(), this.lengthA * lenscales[i], CapStyle.none);
			}
		};
		Draw.reset();
	}
});
exterminatorLaser.lengthA = 140;
exterminatorLaser.speed = 0.001;
exterminatorLaser.damage = 70;
exterminatorLaser.lifetime = 16;
exterminatorLaser.hitSize = 12;
exterminatorLaser.keepVelocity = false;
exterminatorLaser.pierce = true;
exterminatorLaser.despawnEffect = Fx.none;
exterminatorLaser.shootEffect = Fx.shootBigSmoke2;
exterminatorLaser.smokeEffect = Fx.none;

const exterminatorEquip = extendContent(Weapon, "exterminator-gutling", {
  load(){
    this.region = Core.atlas.find("vanilla-upgraded-exterminator-equip");
  },

  shoot(b){
  	Tmp.v1.set(b.x, b.y).sub(b.getX(), b.getY());
  	const cx = Tmp.v1.x + b.getX(), cy = Tmp.v1.y + b.getY();
  	const vectA = new Vec2();
  	const vectU = new Vec2();
	const shift = Mathf.clamp(b.velocity().len(), 0, 2);
	if(this.i == 0){
		this.i++;
		this.reload = 50;
		this.shootSound2.at(b);
		Effects.effect(Fx.hitMeltdown, b.x, b.y);
	  	Calls.createBullet(this.bullet2, b.getTeam(), b.x, b.y, b.rotation, 3.4, 1);
	  	vectA.trns(b.rotation, 0, 4.5 - (shift * 2));
  		vectU.trns(b.rotation - 90, 0, 6.5 - (shift * 2));
	  	Effects.effect(Fx.smoke, cx + vectA.x + vectU.x + Mathf.range(4.0), cy + vectA.y + vectU.y + Mathf.range(4.0));
  		Effects.effect(Fx.smoke, cx - vectA.x + vectU.x - Mathf.range(4.0), cy - vectA.y + vectU.y - Mathf.range(4.0));
		Calls.createBullet(this.bullet, b.getTeam(), cx + vectA.x + vectU.x, cy + vectA.y + vectU.y, b.rotation, 1, 1);
		Calls.createBullet(this.bullet, b.getTeam(), cx - vectA.x + vectU.x, cy - vectA.y + vectU.y, b.rotation, 1, 1);
	}else if(this.i == 1){
		this.i++;
		this.reload = 45;
	  	this.shootSound.at(b);
  		vectA.trns(b.rotation, 0, 6.5 - (shift * 2));
	  	vectU.trns(b.rotation - 90, 0, 6.5 - (shift * 2));
  		Effects.effect(Fx.hitMeltdown, cx + vectA.x + vectU.x + Mathf.range(4.0), cy + vectA.y + vectU.y + Mathf.range(4.0));
	  	Effects.effect(Fx.hitMeltdown, cx - vectA.x + vectU.x - Mathf.range(4.0), cy - vectA.y + vectU.y - Mathf.range(4.0));
  		Calls.createBullet(this.bullet1, b.getTeam(), cx + vectA.x + vectU.x, cy + vectA.y + vectU.y, b.rotation, 1, 1);
	  	Calls.createBullet(this.bullet1, b.getTeam(), cx - vectA.x + vectU.x, cy - vectA.y + vectU.y, b.rotation, 1, 1);
	  	vectA.trns(b.rotation, 0, 4.5 - (shift * 2));
  		vectU.trns(b.rotation - 90, 0, 6.5 - (shift * 2));
	  	Effects.effect(Fx.smoke, cx + vectA.x + vectU.x + Mathf.range(4.0), cy + vectA.y + vectU.y + Mathf.range(4.0));
  		Effects.effect(Fx.smoke, cx - vectA.x + vectU.x - Mathf.range(4.0), cy - vectA.y + vectU.y - Mathf.range(4.0));
		Calls.createBullet(this.bullet, b.getTeam(), cx + vectA.x + vectU.x, cy + vectA.y + vectU.y, b.rotation, 1, 1);
		Calls.createBullet(this.bullet, b.getTeam(), cx - vectA.x + vectU.x, cy - vectA.y + vectU.y, b.rotation, 1, 1);
	}else{
		this.i = 0;
		this.reload = 70;
		this.shootSound1.at(b);
	  	vectA.trns(b.rotation, 0, 4.5 - (shift * 2));
  		vectU.trns(b.rotation - 90, 0, 6.5 - (shift * 2));
	  	Effects.effect(Fx.smoke, cx + vectA.x + vectU.x + Mathf.range(4.0), cy + vectA.y + vectU.y + Mathf.range(4.0));
  		Effects.effect(Fx.smoke, cx - vectA.x + vectU.x - Mathf.range(4.0), cy - vectA.y + vectU.y - Mathf.range(4.0));
		Calls.createBullet(this.bullet, b.getTeam(), cx + vectA.x + vectU.x, cy + vectA.y + vectU.y, b.rotation, 1, 1);
		Calls.createBullet(this.bullet, b.getTeam(), cx - vectA.x + vectU.x, cy - vectA.y + vectU.y, b.rotation, 1, 1);
	}
  }
});
exterminatorEquip.width = 0;
exterminatorEquip.shootSound = Sounds.laserbig;
exterminatorEquip.shootSound1 = Sounds.pew;
exterminatorEquip.shootSound2 = Sounds.bigshot;
exterminatorEquip.shotDelay = 0;
exterminatorEquip.inaccuracy = 0;
exterminatorEquip.spacing = 20;
exterminatorEquip.velocityRnd = 0;
exterminatorEquip.shootDuration = 14;
exterminatorEquip.reload = 70;
exterminatorEquip.shots = 1;
exterminatorEquip.ejectEffect = Fx.none;
exterminatorEquip.alternate = false;
exterminatorEquip.bullet = Bullets.standardMechSmall;
exterminatorEquip.bullet1 = exterminatorLaser;
exterminatorEquip.bullet2 = Bullets.artilleryUnit;

const exterminatorUnit = extendContent(UnitType, "exterminator", {});
exterminatorUnit.create(prov(() => new JavaAdapter(GroundUnit, {
	getPowerCellRegion(){
    	return Core.atlas.find("vanilla-upgraded-exterminator-cell");
  	},
})));
exterminator.weapon = exterminatorEquip;
exterminator.speed = 0.35 / 4;
exterminator.boostSpeed = 0.35;
exterminator.itemCapacity = 100;
exterminator.mineSpeed = 2;
exterminator.drillPower = 2;
exterminator.mass = 15;
exterminator.buildPower = 2.2;
exterminator.flying = false;
exterminator.health = 1200;

const exterminatorFac = extendContent(UnitFactory, "exterminator-factory", {});
exterminatorFac.unitType = exterminatorUnit;
