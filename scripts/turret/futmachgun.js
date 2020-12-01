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
	];}
});