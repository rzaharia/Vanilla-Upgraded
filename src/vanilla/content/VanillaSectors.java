package vanilla.content;

import mindustry.ctype.*;
import mindustry.type.*;

import static vanilla.content.VanillaPlanets.*;
import static mindustry.content.Planets.*;

public class VanillaSectors implements ContentList{
    public static SectorPreset
    xStartPod;

    @Override
    public void load(){

        xStartPod = new SectorPreset("xStartPod", xariex, 23){{
            alwaysUnlocked = true;
            addStartingItems = true;
            captureWave = 15;
            difficulty = 1;
        }};
    }
}
