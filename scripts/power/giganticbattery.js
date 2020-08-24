var reload = 0;

const giganticbattery = extendContent(Battery, "batterie-6", {
	drawSelect(tile) {
        Drawf.dashCircle(tile.drawx(), tile.drawy(), this.range, tile.getTeam().color);
    },

    drawPlace(x, y) {
        Drawf.dashCircle(x * Vars.tilesize + this.offset(), y * Vars.tilesize + this.offset(), this.range, Pal.placing);
    },

    update(tile) {
    	this.super$update(tile);

    	const entity = tile.ent();
    	const power = entity.power.graph.getBatteryStored();

    	if (Units.closestTarget(tile.getTeam(), tile.getX(), tile.getY(), this.range)) {
	    	if (power >= 100000) {
		        if (reload >= this.reload) {

		        	for (var i = 0; i < 50; i++) {
		            	Lightning.create(tile.getTeam(), tile.getTeam().color, 40, tile.getX(), tile.getY(), Mathf.random(360), 25);
		            };

					reload = 0;
				} else {
				    reload += Time.delta() * this.baseReloadSpeed(tile);
			    }
		    } 
		}
    },

    baseReloadSpeed(tile) {
    	const entity = tile.ent();
    	const power = entity.power.graph.getBatteryStored();

    	if (power >= 500000) {
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
giganticbattery.range = 150;
giganticbattery.reload = 120;
giganticbattery.consumes.powerBuffered(500000);