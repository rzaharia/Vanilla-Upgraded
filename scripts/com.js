const Usinearesist = extendContent(GenericSmelter, "Usinearesist", {	
	load: function(){
		this.region = Core.atlas.find(this.name);
		this.region1 = Core.atlas.find(this.name + "1");
        this.rimRegions = Core.atlas.find(this.name + "-frameno");
        this.rimRegions1 = Core.atlas.find(this.name + "-frameno2");
        this.rimRegions2 = Core.atlas.find(this.name + "-frameno1");
        this.rimRegions3 = Core.atlas.find(this.name + "-frameno3");
        this.for = Core.atlas.find(this.name + "-fram");

	},
	

	generateIcons: function(){
	return [
		Core.atlas.find("vanilla-upgraded-Usinearesist")
	];},
	
	draw: function(tile){
		entity = tile.ent();

		Draw.rect(this.region, tile.drawx(), tile.drawy());
		Draw.rect(this.for, tile.drawx(), tile.drawy());
		Draw.rect(this.rimRegions, tile.drawx(), tile.drawy(), 20.0 + Mathf.absin(Time.time(), 10.0, 5.0), 20.0 + Mathf.absin(Time.time(), 10.0, 5.0));
		Draw.blend();
		Draw.rect(this.rimRegions1, tile.drawx(), tile.drawy(), 20.0 + Mathf.absin(Time.time(), 11.0, 6.0), 20.0 + Mathf.absin(Time.time(), 11.0, 6.0));
		Draw.blend();
		Draw.rect(this.rimRegions2, tile.drawx(), tile.drawy(), 20.0 + Mathf.absin(Time.time(), 12.0, 7.0), 20.0 + Mathf.absin(Time.time(), 12.0, 7.0));
		Draw.blend();
		Draw.rect(this.rimRegions3, tile.drawx(), tile.drawy(), 20.0 + Mathf.absin(Time.time(), 13.0, 8.0), 20.0 + Mathf.absin(Time.time(), 13.0, 8.0));
		Draw.blend();
		Draw.rect(this.region1, tile.drawx(), tile.drawy());
	}
});