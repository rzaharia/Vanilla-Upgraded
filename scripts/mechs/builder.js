const builderTrail = newEffect(13, e => {
	Draw.color(Color.valueOf("ffffff"), Color.valueOf("000000"), e.fin());
	Fill.circle(e.x, e.y, 1.5 * e.fout());
});

const bigbuilderTrail = newEffect(13, e => {
	Draw.color(Color.valueOf("ffffff"), Color.valueOf("000000"), e.fin());
	Fill.circle(e.x, e.y, 3 * e.fout());
});

const builderLaser = extend(BasicBulletType, {
	range(){
		return 220.0;
	},
	
	update(b){	
		Effects.shake(1.2, 1.2, b.x, b.y);
		if(b.timer.get(1, 5)){
			Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), this.lengthA * 1.1, true);
		};
	},
	
	draw(b){
		const colors = [Color.valueOf("0000000"), Color.valueOf("474747"), Color.valueOf("9E9E9E"), Color.white];
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
builderLaser.lengthA = 70;
builderLaser.speed = 0.001;
builderLaser.damage = 10;
builderLaser.lifetime = 16;
builderLaser.hitSize = 12;
builderLaser.keepVelocity = false;
builderLaser.pierce = true;

const builderWeapon = extendContent(Weapon, "builder-blaster", {});
builderWeapon.lenght = -3;
builderWeapon.shootSound = Sounds.laser;
builderWeapon.shotDelay = 0;
builderWeapon.inaccuracy = 0;
builderWeapon.spacing = 20;
builderWeapon.velocityRnd = 0;
builderWeapon.shootDuration = 14;
builderWeapon.reload = 12;
builderWeapon.shots = 1;
builderWeapon.ejectEffect = Fx.none;
builderWeapon.alternate = false;
builderWeapon.bullet = builderLaser;

const builder = extendContent(Mech, "builder", {
	load(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
	},

	updateAlt(player){
		const minVb = 4.6;
		const vectA = new Vec2();
		const maxVb = 9.2;
		const sclb = Mathf.clamp((player.velocity().len() - minVb) / (maxVb - minVb));
		const shift = Mathf.clamp(player.velocity().len(), 0, 2);
		const size = (this.engineSize * 1.5);
		vectA.trns(player.rotation + 90, 0, this.engineOffset - (shift * 2));

		if(Mathf.chance(sclb)){
			if(Mathf.chance(0.5)){
				Effects.effect(builderTrail, player.x + vectA.x + Mathf.range(4.0), player.y + vectA.y + Mathf.range(4.0), (size + Mathf.absin(Time.time(), 2, size / 4)) / 2);
			}
		};

		Effects.effect(bigbuilderTrail, player.x + vectA.x, player.y + vectA.y, (size + Mathf.absin(Time.time(), 2, size / 4)) / 2);
	},

	draw(player){
		const health = player.healthf();

		Draw.color(Color.black, Color.white, health + Mathf.absin(Time.time(), health * 5, 1 - health));
		Draw.rect(Core.atlas.find(this.name + "-cell"), player.x, player.y, player.rotation - 90);
		Draw.color();
	}
});
builder.drawCell = false;
builder.weapon = builderWeapon;
builder.speed = 0.07;
builder.drag = 0.02;
builder.itemCapacity = 100;
builder.mineSpeed = 6;
builder.drillPower = 2;
builder.mass = 15;
builder.buildPower = 6.6;
builder.engineColor = Color.valueOf("000000");
builder.flying = true;
builder.health = 200;
builder.weaponOffsetX = 3;

const builderPad = extendContent(MechPad, "builder-ship-pad", {});
builderPad.mech = builder;
