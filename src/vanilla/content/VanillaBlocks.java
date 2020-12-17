package vanilla.content;

import arc.*;
import arc.graphics.*;
import arc.graphics.g2d.*;
import arc.struct.*;
import mindustry.content.*;
import mindustry.ctype.*;
import mindustry.entities.bullet.*;
import mindustry.gen.*;
import mindustry.graphics.*;
import mindustry.type.*;
import mindustry.world.*;
import mindustry.world.blocks.*;
import mindustry.world.blocks.campaign.*;
import mindustry.world.blocks.defense.*;
import mindustry.world.blocks.defense.turrets.*;
import mindustry.world.blocks.distribution.*;
import mindustry.world.blocks.environment.*;
import mindustry.world.blocks.experimental.*;
import mindustry.world.blocks.legacy.*;
import mindustry.world.blocks.liquid.*;
import mindustry.world.blocks.logic.*;
import mindustry.world.blocks.power.*;
import mindustry.world.blocks.production.*;
import mindustry.world.blocks.sandbox.*;
import mindustry.world.blocks.storage.*;
import mindustry.world.blocks.units.*;
import mindustry.world.consumers.*;
import mindustry.world.draw.*;
import mindustry.world.meta.*;
// Vanilla Upgraded Package
import vanilla.world.blocks.defense.*;
import vanilla.world.blocks.units.*;
import vanilla.world.blocks.distribution.*;
// End
import static mindustry.type.ItemStack.*;

public class VanillaBlocks implements ContentList{
    public static Block

    //environment
    
    //ores
    oreLithium, oreTungstene, oreNiobium, oreOberald,
    
    //crafting
    
    //sandbox
 
    //defense
    hugeCopperWall, giganticCopperWall, hugeTitaniumWall, giganticTitaniumWall, hugePlastaniumWall, giganticPlastaniumWall, 
    hugeThoriumWall, giganticThoriumWall, hugePhaseWall, giganticPhaseWall, hugeSurgeWall, giganticSurgeWall,
    mendingWall, largeMendingWall, hugeMendingWall, giganticMendingWall, obsidianWall, largeObsidianWall, hugeObsidianWall,
    giganticObsidianWall,
    
    //transport
    coveredConveyor, coveredPayloadConveyor, coveredPayloadRouter, bigPayloadConveyor, bigPayloadRouter, 
    bigCoveredPayloadConveyor, bigCoveredPayloadRouter,
    
    //liquid

    //power

    //production
    lithiumCompressor, tungsteneMelter,

    //storage

    //turrets
    doum, drim, diffraction, division, plasma, quantum, neutron, burnout,

    //units
    cvantiumReconstructor;

    //logic

    //campaign
    
