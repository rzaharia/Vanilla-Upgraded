const summonEffect = newEffect(11, e => {
	Draw.color(Pal.accent);
	Lines.stroke((e.fout() * 2) + 0.5);
	Lines.poly(e.x, e.y, 4, e.fin() * 17, 0);
	Draw.reset();
});

const prototypeEquip = extendContent(Weapon, "cyber-equip", {
	/*load {
		this.region = Core.atlas.find("vanilla-upgraded-cyber-equip");
	},*/

	shoot(u, x, y, angle, left){
		this.super$shoot(u, x, y, angle, left);
		const vec = new Vec2();
		
		if(Mathf.chance(0.25)){
			if(Mathf.chance(0.5)) {
				if(Mathf.chance(0.25)){
					if(u != null){
						for (var o = 0; o < 2; o++) {
							var newUnit = UnitTypes.ghoul.create(u.getTeam());
						
							newUnit.rotation = angle;
							newUnit.set(u.getX() + x, u.getY() + y);
							newUnit.add();
							vec.trns(angle, 2);
							newUnit.velocity().set(vec);
							Effects.effect(summonEffect, u.getX() + x, u.getY() + y);
							Sounds.missile.at(u.getX() + x, u.getY() + y, Mathf.random(0.8, 1.0));
						}
					}
				} else {
					if(u != null){
						for (var i = 0; i < 4; i++) {
							var neWunit = UnitTypes.wraith.create(u.getTeam());
						
							neWunit.rotation = angle;
							neWunit.set(u.getX() + x, u.getY() + y);
							neWunit.add();
							vec.trns(angle, 2);
							neWunit.velocity().set(vec);
							Effects.effect(summonEffect, u.getX() + x, u.getY() + y);
							Sounds.missile.at(u.getX() + x, u.getY() + y, Mathf.random(0.8, 1.0));
						}
					}
				}
			}
		}
	}
});
prototypeEquip.bullet = Bullets.standardThoriumBig;
prototypeEquip.alternate = true;
prototypeEquip.reload = 15;
prototypeEquip.width = 25;
prototypeEquip.shootSound = Sounds.shootBig;
prototypeEquip.recoil = 1;

const prototypeBase = prov(() => new JavaAdapter(GroundUnit, {
	getPowerCellRegion(){
      	return Core.atlas.find("vanilla-upgraded-cyber-cell");
  	}
}));

const prototype = extendContent(UnitType, "cyber", {
	load(){
		this.super$load();

		// this.weapon.load();
		this.region = Core.atlas.find(this.name);
		this.baseRegion = Core.atlas.find(this.name + "-base");
		this.legRegion = Core.atlas.find(this.name + "-leg");
	}
});
prototype.create(prototypeBase);
prototype.weapon = prototypeEquip;
prototype.health = 24503;
prototype.mass = 10;
prototype.speed = 0.1;
prototype.hitsize = 40;
prototype.drag = 0.1;
prototype.range = 800;
prototype.maxVelocity = 0.15;
prototype.shootCone = 30;
prototype.rotatespeed = 0.04;
prototype.targetAir = true;
prototype.targetGround = true;
prototype.rotateWeapon = true;