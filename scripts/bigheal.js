const bigBase = prov(() => new JavaAdapter(RepairDrone, {
  onDeath(){
        Sounds.explosionbig.at(this);
        for(var i = 0; i < 12; i++){
            Calls.createBullet(Bullets.healBulletBig, this.getTeam(), this.x, this.y, Mathf.random(360), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
		}
		this.super$onDeath();
}}));   

const bigHeal = extendContent(UnitType, "bigheal", {});
bigHeal.create(bigBase);

const bigFac = extendContent(UnitFactory, "bigheal-factory", {});
bigFac.unitType = bigHeal;