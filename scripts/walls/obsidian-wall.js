// Obsidian Wall
const wallEffect = new Effect(60, e => {
    Draw.color(Pal.accent, Color.white, e.fslope());
    Draw.alpha(e.fout() * 0.5)
    Lines.stroke(2 * e.fslope());
    Draw.blend(Blending.additive);
    Lines.square(e.x, e.y, 5, e.fout());
    Draw.blend();
});

const wall = extendContent(Wall, "obsidian-wall", {});
wall.blockGround = BlockGroup.walls;
const wallAvoidDamage = 10;

wall.buildType = () => extendContent(Wall.WallBuild, wall, {
	collision(bullet){
		this.super$collision(bullet);

		if(Mathf.chance(wallAvoidDamage / 100)) {
			wallEffect.at(this.x, this.y);
			this.health += bullet.damage;
		}
		bullet.remove();
	}
});

// Large Obsidian Wall
const largeEffect = new Effect(60, e => {
    Draw.color(Pal.accent, Color.white, e.fslope());
    Draw.alpha(e.fout() * 0.5)
    Lines.stroke(2 * e.fslope());
    Draw.blend(Blending.additive);
    Lines.square(e.x, e.y, 10, e.fout());
    Draw.blend();
});

const large = extendContent(Wall, "large-obsidian-wall", {});
large.blockGround = BlockGroup.walls;
const largeAvoidDamage = 15;

large.buildType = () => extendContent(Wall.WallBuild, large, {
	collision(bullet){
		this.super$collision(bullet);

		if(Mathf.chance(largeAvoidDamage / 100)) {
			largeEffect.at(this.x, this.y);
			this.health += bullet.damage;
		}
		bullet.remove();
	}
});

// Huge Obsidian Wall
const hugeEffect = new Effect(60, e => {
    Draw.color(Pal.accent, Color.white, e.fslope());
    Draw.alpha(e.fout() * 0.5)
    Lines.stroke(2 * e.fslope());
    Draw.blend(Blending.additive);
    Lines.square(e.x, e.y, 15, e.fout());
    Draw.blend();
});

const huge = extendContent(Wall, "huge-obsidian-wall", {});
huge.blockGround = BlockGroup.walls;
const hugeAvoidDamage = 22.5;

huge.buildType = () => extendContent(Wall.WallBuild, huge, {
	collision(bullet){
		this.super$collision(bullet);

		if(Mathf.chance(hugeAvoidDamage / 100)) {
			hugeEffect.at(this.x, this.y);
			this.health += bullet.damage;
		}
		bullet.remove();
	}
});

// Gigantic Obsidian Wall
const giganticEffect = new Effect(60, e => {
    Draw.color(Pal.accent, Color.white, e.fslope());
    Draw.alpha(e.fout() * 0.5)
    Lines.stroke(2 * e.fslope());
    Draw.blend(Blending.additive);
    Lines.square(e.x, e.y, 20, e.fout());
    Draw.blend();
});

const gigantic = extendContent(Wall, "gigantic-obsidian-wall", {});
gigantic.blockGround = BlockGroup.walls;
const giganticAvoidDamage = 32.5;

gigantic.buildType = () => extendContent(Wall.WallBuild, gigantic, {
	collision(bullet){
		this.super$collision(bullet);

		if(Mathf.chance(giganticAvoidDamage / 100)) {
			giganticEffect.at(this.x, this.y);
			this.health += bullet.damage;
		}
		bullet.remove();
	}
});