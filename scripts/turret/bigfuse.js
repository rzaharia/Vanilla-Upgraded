const multi = require("rest/multilib");

const bigfuseBullet = extend(BasicBulletType, {
	update: function(b){
		if(b.timer.get(1, 17)){
			Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), this.rayLength, true);
		};
	},
	
	draw: function(b){
		Draw.color(Color.white, multi.thorium, b.fin());
		
		for(var i = 0; i < 7; i++){
			Tmp.v1.trns(b.rot(), i * 8);
			var sl = Mathf.clamp(b.fout() - 0.5) * (80 - i * 10);
			Drawf.tri(b.x + Tmp.v1.x, b.y + Tmp.v1.y, 4, sl, b.rot() + 90);
			Drawf.tri(b.x + Tmp.v1.x, b.y + Tmp.v1.y, 4, sl, b.rot() - 90);
		}
		Drawf.tri(b.x, b.y, 20 * b.fout(), (this.rayLength + 30), b.rot());
		Drawf.tri(b.x, b.y, 20 * b.fout(), 10, b.rot() + 180);
		Draw.reset();
	}
});

bigfuseBullet.speed = 0.01;
bigfuseBullet.damage = 210;
bigfuseBullet.lifetime = 10;
bigfuseBullet.collidesTeam = false;
bigfuseBullet.pierce = true;
bigfuseBullet.rayLength = 130 + 20;
bigfuseBullet.hitEffect = Fx.hitLancer;
bigfuseBullet.despawnEffect = Fx.none;
bigfuseBullet.shootEffect = Fx.lightningShoot;
bigfuseBullet.smokeEffect = Fx.lightningShoot;

const bigfuse = extendContent(ItemTurret, "bigfuse", {});
bigfuse.shootShake = 4;
bigfuse.recoil = 5;
bigfuse.shots = 5;
bigfuse.shootEffect = Fx.lightningShoot;
bigfuse.ammo(Items.thorium, bigfuseBullet);