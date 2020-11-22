const trailBullet = newEffect(13, e => {
  Draw.color(Color.black, e.color, e.fin());
  Fill.circle(e.x, e.y, 1.5 * e.fout());
});

const wizardLaser = extend(BasicBulletType, {
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
      if(Mathf.chance(0.1)){
        Fire.create(Vars.world.tileWorld(hitx + Mathf.range(3.0), hity + Mathf.range(3.0)));
      }
    }
  },
  
  draw(b){
    const colors = [b.getTeam().color, b.getTeam().color, b.getTeam().color, Color.white];
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
wizardLaser.lengthA = 220;
wizardLaser.speed = 0.001;
wizardLaser.damage = 70;
wizardLaser.lifetime = 16;
wizardLaser.hitSize = 12;
wizardLaser.keepVelocity = false;
wizardLaser.pierce = true;
wizardLaser.despawnEffect = Fx.none;
wizardLaser.shootEffect = Fx.shootBigSmoke2;
wizardLaser.smokeEffect = Fx.none;

const bullet2 = extend(MissileBulletType, {
  load(){
    this.backRegion = Core.atlas.find("vanilla-upgraded-bullet-explo-back");
      this.frontRegion = Core.atlas.find("vanilla-upgraded-bullet-explo");
  },

  hit(b){
    Sounds.spark.at(b);
    for(var i = 0; i < 8; i++){
      Calls.createBullet(wizardLaser, b.getTeam(), b.x, b.y, Mathf.random(360), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
    }
  },

  draw(b) {
       const height = this.bulletHeight * ((1 - this.bulletShrink) + this.bulletShrink * b.fout());
       Draw.color(this.backColor);
       Draw.rect(this.backRegion, b.x, b.y, this.width, this.height, b.rot() - 90);
       Draw.color(this.frontColor);
       Draw.rect(this.frontRegion, b.x, b.y, this.width, this.height, b.rot() - 90);
       Draw.color();
       Effects.effect(trailBullet, b.getTeam().color, b.x, b.y);
    }
});
bullet2.backColor = Color.black;
bullet2.frontColor = Color.gray;
bullet2.height = 8;
bullet2.width = 7;
bullet2.speed = 2.9;
bullet2.bulletShrink = 0;
bullet2.damage = 12;
bullet2.drag = -0.1;
bullet2.splashDamageRadius = 10;
bullet2.homingPower = 7;
bullet2.lifetime = 160;
bullet2.splashDamage = 10;
bullet2.hitEffect = Fx.blastExplosion;
bullet2.fragBullet = wizardLaser;
bullet2.fragBullets = 8;

const bullet1 = extend(BasicBulletType, {
  update(b){
    Effects.effect(trailBullet, b.getTeam().color, b.x, b.y);
    const vec = new Vec2();
    
    if(Mathf.chance(0.15)){
      Sounds.spark.at(b);
      vec.trns(b.rot() + Mathf.range(2.0), 12);
      Lightning.create(b.getTeam(), b.getTeam().color, 26, b.x + vec.x + Mathf.range(24.0), b.y + vec.y + Mathf.range(24.0), b.rot() + Mathf.range(46.0), Mathf.random(4, 18));
    };

    if(Mathf.chance(0.15)){
      vec.trns(b.rot() + Mathf.range(2.0), 12);
      Lightning.create(b.getTeam(), Color.black, 28, b.x + vec.x + Mathf.range(24.0), b.y + vec.y + Mathf.range(24.0), b.rot() + Mathf.range(46.0), Mathf.random(4, 18));
    }
  },

  draw(b){
    Draw.color(b.getTeam().color, Color.black, b.fin());
    Fill.poly(b.x, b.y, 6, 6 + b.fout() * 6.1, b.rot());
    Draw.reset();
  },

  hit(b){
    Sounds.spark.at(b);
    for(var i = 0; i < 8; i++){
      Calls.createBullet(bullet2, b.getTeam(), b.x, b.y, Mathf.random(360), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
    }
    for(var i = 0; i < 4; i++){
      Lightning.create(b.getTeam(), b.getTeam().color, 12, b.x, b.y, b.rot() + Mathf.random(0, 360), 24);
    }
    for(var i = 0; i < 2; i++){
      Lightning.create(b.getTeam(), Color.black, 12, b.x, b.y, b.rot() + Mathf.random(0, 360), 24);
    }
  },

  despawned(b){
    Sounds.spark.at(b);
    for(var i = 0; i < 8; i++){
      Calls.createBullet(bullet2, b.getTeam(), b.x, b.y, Mathf.random(360), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
    }
    for(var i = 0; i < 4; i++){
      Lightning.create(b.getTeam(), b.getTeam().color, 12, b.x, b.y, b.rot() + Mathf.random(0, 360), 24);
    }
    for(var i = 0; i < 2; i++){
      Lightning.create(b.getTeam(), Color.black, 12, b.x, b.y, b.rot() + Mathf.random(0, 360), 24);
    }
  }
});
bullet1.speed = 10;
bullet1.damage = 260;
bullet1.lifetime = 120;
bullet1.minRotation = 16;
bullet1.widthOffset = 8;
bullet1.lengthOffset = 8;
bullet1.hitSize = 12;
bullet1.width = 13;
bullet1.height = 27;
bullet1.collidesTiles = true;
bullet1.collidesAir = true;
bullet1.collides = true;
bullet1.keepVelocity = false;
bullet1.despawnEffect = Fx.none;
bullet1.shootEffect = Fx.none;
bullet1.smokeEffect = Fx.none;

const bullet = extend(BasicBulletType, {
  range: function(){
    return 310
  },

  update(b){
    Effects.effect(trailBullet, b.getTeam().color, b.x, b.y);
    const vec = new Vec2();
    
      Sounds.spark.at(b);
      vec.trns(b.rot() + Mathf.range(2.0), 12);
      Lightning.create(b.getTeam(), b.getTeam().color, 26, b.x + vec.x + Mathf.range(24.0), b.y + vec.y + Mathf.range(24.0), b.rot() + Mathf.range(46.0), Mathf.random(4, 18));

      vec.trns(b.rot() + Mathf.range(2.0), 12);
      Lightning.create(b.getTeam(), Color.black, 28, b.x + vec.x + Mathf.range(24.0), b.y + vec.y + Mathf.range(24.0), b.rot() + Mathf.range(46.0), Mathf.random(4, 18));
  },

  hit(b){
    Sounds.spark.at(b);
    for(var i = 0; i < 8; i++){
      Calls.createBullet(bullet1, b.getTeam(), b.x, b.y, Mathf.random(360), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
    }
  },

  despawned(b){
    Sounds.spark.at(b);
    for(var i = 0; i < 8; i++){
      Calls.createBullet(bullet1, b.getTeam(), b.x, b.y, Mathf.random(360), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
    }
  }
});
bullet.speed = 3;
bullet.damage = 260;
bullet.lifetime = 120;
bullet.minRotation = 16;
bullet.widthOffset = 8;
bullet.lengthOffset = 8;
bullet.hitSize = 12;
bullet.width = 13;
bullet.height = 27;
bullet.collidesTiles = true;
bullet.collidesAir = true;
bullet.collides = true;
bullet.keepVelocity = false;
bullet.despawnEffect = Fx.none;
bullet.shootEffect = Fx.none;
bullet.smokeEffect = Fx.none;

const haosEquip = extendContent(Weapon, "haos-equip", {});
haosEquip.length = 21;
haosEquip.shootCone = 23;
haosEquip.width = 70;
haosEquip.alternate = true;
haosEquip.recoil = 6;
haosEquip.inaccuracy = 1;
haosEquip.reload = 60;
haosEquip.shootSound = Sounds.shootBig;
haosEquip.bullet = bullet;

const haosDead = prov(() => new JavaAdapter(HoverUnit, {
  getPowerCellRegion(){
	return Core.atlas.find("vanilla-upgraded-haos-antologist-cell");
  },
  onDeath(){
        Sounds.explosionbig.at(this);
        for(var i = 0; i < 180; i++){
            Calls.createBullet(Bullets.missileSwarm, this.getTeam(), this.x, this.y, Mathf.random(360), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
		}
		this.super$onDeath();
}}));   

const haosAntologist = extendContent(UnitType, "haos-antologist", {
  load: function(){
    this.weapon.load();
    this.region = Core.atlas.find(this.name);
  },
  
  generateIcons: function(){
  return [
    this.weapon.load(),
    Core.atlas.find(this.name)
  ];}
});
haosAntologist.weapon = haosEquip;
haosAntologist.flying = true;
haosAntologist.maxVelocity = 0.45;
haosAntologist.create(haosDead);
haosAntologist.speed = 0.1;
haosAntologist.drag = 0.2;
haosAntologist.mass = 13;
haosAntologist.rotatespeed = 0.01;
haosAntologist.hitsizeTile = 15;
haosAntologist.rotatespeed = 0.3;
haosAntologist.baseRotateSpeed = 0.1;
haosAntologist.hitsize = 50;
haosAntologist.health = 11000;
haosAntologist.range = 460;
haosAntologist.engineSize = 43;
haosAntologist.attackLength = 21;
haosAntologist.engineOffset = 51.10;
haosAntologist.rotateWeapon = true;
