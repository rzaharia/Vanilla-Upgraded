const Usineasupra = extendContent(GenericSmelter, "usineasupra", {	
	load(){
		this.region = Core.atlas.find(this.name);
		this.topRegionB = Core.atlas.find(this.name + "-topB");
		this.rimRegion = Core.atlas.find(this.name + "-rot");
	},
	
	generateIcons(){
	return [
		Core.atlas.find("vanilla-upgraded-usineasupra-topB")
	];},
	
	draw(tile){
		entity = tile.ent();
		
		Draw.rect(this.region, tile.drawx(), tile.drawy());
		Draw.color();
		Draw.rect(this.rimRegion, tile.drawx(), tile.drawy(), entity.totalProgress * 2.2);
		Draw.rect(this.topRegionB, tile.drawx(), tile.drawy());
	}
});