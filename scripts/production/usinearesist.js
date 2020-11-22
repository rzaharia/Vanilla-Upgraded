const usinearesist = extendContent(GenericSmelter, "usinearesist", {
	load(){
		this.super$load();
		
		this.baseRegion = Core.atlas.find(this.name + "-base");
		this.region = Core.atlas.find("clear");
		this.regionLights = Core.atlas.find(this.name + "-lights");
		this.wheelRegion = Core.atlas.find(this.name + "-wheel");
		this.wheelRegionLights = Core.atlas.find(this.name + "-wheel-lights");
		this.plateRegion = Core.atlas.find(this.name + "-plate");
		this.plateRegionLights = Core.atlas.find(this.name + "-plate-lights");
	},
	
	generateIcons(){
	return [
		Core.atlas.find(this.name),
		Core.atlas.find(this.name + "-wheel"),
		Core.atlas.find(this.name + "-plate")
	];},
	
	draw(tile){
		entity = tile.ent();
		
		Draw.rect(this.baseRegion, tile.drawx(), tile.drawy());
		Draw.blend(Blending.additive);
		Draw.alpha((0.5 + Mathf.absin(Time.time(), 5, 0.5)) * entity.heat);
		Draw.rect(this.regionLights, tile.drawx(), tile.drawy());
		Draw.blend();
		Draw.color();
		Draw.rect(this.wheelRegion, tile.drawx(), tile.drawy(), tile.entity.totalProgress / 2);
		Draw.rect(this.plateRegion, tile.drawx(), tile.drawy(), tile.entity.totalProgress * 2);
		if(entity.warmup > 0 && this.flameColor.a > 0.001){
			const g = 0.3;
			const r = 0.06;
			const cr = Mathf.random(0.1);

			Draw.alpha(((1.0 - g) + Mathf.absin(Time.time(), 8.0, g) + Mathf.random(r) - r) * entity.warmup);

			Draw.tint(this.flameColor);
			Draw.color(1.0, 1.0, 1.0, entity.warmup);
			Draw.rect(this.plateRegionLights, tile.drawx(), tile.drawy(), 23.0 + Mathf.absin(Time.time(), 10.0, 5.0), 23.0 + Mathf.absin(Time.time(), 10.0, 5.0), tile.entity.totalProgress * 2);
			Draw.rect(this.wheelRegionLights, tile.drawx(), tile.drawy(), 30.5 + Mathf.absin(Time.time(), 5.0, 2.5), 30.5 + Mathf.absin(Time.time(), 5.0, 2.5), tile.entity.totalProgress / 2);
			Draw.rect(this.regionLights, tile.drawx(), tile.drawy(), 31.5 + Mathf.absin(Time.time(), 1.2, 1.1), 31.5 + Mathf.absin(Time.time(), 1.2, 1.1));
		};
		Draw.color();
	},
});
usinearesist.craftTime = 380;
usinearesist.update = true;
usinearesist.frameRegions = [];