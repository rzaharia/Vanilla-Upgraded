const conveyor = extendContent(Conveyor, "hermetique-conveyor", {
    icons(){
	return [
		Core.atlas.find(this.name),
		Core.atlas.find(this.name + "-top")
	];}
});

conveyor.buildType = () => extendContent(Conveyor.ConveyorBuild, conveyor, {
	draw(){
		this.super$draw();
		Draw.z(Layer.blockOver);
		Draw.rect(Core.atlas.find("vanilla-upgraded-hermetique-conveyor-top"), this.x, this.y);
    },

    unitOn(){}
});

const conduit = extendContent(Conduit, "hermetique-conduit", {
    icons(){
	return [
		Core.atlas.find("vanilla-upgraded-hermetique-conduit-top-0"),
		Core.atlas.find("vanilla-upgraded-hermetique-conveyor-top")
	];}
});

conduit.buildType = () => extendContent(Conduit.ConduitBuild, conduit, {
	draw(){
		this.super$draw();
		Draw.z(Layer.blockOver);
		Draw.rect(Core.atlas.find("vanilla-upgraded-hermetique-conveyor-top"), this.x, this.y);
    },
});