const soundEffect = newEffect(20, e => {
    Draw.color(Color.white, Color.blue, e.fin()); // цвет меняется с белого на светло-серый
    Lines.stroke(e.fout() * 10); // толщина линии изменяется от 3 до 0
    Lines.circle(e.x, e.y, e.fin() * 21); // рисуем круг с радиусом от 0 до 100
});
const damage = 35;
const tileDamage = 0;
const cooldown = 11;
const sm = extendContent(ShockMine, "soundmine", {

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
        
        Draw.rect(this.regionLight, tile.drawx(), tile.drawy(), 10.5 + Mathf.absin(Time.time(), 1.2, 1.1), 10.5 + Mathf.absin(Time.time(), 1.2, 1.1));

    },

    unitOn(tile, unit) {
        if (tile.entity.timer.get(0.1, cooldown)) {
            unit.damage(damage);
            tile.entity.damage(tileDamage);
            Effects.effect(soundEffect, tile)
        }
    }
});
