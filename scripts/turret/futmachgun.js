const Multi = require("rest/multilib");

const surgeAmmo = extend(BasicBulletType, {});
surgeAmmo.speed = 9;
surgeAmmo.bulletHeight = 9;
surgeAmmo.bulletWidth = 17;
surgeAmmo.lifetime = 60;
surgeAmmo.damage = 5;
surgeAmmo.knockback = 0.5;
surgeAmmo.hitSize = 12;
surgeAmmo.frontColor = Multi.surgealloy;
surgeAmmo.backColor = Multi.surgealloy;
surgeAmmo.shootEffect = Fx.explosion;
surgeAmmo.hitEffect = Fx.bigShockwave;
surgeAmmo.fragBullets = 1;
surgeAmmo.fragBullet = Bullets.arc;

const plastaAmmo = extend(BasicBulletType, {});
plastaAmmo.speed = 9;
plastaAmmo.bulletHeight = 9;
plastaAmmo.bulletWidth = 17;
plastaAmmo.lifetime = 60;
plastaAmmo.damage = 4;
plastaAmmo.knockback = 0.8;
plastaAmmo.hitSize = 12;
plastaAmmo.frontColor = Multi.plastanium;
plastaAmmo.backColor = Multi.plastanium;
plastaAmmo.shootEffect = Fx.explosion;
plastaAmmo.hitEffect = Fx.bigShockwave;

const supraAmmo = extend(BasicBulletType, {});
supraAmmo.speed = 10;
supraAmmo.bulletHeight = 11;
supraAmmo.bulletWidth = 21;
supraAmmo.lifetime = 60;
supraAmmo.damage = 7;
supraAmmo.knockback = 1.2;
supraAmmo.hitSize = 12;
supraAmmo.frontColor = Multi.alisupra;
supraAmmo.backColor = Multi.alisupra;
supraAmmo.shootEffect = Fx.explosion;
supraAmmo.hitEffect = Fx.bigShockwave;
supraAmmo.fragBullets = 4;
supraAmmo.fragBullet = Bullets.arc;

const pyraAmmo = extend(BasicBulletType, {});
pyraAmmo.speed = 9;
pyraAmmo.bulletHeight = 9;
pyraAmmo.bulletWidth = 17;
pyraAmmo.lifetime = 60;
pyraAmmo.damage = 4;
pyraAmmo.knockback = 0.5;
pyraAmmo.hitSize = 12;
pyraAmmo.frontColor = Multi.pyratite;
pyraAmmo.backColor = Multi.pyratite;
pyraAmmo.shootEffect = Fx.explosion;
pyraAmmo.hitEffect = Fx.bigShockwave;
pyraAmmo.fragBullets = 2;
pyraAmmo.fragBullet = Bullets.fireball;

const futmachgun = extendContent(ItemTurret, "futuristic-machine-gun", {
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