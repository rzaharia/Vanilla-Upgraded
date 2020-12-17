package vanilla;

// Arc Package
import arc.*;
import arc.util.*;
// Mindustry Package
import mindustry.*;
import mindustry.content.*;
import mindustry.game.EventType.*;
import mindustry.gen.*;
import mindustry.mod.*;
import mindustry.ui.dialogs.*;
// Vanilla Upgraded Package
import vanilla.content.*;
// End

public class VanillaUpgraded extends Mod{

    public VanillaUpgraded(){}

    @Override
    public void loadContent(){
        new VanillaItems().load();
        new VanillaLiquids().load();
        new VanillaBullets().load();
        new VanillaUnits().load();
        new VanillaBlocks().load();
        new VanillaPlanets().load();
        new VanillaSectors().load();
        new VanillaTechTree().load();
    }
}
