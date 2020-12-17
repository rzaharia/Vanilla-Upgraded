package vanilla.world.blocks.distribution;

import arc.*;
import arc.graphics.g2d.*;
import arc.math.*;
import arc.util.*;
import mindustry.content.*;
import mindustry.entities.units.*;
import mindustry.gen.*;
import mindustry.graphics.*;
import mindustry.world.blocks.payloads.*;
import mindustry.world.blocks.distribution.*;

public class CoveredPayloadRouter extends PayloadRouter{
    public TextureRegion glassRegion;

    public CoveredPayloadRouter(String name){
        super(name);
    }

    @Override
    public void load(){
        super.load();
        glassRegion = Core.atlas.find(name + "-glass");
    }

    @Override
    public void drawRequestRegion(BuildPlan req, Eachable<BuildPlan> list){
        super.drawRequestRegion(req, list);

        Draw.rect(overRegion, req.drawx(), req.drawy());
        Draw.rect(glassRegion, req.drawx(), req.drawy());
    }

    public class CoveredPayloadRouterBuild extends PayloadRouterBuild{

        @Override
        public void draw(){
            Draw.rect(region, x, y);

            float dst = 0.8f;

            Draw.mixcol(team.color, Math.max((dst - (Math.abs(fract() - 0.5f) * 2)) / dst, 0));
            Draw.rect(topRegion, x, y, smoothRot);
            Draw.reset();

            Draw.rect(overRegion, x, y);

            Draw.z(Layer.blockOver);

            if(item != null){
                item.draw();
            }

            Draw.z(Layer.blockOver + 0.1f);

            Draw.rect(glassRegion, x, y);
        }
    }
}
