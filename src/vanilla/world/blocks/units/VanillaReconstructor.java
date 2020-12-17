package vanilla.world.blocks.units;

import arc.*;
import arc.func.*;
import arc.graphics.*;
import arc.graphics.g2d.*;
import arc.math.*;
import arc.struct.*;
import arc.util.*;
import arc.util.io.*;
import mindustry.*;
import mindustry.content.*;
import mindustry.entities.*;
import mindustry.entities.units.*;
import mindustry.gen.*;
import mindustry.graphics.*;
import mindustry.type.*;
import mindustry.ui.*;
import mindustry.world.blocks.payloads.*;
import mindustry.world.consumers.*;
import mindustry.world.meta.*;
import mindustry.world.blocks.units.*;

import static mindustry.Vars.*;

public class VanillaReconstructor extends Reconstructor{

    public VanillaReconstructor(String name){
        super(name);
    }

    public class VanillaReconstructorBuild extends ReconstructorBuild{

        @Override
        public void draw(){
            Draw.rect(region, x, y);

            //draw input
            for(int i = 0; i < 4; i++){
                if(blends(i) && i != rotation){
                    Draw.rect(inRegion, x, y, i * 90);
                }
            }

            Draw.rect(outRegion, x, y, rotdeg());

            if(constructing() && hasArrived()){
                Draw.draw(Layer.blockOver, () -> {
                    Draw.alpha(1f - progress/ constructTime);
                    Draw.rect(payload.unit.type.icon(Cicon.full), x, y, rotdeg() - 90);
                    Draw.reset();
                    Drawf.construct(this, upgrade(payload.unit.type), rotdeg() - 90f, progress / constructTime, speedScl, time);
                });
            }else{
                Draw.z(Layer.blockOver);
                payRotation = rotdeg();

                drawPayload();
            }

            for(int i = 0; i < 4; i++){
                float rot = i * 90f + 45f;
                float length = (size * 4f);
                Drawf.laser(team, Core.atlas.find("laser"), Core.atlas.find("laser-end"), x + Angles.trnsx(rot, length), y + Angles.trnsy(rot, length), x + payVector.x, y + payVector.y, 0.6f);
            }

            Draw.z(Layer.blockOver + 0.1f);
            Draw.rect(topRegion, x, y);
        }
    }
}
