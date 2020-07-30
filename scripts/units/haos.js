const bullet = extend(BasicBulletType, {
  range: function(){
    return 310
  },

  load(){
    this.backRegion = Core.atlas.find("vanilla-upgraded-bullet-explo-back");
    this.frontRegion = Core.atlas.find("vanilla-upgraded-bullet-explo");
  },

  draw(b) {
    const height = this.bulletHeight * ((1 - this.bulletShrink) + this.bulletShrink * b.fout());
    Draw.color(this.backColor);
    Draw.rect(this.backRegion, b.x, b.y, this.width, this.height, b.rot() - 90);
    Draw.color(this.frontColor);
    Draw.rect(this.frontRegion, b.x, b.y, this.width, this.height, b.rot() - 90);
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
bullet.fragBullet = Bullets.missileSwarm;
bullet.fragBullets = 12;

const haosEquip = extendContent(Weapon, "haos-equip", {
  load: function(){
    this.region = Core.atlas.find("vanilla-upgraded-haos-equip");
  }
});
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
        for(var i = 0; i < 50; i++){
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
