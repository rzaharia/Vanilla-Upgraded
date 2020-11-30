var reload = 0;

const giganticbattery = extendContent(Battery, "batterie-6", {
    drawPlace(x, y) {
        Drawf.dashCircle(x * Vars.tilesize + this.offset, y * Vars.tilesize + this.offset, 150, Pal.placing);
    }
});

giganticbattery.buildType = () => extendContent(Battery.BatteryBuild, giganticbattery, {
    drawSelect() {
        Drawf.dashCircle(this.x, this.y, 150, this.team.color);
    },

    update() {
        this.super$update();

        const power = this.power.graph.getBatteryStored();

        if (Units.closestTarget(this.team, this.getX(), this.getY(), 150)) {
            if (power >= 100000) {
                if (reload >= 120) {

                    for (var i = 0; i < 50; i++) {
                        Lightning.create(this.team, this.team.color, 40, this.getX(), this.getY(), Mathf.random(360), 25);
                    };

                    reload = 0;
                } else {
                    reload += Time.delta * this.baseReloadSpeed();
                }
            } 
        }
    },

    baseReloadSpeed() {
        const power = this.power.graph.getBatteryStored();

        if (power == 500000) {
            return 1.5;
        } else if (power >= 250000) {
            return 1;
        } else if (power >= 125000) {
            return 0.5;
        } else {
            return 0.2
        }
    }
});

giganticbattery.consumes.powerBuffered(500000);