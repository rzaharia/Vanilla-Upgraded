const usinearesist = extendContent(GenericSmelter, "usinearesist", {
	icons(){
	return [
		Core.atlas.find(this.name),
		Core.atlas.find("vanilla-upgraded-usinearesist-wheel"),
		Core.atlas.find("vanilla-upgraded-usinearesist-plate")
	];}
});
usinearesist.craftTime = 380;
usinearesist.update = true;
usinearesist.frameRegions = [];

usinearesist.buildType = () => extendContent(GenericSmelter.SmelterBuild, usinearesist, {
	draw(){
		var flameColor = Color.valueOf("ffc999");

		Draw.rect("vanilla-upgraded-usinearesist-base", this.x, this.y);
		Draw.blend(Blending.additive);
		Draw.alpha((0.5 + Mathf.absin(Time.time, 5, 0.5)) * this.heat);
		Draw.rect("vanilla-upgraded-usinearesist-lights", this.x, this.y);
		Draw.blend();
		Draw.color();
		Draw.rect("vanilla-upgraded-usinearesist-wheel", this.x, this.y, this.totalProgress / 2);
		Draw.rect("vanilla-upgraded-usinearesist-plate", this.x, this.y, this.totalProgress * 2);
		if(this.warmup > 0 && flameColor.a > 0.001){
			Draw.alpha(((1.0 - 0.3) + Mathf.absin(Time.time, 8.0, 0.3) + Mathf.random(0.06) - 0.06) * this.warmup);

			Draw.tint(flameColor);
			Draw.color(1.0, 1.0, 1.0, this.warmup);
			Draw.rect("vanilla-upgraded-usinearesist-plate-lights", this.x, this.y, 23.0 + Mathf.absin(Time.time, 10.0, 5.0), 23.0 + Mathf.absin(Time.time, 10.0, 5.0), this.totalProgress * 2);
			Draw.rect("vanilla-upgraded-usinearesist-wheel-lights", this.x, this.y, 30.5 + Mathf.absin(Time.time, 5.0, 2.5), 30.5 + Mathf.absin(Time.time, 5.0, 2.5), this.totalProgress / 2);
			Draw.rect("vanilla-upgraded-usinearesist-lights", this.x, this.y, 31.5 + Mathf.absin(Time.time, 1.2, 1.1), 31.5 + Mathf.absin(Time.time, 1.2, 1.1));
		};
		Draw.color();
	}
});