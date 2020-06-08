const ReliefP = extendContent(Floor, "reliefp",{
  load(){
    this.super$load();
        
    this.region = Core.atlas.find(this.name);
  },
    
  generateIcons: function(){
  return [
    Core.atlas.find(modName + "-edgu"),
    Core.atlas.find(modName + "-reliefp")
  ];},
    
});