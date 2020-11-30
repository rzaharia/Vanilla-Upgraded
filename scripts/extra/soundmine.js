const soundEffect = new Effect(20, e => {
    Draw.color(Color.white, Color.blue, e.fin());
    Lines.stroke(e.fout() * 10);
    Lines.circle(e.x, e.y, e.fin() * 21);
});

const sm = extendContent(ShockMine, "soundmine", {
    icons(){
    return [
        Core.atlas.find(this.name),
    ];}
});

sm.buildType = () => extendContent(ShockMine.ShockMineBuild, sm, {
    draw(){
        this.super$draw();
        Draw.rect(Core.atlas.find("vanilla-upgraded-soundmine-light"), this.x, this.y, 10.5 + Mathf.absin(Time.time(), 1.2, 1.1), 10.5 + Mathf.absin(Time.time(), 1.2, 1.1));
    },

    unitOn(unit) {
        if (this.timer.get(0.1, 20)) {
            unit.damage(35);
            this.damage(2);
            Effect.create(soundEffect, this.x, this.y, 0, Color.white, null)
        }
    }
});