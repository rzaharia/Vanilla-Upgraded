const futsniper = extendContent(ItemTurret, "futuristic-sniper", {
	load(){
		this.super$load();

		this.region = Core.atlas.find(this.name);
		this.baseRegion = Core.atlas.find("vanilla-upgraded-futuristic-block-4");
	},

	icons(){
	return [
		Core.atlas.find("vanilla-upgraded-futuristic-block-4"),
		Core.atlas.find(this.name)
	];}
});