const v = extendContent(GenericSmelter, "v", {
	load(){
		this.super$load();
		
		this.baseRegion = Core.atlas.find(this.name + "-base");
		this.baseLiquidRegion = Core.atlas.find(this.name + "-base-liquid");
		this.region = Core.atlas.find("clear");
		this.wheelRegion = Core.atlas.find(this.name + "-wheel");
		this.plateRegion = Core.atlas.find(this.name + "-plate");
		this.plateLiquidRegion = Core.atlas.find(this.name + "-plate-liquid");
		this.wheelLiquidRegion = Core.atlas.find(this.name + "-wheel-liquid");
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
		Draw.rect(this.wheelRegion, tile.drawx(), tile.drawy(), tile.entity.totalProgress / 2);
		Draw.rect(this.plateRegion, tile.drawx(), tile.drawy(), tile.entity.totalProgress * 2);
	},
});
v.craftTime = 380;
v.update = true; 