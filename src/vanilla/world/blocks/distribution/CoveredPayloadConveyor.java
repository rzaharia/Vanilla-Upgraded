package vanilla.world.blocks.distribution;

import arc.*;
import arc.graphics.g2d.*;
import arc.math.*;
import arc.math.geom.*;
import arc.util.*;
import arc.util.io.*;
import mindustry.gen.*;
import mindustry.graphics.*;
import mindustry.world.*;
import mindustry.world.blocks.payloads.*;
import mindustry.world.blocks.production.*;
import mindustry.world.blocks.distribution.*;
import mindustry.world.meta.*;

import static mindustry.Vars.*;

public class CoveredPayloadConveyor extends PayloadConveyor{
    public TextureRegion glassRegion;

    public CoveredPayloadConveyor(String name){
        super(name);
    }

    @Override
    public void load(){
        super.load();
        glassRegion = Core.atlas.find(name + "-glass");
    }

    public class CoveredPayloadConveyorBuild extends PayloadConveyorBuild{

        @Override
        public void draw(){
            Draw.z(Layer.block);
            super.draw();

            float dst = 0.8f;

            float trnext = fract() * size * tilesize, trprev = size * tilesize * (fract() - 1), rot = rotdeg();

            TextureRegion clipped = clipRegion(tile.getHitbox(Tmp.r1), tile.getHitbox(Tmp.r2).move(trnext, 0), topRegion);
            float s = tilesize * size;

            //next
            Tmp.v1.set((s- clipped.width *Draw.scl) + clipped.width /2f*Draw.scl - s/2f, s- clipped.height *Draw.scl + clipped.height /2f*Draw.scl - s/2f).rotate(rot);
            Draw.rect(clipped, x + Tmp.v1.x, y + Tmp.v1.y, rot);

            clipped = clipRegion(tile.getHitbox(Tmp.r1), tile.getHitbox(Tmp.r2).move(trprev, 0), topRegion);

            //prev
            Tmp.v1.set(- s/2f + clipped.width /2f*Draw.scl,  - s/2f + clipped.height /2f*Draw.scl).rotate(rot);
            Draw.rect(clipped, x + Tmp.v1.x, y + Tmp.v1.y, rot);

            for(int i = 0; i < 4; i++){
                if(blends(i) && i != rotation){
                    Draw.alpha(1f - Interp.pow5In.apply(fract()));
                    //prev from back
                    Tmp.v1.set(- s/2f + clipped.width /2f*Draw.scl,  - s/2f + clipped.height /2f*Draw.scl).rotate(i * 90 + 180);
                    Draw.rect(clipped, x + Tmp.v1.x, y + Tmp.v1.y, i * 90 + 180);
                }
            }

            Draw.reset();

            for(int i = 0; i < 4; i++){
                if(!blends(i)){
                    Draw.rect(edgeRegion, x, y, i * 90);
                }
            }

            Draw.z(Layer.blockOver);

            if(item != null){
                item.draw();
            }

            Draw.z(Layer.blockOver + 0.1f);

            Draw.rect(glassRegion, x, y);
        }

        public void unitOn(Unit unit){}
    }
}
