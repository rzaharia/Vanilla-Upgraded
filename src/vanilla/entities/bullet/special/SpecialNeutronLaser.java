package vanilla.entities.bullet.special;

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
import vanilla.content.*;

public class SpecialNeutronLaser extends BulletType{
	public float length;

	public SpecialNeutronLaser(float speed, float damage){
        super(speed, damage);
    }

    @Override
    public void update(Bullet b){
		Effect.shake(1.2f, 1.2f, b.x, b.y);
		if(b.timer.get(1, 5)){
			Damage.collideLine(b, b.team, hitEffect, b.x, b.y, b.rotation(), length, true);
		};
		if(Mathf.chance(Time.delta * 0.3f)){
			Tmp.v2.trns(b.rotation() + 90.0f, Mathf.range(7.0f));
			Lightning.create(b.team, Color.blue, 22, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rotation(), Mathf.random(47, 52));
		};
		if(Mathf.chance(Time.delta * 0.2f)){
			Tmp.v2.trns(b.rotation(), Mathf.random(0.5f, 390.0f));
			Lightning.create(b.team, Color.white, 16, b.x + Tmp.v2.x, b.y + Tmp.v2.y, Mathf.random(360), 12);
		};
		if(Mathf.chance(0.9f)){
			Tmp.v2.trns(b.rotation(), Mathf.random(0.2f, 390.0f), Mathf.range(15.0f));
			Lightning.create(b.team, Color.blue, 22, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rotation(), Mathf.random(5, 16));
		};
		if(Mathf.chance(0.93f)){
			Tmp.v2.trns(b.rotation(), Mathf.random(0.2f, 390.0f), Mathf.range(10.0f));
			Lightning.create(b.team, Color.white, 16, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rotation(), Mathf.random(8, 18));
		};
		if(Mathf.chance(0.1f)){
			Tmp.v2.trns(b.rotation() + 90.0f, Mathf.range(7.0f));
			Call.createBullet(VanillaBullets.smallPlasmaBullet, b.team, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rotation() + Mathf.range(100.0f), Mathf.random(0.45f, 1.2f), Mathf.random(0.4f, 1.0f), 1);
		};
		if(Mathf.chance(0.1f)){
			Tmp.v2.trns(b.rotation() + 90.0f, Mathf.range(7.0f));
			Call.createBullet(VanillaBullets.smallPlasmaBulletWhite, b.team, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rotation() + Mathf.range(100.0f), Mathf.random(0.45f, 1.2f), Mathf.random(0.4f, 1.0f), 1);
		};
		if(Mathf.chance(0.1f)){
			Tmp.v2.trns(b.rotation(), Mathf.random(0.5f, 390.0f));
			Call.createBullet(VanillaBullets.smallPlasmaBullet, b.team, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rotation() + Mathf.range(100.0f), Mathf.random(0.45f, 1.2f), Mathf.random(0.4f, 1.0f), 1);
		};
		if(Mathf.chance(0.1f)){
			Tmp.v2.trns(b.rotation(), Mathf.random(0.2f, 390.0f), Mathf.range(15.0f));
			Call.createBullet(VanillaBullets.smallPlasmaBullet, b.team, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rotation() + Mathf.range(100.0f), Mathf.random(0.45f, 1.2f), Mathf.random(0.4f, 1.0f), 1);
		};
		if(Mathf.chance(0.1f)){
			Tmp.v2.trns(b.rotation(), Mathf.random(0.2f, 390.0f), Mathf.range(10.0f));
			Call.createBullet(VanillaBullets.smallPlasmaBullet, b.team, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rotation() + Mathf.range(100.0f), Mathf.random(0.45f, 1.2f), Mathf.random(0.4f, 1.0f), 1);
		};
		if(Mathf.chance(0.1f)){
			Tmp.v2.trns(b.rotation(), Mathf.random(0.5f, 390.0f));
			Call.createBullet(VanillaBullets.smallPlasmaBulletWhite, b.team, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rotation() + Mathf.range(100.0f), Mathf.random(0.45f, 1.2f), Mathf.random(0.4f, 1.0f), 1);
		};
		if(Mathf.chance(0.1f)){
			Tmp.v2.trns(b.rotation(), Mathf.random(0.2f, 390.0f), Mathf.range(15.0f));
			Call.createBullet(VanillaBullets.smallPlasmaBulletWhite, b.team, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rotation() + Mathf.range(100.0f), Mathf.random(0.45f, 1.2f), Mathf.random(0.4f, 1.0f), 1);
		};
		if(Mathf.chance(0.1f)){
			Tmp.v2.trns(b.rotation(), Mathf.random(0.2f, 390.0f), Mathf.range(10.0f));
			Call.createBullet(VanillaBullets.smallPlasmaBulletWhite, b.team, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rotation() + Mathf.range(100.0f), Mathf.random(0.45f, 1.2f), Mathf.random(0.4f, 1.0f), 1);
		};
	}
	
	@Override
	public void hit(Bullet b, float x, float y){
        hitEffect.at(x, y, b.rotation());
    }
	
	@Override
	public void draw(Bullet b){
		Color[] colors = new Color[]{Color.valueOf("00008bff"), Color.blue, Color.blue, Color.white};
		float[] tscales = new float[]{1, 0.74f, 0.5f, 0.24f};
		float[] strokes = new float[]{2.3f, 1.9f, 1.4f, 0.6f};
		float[] lenscales = new float[]{1.0f, 1.12f, 1.15f, 1.164f};
		Color tmpColor = new Color();

		for(int s = 0; s < 4; s++){
			Draw.color(tmpColor.set(colors[s]).mul(1.0f + Mathf.absin(Time.time, 1.2f, 0.4f)));
			for(int i = 0; i < 4; i++){
				Tmp.v1.trns(b.rotation() + 180.0f, (lenscales[i] - 0.9f) * 55.0f);
				Lines.stroke((9 + Mathf.absin(Time.time, 1.7f, 3.1f)) * b.fout() * strokes[s] * tscales[i]);
				Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rotation(), length * b.fout() * lenscales[i], false);
				Tmp.v1.trns(b.rotation() + 180.0f, (lenscales[i] - 120) * 55.0f);
				Lines.stroke((2 + Mathf.absin(Time.time, 1.7f, 3.1f)) * b.fout() * strokes[s] * tscales[i]);
				Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rotation(), length * b.fout() * lenscales[i], false);
			}
		}
	}
}