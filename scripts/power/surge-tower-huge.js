const tower = extendContent(PowerNode, "surge-tower-huge", {
  load(){
    this.super$load();
    
    this.baseRegion = Core.atlas.find("vanilla-upgraded-surge-tower-huge");
    this.teamRegion = Core.atlas.find("vanilla-upgraded-surge-tower-huge-team");
  },
  
  generateIcons: function(){
  return [
    Core.atlas.find("vanilla-upgraded-surge-tower-huge"),
    Core.atlas.find("vanilla-upgraded-surge-tower-huge-team")
  ];},
  
  draw(tile) {
      Draw.rect(this.baseRegion, tile.drawx(), tile.drawy());
      Draw.color(tile.getTeam().color);
      Draw.rect(this.teamRegion, tile.drawx(), tile.drawy());
      Draw.color();
  }
});
