package vanilla.graphics;

import arc.*;
import arc.graphics.*;
import arc.graphics.g2d.*;
import arc.math.*;
import arc.math.geom.*;
import arc.util.*;
import mindustry.*;
import mindustry.ctype.*;
import mindustry.game.*;
import mindustry.gen.*;
import mindustry.ui.*;
import mindustry.world.*;

import static mindustry.Vars.*;

public class DrawV{
    public static void outlineFull(TextureRegion region, float x, float y, float scale, float rotation){
        Draw.color(Color.valueOf("565666"));
        Draw.rect(region, x, y, region.width + scale, region.height + scale, rotation);
        Draw.color();
        Draw.rect(region, x, y, rotation);
    }

    public static void outlineFull(TextureRegion region, float x, float y, float scale){
        Draw.color(Color.valueOf("565666"));
        Draw.rect(region, x, y, region.width + scale, region.height + scale);
        Draw.color();
        Draw.rect(region, x, y);
    }

    public static void outlineFull(TextureRegion region, float x, float y, float s1, float s2, float scale, float rotation){
        Draw.color(Color.valueOf("565666"));
        Draw.rect(region, x, y, s1 + scale, s2 + scale, rotation);
        Draw.color();
        Draw.rect(region, x, y, rotation);
    }

    public static void outline(TextureRegion region, float x, float y, float s1, float s2, float scale, float rotation){
        Draw.color(Color.valueOf("565666"));
        Draw.rect(region, x, y, s1 + scale, s2 + scale, rotation);
        Draw.color();
    }

    public static void outline(TextureRegion region, float x, float y, float scale, float rotation){
        Draw.color(Color.valueOf("565666"));
        Draw.rect(region, x, y, region.width + scale, region.height + scale, rotation);
        Draw.color();
    }
}
