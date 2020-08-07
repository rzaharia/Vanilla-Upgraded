const colors = require("rest/colorlib");

const graphmine = extend(FlakBulletType, {
	hit(b, hitx, hity){
		const vec = new Vec2();
		if(hitx != null && hity != null){
			Effects.effect(this.hitEffect, hitx, hity);
			for (var i = 0; i <= 2; i++){
				Lightning.create(b.getTeam(), colors.graphite, 21, b.x + vec.x + Mathf.range(24.0), b.y + vec.y + Mathf.range(24.0), b.rot() + Mathf.range(46.0), 25);
			}
		}
	},

	load(){
      this.backRegion = Core.atlas.find("vanilla-upgraded-bullet-explo-back");
      this.frontRegion = Core.atlas.find("vanilla-upgraded-bullet-explo");
    },

	draw(b){
        Draw.color(colors.graphite);
        Draw.rect(this.backRegion, b.x, b.y, 6, 6, b.rot() - 90);
        Draw.color(colors.graphite);
        Draw.rect(this.frontRegion, b.x, b.y, 6, 6, b.rot() - 90);
        Draw.color();
	}
});
graphmine.drag = 0.033;
graphmine.explodeRange = 4;
graphmine.speed = 3;
graphmine.damage = 15;
graphmine.splashDamage = 5;
graphmine.splashDamageRadius = 10;
graphmine.bulletShrink = 0;
graphmine.hitSize = 4;
graphmine.knockback = 2;
graphmine.hitShake = Fx.none;
graphmine.hitEffect = Fx.flakExplosionBig;
graphmine.hitSound = Sounds.explosionbig;
graphmine.despawnEffect = Fx.flakExplosionBig;
graphmine.collidesTiles = true;
graphmine.collidesAir = true;
graphmine.lifetime = 1800;

const graphbomb = extend(ArtilleryBulletType, {});
graphbomb.speed = 6;
graphbomb.drag = 0.033;
graphbomb.damage = 40;
graphbomb.splashDamage = 10;
graphbomb.splashDamageRadius = 20;
graphbomb.bulletWidth = 20;
graphbomb.bulletHeight = 20;
graphbomb.lifetime = 160;
graphbomb.frontColor = colors.graphite;
graphbomb.backColor = colors.graphite;
graphbomb.shootEffect = Fx.none;
graphbomb.despawnEffect = Fx.none;
graphbomb.hitEffect = Fx.none;
graphbomb.pierce = false;
graphbomb.inaccuracy = 0;
graphbomb.keepVelocity = false;
graphbomb.fragBullets = 8;
graphbomb.fragVelocityMin = 0.1;
graphbomb.fragVelocityMax = 2;
graphbomb.fragBullet = graphmine;

const pyramine = extend(FlakBulletType, {
	hit(b, hitx, hity){
		const vec = new Vec2();
		if(hitx != null && hity != null){
			Effects.effect(this.hitEffect, hitx, hity);
			for (var i = 0; i <= 2; i++){
				Lightning.create(b.getTeam(), colors.pyratite, 21, b.x + vec.x + Mathf.range(24.0), b.y + vec.y + Mathf.range(24.0), b.rot() + Mathf.range(46.0), 25);
			}
			if(Mathf.chance(0.12)){
		  		Damage.createIncend(hitx, hity, 7, 1);
			}			
		}
	},

	load(){
      this.backRegion = Core.atlas.find("vanilla-upgraded-bullet-explo-back");
      this.frontRegion = Core.atlas.find("vanilla-upgraded-bullet-explo");
    },

	draw(b){
        Draw.color(colors.pyratite);
        Draw.rect(this.backRegion, b.x, b.y, 6, 6, b.rot() - 90);
        Draw.color(colors.pyratite);
        Draw.rect(this.frontRegion, b.x, b.y, 6, 6, b.rot() - 90);
        Draw.color();
	}
});
pyramine.drag = 0.033;
pyramine.explodeRange = 4;
pyramine.speed = 3;
pyramine.damage = 20;
pyramine.splashDamage = 5;
pyramine.splashDamageRadius = 10;
pyramine.bulletShrink = 0;
pyramine.hitSize = 4;
pyramine.knockback = 2;
pyramine.hitShake = Fx.none;
pyramine.hitEffect = Fx.flakExplosionBig;
pyramine.hitSound = Sounds.explosionbig;
pyramine.despawnEffect = Fx.flakExplosionBig;
pyramine.collidesTiles = true;
pyramine.collidesAir = true;
pyramine.lifetime = 1800;

