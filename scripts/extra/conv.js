const conveyor = extendContent(Conveyor, "hermetique-conveyor", {
	load(){
		this.super$load();
		this.topRegion = Core.atlas.find(this.name + "-top");
	},
	unitOn(){},
	drawLayer(tile){
		this.super$drawLayer(tile);
		Draw.rect(this.topRegion, tile.drawx(), tile.drawy());
    },
    generateIcons: function(){
	return [
		Core.atlas.find(this.name),
		Core.atlas.find(this.name + "-top")
	];}
});

const conduit = extendContent(Conduit, "hermetique-conduit", {
	load(){
        this.liquidRegion = Core.atlas.find("conduit-liquid");
        for(var i = 0; i < 6; i++){
            this.topRegions[i] = Core.atlas.find(this.name + "-top-" + i);
            this.botRegions[i] = Core.atlas.find(this.name + "-bottom-" + i);
        }
        this.glassRegion = Core.atlas.find("vanilla-upgraded-hermetique-conveyor-top");
    },
    draw(tile){
    	this.super$draw(tile);
    	Draw.rect(this.glassRegion, tile.drawx(), tile.drawy());
    }
});