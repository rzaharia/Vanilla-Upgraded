package vanilla.world.blocks.distribution;

import arc.*;
import arc.func.*;
import arc.graphics.*;
import arc.graphics.g2d.*;
import arc.math.*;
import arc.math.geom.*;
import arc.struct.*;
import arc.util.*;
import arc.util.io.*;
import mindustry.content.*;
import mindustry.entities.units.*;
import mindustry.world.blocks.distribution.*;
import mindustry.game.*;
import mindustry.gen.*;
import mindustry.graphics.*;
import mindustry.type.*;
import mindustry.ui.*;
import mindustry.world.*;
import mindustry.world.blocks.*;
import mindustry.world.meta.*;

import static mindustry.Vars.*;

public class CoveredConveyor extends Conveyor{

    public TextureRegion glassRegion;

    public CoveredConveyor(String name){
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

        Draw.rect(glassRegion, req.drawx(), req.drawy());
    }

    @Override
    public TextureRegion[] icons(){
        return new TextureRegion[]{regions[0][0], glassRegion};
    }

    public class CoveredConveyorBuild extends ConveyorBuild{
        @Override
        public void draw(){
            super.draw();

            Draw.z(Layer.blockOver + 0.1f);

            Draw.rect(glassRegion, x, y);
        }

        @Override
        public void unitOn(Unit unit){}
    }
}