const pyrabomb = extend(ArtilleryBulletType, {});
pyrabomb.speed = 6;
pyrabomb.drag = 0.033;
pyrabomb.damage = 50;
pyrabomb.splashDamage = 10;
pyrabomb.splashDamageRadius = 20;
pyrabomb.bulletWidth = 20;
pyrabomb.bulletHeight = 20;
pyrabomb.lifetime = 160;
pyrabomb.frontColor = colors.pyratite;
pyrabomb.backColor = colors.pyratite;
pyrabomb.shootEffect = Fx.none;
pyrabomb.despawnEffect = Fx.none;
pyrabomb.hitEffect = Fx.none;
pyrabomb.pierce = false;
pyrabomb.inaccuracy = 0;
pyrabomb.keepVelocity = false;
pyrabomb.fragBullets = 8;
pyrabomb.fragVelocityMin = 0.1;
pyrabomb.fragVelocityMax = 2;
pyrabomb.fragBullet = pyramine;

const vibroEffect = newEffect(70, e => {
    Draw.color(Color.white, colors.vibrocyan, e.fin());
    Lines.stroke(e.fout() * 10);
    Lines.circle(e.x, e.y, e.fin() * 40);
});

const vibromine = extend(FlakBulletType, {
	hit(b, hitx, hity){
		const vec = new Vec2();
		if(hitx != null && hity != null){
			Effects.effect(vibroEffect, hitx, hity);
			for (var i = 0; i <= 2; i++){
				Lightning.create(b.getTeam(), colors.vibrocyan, 21, b.x + vec.x + Mathf.range(24.0), b.y + vec.y + Mathf.range(24.0), b.rot() + Mathf.range(46.0), 25);
			}		
		}
	},

	load(){
      this.backRegion = Core.atlas.find("vanilla-upgraded-bullet-explo-back");
      this.frontRegion = Core.atlas.find("vanilla-upgraded-bullet-explo");
    },

	draw(b){
        Draw.color(colors.vibrocyan);
        Draw.rect(this.backRegion, b.x, b.y, 6, 6, b.rot() - 90);
        Draw.color(colors.vibrocyan);
        Draw.rect(this.frontRegion, b.x, b.y, 6, 6, b.rot() - 90);
        Draw.color();
	}
});
vibromine.drag = 0.033;
vibromine.explodeRange = 4;
vibromine.speed = 3;
vibromine.damage = 25;
vibromine.splashDamage = 5;
vibromine.splashDamageRadius = 10;
vibromine.bulletShrink = 0;
vibromine.hitSize = 4;
vibromine.knockback = 2;
vibromine.hitShake = Fx.none;
vibromine.hitEffect = Fx.flakExplosionBig;
vibromine.hitSound = Sounds.explosionbig;
vibromine.despawnEffect = Fx.flakExplosionBig;
vibromine.collidesTiles = true;
vibromine.collidesAir = true;
vibromine.lifetime = 1800;

