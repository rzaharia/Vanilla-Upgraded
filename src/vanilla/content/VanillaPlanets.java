package vanilla.content;

import arc.graphics.*;
import mindustry.ctype.*;
import mindustry.content.*;
import mindustry.graphics.g3d.*;
import mindustry.type.*;
import vanilla.maps.planets.*;

public class VanillaPlanets implements ContentList{
    public static Planet
    cuantum, cuantumStar, nortum,
    xariex;

    @Override
    public void load(){
        xariex = new Planet("xariex", Planets.sun, 3, 0.8f){{
            generator = new XariexPlanetGenerator();
            meshLoader = () -> new HexMesh(this, 5);
            atmosphereColor = Color.valueOf("6BFF92");
            atmosphereRadIn = 0.07f;
            atmosphereRadOut = 0.5f;
            startSector = 23;
        }};

        cuantum = new Planet("cuantum", Planets.sun, 4, 1){{
            generator = new CuantumPlanetGenerator();
            meshLoader = () -> new HexMesh(this, 8);
            atmosphereColor = Color.valueOf("33ff33");
            atmosphereRadIn = 0.12f;
            atmosphereRadOut = 0.4f;
            startSector = 5;
        }};

        nortum = new Planet("nortum", cuantum, 1, 0.6f){{
            generator = new NortumPlanetGenerator();
            meshLoader = () -> new HexMesh(this, 3);
            atmosphereColor = Color.valueOf("000000");
            atmosphereRadIn = 0.02f;
            atmosphereRadOut = 0.3f;
            startSector = 0;
        }};

        cuantumStar = new Planet("cuantum-star", cuantum, 0, 2){{
            bloom = true;
            accessible = false;

            //lightColor = Color.valueOf("f4ee8e");

            meshLoader = () -> new SunMesh(
                this, 5,
                5, 0.3, 1.7, 1.2, 1,
                1.1f,
                Color.valueOf("C12A2A"),
                Color.valueOf("D85050"),
                Color.valueOf("D62A2A"),
                Color.valueOf("FFA5A5"),
                Color.valueOf("FF4C85"),
                Color.valueOf("D84173")
            );
        }};
    }
}
