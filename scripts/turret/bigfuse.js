const bigfuseBulletThorium = extend(BasicBulletType, {
	update(b){
		if(b.timer.get(1, 17)){
			Damage.collideLine(b, b.team, this.hitEffect, b.x, b.y, b.rotation(), this.rayLength, true);
		};
	},
	
	draw(b){
		Draw.color(Color.white, Color.valueOf("f9a3c7"), b.fin());
		
		for(var i = 0; i < 7; i++){
			Tmp.v1.trns(b.rotation(), i * 8);
			var sl = Mathf.clamp(b.fout() - 0.5) * (80 - i * 10);
			Drawf.tri(b.x + Tmp.v1.x, b.y + Tmp.v1.y, 4, sl, b.rotation() + 90);
			Drawf.tri(b.x + Tmp.v1.x, b.y + Tmp.v1.y, 4, sl, b.rotation() - 90);
		}
		Drawf.tri(b.x, b.y, 20 * b.fout(), (this.rayLength + 30), b.rotation());
		Drawf.tri(b.x, b.y, 20 * b.fout(), 10, b.rotation() + 180);
		Draw.reset();
	}
});

bigfuseBulletThorium.speed = 0.01;
bigfuseBulletThorium.damage = 210;
bigfuseBulletThorium.lifetime = 10;
bigfuseBulletThorium.collidesTeam = false;
bigfuseBulletThorium.pierce = true;
bigfuseBulletThorium.rayLength = 150;
bigfuseBulletThorium.hitEffect = Fx.hitLancer;
bigfuseBulletThorium.despawnEffect = Fx.none;
bigfuseBulletThorium.shootEffect = Fx.lightningShoot;
bigfuseBulletThorium.smokeEffect = Fx.lightningShoot;

const bigfuseBulletPlastanium = extend(BasicBulletType, {
	update(b){
		if(b.timer.get(1, 17)){
			Damage.collideLine(b, b.team, this.hitEffect, b.x, b.y, b.rotation(), this.rayLength, true);
		};
	},
	
	draw(b){
		Draw.color(Color.white, Color.valueOf("cbd97f"), b.fin());
		
		for(var i = 0; i < 7; i++){
			Tmp.v1.trns(b.rotation(), i * 8);
			var sl = Mathf.clamp(b.fout() - 0.5) * (80 - i * 10);
			Drawf.tri(b.x + Tmp.v1.x, b.y + Tmp.v1.y, 4, sl, b.rotation() + 90);
			Drawf.tri(b.x + Tmp.v1.x, b.y + Tmp.v1.y, 4, sl, b.rotation() - 90);
		}
		Drawf.tri(b.x, b.y, 20 * b.fout(), (this.rayLength + 30), b.rotation());
		Drawf.tri(b.x, b.y, 20 * b.fout(), 10, b.rotation() + 180);
		Draw.reset();
	}
});

bigfuseBulletPlastanium.speed = 0.01;
bigfuseBulletPlastanium.damage = 300;
bigfuseBulletPlastanium.lifetime = 10;
bigfuseBulletPlastanium.collidesTeam = false;
bigfuseBulletPlastanium.pierce = true;
bigfuseBulletPlastanium.rayLength = 190;
bigfuseBulletPlastanium.hitEffect = Fx.hitLancer;
bigfuseBulletPlastanium.despawnEffect = Fx.none;
bigfuseBulletPlastanium.shootEffect = Fx.lightningShoot;
bigfuseBulletPlastanium.smokeEffect = Fx.lightningShoot;

const bigfuse = extendContent(ItemTurret, "bigfuse", {});
bigfuse.shootShake = 4;
bigfuse.recoil = 5;
bigfuse.shots = 5;
bigfuse.shootEffect = Fx.lightningShoot;
bigfuse.ammo(
	Items.thorium, bigfuseBulletThorium,
	Items.plastanium, bigfuseBulletPlastanium
);