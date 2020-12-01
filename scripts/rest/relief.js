const ReliefDs = extendContent(Floor, "reliefds",{
  load(){
    this.super$load();
        
    this.region = Core.atlas.find(this.name);
  },
    
  icons(){
  return [
    Core.atlas.find("vanilla-upgraded-edgu"),
    Core.atlas.find("vanilla-upgraded-reliefds1")
  ];},
    
});

const ReliefM = extendContent(Floor, "reliefm",{
  load(){
    this.super$load();
        
    this.region = Core.atlas.find(this.name);
  },
    
  icons(){
  return [
    Core.atlas.find("vanilla-upgraded-edgu"),
    Core.atlas.find("vanilla-upgraded-reliefm1")
  ];},
    
});

const ReliefN = extendContent(Floor, "reliefn",{
  load(){
    this.super$load();
        
    this.region = Core.atlas.find(this.name);
  },
    
  icons(){
  return [
    Core.atlas.find("vanilla-upgraded-edgu"),
    Core.atlas.find("vanilla-upgraded-reliefn1")
  ];},
    
});

const ReliefP = extendContent(Floor, "reliefp",{
  load(){
    this.super$load();
        
    this.region = Core.atlas.find(this.name);
  },
    
  icons(){
  return [
    Core.atlas.find("vanilla-upgraded-edgu"),
    Core.atlas.find("vanilla-upgraded-reliefp1")
  ];},
    
});

const reliefS = extendContent(Floor, "reliefs",{
  load(){
    this.super$load();
        
    this.region = Core.atlas.find(this.name);
  },
    
  icons(){
  return [
    Core.atlas.find("vanilla-upgraded-edgu"),
    Core.atlas.find("vanilla-upgraded-reliefs1")
  ];},
    
});

const ReliefSel = extendContent(Floor, "reliefsel",{
  load(){
    this.super$load();
        
    this.region = Core.atlas.find(this.name);
  },
    
  icons(){
  return [
    Core.atlas.find("vanilla-upgraded-edgu"),
    Core.atlas.find("vanilla-upgraded-reliefsel")
  ];},
    
});

const ReliefSh = extendContent(Floor, "reliefsh",{
  load(){
    this.super$load();
        
    this.region = Core.atlas.find(this.name);
  },
    
  icons(){
  return [
    Core.atlas.find("vanilla-upgraded-edgu"),
    Core.atlas.find("vanilla-upgraded-reliefsh1")
  ];},
    
});
