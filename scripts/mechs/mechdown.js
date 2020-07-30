const mechLaser = extend(BasicBulletType, {
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
			Effects.effect(Fx.hitMeltdown, Color.valueOf("ec7458aa"), hitx, hity);
			if(Mathf.chance(0.1)){
				Fire.create(Vars.world.tileWorld(hitx + Mathf.range(3.0), hity + Mathf.range(3.0)));
			}
		}
	},
	
	draw(b){
		const colors = [Color.valueOf("ec745855"), Color.valueOf("ec7458aa"), Color.valueOf("ff9c5a"), Color.white];
		const tscales = [1, 0.7, 0.5, 0.2];
		const strokes = [2, 1.5, 1, 0.3];
		const lenscales = [1, 1.12, 1.15, 1.17];
		const tmpColor = new Color();

		for(var s = 0; s < 4; s++){
			Draw.color(tmpColor.set(colors[s]).mul(1.0 + Mathf.absin(Time.time(), 1.0, 0.2)));
			for(var i = 0; i < 4; i++){
				Tmp.v1.trns(b.rot() + 180.0, (lenscales[i] - 1.1) * 35.0);
				Lines.stroke((9 + Mathf.absin(Time.time(), 1.4, 1.5)) * b.fslope() * strokes[s] * tscales[i]);
				Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rot(), this.lengthA * lenscales[i], CapStyle.none);
			}
		};
		Draw.reset();
	}
});
mechLaser.lengthA = 220;
mechLaser.speed = 0.001;
mechLaser.damage = 70;
mechLaser.lifetime = 16;
mechLaser.hitSize = 12;
mechLaser.keepVelocity = false;
mechLaser.pierce = true;
mechLaser.despawnEffect = Fx.none;
mechLaser.shootEffect = Fx.shootBigSmoke2;
mechLaser.smokeEffect = Fx.none;

const mechDownEquip = extendContent(Weapon, "mechdown-blaster", {
  load(){
    this.region = Core.atlas.find("vanilla-upgraded-mechdown-blaster");
  }
});
mechDownEquip.lenght = -7;
mechDownEquip.shootSound = Sounds.laserbig;
mechDownEquip.shotDelay = 0;
mechDownEquip.inaccuracy = 0;
mechDownEquip.spacing = 20;
mechDownEquip.velocityRnd = 0;
mechDownEquip.shootDuration = 14;
mechDownEquip.reload = 70;
mechDownEquip.shots = 1;
mechDownEquip.ejectEffect = Fx.none;
mechDownEquip.alternate = false;
mechDownEquip.bullet = mechLaser;

const mechDown = extendContent(Mech, "mechdown", {
	load(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
		this.legRegion = Core.atlas.find(this.name + "-leg");
		this.baseRegion = Core.atlas.find(this.name + "-base");
		this.cellRegion = Core.atlas.find(this.name + "-cell");
	},

	getPowerCellRegion(){
		return Core.atlas.find(this.name + "-cell");
	}
});
mechDown.weapon = mechDownEquip;
mechDown.speed = 0.35;
mechDown.boostSpeed = 0.35;
mechDown.itemCapacity = 100;
mechDown.mineSpeed = 2;
mechDown.drillPower = 2;
mechDown.mass = 15;
mechDown.buildPower = 2.2;
mechDown.engineColor = Color.valueOf("666495");
mechDown.flying = false;
mechDown.health = 1200;
mechDown.weaponOffsetX = 7;

const mechDownPad = extendContent(MechPad, "mechdown-pad", {});
mechDownPad.mech = mechDown;
