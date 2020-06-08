// это НЕ полное определение для этого блока! см. content / blocks / scatter-silo.hjson для статистики и других свойств.

// создаем простой эффект ударной волны
const stEffect = newEffect(20, e => {
    Draw.color(Color.white, Color.blue, e.fin()); // цвет меняется с белого на светло-серый
    Lines.stroke(e.fout() * 60); // толщина линии изменяется от 3 до 0
    Lines.circle(e.x, e.y, e.fin() * 100); // рисуем круг с радиусом от 0 до 100
});

// создаем тип блока
const silos = extendContent(Block, "silos", {
    //override the method to build configuration
    buildConfiguration(tile, table){
        table.addImageButton(Icon.upOpen, Styles.clearTransi, run(() => {
            //configure the tile to signal that it has been pressed (this sync on client to server)
            tile.configure(0)
        })).size(50).disabled(boolf(b => tile.entity != null && !tile.entity.cons.valid()))
    },

    load(){
        this.super$load();
        
        this.region = Core.atlas.find(this.name);
        this.regionLight = Core.atlas.find(this.name + "-light");
    },

	generateIcons(){
	return [
		Core.atlas.find(this.name),
	];},

    draw: function(tile){
        entity = tile.ent();
        
        Draw.rect(this.region, tile.drawx(), tile.drawy());
        Draw.rect(this.regionLight, tile.drawx(), tile.drawy(), 31.5 + Mathf.absin(Time.time(), 1.2, 1.1), 31.5 + Mathf.absin(Time.time(), 1.2, 1.1));
    },

    // переопределить событие конфигурации
    configured(tile, value){
        // убедитесь, что в этом бункере есть предметы, необходимые для увольнения
        if(tile.entity.cons.valid()){
            // сделать так, чтобы этот эффект происходил в месте расположения плитки

            // создаем 10 пуль в месте этой плитки со случайным вращением и скоростью / временем жизни
            for(var i = 0; i < 100; i++){
                Calls.createBullet(Bullets.lancerLaser, tile.getTeam(), tile.drawx(), tile.drawy(), Mathf.random(500), Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0))
            }
            tile.entity.cons.trigger()
            sleep(1000)
            Effects.effect(stEffect, tile)
        }
    }
})

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}