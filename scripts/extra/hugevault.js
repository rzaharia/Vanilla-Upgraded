const hugevault = extendContent(Vault, "hugevault", {
	load(){
    this.super$load();
    
    this.baseRegion = Core.atlas.find(this.name);
    this.teamRegion = Core.atlas.find("vanilla-upgraded-hugevault-team");
  },
  
  generateIcons(){
  return [
    Core.atlas.find(this.name),
    Core.atlas.find("vanilla-upgraded-hugevault-team")
  ];},
  
  draw(tile) {
      Draw.rect(this.baseRegion, tile.drawx(), tile.drawy());
      Draw.color(tile.getTeam().color);
      Draw.rect(this.teamRegion, tile.drawx(), tile.drawy());
      Draw.color();
  }
});