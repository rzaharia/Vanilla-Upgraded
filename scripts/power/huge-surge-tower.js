const tower = extendContent(PowerNode, "surge-tower-huge", {
  icons(){
  return [
    Core.atlas.find("vanilla-upgraded-surge-tower-huge"),
    Core.atlas.find("vanilla-upgraded-surge-tower-huge-team")
  ];},
});

tower.buildType = () => extendContent(PowerNode.PowerNodeBuild, tower, {
  draw() {
      Draw.rect(Core.atlas.find("vanilla-upgraded-surge-tower-huge"), this.x, this.y);
      Draw.color(this.team.color);
      Draw.rect(Core.atlas.find("vanilla-upgraded-surge-tower-huge-team"), this.x, this.y);
      Draw.color();
  }
});
