const hugevault = extendContent(StorageBlock, "hugevault", {
    icons(){
    return [
        Core.atlas.find(this.name),
        Core.atlas.find("vanilla-upgraded-hugevault-team")
    ];},

    draw() {
        Draw.rect(Core.atlas.find("vanilla-upgraded-hugevault"), this.x, this.y);
        Draw.color(this.team.color);
        Draw.rect(Core.atlas.find("vanilla-upgraded-hugevault-team"), this.x, this.y);
        Draw.color();
    }
});