    @Override
    public void load(){
        // region ore

        oreLithium = new OreBlock(VanillaItems.lithium){{
            oreDefault = false;
            oreThreshold = 0.921f;
            oreScale = 26.1234f;
        }};

        oreTungstene = new OreBlock(VanillaItems.tungstene){{
            oreDefault = false;
            oreThreshold = 0.921f;
            oreScale = 26.1234f;
        }};

        oreNiobium = new OreBlock(VanillaItems.niobium){{
            oreDefault = false;
            oreThreshold = 0.921f;
            oreScale = 26.1234f;
        }};

        oreOberald = new OreBlock(VanillaItems.oberald){{
            oreDefault = false;
            oreThreshold = 0.921f;
            oreScale = 26.1234f;
        }};

        // endregion
    	// region defense

    	hugeCopperWall = new Wall("huge-copper-wall"){{
            requirements(Category.defense, with(Items.copper, 96));
            health = 5120;
            size = 3;
        }};

        giganticCopperWall = new Wall("gigantic-copper-wall"){{
            requirements(Category.defense, with(Items.copper, 384));
            health = 20480;
            size = 4;
        }};

        hugeTitaniumWall = new Wall("huge-titanium-wall"){{
            requirements(Category.defense, with(Items.titanium, 96));
            health = 7040;
            size = 3;
        }};

        giganticTitaniumWall = new Wall("gigantic-titanium-wall"){{
            requirements(Category.defense, with(Items.titanium, 384));
            health = 28160;
            size = 4;
        }};

        hugeThoriumWall = new Wall("huge-thorium-wall"){{
            requirements(Category.defense, with(Items.thorium, 96));
            health = 12800;
            size = 3;
        }};

        giganticThoriumWall = new Wall("gigantic-thorium-wall"){{
            requirements(Category.defense, with(Items.thorium, 384));
            health = 51200;
            size = 4;
        }};

        hugePlastaniumWall = new Wall("huge-plastanium-wall"){{
            requirements(Category.defense, with(Items.plastanium, 96));
            health = 8320;
            size = 3;
            insulated = true;
            absorbLasers = true;
        }};

        giganticPlastaniumWall = new Wall("gigantic-plastanium-wall"){{
            requirements(Category.defense, with(Items.plastanium, 384));
            health = 33280;
            size = 4;
            insulated = true;
            absorbLasers = true;
        }};

        hugePhaseWall = new Wall("huge-phase-wall"){{
            requirements(Category.defense, with(Items.phaseFabric, 96));
            health = 9600;
            size = 3;
            chanceDeflect = 14f;
            flashHit = true;
        }};

        giganticPhaseWall = new Wall("gigantic-phase-wall"){{
            requirements(Category.defense, with(Items.phaseFabric, 384));
            health = 38400;
            size = 4;
            chanceDeflect = 19f;
            flashHit = true;
        }};

        hugeSurgeWall = new Wall("huge-surge-wall"){{
            requirements(Category.defense, with(Items.surgeAlloy, 96));
            health = 14720;
            size = 3;
            lightningChance = 0.07f;
        }};

        giganticSurgeWall = new Wall("gigantic-surge-wall"){{
            requirements(Category.defense, with(Items.surgeAlloy, 384));
            health = 58880;
            size = 4;
            lightningChance = 0.09f;
        }};

        mendingWall = new VanillaWall("mending-wall"){{
            requirements(Category.defense, with(VanillaItems.emerald, 6, VanillaItems.obsidian, 12));
            health = 620;
            regenerationCooldown = 40f;
        }};

        largeMendingWall = new VanillaWall("large-mending-wall"){{
            requirements(Category.defense, with(VanillaItems.emerald, 24, VanillaItems.obsidian, 48));
            health = 2480;
            size = 2;
            regenerationCooldown = 45f;
            regenerationPower = 24f;
            regenerationEffect = VanillaFx.largeRegeneration;
        }};

        hugeMendingWall = new VanillaWall("huge-mending-wall"){{
            requirements(Category.defense, with(VanillaItems.emerald, 96, VanillaItems.obsidian, 192));
            health = 9920;
            size = 3;
            regenerationCooldown = 50f;
            regenerationPower = 36f;
            regenerationEffect = VanillaFx.hugeRegeneration;
        }};

        giganticMendingWall = new VanillaWall("gigantic-mending-wall"){{
            requirements(Category.defense, with(VanillaItems.emerald, 384, VanillaItems.obsidian, 768));
            health = 39680;
            size = 4;
            regenerationCooldown = 55f;
            regenerationPower = 48f;
            regenerationEffect = VanillaFx.giganticRegeneration;
        }};

        obsidianWall = new VanillaWall("obsidian-wall"){{
            requirements(Category.defense, with(VanillaItems.obsidian, 6));
            health = 1275;
            avoidDamageChance = 10f;
        }};

        largeObsidianWall = new VanillaWall("large-obsidian-wall"){{
            requirements(Category.defense, with(VanillaItems.obsidian, 24));
            health = 5100;
            size = 2;
            avoidDamageChance = 15f;
            avoidEffect = VanillaFx.largeAvoid;
        }};

        hugeObsidianWall = new VanillaWall("huge-obsidian-wall"){{
            requirements(Category.defense, with(VanillaItems.obsidian, 96));
            health = 20400;
            size = 3;
            avoidDamageChance = 22.5f;
            avoidEffect = VanillaFx.hugeAvoid;
        }};

        giganticObsidianWall = new VanillaWall("gigantic-obsidian-wall"){{
            requirements(Category.defense, with(VanillaItems.obsidian, 384));
            health = 81600;
            size = 4;
            avoidDamageChance = 32.5f;
            avoidEffect = VanillaFx.giganticAvoid;
        }};

        // endregion
        // region transport

        coveredConveyor = new CoveredConveyor("covered-conveyor"){{
            requirements(Category.distribution, with(Items.graphite, 1, VanillaItems.lithium, 1, Items.lead, 1));
            speed = 0.12f;
        }};

        bigPayloadConveyor = new PayloadConveyor("big-payload-conveyor"){{
            requirements(Category.distribution, with(Items.graphite, 20, VanillaItems.lithium, 40));
            moveTime = 64.37f;
            moveForce = 431f;
            payloadLimit = 5.3f;
            size = 6;
            canOverdrive = false;
        }};

        bigPayloadRouter = new PayloadRouter("big-payload-router"){{
            requirements(Category.distribution, with(Items.graphite, 30, VanillaItems.lithium, 40));
            moveTime = 64.37f;
            moveForce = 431f;
            payloadLimit = 5.3f;
            size = 6;
            canOverdrive = false;
        }};

        coveredPayloadConveyor = new CoveredPayloadConveyor("covered-payload-conveyor"){{
            requirements(Category.distribution, with(Items.graphite, 10, Items.silicon, 55, VanillaItems.lithium, 20));
            canOverdrive = false;
        }};

        coveredPayloadRouter = new CoveredPayloadRouter("covered-payload-router"){{
            requirements(Category.distribution, with(Items.graphite, 15, Items.silicon, 55, VanillaItems.lithium, 20));
            canOverdrive = false;
        }};

        bigCoveredPayloadConveyor = new CoveredPayloadConveyor("big-covered-payload-conveyor"){{
            requirements(Category.distribution, with(Items.graphite, 20, Items.silicon, 110, VanillaItems.lithium, 40));
            moveTime = 64.37f;
            moveForce = 431f;
            payloadLimit = 5.3f;
            size = 6;
            canOverdrive = false;
        }};

        bigCoveredPayloadRouter = new CoveredPayloadRouter("big-covered-payload-router"){{
            requirements(Category.distribution, with(Items.graphite, 30, Items.silicon, 110, VanillaItems.lithium, 40));
            moveTime = 64.37f;
            moveForce = 431f;
            payloadLimit = 5.3f;
            size = 6;
            canOverdrive = false;
        }};

        // endregion
        // production region

        lithiumCompressor = new GenericCrafter("lithium-compressor"){{
            requirements(Category.crafting, with(Items.lead, 80, Items.copper, 120, Items.graphite, 80));

            size = 2;
            hasPower = true;
            hasLiquids = false;
            hasItems = true;
            craftTime = 90;
            craftEffect = Fx.smeltsmoke;
            outputItem = new ItemStack(VanillaItems.lithium, 1);

            consumes.power(1.8f);
            consumes.items(with(Items.lead, 2, Items.graphite, 1));
        }};

        tungsteneMelter = new GenericSmelter("tungstene-melter"){{
            requirements(Category.crafting, with(Items.lead, 120, Items.silicon, 160, Items.graphite, 120, VanillaItems.lithium, 160));

            size = 3;
            hasPower = true;
            hasLiquids = false;
            hasItems = true;
            craftTime = 180;
            craftEffect = Fx.smeltsmoke;
            outputItem = new ItemStack(VanillaItems.tungstene, 1);

            consumes.power(2.6f);
            consumes.items(with(VanillaItems.lithium, 1, Items.pyratite, 2));
        }};

        // endregion
        // turrets region

        doum = new ItemTurret("doum"){{
            requirements(Category.turret, with(VanillaItems.lithium, 70, Items.lead, 60, Items.graphite, 30));
            ammo(
            Items.silicon, VanillaBullets.upgradedStandardHoming,
            Items.graphite, VanillaBullets.upgradedStandardDense,
            Items.plastanium, VanillaBullets.standardPlastanium,
            Items.pyratite, VanillaBullets.upgradedStandardIncendiary
            );

            health = 600;
            size = 2;
            restitution = 0.03f;
            alternate = true;
            reloadTime = 11;
            range = 200;
            inaccuracy = 2;
            rotateSpeed = 8;
            targetAir = true;
            shootCone = 20;
            shootSound = Sounds.shootBig;
        }};

        drim = new ItemTurret("drim"){{
            requirements(Category.turret, with(VanillaItems.lithium, 150, Items.titanium, 50, Items.lead, 120, Items.graphite, 60));
            ammo(
            Items.silicon, VanillaBullets.upgradedStandardHomingBig,
            Items.surgeAlloy, VanillaBullets.standardSurgeBig,
            Items.plastanium, VanillaBullets.standardPlastaniumBig,
            Items.blastCompound, VanillaBullets.standardBlastBig
            );

            health = 1200;
            size = 3;
            restitution = 0.03f;
            alternate = true;
            reloadTime = 13;
            range = 240;
            inaccuracy = 2;
            rotateSpeed = 5;
            targetAir = true;
            shootCone = 20;
            shootSound = Sounds.shootBig;
        }};

        diffraction = new ItemTurret("diffraction"){{
            requirements(Category.turret, with(VanillaItems.lithium, 170, Items.lead, 90, Items.graphite, 75));
            ammo(
            VanillaItems.lithium, VanillaBullets.flakLithium,
            Items.lead, VanillaBullets.upgradedFlakLead,
            Items.metaglass, VanillaBullets.upgradedFlakGlass,
            Items.plastanium, VanillaBullets.flakPlastic
            );

            health = 1600;
            size = 3;
            reloadTime = 50;
            range = 280;
            inaccuracy = 15;
            rotateSpeed = 6;
            shots = 5;
            restitution = 0.1f;
            burstSpacing = 3;
            targetAir = true;
            targetGround = false;
            shootCone = 10;
            shootSound = Sounds.shootSnap;
        }};

        division = new ItemTurret("division"){{
            requirements(Category.turret, with(VanillaItems.lithium, 500, Items.lead, 400, Items.thorium, 100, Items.titanium, 200));
            ammo(
            Items.surgeAlloy, VanillaBullets.flakSurgeBig,
            Items.plastanium, VanillaBullets.flakPlasticBig,
            Items.blastCompound, VanillaBullets.flakBlastBig,
            Items.metaglass, VanillaBullets.flakGlassBig
            );

            health = 2400; 
            size = 4;
            reloadTime = 65;
            range = 320;
            inaccuracy = 12;
            rotateSpeed = 5.2f;
            shots = 12;
            restitution = 0.1f;
            burstSpacing = 3;
            targetAir = true;
            targetGround = false;
            shootCone = 10;
        }};

        plasma = new PowerTurret("plasma"){{
            requirements(Category.turret, with(VanillaItems.lithium, 175, Items.silicon, 220, Items.lead, 280, Items.graphite, 220, 
                Items.titanium, 175));

            recoilAmount = 2f;
            cooldown = 0.03f;
            powerUse = 3.5f;
            shootShake = 2f;
            heatColor = Color.red;
            size = 3;
            health = 1350;
            targetAir = true;
            shootSound = Sounds.shootBig;
            shootType = VanillaBullets.plasmaBullet;
            shootEffect = VanillaFx.plasmaShoot;
            smokeEffect = Fx.none;
            reloadTime = 200;
            range = 340;
            chargeEffect = VanillaFx.plasmaCharge;
            chargeBeginEffect = VanillaFx.plasmaChargeBegin;
            chargeTime = 60f;
            chargeMaxDelay = 0f;
            chargeEffects = 1;
        }};

        quantum = new PowerTurret("quantum"){{
            requirements(Category.turret, with(VanillaItems.lithium, 425, Items.silicon, 500, Items.titanium, 475, Items.graphite, 500,
                Items.thorium, 425));

            chargeEffects = 1;
            shootType = VanillaBullets.quantumFrags;
            chargeEffect = VanillaFx.quantumcharge;
            shootEffect = VanillaFx.quantumShoot;
            smokeEffect = Fx.none;
            chargeBeginEffect = VanillaFx.quantumChargeBegin;
            chargeTime = 80;
            chargeMaxDelay = 0;
            reloadTime = 240;
            range = 380;
            recoilAmount = 4;
            cooldown = 0.03f;
            powerUse = 5;
            shootShake = 2;
            heatColor = Color.red;
            size = 4;
            health = 1850;
            targetAir = true;
            shootSound = Sounds.laser;
        }};

        neutron = new LaserTurret("neutron"){{
            requirements(Category.turret, with(VanillaItems.resistantAlloy, 250, VanillaItems.lithium, 450, Items.lead, 500, Items.silicon,
                500, Items.graphite, 500, Items.titanium, 500, Items.plastanium, 375, Items.phaseFabric, 375, VanillaItems.niobium, 300,
                Items.surgeAlloy, 300, Items.thorium, 375));

            recoilAmount = 3.7f;
            shootType = VanillaBullets.neutronLaser;
            update = true;
            range = 425;
            chargeEffect = VanillaFx.neutroncharge;
            chargeBeginEffect = VanillaFx.neutronChargeBegin;
            chargeTime = 190;
            chargeMaxDelay = 0;
            reloadTime = 500;
            size = 5;
            health = 3500;
            coolantMultiplier = 1.4f;
            shootCone = 5;
            shootDuration = 650;
            powerUse = 15;
            shootShake = 3;
            firingMoveFract = 0.16f;
            targetAir = true;
            shootEffect = Fx.hitLancer;
            hasPower = true;
            hasLiquids = true;
            shootSound = Sounds.laserbig;
            liquidCapacity = 60;
            heatColor = Color.red;
            rotateSpeed = 0.3f;
            expanded = true;
            consumes.liquid(VanillaLiquids.oberaldLiquid, 0.5f);
        }};

        /*burnout = new CircleFireTurret("burnout"){{
            requirements(Category.turret, with(Items.copper, 1));

            range = 150;
            reloadTime = 50;
        }};*/

        // endregion
        // region units
        
        cvantiumReconstructor = new VanillaReconstructor("cvantium-reconstructor"){{
            requirements(Category.units, with(Items.copper, 5550, Items.lead, 9855, Items.silicon, 10050, 
                Items.thorium, 5150, Items.plastanium, 950, Items.phaseFabric, 2450, Items.surgeAlloy, 1205, 
                VanillaItems.tungstene, 1230, VanillaItems.obsidian, 875, VanillaItems.emerald, 565, 
                VanillaItems.vibro, 325));

            size = 11;
            consumes.power(42f);
            consumes.items(with(Items.silicon, 2500, Items.plastanium, 1250, Items.surgeAlloy, 900, Items.phaseFabric, 850));
            consumes.liquid(Liquids.cryofluid, 7f);

            constructTime = 39600f;
            liquidCapacity = 540f;

            upgrades.addAll(
                new UnitType[]{UnitTypes.toxopid, VanillaUnits.sprictoritos}
            );
        }};
        
    }
}