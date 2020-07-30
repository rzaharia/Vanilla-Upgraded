const trailEffect = newEffect(18, e => {
	Draw.color(e.color);
	Fill.circle(e.x, e.y, 12 * e.fout());
});

const glareLaser = extend(BasicBulletType, {
	range(){
		return 450.0;
	},
	
	update(b){
		Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), 450.0, true);
	},
	
	
	draw(b){
		const colors = [b.getTeam().color.cpy().mul(1.0, 1.0, 1.0, 0.4), b.getTeam().color, Color.white];
		const tscales = [1.0, 0.7, 0.5, 0.2];
		const lenscales = [1, 1.1, 1.13, 1.14];
		const length = 450.0;
		const f = Mathf.curve(b.fin(), 0.0, 0.2);
		const baseLen = length * f;

		for(var s = 0; s < 3; s++){
			Draw.color(colors[s]);
			for(var i = 0; i < 4; i++){
				Lines.stroke(75 * b.fout() * (s == 0 ? 1.5 : s == 1 ? 1 : 0.3) * tscales[i]);
				Lines.lineAngle(b.x, b.y, b.rot(), baseLen * lenscales[i]);
			}
		};
		Draw.reset();
	}
});
glareLaser.speed = 0.001;
glareLaser.damage = 1000;
glareLaser.hitEffect = Fx.hitFuse;
glareLaser.despawnEffect = Fx.none;
glareLaser.hitSize = 75;
glareLaser.lifetime = 11;
glareLaser.keepVelocity = false;
glareLaser.pierce = true;
glareLaser.shootEffect = Fx.none;
glareLaser.smokeEffect = Fx.none;

const none = extend(BasicBulletType, {
	range(){
	  return 450.0;
	},
	
	update(b){},
	
	
	draw(b){}
});
none.speed = 0.001;
none.damage = 50;
none.hitEffect = Fx.hitFuse;
none.despawnEffect = Fx.none;
none.hitSize = 4;
none.lifetime = 11;
none.keepVelocity = false;
none.pierce = true;
none.shootEffect = Fx.none;
none.smokeEffect = Fx.none;

const g = 1;

const glareWeapon = extendContent(Weapon, "glare-weapon", {
	shoot(player){
		const vectA = new Vec2();
		const shift = Mathf.clamp(player.velocity().len(), 0, 2);
		vectA.trns(player.rotation + 90, 0, this.lightning - (shift * 2));
		if (this.g < 50) {
			vectA.trns(player.rotation + 90, 0, this.shake - (shift * 2));
			player.x += vectA.x;
			player.y += vectA.y;
			this.g++;
			Sounds.spark.at(player);
			for (var r = 1; r < (this.g * 2); r++) {
				vectA.trns(player.rotation + 90, 0, this.lightning - (shift * 2));
				Lightning.create(player.getTeam(), player.getTeam().color, 10, player.x - vectA.x, player.y - vectA.y, 0 + Mathf.random() * 360, 4 + Mathf.random() * 8);
			}
		}else {
			vectA.trns(player.rotation + 90, 0, this.shakeBig - (shift * 2));
			player.x += vectA.x;
			player.y += vectA.y;

			Sounds.spark.at(player);
			Sounds.laser.at(player);
			Calls.createBullet(glareLaser, player.getTeam(), player.x - vectA.x, player.y - vectA.y, player.rotation, 35, 3);
			for (var r = 1; r < (this.g * 2); r++) {
				Lightning.create(player.getTeam(), player.getTeam().color, 10, player.x - vectA.x, player.y - vectA.y, 0 + Mathf.random() * 360, 4 + Mathf.random() * 8);
			}
			this.g = 1;
		}
	}
});
glareWeapon.shake = 3;
glareWeapon.shakeBig = 56;
glareWeapon.reload = 15;
glareWeapon.alternate = true;
glareWeapon.width = 0;
glareWeapon.length = 6;
glareWeapon.lightning = 56;
glareWeapon.bullet = none;
glareWeapon.shootSound = Sounds.laser;
glareWeapon.minPlayerDist = 45;

const glare = extendContent(Mech, "glare", {
	range(){
	return 450.0;
	},
	
	getPowerCellRegion(){
		return Core.atlas.find(this.name + "-cell");
	},

	draw(player){
		const vectA = new Vec2();
		const shift = Mathf.clamp(player.velocity().len(), 0, 4);
		const minV = 3.6;
		const maxV = 7;

		vectA.trns(player.rotation + 90, 0, this.engineOffset - (shift * 2));
		Effects.effect(trailEffect, player.getTeam().color, player.x + vectA.x, player.y + vectA.y);
	}
});
glare.drawItems = false;
glare.drawLight = false;
glare.flying = true;
glare.health = 2100;
glare.drag = 0.4;
glare.speed = 1.3;
glare.mass = 15;
glare.hitsize = 40;
glare.drillPower = 0;
glare.engineColor = Color.valueOf("FFA665");
glare.weapon = glareWeapon;
glare.engineOffset = 36;
glare.engineSize = 0;
glare.mineSpeed = 0;
glare.buildPower = 0.1;

const glarePad = extendContent(MechPad, "glare-ship-pad", {
	draw(tile){
		const health = tile.entity.health;
		Draw.rect(Core.atlas.find(this.name), tile.drawx(), tile.drawy());
		if (health < (this.health / 3)) {
			Draw.rect(Core.atlas.find(this.name + "-dmg3"), tile.drawx(), tile.drawy());
		}else if (health < (this.health / 2)) {
			Draw.rect(Core.atlas.find(this.name + "-dmg2"), tile.drawx(), tile.drawy());
		}else if (health < (this.health / 1.5)) {
			Draw.rect(Core.atlas.find(this.name + "-dmg1"), tile.drawx(), tile.drawy());
		}
	}
});
glarePad.update = true;
glarePad.mech = glare;
glarePad.buildTime = 1500;
