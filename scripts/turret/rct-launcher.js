const soundEffect = newEffect(70, e => {
    Draw.color(Color.white, Color.blue, e.fin());
    Lines.stroke(e.fout() * 10);
    Lines.circle(e.x, e.y, e.fin() * 40);
});

const heavyEffect = newEffect(70, e => {
    Draw.color(Color.valueOf("0d001c"), Color.valueOf("14002b"), e.fin());
    Lines.stroke(e.fout() * 10);
    Lines.circle(e.x, e.y, e.fin() * 40);
});

const missile = extend(MissileBulletType, {
  load(){
      this.backRegion = Core.atlas.find("vanilla-upgraded-rocket-back");
      this.frontRegion = Core.atlas.find("vanilla-upgraded-rocket");
    },
    
    draw(bul) {
      const height = this.bulletHeight * ((1 - this.bulletShrink) + this.bulletShrink * bul.fout());
      Draw.color(this.backColor);
      Draw.rect(this.backRegion, bul.x, bul.y, this.width, this.height, bul.rot() - 90);
      Draw.color(this.frontColor);
      Draw.rect(this.frontRegion, bul.x, bul.y, this.width, this.height, bul.rot() - 90);
       Draw.color();
       Effects.effect(Fx.burning, bul.x, bul.y);
    }
});
missile.speed = 2.5;
missile.drag = -0.04;
missile.damage = 130;
missile.lifetime = 625;
missile.width = 8;
missile.height = 17;
missile.frontColor = Color.valueOf("ff0205");
missile.backColor = Color.valueOf("b0b9bf");
missile.trailColor = Color.valueOf("5e5e5e");
missile.shootEffect = Fx.none;
missile.smokeEffect = Fx.none;
missile.splashDamage = 65;
missile.splashDamageRadius = 35;
missile.bulletShrink = 0;
missile.hitEffect = Fx.none;
missile.despawnEffect = Fx.none;
missile.ammoMultiplier = 1.1;
missile.pierce = false;
missile.homingPower = 0.002;
missile.homingRange = 350;
missile.fragBullets = 15;
missile.fragBullet = Bullets.fireball;

const bigMissile = extend(MissileBulletType, {
  load(){
      this.backRegion = Core.atlas.find("vanilla-upgraded-rocket-back");
      this.frontRegion = Core.atlas.find("vanilla-upgraded-rocket");
    },
    
    draw(bul) {
      const height = this.bulletHeight * ((1 - this.bulletShrink) + this.bulletShrink * bul.fout());
      Draw.color(this.backColor);
      Draw.rect(this.backRegion, bul.x, bul.y, this.width, this.height, bul.rot() - 90);
      Draw.color(this.frontColor);
      Draw.rect(this.frontRegion, bul.x, bul.y, this.width, this.height, bul.rot() - 90);
       Draw.color();
       Effects.effect(Fx.burning, bul.x, bul.y);
    }
});
bigMissile.speed = 2;
bigMissile.drag = -0.04;
bigMissile.damage = 260;
bigMissile.lifetime = 625;
bigMissile.width = 10;
bigMissile.height = 19;
bigMissile.frontColor = Color.valueOf("ff0205");
bigMissile.backColor = Color.valueOf("b0b9bf");
bigMissile.trailColor = Color.valueOf("5e5e5e");
bigMissile.shootEffect = Fx.none;
bigMissile.smokeEffect = Fx.none;
bigMissile.splashDamage = 135;
bigMissile.splashDamageRadius = 50;
bigMissile.bulletShrink = 0;
bigMissile.hitEffect = Fx.none;
bigMissile.despawnEffect = Fx.none;
bigMissile.ammoMultiplier = 1.7;
bigMissile.pierce = false;
bigMissile.homingPower = 0.002;
bigMissile.homingRange = 350;
bigMissile.fragBullets = 75;
bigMissile.fragBullet = Bullets.fireball;

const heavyMissile = extend(MissileBulletType, {
  load(){
      this.backRegion = Core.atlas.find("vanilla-upgraded-rocket-back");
      this.frontRegion = Core.atlas.find("vanilla-upgraded-rocket");
    },
    
    draw(bul) {
      const height = this.bulletHeight * ((1 - this.bulletShrink) + this.bulletShrink * bul.fout());
      Draw.color(this.backColor);
      Draw.rect(this.backRegion, bul.x, bul.y, this.width, this.height, bul.rot() - 90);
      Draw.color(this.frontColor);
      Draw.rect(this.frontRegion, bul.x, bul.y, this.width, this.height, bul.rot() - 90);
       Draw.color();
       Effects.effect(Fx.burning, bul.x, bul.y);
    }
});
heavyMissile.speed = 1.7;
heavyMissile.drag = -0.04;
heavyMissile.damage = 360;
heavyMissile.lifetime = 625;
heavyMissile.width = 13;
heavyMissile.height = 24;
heavyMissile.frontColor = Color.valueOf("14002b");
heavyMissile.backColor = Color.valueOf("b0b9bf");
heavyMissile.trailColor = Color.valueOf("5e5e5e");
heavyMissile.shootEffect = Fx.none;
heavyMissile.smokeEffect = Fx.none;
heavyMissile.splashDamage = 200;
heavyMissile.splashDamageRadius = 85;
heavyMissile.bulletShrink = 0;
heavyMissile.hitEffect = heavyEffect;
heavyMissile.despawnEffect = heavyEffect;
heavyMissile.ammoMultiplier = 1.4;
heavyMissile.pierce = false;
heavyMissile.homingPower = 0.002;
heavyMissile.homingRange = 350;
heavyMissile.fragBullets = 15;
heavyMissile.fragBullet = Bullets.fireball;

