const shield = extendContent(ForceProjector, "upg-shield", {
  load(){
    this.super$load();
    
    this.baseRegion = Core.atlas.find("vanilla-upgraded-upg-shield");
    this.teamRegion = Core.atlas.find("vanilla-upgraded-upg-shield-team");
  },
  
  generateIcons: function(){
  return [
    Core.atlas.find("vanilla-upgraded-upg-shield"),
    Core.atlas.find("vanilla-upgraded-upg-shield-team")
  ];},
  
  draw(tile) {
      Draw.rect(this.baseRegion, tile.drawx(), tile.drawy());
      Draw.color(tile.getTeam().color);
      Draw.rect(this.teamRegion, tile.drawx(), tile.drawy());
      Draw.color();
  }
});
