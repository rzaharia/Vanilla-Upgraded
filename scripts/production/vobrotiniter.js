const vobrotiniter = extendContent(GenericSmelter, "vobrotiniter", {
	icons(){
	return [
		Core.atlas.find(this.name),
		Core.atlas.find(this.name + "-wheel"),
		Core.atlas.find(this.name + "-plate")
	];}
});
vobrotiniter.craftTime = 380;
vobrotiniter.update = true; 

vobrotiniter.buildType = () => extendContent(GenericSmelter.SmelterBuild, vobrotiniter, {
	draw(){
		var flameColor = Color.valueOf("ffc999");
		Draw.rect("vanilla-upgraded-vobrotiniter-base", this.x, this.y);
		Draw.rect("vanilla-upgraded-vobrotiniter-plate", this.x, this.y, this.totalProgress * 2);
		if(this.warmup > 0 && flameColor.a > 0.001){
			Draw.alpha(((1.0 - 0.3) + Mathf.absin(Time.time, 8.0, 0.3) + Mathf.random(0.06) - 0.06) * this.warmup);

			Draw.tint(flameColor);
			Draw.color(1.0, 1.0, 1.0, this.warmup);
			Draw.rect("vanilla-upgraded-vobrotiniter-pulse", this.x, this.y, 33.0 + Mathf.absin(Time.time, 5.0, 5.0), 33.0 + Mathf.absin(Time.time, 50.0, 5.0), this.totalProgress * 2);
		};
		Draw.color();
		Draw.rect("vanilla-upgraded-vobrotiniter-wheel", this.x, this.y, this.totalProgress / 2);
	}
});