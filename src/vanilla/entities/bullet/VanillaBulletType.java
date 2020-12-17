package vanilla.entities.bullet;

import arc.*;
import arc.graphics.*;
import arc.graphics.g2d.*;
import arc.math.*;
import arc.util.*;
import mindustry.gen.*;
import mindustry.graphics.*;
import mindustry.entities.bullet.*;

public class VanillaBulletType extends BulletType{
	public BulletType[] inTimeFrag;
	public Color backColor, frontColor;
	public float width, height;
	public float radius, difference;
    public float chanceFrag;
	public Boolean artillery;

	public TextureRegion backRegion;
    public TextureRegion frontRegion;

	public VanillaBulletType(float speed, float damage){
        super(speed, damage);
    }

    public VanillaBulletType(){
    	this(1f, 1f);
    }

    @Override
    public void update(Bullet b){
    	if(inTimeFrag != null){
    		if(Mathf.chance(chanceFrag / 100)){
	    		for(int i = 0; i < inTimeFrag.length; i++){
				    inTimeFrag[i].create(b, b.team, b.x, b.y, Mathf.random(360));
				}
	    	}
    	}
    }

    @Override
    public void draw(Bullet b){
    	if(backColor != null && frontColor != null && radius > 0f && difference > 0f){
	        Draw.color(backColor);
			Fill.circle(b.x, b.y, radius);

			Draw.color(frontColor);
			Fill.circle(b.x, b.y, radius - difference);
			Draw.color();
        }

        if(backColor != null && frontColor != null && radius > 0f && difference <= 0f){
        	Draw.color(frontColor, backColor, b.fin());
			Fill.circle(b.x, b.y, radius);
			Draw.color();
        }
    }
}