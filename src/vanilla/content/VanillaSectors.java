package vanilla.content;

import mindustry.ctype.*;
import mindustry.content.*;
import mindustry.type.*;

import static vanilla.content.VanillaPlanets.*;

public class VanillaSectors implements ContentList{
    public static SectorPreset
    xariexStart;

    @Override
    public void load(){
        xariexStart = new SectorPreset("xariexStart", xariex, 23){{
            alwaysUnlocked = true;
            addStartingItems = true;
            captureWave = 25;
            difficulty = 2;
        }};
    }
}
