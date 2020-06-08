const TestScript = extendContent(GenericSmelter, "testscript", {
  load: function(){
    this.region1 = Core.atlas.find(this.name);
    this.region = Core.atlas.find(this.name + "1");
    this.topRegion = Core.atlas.find(this.name + "-top");
    
  },
  
  generateIcon: function(){
  return [
    Core.atlas.find("vanilla-uptaded-TestScript-top")  
  ];},
  
  draw: function(tile){
    entity = tile.ent();
    
    Draw.rect(this.region1, tile.drawx(), tile.drawy());
    Draw.rect(this.region, tile.drawx(), tile.drawy(), entity.totalProgress * 2.2);
    Draw.rect(this.topRegion, tile.drawx(), tile.drawy(), 20.0 + Mathf.absin(Time.time(), 10.0, 5.0), 20.0 + Mathf.absin(Time.time(), 10.0, 5.0), entity.totalProgress / 2.2);
    Draw.blend();
  },
 });