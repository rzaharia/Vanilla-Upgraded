const v = extendContent(GenericSmelter, "vobrotiniter", {
	load(){
		this.super$load();
		
		this.baseRegion = Core.atlas.find(this.name + "-base");
		this.pulseRegion = Core.atlas.find(this.name + "-pulse");
		this.region = Core.atlas.find("clear");
		this.wheelRegion = Core.atlas.find(this.name + "-wheel");
		this.plateRegion = Core.atlas.find(this.name + "-plate");
	},
	
	generateIcons(){
	return [
		Core.atlas.find(this.name),
		Core.atlas.find(this.name + "-wheel"),
		Core.atlas.find(this.name + "-plate")
	];},
	
	draw: function(tile){
		entity = tile.ent();
		
		Draw.rect(this.baseRegion, tile.drawx(), tile.drawy());
		Draw.rect(this.plateRegion, tile.drawx(), tile.drawy(), tile.entity.totalProgress * 2);
		if(entity.warmup > 0 && this.flameColor.a > 0.001){
			const g = 0.3;
			const r = 0.06;
			const cr = Mathf.random(0.1);

			Draw.alpha(((1.0 - g) + Mathf.absin(Time.time(), 8.0, g) + Mathf.random(r) - r) * entity.warmup);

			Draw.tint(this.flameColor);
			Draw.color(1.0, 1.0, 1.0, entity.warmup);
			Draw.rect(this.pulseRegion, tile.drawx(), tile.drawy(), 33.0 + Mathf.absin(Time.time(), 5.0, 5.0), 33.0 + Mathf.absin(Time.time(), 50.0, 5.0), tile.entity.totalProgress * 2);
		};
		Draw.color();
		Draw.rect(this.wheelRegion, tile.drawx(), tile.drawy(), tile.entity.totalProgress / 2);
	},
});
vobrotiniter.craftTime = 380;
vobrotiniter.update = true; 