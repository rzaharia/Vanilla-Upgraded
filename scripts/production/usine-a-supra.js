const Usineasupra = extendContent(GenericSmelter, "usineasupra", {	
	icons(){
	return [
		Core.atlas.find("vanilla-upgraded-usineasupra-topB")
	];}
});

Usineasupra.buildType = () => extendContent(GenericSmelter.SmelterBuild, Usineasupra, {
	draw(){
		Draw.rect("vanilla-upgraded-usineasupra", this.x, this.y);
		Draw.color();
		Draw.rect("vanilla-upgraded-usineasupra-rot", this.x, this.y, this.totalProgress * 2.2);
		Draw.rect("vanilla-upgraded-usineasupra-topB", this.x, this.y);
	}
});