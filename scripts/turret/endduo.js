const lightLaser = extend(BasicBulletType, {
  update(b){
		Effects.shake(1.2, 1.2, b.x, b.y);
		if(b.timer.get(1, 5)){
			Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), this.laserLength * 1.1, true);
		};
	},
	
	hit(b, hitx, hity){
		if(hitx != null && hity != null){
			Effects.effect(this.hitEffect, hitx, hity);
		}
	},
	
	draw(b, tile){
		
		const colors = [Color.valueOf("d4c3c5"), Color.valueOf("e8d5d7"), Color.valueOf("ffebee"), Color.valueOf("ffffff")];
		const tscales = [1, 0.74, 0.5, 0.24];
		const strokes = [2.3, 1.9, 1.4, 0.6];
		const lenscales = [1.0, 1.12, 1.15, 1.164];
		const tmpColor = new Color();

		for(var s = 0; s < 4; s++){
			Draw.color(tmpColor.set(colors[s]).mul(1.0 + Mathf.absin(Time.time(), 1.2, 0.4)));
			for(var i = 0; i < 4; i++){
				Tmp.v1.trns(b.rot() + 180.0, (lenscales[i] - 1.1) * 55.0);
				Lines.stroke((0.8 + Mathf.absin(Time.time(), 1.7, 3.1)) * b.fout() * strokes[s] * tscales[i]);
				Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rot(), this.laserLength * b.fout() * lenscales[i], CapStyle.none);
			}
		};
	}
});
lightLaser.shotwidth = 11;
lightLaser.searchAccuracy = 64;
lightLaser.laserLength = 245;
lightLaser.speed = 0.001;
lightLaser.damage = 15;
lightLaser.lifetime = 18;
lightLaser.hitEffect = Fx.none;
lightLaser.despawnEffect = Fx.none;
lightLaser.hitSize = 7;
lightLaser.drawSize = 720;
lightLaser.pierce = true;
lightLaser.shootEffect = Fx.none;
lightLaser.smokeEffect = Fx.none;

const fireLaser = extend(BasicBulletType, {
  update(b){
		Effects.shake(1.2, 1.2, b.x, b.y);
		if(b.timer.get(1, 5)){
			Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), this.laserLength * 1.1, true);
		};
	},
	
	hit(b, hitx, hity){
		if(hitx != null && hity != null){
			Effects.effect(this.hitEffect, hitx, hity);
		};
		if(Mathf.chance(0.12)){
		  Damage.createIncend(hitx, hity, 7, 1);
		}
	},
	
	draw(b, tile){
		
		const colors = [Color.valueOf("d48048"), Color.valueOf("d48048"), Color.valueOf("ffa95e"), Color.valueOf("ffa95e")];
		const tscales = [1, 0.74, 0.5, 0.24];
		const strokes = [2.3, 1.9, 1.4, 0.6];
		const lenscales = [1.0, 1.12, 1.15, 1.164];
		const tmpColor = new Color();

		for(var s = 0; s < 4; s++){
			Draw.color(tmpColor.set(colors[s]).mul(1.0 + Mathf.absin(Time.time(), 1.2, 0.4)));
			for(var i = 0; i < 4; i++){
				Tmp.v1.trns(b.rot() + 180.0, (lenscales[i] - 1.1) * 55.0);
				Lines.stroke((0.8 + Mathf.absin(Time.time(), 1.7, 3.1)) * b.fout() * strokes[s] * tscales[i]);
				Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rot(), this.laserLength * b.fout() * lenscales[i], CapStyle.none);
			}
		};
	}
});
fireLaser.shotwidth = 11;
fireLaser.searchAccuracy = 64;
fireLaser.laserLength = 245;
fireLaser.speed = 0.001;
fireLaser.damage = 9;
fireLaser.lifetime = 18;
fireLaser.hitEffect = Fx.none;
fireLaser.despawnEffect = Fx.none;
fireLaser.hitSize = 7;
fireLaser.drawSize = 720;
fireLaser.pierce = true;
fireLaser.shootEffect = Fx.none;
fireLaser.smokeEffect = Fx.none;