const vibrobomb = extend(ArtilleryBulletType, {});
vibrobomb.speed = 6;
vibrobomb.drag = 0.033;
vibrobomb.damage = 60;
vibrobomb.splashDamage = 10;
vibrobomb.splashDamageRadius = 20;
vibrobomb.bulletWidth = 20;
vibrobomb.bulletHeight = 20;
vibrobomb.lifetime = 160;
vibrobomb.frontColor = colors.vibrocyan;
vibrobomb.backColor = colors.vibrocyan;
vibrobomb.shootEffect = Fx.none;
vibrobomb.despawnEffect = Fx.none;
vibrobomb.hitEffect = Fx.none;
vibrobomb.pierce = false;
vibrobomb.inaccuracy = 0;
vibrobomb.keepVelocity = false;
vibrobomb.fragBullets = 8;
vibrobomb.fragVelocityMin = 0.1;
vibrobomb.fragVelocityMax = 2;
vibrobomb.fragBullet = vibromine;

const heavyImpact = newEffect(70, e => {
    Draw.color(Color.valueOf("0d001c"), Color.valueOf("14002b"), e.fin());
    Lines.stroke(e.fout() * 10);
    Lines.circle(e.x, e.y, e.fin() * 40);
});

const heavymine = extend(FlakBulletType, {
	hit(b, hitx, hity){
		const vec = new Vec2();
		if(hitx != null && hity != null){
			Effects.effect(heavyImpact, hitx, hity);
			for (var i = 0; i <= 2; i++){
				Lightning.create(b.getTeam(), colors.obsidian, 28, b.x + vec.x + Mathf.range(24.0), b.y + vec.y + Mathf.range(24.0), b.rot() + Mathf.range(46.0), 25);
			}		
		}
	},

	load(){
      this.backRegion = Core.atlas.find("vanilla-upgraded-bullet-explo-back");
      this.frontRegion = Core.atlas.find("vanilla-upgraded-bullet-explo");
    },

	draw(b){
        Draw.color(colors.obsidian);
        Draw.rect(this.backRegion, b.x, b.y, 8, 8, b.rot() - 90);
        Draw.color(colors.obsidian);
        Draw.rect(this.frontRegion, b.x, b.y, 8, 8, b.rot() - 90);
        Draw.color();
	}
});
heavymine.drag = 0.033;
heavymine.explodeRange = 4;
heavymine.speed = 3;
heavymine.damage = 30;
heavymine.splashDamage = 5;
heavymine.splashDamageRadius = 10;
heavymine.bulletShrink = 0;
heavymine.hitSize = 4;
heavymine.knockback = 2;
heavymine.hitShake = Fx.none;
heavymine.hitEffect = Fx.flakExplosionBig;
heavymine.hitSound = Sounds.explosionbig;
heavymine.despawnEffect = Fx.flakExplosionBig;
heavymine.collidesTiles = true;
heavymine.collidesAir = true;
heavymine.lifetime = 1800;

const heavybomb = extend(ArtilleryBulletType, {});
heavybomb.speed = 6;
heavybomb.drag = 0.033;
heavybomb.damage = 70;
heavybomb.splashDamage = 10;
heavybomb.splashDamageRadius = 20;
heavybomb.bulletWidth = 25;
heavybomb.bulletHeight = 25;
heavybomb.lifetime = 160;
heavybomb.frontColor = colors.obsidian;
heavybomb.backColor = colors.obsidian;
heavybomb.shootEffect = Fx.none;
heavybomb.despawnEffect = Fx.none;
heavybomb.hitEffect = Fx.none;
heavybomb.pierce = false;
heavybomb.inaccuracy = 0;
heavybomb.keepVelocity = false;
heavybomb.fragBullets = 8;
heavybomb.fragVelocityMin = 0.1;
heavybomb.fragVelocityMax = 2;
heavybomb.fragBullet = heavymine;

const bombTurret = extendContent(ItemTurret, "bombturret", {
	init(){
		this.ammo(
			Items.graphite, graphbomb,
			Items.pyratite, pyrabomb,
			Vars.content.getByName(ContentType.item, "vanilla-upgraded-vibro"), vibrobomb,
			Vars.content.getByName(ContentType.item, "vanilla-upgraded-obsidienne"), heavybomb
		);
		this.super$init();
	}
});