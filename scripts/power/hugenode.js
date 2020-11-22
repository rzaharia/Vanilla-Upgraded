const hugenode = extendContent(PowerNode, "hugenode", {
	load(){
	  	this.super$load();
	    
	  	this.baseRegion = Core.atlas.find(this.name);
	  	this.teamRegion = Core.atlas.find("vanilla-upgraded-hugenode-team");
	},
	  
	generateIcons: function(){
 	return [
	  	Core.atlas.find(this.name),
	  	Core.atlas.find("vanilla-upgraded-hugenode-team")
	];},
	  
	draw(tile) {
	    Draw.rect(this.baseRegion, tile.drawx(), tile.drawy());
	    Draw.color(tile.getTeam().color);
	    Draw.rect(this.teamRegion, tile.drawx(), tile.drawy());
	    Draw.color();
	}
});