package vanilla.entities.bullet;

import arc.*;
import arc.graphics.*;
import arc.graphics.g2d.*;
import arc.math.*;
import arc.util.*;
import mindustry.gen.*;
import mindustry.graphics.*;
import mindustry.entities.bullet.*;
import mindustry.content.*;
import mindustry.entities.*;


public class VanillaLaser extends BulletType{
	public float length;
	public Color[] colors;
	public float[] tscales;
	public float[] lenscales;

	public VanillaLaser(float speed, float damage){
        super(speed, damage);
    }

    @Override
    public void update(Bullet b){	
		if(b.timer.get(1, 29)){
			Damage.collideLine(b, b.team, hitEffect, b.x, b.y, b.rotation(), length, true);
		};
	}

	@Override
	public void hit(Bullet b, float x, float y){
        hitEffect.at(x, y, b.rotation());
    }

	@Override
	public void draw(Bullet b){

		float f = Mathf.curve(b.fin(), 0, 0.2f);
		float baseLen = this.length * f;


		Lines.lineAngle(b.x, b.y, b.rotation(), baseLen);
        for(int s = 0; s < 3; s++){
            Draw.color(colors[s]);
            for(int i = 0; i < 4; i++){
                Lines.stroke(7 * b.fout() * (s == 0 ? 1.5f : s == 1 ? 1 : 0.3f) * tscales[i]);
                Lines.lineAngle(b.x, b.y, b.rotation(), baseLen * lenscales[i]);
            }
        }
        Draw.reset();
	}
}