const songMissile = extend(MissileBulletType, {
  load(){
      this.backRegion = Core.atlas.find("vanilla-upgraded-rocket-back");
      this.frontRegion = Core.atlas.find("vanilla-upgraded-rocket");
    },
    
    draw(bul) {
      const height = this.bulletHeight * ((1 - this.bulletShrink) + this.bulletShrink * bul.fout());
      Draw.color(this.backColor);
      Draw.rect(this.backRegion, bul.x, bul.y, this.width, this.height, bul.rot() - 90);
      Draw.color(this.frontColor);
      Draw.rect(this.frontRegion, bul.x, bul.y, this.width, this.height, bul.rot() - 90);
       Draw.color();
       Effects.effect(Fx.burning, bul.x, bul.y);
    }
});
songMissile.speed = 2.5;
songMissile.drag = -0.04;
songMissile.damage = 120;
songMissile.lifetime = 625;
songMissile.width = 6;
songMissile.height = 15;
songMissile.frontColor = Color.valueOf("00ffff");
songMissile.backColor = Color.valueOf("b0b9bf");
songMissile.trailColor = Color.valueOf("5e5e5e");
songMissile.shootEffect = Fx.none;
songMissile.smokeEffect = Fx.none;
songMissile.splashDamage = 270;
songMissile.splashDamageRadius = 150;
songMissile.bulletShrink = 0;
songMissile.hitEffect = soundEffect;
songMissile.despawnEffect = soundEffect;
songMissile.ammoMultiplier = 1.4;
songMissile.pierce = false;
songMissile.homingPower = 0.002;
songMissile.homingRange = 350;
songMissile.fragBullets = 15;
songMissile.fragBullet = Bullets.fireball;

const surgeMissile = extend(MissileBulletType, {
  load(){
      this.backRegion = Core.atlas.find("vanilla-upgraded-rocket-back");
      this.frontRegion = Core.atlas.find("vanilla-upgraded-rocket");
    },
    
    draw(bul) {
      const height = this.bulletHeight * ((1 - this.bulletShrink) + this.bulletShrink * bul.fout());
      Draw.color(this.backColor);
      Draw.rect(this.backRegion, bul.x, bul.y, this.width, this.height, bul.rot() - 90);
      Draw.color(this.frontColor);
      Draw.rect(this.frontRegion, bul.x, bul.y, this.width, this.height, bul.rot() - 90);
       Draw.color();
       Effects.effect(Fx.burning, bul.x, bul.y);
    }
});
surgeMissile.speed = 2.2;
surgeMissile.drag = -0.04;
surgeMissile.damage = 180;
surgeMissile.lifetime = 625;
surgeMissile.width = 8;
surgeMissile.height = 17;
surgeMissile.frontColor = Color.valueOf("ffff00");
surgeMissile.backColor = Color.valueOf("b0b9bf");
surgeMissile.trailColor = Color.valueOf("5e5e5e");
surgeMissile.shootEffect = Fx.none;
surgeMissile.smokeEffect = Fx.none;
surgeMissile.splashDamage = 65;
surgeMissile.splashDamageRadius = 35;
surgeMissile.bulletShrink = 0;
surgeMissile.hitEffect = Fx.none;
surgeMissile.despawnEffect = Fx.none;
surgeMissile.ammoMultiplier = 1.4;
surgeMissile.pierce = false;
surgeMissile.homingPower = 0.002;
surgeMissile.homingRange = 350;
surgeMissile.fragBullets = 4;
surgeMissile.fragBullet = Bullets.arc;

const launcher = extendContent(BurstTurret, "rct-launcher", {
  load(){
		this.super$load();
		
		this.region = Core.atlas.find(this.name);
		this.baseRegion = Core.atlas.find("vanilla-upgraded-block-5");
	},
	
	generateIcons: function(){
	return [
		Core.atlas.find("vanilla-upgraded-block-5"),
		Core.atlas.find(this.name)
	];},
  
  init(){
    this.ammo(
      Items.pyratite, missile,
      Items.blastCompound, bigMissile,
      Vars.content.getByName(ContentType.item, "vanilla-upgraded-vibro"), songMissile,
      Items.surgealloy, surgeMissile,
      Vars.content.getByName(ContentType.item, "vanilla-upgraded-obsidienne"), heavyMissile
    );
    this.super$init();
  }
});
launcher.shots = 3;
