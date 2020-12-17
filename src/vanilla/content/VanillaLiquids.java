package vanilla.content;

import arc.graphics.*;
import mindustry.ctype.*;
import mindustry.type.*;
import mindustry.content.*;

public class VanillaLiquids implements ContentList{
    public static Liquid thoriumLiquid, oberaldLiquid;

    @Override
    public void load(){

        thoriumLiquid = new Liquid("thorium-liquid", Color.valueOf("fa00ff")){{
            temperature = 0.45f;
            viscosity = 0.8f;
            explosiveness = 1.5f;
            effect = StatusEffects.melting;
        }};

        oberaldLiquid = new Liquid("oberald-liquid", Color.valueOf("385947")){{
            heatCapacity = 1.4f;
            viscosity = 0.9f;
            explosiveness = 0f;
            effect = StatusEffects.freezing;
        }};
    }
}
