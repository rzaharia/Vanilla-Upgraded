const Multi = require("rest/multilib");

const surgeAmmo = extend(BasicBulletType, {});
surgeAmmo.speed = 28;
surgeAmmo.bulletHeight = 30;
surgeAmmo.bulletWidth = 17;
surgeAmmo.lifetime = 100;
surgeAmmo.damage = 175;
surgeAmmo.knockback = 0.5;
surgeAmmo.hitSize = 12;
surgeAmmo.frontColor = Multi.surgealloy;
surgeAmmo.backColor = Multi.surgealloy;
surgeAmmo.shootEffect = Fx.explosion;
surgeAmmo.hitEffect = Fx.bigShockwave;
surgeAmmo.fragBullets = 6;
surgeAmmo.fragBullet = Bullets.arc;

const plastaAmmo = extend(BasicBulletType, {});
plastaAmmo.speed = 28;
plastaAmmo.bulletHeight = 26;
plastaAmmo.bulletWidth = 13;
plastaAmmo.lifetime = 100;
plastaAmmo.damage = 175;
plastaAmmo.knockback = 0.8;
plastaAmmo.hitSize = 12;
plastaAmmo.frontColor = Multi.plastanium;
plastaAmmo.backColor = Multi.plastanium;
plastaAmmo.shootEffect = Fx.explosion;
plastaAmmo.hitEffect = Fx.bigShockwave;

const supraAmmo = extend(BasicBulletType, {});
supraAmmo.speed = 34;
supraAmmo.bulletHeight = 29;
supraAmmo.bulletWidth = 13;
supraAmmo.lifetime = 100;
supraAmmo.damage = 225;
supraAmmo.knockback = 1.2;
supraAmmo.hitSize = 12;
supraAmmo.frontColor = Multi.alisupra;
supraAmmo.backColor = Multi.alisupra;
supraAmmo.shootEffect = Fx.explosion;
supraAmmo.hitEffect = Fx.bigShockwave;
supraAmmo.fragBullets = 16;
supraAmmo.fragBullet = Bullets.arc;

const pyraAmmo = extend(BasicBulletType, {});
pyraAmmo.speed = 28;
pyraAmmo.bulletHeight = 28;
pyraAmmo.bulletWidth = 15;
pyraAmmo.lifetime = 100;
pyraAmmo.damage = 150;
pyraAmmo.knockback = 0.5;
pyraAmmo.hitSize = 12;
pyraAmmo.frontColor = Multi.pyratite;
pyraAmmo.backColor = Multi.pyratite;
pyraAmmo.shootEffect = Fx.explosion;
pyraAmmo.hitEffect = Fx.bigShockwave;
pyraAmmo.fragBullets = 50;
pyraAmmo.fragBullet = Bullets.fireball;

const futsniper = extendContent(BurstTurret, "futuristic-sniper", {
	load(){
		this.super$load();

		this.region = Core.atlas.find(this.name);
		this.baseRegion = Core.atlas.find("vanilla-upgraded-futuristic-block-4");
	},

	generateIcons(){
	return [
		Core.atlas.find("vanilla-upgraded-futuristic-block-4"),
		Core.atlas.find(this.name)
	];},

	init(){
		this.ammo(
			Items.surgealloy, surgeAmmo,
			Items.plastanium, plastaAmmo,
			Vars.content.getByName(ContentType.item, "vanilla-upgraded-aliage-supra"), supraAmmo,
			Items.pyratite, pyraAmmo
		);
		this.super$init();
	}
});