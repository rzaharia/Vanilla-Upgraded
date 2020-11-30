const shield = extendContent(ForceProjector, "upg-shield", {
    icons(){
    return [
        Core.atlas.find(this.name),
        Core.atlas.find("vanilla-upgraded-upg-shield-team")
    ];},

    draw() {
        Draw.rect(Core.atlas.find("vanilla-upgraded-upg-shield"), this.x, this.y);
        Draw.color(this.team.color);
        Draw.rect(Core.atlas.find("vanilla-upgraded-upg-shield-team"), this.x, this.y);
        Draw.color();
    }
});