const heavyLaser = extend(BasicBulletType, {
  update(b){
		Effects.shake(1.2, 1.2, b.x, b.y);
		if(b.timer.get(1, 5)){
			Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), this.laserLength * 1.1, true);
		};
	},
	
	hit(b, hitx, hity){
		if(hitx != null && hity != null){
			Effects.effect(this.hitEffect, hitx, hity);
		}
	},
	
	draw(b, tile){
		
		const colors = [Color.valueOf("0d001c"), Color.valueOf("0f0021"), Color.valueOf("14002b"), Color.valueOf("14002b")];
		const tscales = [1, 0.74, 0.5, 0.24];
		const strokes = [2.3, 1.9, 1.4, 0.6];
		const lenscales = [1.0, 1.12, 1.15, 1.164];
		const tmpColor = new Color();

		for(var s = 0; s < 4; s++){
			Draw.color(tmpColor.set(colors[s]).mul(1.0 + Mathf.absin(Time.time(), 1.2, 0.4)));
			for(var i = 0; i < 4; i++){
				Tmp.v1.trns(b.rot() + 180.0, (lenscales[i] - 1.1) * 55.0);
				Lines.stroke((0.8 + Mathf.absin(Time.time(), 1.7, 3.1)) * b.fout() * strokes[s] * tscales[i]);
				Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rot(), this.laserLength * b.fout() * lenscales[i], CapStyle.none);
			}
		};
	}
});
heavyLaser.shotwidth = 11;
heavyLaser.searchAccuracy = 64;
heavyLaser.laserLength = 245;
heavyLaser.speed = 0.001;
heavyLaser.damage = 36;
heavyLaser.lifetime = 28;
heavyLaser.hitEffect = Fx.none;
heavyLaser.despawnEffect = Fx.none;
heavyLaser.hitSize = 7;
heavyLaser.drawSize = 720;
heavyLaser.pierce = true;
heavyLaser.shootEffect = Fx.none;
heavyLaser.smokeEffect = Fx.none;

const electroShockLaser = extend(BasicBulletType, {
  update(b){
		Effects.shake(1.2, 1.2, b.x, b.y);
		if(b.timer.get(1, 5)){
			Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), this.laserLength * 1.1, true);
		};
	},
	
	hit(b, hitx, hity){
		if(hitx != null && hity != null){
			Effects.effect(this.hitEffect, hitx, hity);
		};
		if(Mathf.chance(Time.delta() * 0.2)){
			Tmp.v2.trns(b.rot() + 90.0, Mathf.range(4.0));
			Lightning.create(b.getTeam(), Color.valueOf("959dc2"), 10, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rot(), 46);
		}
	},
	
	draw(b, tile){
		
		const colors = [Color.valueOf("7171ab"), Color.valueOf("959dc2"), Color.valueOf("abb9d1"), Color.valueOf("abb9d1")];
		const tscales = [1, 0.74, 0.5, 0.24];
		const strokes = [2.3, 1.9, 1.4, 0.6];
		const lenscales = [1.0, 1.12, 1.15, 1.164];
		const tmpColor = new Color();

		for(var s = 0; s < 4; s++){
			Draw.color(tmpColor.set(colors[s]).mul(1.0 + Mathf.absin(Time.time(), 1.2, 0.4)));
			for(var i = 0; i < 4; i++){
				Tmp.v1.trns(b.rot() + 180.0, (lenscales[i] - 1.1) * 55.0);
				Lines.stroke((0.8 + Mathf.absin(Time.time(), 1.7, 3.1)) * b.fout() * strokes[s] * tscales[i]);
				Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rot(), this.laserLength * b.fout() * lenscales[i], CapStyle.none);
			}
		};
	}
});
electroShockLaser.shotwidth = 11;
electroShockLaser.searchAccuracy = 64;
electroShockLaser.laserLength = 245;
electroShockLaser.speed = 0.001;
electroShockLaser.damage = 25;
electroShockLaser.lifetime = 18;
electroShockLaser.hitEffect = Fx.none;
electroShockLaser.despawnEffect = Fx.none;
electroShockLaser.hitSize = 7;
electroShockLaser.drawSize = 720;
electroShockLaser.pierce = true;
electroShockLaser.shootEffect = Fx.none;
electroShockLaser.smokeEffect = Fx.none;

const endDuo = extendContent(ItemTurret, "endduo", {
  init(){
    this.ammo(
      Vars.content.getByName(ContentType.item, "vanilla-upgraded-lithium"), lightLaser,
      Vars.content.getByName(ContentType.item, "vanilla-upgraded-tungstene"), fireLaser,
      Vars.content.getByName(ContentType.item, "vanilla-upgraded-obsidienne"), heavyLaser,
      Vars.content.getByName(ContentType.item, "vanilla-upgraded-aliage-supra"), electroShockLaser
    );
    this.super$init();
  }
});
endDuo.update = true;