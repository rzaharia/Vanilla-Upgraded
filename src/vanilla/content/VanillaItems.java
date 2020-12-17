package vanilla.content;

import arc.graphics.*;
import mindustry.ctype.*;
import mindustry.type.*;

public class VanillaItems implements ContentList{
	public static Item lithium, tungstene, niobium, oberald, obsidian, emerald, resistantAlloy, supraConductorAlloy, vibro; 

	@Override
    public void load(){
    	lithium = new Item("lithium", Color.valueOf("ffffff")){{
            hardness = 3;
            cost = 2f;
        }};

        tungstene = new Item("tungstene", Color.valueOf("614852")){{
            hardness = 4;
            cost = 3f;
        }};

        niobium = new Item("niobium", Color.valueOf("989aa3")){{
            hardness = 5;
            cost = 3.5f;
        }};

        oberald = new Item("oberald", Color.valueOf("385947")){{
            hardness = 6;
            cost = 4.5f;
        }};

        obsidian = new Item("obsidian", Color.valueOf("000000")){{
            cost = 5f;
        }};

        emerald = new Item("emerald", Color.valueOf("6ecc79")){{
            cost = 5f;
        }};

        resistantAlloy = new Item("resistant-alloy", Color.valueOf("989aa3")){{
            cost = 5.5f;
        }};

        supraConductorAlloy = new Item("supra-conductor-alloy", Color.valueOf("959dc2")){{
            cost = 6f;
        }};

        vibro = new Item("vibro", Color.valueOf("B18396")){{
            cost = 7f;
        }};
    }
}