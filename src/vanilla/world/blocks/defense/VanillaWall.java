package vanilla.world.blocks.defense;

import arc.*;
import arc.audio.*;
import arc.graphics.*;
import arc.graphics.g2d.*;
import arc.math.*;
import arc.util.*;
import mindustry.entities.*;
import mindustry.content.*;
import mindustry.gen.*;
import mindustry.graphics.*;
import mindustry.world.*;
import mindustry.world.meta.*;
import mindustry.world.blocks.defense.*;
import vanilla.content.*;

import static mindustry.Vars.*;

public class VanillaWall extends Wall{
    // regenerationCooldown set to -1 for disable
    public Effect regenerationEffect = VanillaFx.regeneration;
    public float regenerationCooldown = -1f;
    public float regenerationPower = 12f;
    // avoidDamageChance set to -1 for disable
    public Effect avoidEffect = VanillaFx.avoid;
    public float avoidDamageChance = -1f;
    
    public VanillaWall(String name){
        super(name);
        update = true;
    }

    public class VanillaWallBuild extends Building{
        public float hit;

        @Override
        public void draw(){
            Draw.rect(region, x, y);
        }

        @Override
        public void update(){
            if(regenerationCooldown > 0f){
                if(health < maxHealth && timer.get(0, regenerationCooldown)){
                    health += regenerationPower;
                    regenerationEffect.at(x, y);
                }
            }
        }

        @Override
        public boolean collision(Bullet bullet){
            super.collision(bullet);

            if(avoidDamageChance > 0f){
                if(Mathf.chance(avoidDamageChance / 100)){
                    avoidEffect.at(x, y);
                    health += bullet.damage;
                }

                bullet.remove();

                return false;
            }

            return true;
        }
    }
}