const antimGreen = Color.valueOf("FFFFFF");

const shipTrail = newEffect(44, e => {
	Draw.color(antimGreen);
	Fill.circle(e.x, e.y, 1.6 * e.fout());
});

const antimLaserShoot = newEffect(11, e => {
	Draw.color(antimGreen);
	
	for(var g = 1; g < 3; g++){
		Drawf.tri(e.x, e.y, 5 * e.fout(), 29, e.rotation + 60 + (g * 200));
	};
	
	Drawf.tri(e.x, e.y, 7 * e.fout(), 48, e.rotation);
});

const antimLaser = extend(BasicBulletType, {
	range: function(){
		return 190.0;
	},
	
	update: function(b){
		if(b.timer.get(1, 17)){
			Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), 170.0, false);
		};
	},
	
	
	draw: function(b){
		const colors = [antimGreen.cpy().mul(1.0, 1.0, 1.0, 0.4), antimGreen, Color.white];
		const tscales = [1.0, 0.7, 0.5, 0.2];
		const lenscales = [1, 1.1, 1.13, 1.14];
		const length = 170.0;
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
antimLaser.speed = 0.001;
antimLaser.damage = 40;
antimLaser.hitEffect = Fx.hitFuse;
antimLaser.despawnEffect = Fx.none;
antimLaser.hitSize = 4;
antimLaser.lifetime = 11;
antimLaser.keepVelocity = false;
antimLaser.pierce = true;
antimLaser.shootEffect = antimLaserShoot;
antimLaser.smokeEffect = Fx.none;

const antimWeapon = extendContent(Weapon, "antim-weapon", {});

antimWeapon.reload = 30;
antimWeapon.alternate = true;
antimWeapon.width = 0;
antimWeapon.length = 6;
antimWeapon.bullet = antimLaser;
antimWeapon.shootSound = Sounds.laser;
antimWeapon.minPlayerDist = 45;

const anti = extendContent(Mech, "antim", {
	updateAlt: function(player){
		const minVb = 4.6;
		const maxVb = 9.2;
		const sclb = Mathf.clamp((player.velocity().len() - minVb) / (maxVb - minVb));
		const pred = new Vec2();
		
		if(Mathf.chance(sclb)){
			pred.trns(player.velocity().angle(), 16);
			Effects.effect(shipTrail, Pal.surge, player.x + Mathf.range(4.7) + pred.x, player.y + Mathf.range(4.7) + pred.y, player.rotation);
			if(Mathf.chance(0.25)){
				Lightning.create(player.getTeam(), antimGreen, 18 * Vars.state.rules.playerDamageMultiplier, player.x, player.y, player.rotation + Mathf.range(21.0), Mathf.floorPositive((player.velocity().len() * 2) + Mathf.random(2, 4)));
			}
		}
	},
	
	draw: function(player){
		const minV = 3.6;
		const maxV = 7;

		const scl = Mathf.clamp((player.velocity().len() - minV) / (maxV - minV));
		
		Draw.color(antimGreen);
		Draw.alpha(scl / 2);
		Draw.blend(Blending.additive);
		Draw.rect(Core.atlas.find(this.name + "-shield"), player.x + Mathf.range(scl / 2.0), player.y + Mathf.range(scl / 2.0), player.rotation - 90);
		Draw.blend();
		Draw.color();
		Draw.rect(Core.atlas.find(this.name + "-cell"), player.x + Mathf.range(scl / 2.0), player.y + Mathf.range(scl / 2.0), player.rotation - 90);
	}
});

anti.flying = false;
anti.health = 210;
anti.drag = 0.027;
anti.speed = 0.24;
anti.boostSpeed = 0.24;
anti.mass = 3;
anti.drillPower = 4;
anti.weapon = antimWeapon;
anti.engineColor = antimGreen;
anti.mineSpeed = 3.2;
anti.buildPower = 1.2;
anti.localizedName = "Antim";
anti.description = "Shoot an armour piercing laser. can also create lightning at high speeds.";

const antimPad = extendContent(MechPad, "antim-ship-pad", {});

antimPad.mech = anti;
antimPad.buildTime = 300;