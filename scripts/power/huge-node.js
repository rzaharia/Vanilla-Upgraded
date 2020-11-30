const hugenode = extendContent(PowerNode, "hugenode", {
	icons(){
 	return [
	  	Core.atlas.find(this.name),
	  	Core.atlas.find("vanilla-upgraded-hugenode-team")
	];}
});

hugenode.buildType = () => extendContent(PowerNode.PowerNodeBuild, hugenode, {
	draw() {
	    Draw.rect(Core.atlas.find("vanilla-upgraded-hugenode"), this.x, this.y);
	    Draw.color(this.team.color);
	    Draw.rect(Core.atlas.find("vanilla-upgraded-hugenode-team"), this.x, this.y);
	    Draw.color();
	}
});