//made by Mesokrix, so don't say you do this script
const cyan = Color.valueOf("00ffffff");
const darkCyan = Color.valueOf("04d5d5");
const cyanTrail = Color.valueOf("24b6b6");

const shootCryo = newEffect(20, e => {
  Draw.color(cyan, darkCyan, e.fin());
  Lines.stroke(e.fout() * 4);
  Lines.circle(e.x, e.y, e.fin() * 40);
});

const exploShootCryo = newEffect(40, p => {
  Draw.color(cyan, darkCyan, p.fin());
  Lines.stroke(p.fout() * 11);
  Lines.circle(p.x, p.y, p.fin() * 120);
});

const CryoExploBullet = extend(BasicBulletType, {
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
       Effects.effect(Fx.freezing, b.x, b.y);
    }
});
CryoExploBullet.despawnEffect = exploShootCryo;
CryoExploBullet.speed = 9;
CryoExploBullet.lifetime = 70;
CryoExploBullet.damage = 220;
CryoExploBullet.hitEffect = exploShootCryo;
CryoExploBullet.width = 9;
CryoExploBullet.height = 11;
CryoExploBullet.shootEffect = shootCryo;
CryoExploBullet.smokeEffect = Fx.none;
CryoExploBullet.frontColor = cyan;
CryoExploBullet.backColor = darkCyan;
CryoExploBullet.fragBullet = Bullets.cryoShot;
CryoExploBullet.fragBullets = 1000;

const exploCryoEquipe = extendContent(Weapon, "explocryo-equip", {
  load: function(){
    this.region = Core.atlas.find("vanilla-upgraded-explocryo-equip");
  }
});
exploCryoEquipe.bullet = CryoExploBullet;
exploCryoEquipe.alternate = true;
exploCryoEquipe.reload = 700;
exploCryoEquipe.lenght = 12;
exploCryoEquipe.width = 18;
exploCryoEquipe.shootSound = Sounds.shootBig;
exploCryoEquipe.recoil = 5.5;

const exploCryoBase = prov(() => new JavaAdapter(GroundUnit, {
  onDeath(){
        Sounds.explosionbig.at(this);
        for(var i = 0; i < 1000; i++){
            Calls.createBullet(Bullets.cryoShot, this.getTeam(), this.x, this.y, Mathf.random(360), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
		}
		this.super$onDeath();
}}));   

const exploCryo = extendContent(UnitType, "explocryo", {
  load(){
    this.weapon.load();
    this.region = Core.atlas.find(this.name);
    this.legRegion = Core.atlas.find(this.name + "-leg");
    this.baseRegion = Core.atlas.find(this.name + "-base");
  },
  generateIcons(){
  return[
    Core.atlas.find("vanilla-upgraded-explocryo-equip"),
    Core.atlas.find(this.name)
  ];}
});
exploCryo.create(exploCryoBase);
exploCryo.weapon = exploCryoEquipe;
exploCryo.health = 3600;
exploCryo.mass = 8;
exploCryo.speed = 0.05;
exploCryo.hitsize = 5;
exploCryo.drag = 0.12;
exploCryo.range = 48;
exploCryo.maxVelocity = 0.9;
exploCryo.shootCone = 60;
exploCryo.rotatespeed = 0.03;
exploCryo.baseRotateSpeed = 0.03;
exploCryo.immunities = ObjectSet.with(StatusEffects.freezing, StatusEffects.burning, StatusEffects.melting);
exploCryo.targetAir = true;
exploCryo.targetGround = true;

const exploCryoFac = extendContent(UnitFactory, "explocryo-fac", {})
exploCryoFac.unitType = exploCryo;