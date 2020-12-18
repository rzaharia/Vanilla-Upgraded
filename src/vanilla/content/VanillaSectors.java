package vanilla.content;

import mindustry.ctype.*;
import mindustry.type.*;

import static vanilla.content.VanillaPlanets.*;
import static mindustry.content.Planets.*;

public class VanillaSectors implements ContentList{
    public static SectorPreset
    xariexStart;

    @Override
    public void load(){

        xariexStart = new SectorPreset("xariexStart", xariex, 23){{
            alwaysUnlocked = true;
            addStartingItems = true;
            captureWave = 15;
            difficulty = 1;
        }};
    }
}
