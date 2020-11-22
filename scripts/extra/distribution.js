const conveyor = extendContent(Conveyor, "hermetique-conveyor", {
	load(){
		this.super$load();
		this.topRegion = Core.atlas.find(this.name + "-top");
	},

	unitOn(){},

	draw(tile){
		this.super$draw(tile);
		Draw.rect(this.topRegion, tile.drawx(), tile.drawy());
    },

    icons(){
	return [
		Core.atlas.find(this.name),
		Core.atlas.find(this.name + "-top")
	];}
});

const conduit = extendContent(Conduit, "hermetique-conduit", {
    load(){
    	this.super$load();
        this.glassRegion = Core.atlas.find("vanilla-upgraded-hermetique-conveyor-top");
    },

    icons(){
	return [
		Core.atlas.find("vanilla-upgraded-hermetique-conduit-top-0"),
		Core.atlas.find("vanilla-upgraded-hermetique-conveyor-top")
	];},

    draw(tile){
    	this.super$draw(tile);
    	Draw.rect(this.glassRegion, tile.drawx(), tile.drawy());
    }
});
