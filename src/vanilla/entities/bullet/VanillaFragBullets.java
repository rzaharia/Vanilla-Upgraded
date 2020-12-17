package vanilla.entities.bullet;

import arc.*;
import arc.graphics.*;
import arc.graphics.g2d.*;
import arc.math.*;
import arc.util.*;
import mindustry.gen.*;
import mindustry.graphics.*;
import mindustry.entities.bullet.*;

public class VanillaFragBullets extends BulletType{
	public BulletType[] directFrag;
    public BulletType[] fiveteenFrag;
    public int directFrags;
    public int fiveteenFrags;

    public VanillaFragBullets(float speed, float damage){
    	super(speed, damage);
    }

    @Override
    public void draw(Bullet b){}

    @Override
    public void despawned(Bullet b){
    	if(fiveteenFrag != null){
    		for(int o = 0; o <= fiveteenFrags; o++){
				for(int z = 0; z < fiveteenFrag.length; z++){
					fiveteenFrag[z].create(b, b.team, b.x, b.y,b.rotation() + Mathf.range(100.0f));
				}
			}
		}

		if(directFrag != null){
			for(int u = 0; u <= directFrags; u++){
				for (int i = 0; i < directFrag.length; i++) {
					directFrag[i].create(b, b.team, b.x, b.y, Mathf.random(0.75f, 1.25f));
				}
			}
		}
	}
}