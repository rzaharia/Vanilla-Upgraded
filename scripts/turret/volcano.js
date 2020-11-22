//made by Mesokrix, so don't say you do this script
const red = Color.valueOf("ed7358");
const darkRed = Color.valueOf("ff9c59");
const orange = Color.valueOf("ffa500ff");
const darkOrange = Color.valueOf("d97700ff");
const redTrail = Color.valueOf("b50000ff");

const shootEffectVolc = newEffect(60, a => {
  Draw.color(red, darkRed, a.fin);
  Lines.stroke(a.fout() * 11);
  Lines.circle(a.x, a.y, a.fin() * 80);
});

const hitVolc = newEffect(20, z => {
  Draw.color(red, darkRed, z.fin);
  Lines.stroke(z.fout() * 4);
  Lines.circle(z.x, z.y, z.fin() * 40);
});

const trailVolc = newEffect(45, t => {
  Draw.blend(Blending.additive);
  Draw.color(darkRed, redTrail, t.fin()); 
  Fill.circle(t.x, t.y, 4);
  Draw.blend();
});

const bulletExploFireLiquid = extend(BasicBulletType, {
  load: function(){
      this.backRegion = Core.atlas.find("vanilla-upgraded-bullet-explo-back");
      this.frontRegion = Core.atlas.find("vanilla-upgraded-bullet-explo");
    },
    draw(bul) {
        const height = this.bulletHeight * ((1 - this.bulletShrink) + this.bulletShrink * bul.fout());
        Draw.color(this.backColor);
        Draw.rect(this.backRegion, bul.x, bul.y, this.width, this.height, bul.rot() - 90);
        Draw.color(this.frontColor);
        Draw.rect(this.frontRegion, bul.x, bul.y, this.width, this.height, bul.rot() - 90);
       Draw.color();
       Effects.effect(Fx.melting, bul.x, bul.y);
    }
});
bulletExploFireLiquid.damage = 70;
bulletExploFireLiquid.lifetime = 90;
bulletExploFireLiquid.hitEffect = hitVolc;
bulletExploFireLiquid.width = 13;
bulletExploFireLiquid.height = 14;
bulletExploFireLiquid.frontColor = red;
bulletExploFireLiquid.backColor = darkRed;
bulletExploFireLiquid.speed = 6;
bulletExploFireLiquid.despawnedEffect = hitVolc;
bulletExploFireLiquid.fragBullet = Bullets.slagShot;
bulletExploFireLiquid.fragBullets = 600;

const bulletExploFire = extend(BasicBulletType, {
    load: function(){
      this.backRegion = Core.atlas.find("vanilla-upgraded-bullet-explo-back");
      this.frontRegion = Core.atlas.find("vanilla-upgraded-bullet-explo");
    },
    draw(b) {
        const height = this.bulletHeight * ((1 - this.bulletShrink) + this.bulletShrink * b.fout());
        Draw.color(this.backColor);
        Draw.rect(this.backRegion, b.x, b.y, this.width, this.height, b.rot() - 90);
        Draw.color(this.frontColor);
        Draw.rect(this.frontRegion, b.x, b.y, this.width, this.height, b.rot() - 90);
       Draw.color();
       Effects.effect(Fx.burning, b.x, b.y);
    }
});
bulletExploFire.damage = 60;
bulletExploFire.lifetime = 110;
bulletExploFire.hitEffect = hitVolc;
bulletExploFire.width = 11;
bulletExploFire.height = 13;
bulletExploFire.frontColor = orange;
bulletExploFire.backColor = darkOrange;
bulletExploFire.speed = 8;
bulletExploFire.despawnedEffect = hitVolc;
bulletExploFire.fragBullets = 11;
bulletExploFire.fragBullet = Bullets.fireball;

const volcano = extendContent(ItemTurret, "volcano", {});
volcano.shootEffect = shootEffectVolc;
volcano.ammo(Items.blastCompound, bulletExploFireLiquid,
             Items.pyratite, bulletExploFire);
volcano.range = 320;