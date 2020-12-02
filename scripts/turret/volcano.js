const shootEffectVolc = new Effect(60, e => {
  Draw.color(Color.valueOf("ed7358"), Color.valueOf("ff9c59"), e.fin());
  Lines.stroke(e.fout() * 11);
  Lines.circle(e.x, e.y, e.fin() * 80);
});

const hitVolc = new Effect(20, e => {
  Draw.color(Color.valueOf("ed7358"), Color.valueOf("ff9c59"), e.fin());
  Lines.stroke(e.fout() * 4);
  Lines.circle(e.x, e.y, e.fin() * 40);
});

const trailVolc = new Effect(45, e => {
  Draw.blend(Blending.additive);
  Draw.color(Color.valueOf("ff9c59"), Color.valueOf("b50000ff"), e.fin()); 
  Fill.circle(e.x, e.y, 4);
  Draw.blend();
});

const bulletExploFireLiquid = extend(BasicBulletType, {
  load(){
      this.backRegion = Core.atlas.find("vanilla-upgraded-bullet-explo-back");
      this.frontRegion = Core.atlas.find("vanilla-upgraded-bullet-explo");
    },
    draw(b) {
        Draw.color(this.backColor);
        Draw.rect(this.backRegion, b.x, b.y, this.width, this.height, b.rotation() - 90);
        Draw.color(this.frontColor);
        Draw.rect(this.frontRegion, b.x, b.y, this.width, this.height, b.rotation() - 90);
       Draw.color();
       Fx.melting.at(b.x, b.y);
    }
});
bulletExploFireLiquid.damage = 70;
bulletExploFireLiquid.lifetime = 50;
bulletExploFireLiquid.hitEffect = hitVolc;
bulletExploFireLiquid.width = 13;
bulletExploFireLiquid.height = 14;
bulletExploFireLiquid.frontColor = Color.valueOf("ed7358");
bulletExploFireLiquid.backColor = Color.valueOf("ff9c59");
bulletExploFireLiquid.speed = 6;
bulletExploFireLiquid.despawnedEffect = hitVolc;
bulletExploFireLiquid.fragBullet = Bullets.slagShot;
bulletExploFireLiquid.fragBullets = 200;

const bulletExploFire = extend(BasicBulletType, {
    load: function(){
      this.backRegion = Core.atlas.find("vanilla-upgraded-bullet-explo-back");
      this.frontRegion = Core.atlas.find("vanilla-upgraded-bullet-explo");
    },
    draw(b) {
        Draw.color(this.backColor);
        Draw.rect(this.backRegion, b.x, b.y, this.width, this.height, b.rotation() - 90);
        Draw.color(this.frontColor);
        Draw.rect(this.frontRegion, b.x, b.y, this.width, this.height, b.rotation() - 90);
       Draw.color();
       Fx.burning.at(b.x, b.y);
    }
});
bulletExploFire.damage = 60;
bulletExploFire.lifetime = 50;
bulletExploFire.hitEffect = hitVolc;
bulletExploFire.width = 11;
bulletExploFire.height = 13;
bulletExploFire.frontColor = Color.valueOf("ffa500ff");;
bulletExploFire.backColor = Color.valueOf("d97700ff");
bulletExploFire.speed = 8;
bulletExploFire.despawnedEffect = hitVolc;
bulletExploFire.fragBullets = 50;
bulletExploFire.fragBullet = Bullets.fireball;

const volcano = extendContent(ItemTurret, "volcano", {});
volcano.shootEffect = shootEffectVolc;
volcano.ammo(Items.blastCompound, bulletExploFireLiquid,
             Items.pyratite, bulletExploFire);
volcano.range = 400;