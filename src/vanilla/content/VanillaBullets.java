package vanilla.content;

import arc.graphics.*;
import arc.graphics.g2d.*;
import arc.math.*;
import arc.util.*;
import mindustry.ctype.*;
import mindustry.entities.*;
import mindustry.entities.bullet.*;
import mindustry.gen.*;
import mindustry.graphics.*;
import mindustry.io.*;
import mindustry.world.*;
import mindustry.content.*;
import vanilla.entities.bullet.*;
import vanilla.entities.bullet.special.*;

import static mindustry.Vars.*;

public class VanillaBullets implements ContentList{
    public static BulletType

    //artillery

    //flak 
    flakPlastic, flakLithium, flakSurgeBig, flakPlasticBig, flakGlassBig, flakBlastBig,

    //upgradedFlak
    upgradedFlakLead, upgradedFlakGlass,

    //frag (flak-like but hits ground)

    //missiles

    //standard
    standardPlastanium, standardSurgeBig, standardBlastBig, standardPlastaniumBig,

    //upgradedStandard
    upgradedStandardDense, upgradedStandardHoming, upgradedStandardIncendiary, upgradedStandardHomingBig,

    //liquid

    //environment, misc.

    // Invisible bullet
    invisibleIncendiaryBullet, invisibleIncendiaryBulletBig, upgradedInvisibleIncendiaryBullet,
    upgradedInvisibleIncendiaryBulletBig,

    // VU bullet
    smallPlasmaBullet, smallPlasmaBulletWhite, plasmaBullet, quantumLaser, quantumFrags, 

    // specialBullet
    neutronLaser;

    @Override
    public void load(){
        flakPlastic = new FlakBulletType(4f, 6){{
            frontColor = Pal.plastaniumFront;
            backColor = Pal.plastaniumBack;
            lifetime = 70f;
            splashDamageRadius = 24f;
            splashDamage = 40f;
            width = 8f;
            height = 10f;
            fragBullet = Bullets.fragPlasticFrag;
            fragBullets = 2;
            hitEffect = Fx.plasticExplosion;
            ammoMultiplier = 3f;
            shootEffect = Fx.shootSmall;
        }};

        flakLithium = new FlakBulletType(4.2f, 5){{
            lifetime = 70f;
            splashDamageRadius = 15f;
            splashDamage = 27f;
            width = 8f;
            height = 10f;
            hitEffect = Fx.flakExplosion;
            ammoMultiplier = 4f;
            shootEffect = Fx.shootSmall;
        }};

        flakSurgeBig = new FlakBulletType(4f, 8){{
            frontColor = backColor = Pal.surge;
            lifetime = 75f;
            splashDamageRadius = 35f;
            splashDamage = 46f;
            width = 10f;
            height = 12f;
            hitEffect = Fx.flakExplosion;
            ammoMultiplier = 3.5f;
            shootEffect = Fx.shootBig;
            lightning = 2;
            lightningLength = 15;
            lightningColor = Pal.surge;
            lightningDamage = 15;
        }};

        flakPlasticBig = new FlakBulletType(4.5f, 7){{
            frontColor = Pal.plastaniumFront;
            backColor = Pal.plastaniumBack;
            lifetime = 75f;
            splashDamageRadius = 28f;
            splashDamage = 44f;
            width = 10f;
            height = 12f;
            fragBullet = Bullets.fragPlasticFrag;
            fragBullets = 2;
            hitEffect = Fx.plasticExplosion;
            ammoMultiplier = 3.3f;
            shootEffect = Fx.shootBig;
        }};

        flakGlassBig = new FlakBulletType(4.8f, 6.5f){{
            lifetime = 75f;
            reloadMultiplier = 0.95f;
            splashDamageRadius = 30f;
            splashDamage = 35f;
            width = 10f;
            height = 12f;
            fragBullet = Bullets.fragGlassFrag;
            fragBullets = 2;
            hitEffect = Fx.flakExplosion;
            ammoMultiplier = 5f;
            shootEffect = Fx.shootBig;
        }};

        flakBlastBig = new FlakBulletType(4.3f, 6.8f){{
            frontColor = backColor = Color.valueOf("ff795e"); 
            lifetime = 75f;
            width = 10f;
            height = 12f;
            hitEffect = Fx.blastExplosion;
            ammoMultiplier = 3f;
            shootEffect = Fx.shootBig;
            splashDamageRadius = 32f;
            splashDamage = 42f;
            status = StatusEffects.blasted;
            statusDuration = 35f;
        }};

        upgradedFlakLead = new FlakBulletType(4f, 5){{
            lifetime = 70f;
            reloadMultiplier = 0.5f;
            splashDamageRadius = 24f;
            splashDamage = 22f;
            width = 8f;
            height = 10f;
            hitEffect = Fx.flakExplosion;
            ammoMultiplier = 5f;
            shootEffect = Fx.shootSmall;
        }};

        upgradedFlakGlass = new FlakBulletType(4f, 5){{
            lifetime = 70f;
            reloadMultiplier = 0.8f;
            splashDamageRadius = 26f;
            splashDamage = 30f;
            width = 8f;
            height = 10f;
            fragBullet = Bullets.fragGlassFrag;
            fragBullets = 2;
            hitEffect = Fx.flakExplosion;
            ammoMultiplier = 5f;
            shootEffect = Fx.shootSmall;
        }};

    	standardPlastanium = new BasicBulletType(4f, 23){{
            frontColor = Pal.plastaniumFront;
            backColor = Pal.plastaniumBack;
            lifetime = 60f;
            splashDamageRadius = 2f;
            splashDamage = 2f;
            width = 12f;
            height = 14f;
            hitEffect = Fx.plasticExplosion;
            ammoMultiplier = 3f;
            shootEffect = Fx.shootSmall;
    	}};

        standardSurgeBig = new BasicBulletType(3.8f, 30){{
            frontColor = backColor = Pal.surge;
            lifetime = 75f;
            width = 13f;
            height = 14f;
            hitEffect = Fx.blastExplosion;
            ammoMultiplier = 3.2f;
            shootEffect = Fx.shootBig;
            lightning = 3;
            lightningLength = 15;
            lightningColor = Pal.surge;
            lightningDamage = 25;
        }};

        standardBlastBig = new BasicBulletType(4f, 24){{
            frontColor = backColor = Color.valueOf("ff795e"); 
            lifetime = 75f;
            width = 12f;
            height = 13f;
            hitEffect = Fx.blastExplosion;
            ammoMultiplier = 2.7f;
            shootEffect = Fx.shootBig;
            splashDamageRadius = 1.5f;
            splashDamage = 1.8f;
            status = StatusEffects.blasted;
            statusDuration = 45f;
        }};

        standardPlastaniumBig = new BasicBulletType(4f, 27){{
            frontColor = Pal.plastaniumFront;
            backColor = Pal.plastaniumBack;
            lifetime = 75f;
            splashDamageRadius = 2.5f;
            splashDamage = 2.5f;
            width = 12f;
            height = 14f;
            hitEffect = Fx.plasticExplosion;
            ammoMultiplier = 3f;
            shootEffect = Fx.shootBig;
        }};

        upgradedStandardDense = new BasicBulletType(4.2f, 21){{
            lifetime = 60f;
            width = 10f;
            height = 13f;
            hitEffect = Fx.flakExplosion;
            ammoMultiplier = 4f;
            reloadMultiplier = 0.8f;
            shootEffect = Fx.shootSmall;
        }};

        upgradedStandardHoming = new BasicBulletType(4, 15){{
            homingPower = 0.68f;
            homingRange = 25f;
            lifetime = 60f;
            reloadMultiplier = 1.7f;
            width = 8f;
            height = 10f;
            hitEffect = Fx.flakExplosion;
            ammoMultiplier = 5f;
            shootEffect = Fx.shootSmall;
        }};

        upgradedStandardIncendiary = new BasicBulletType(4, 14){{
            lifetime = 60f;
            inaccuracy = 3f;
            width = 11f;
            height = 13f;
            shootEffect = Fx.shootSmall;
            frontColor = Pal.lightishOrange;
            backColor = Pal.lightOrange;
            makeFire = true;
            status = StatusEffects.burning;
            trailEffect = Fx.incendTrail;
        }};

        upgradedStandardHomingBig = new BasicBulletType(4f, 21){{
            homingPower = 0.68f;
            homingRange = 25f;
            lifetime = 75f;
            reloadMultiplier = 1.8f;
            width = 12f;
            height = 13f;
            hitEffect = Fx.flakExplosion;
            ammoMultiplier = 5f;
            shootEffect = Fx.shootSmall;
        }};

        invisibleIncendiaryBullet = new ArtilleryBulletType(12f, 15){{
            lifetime = 15;
            width = height = 0;
            hitEffect = Fx.none;
            shootEffect = Fx.none;
            trailEffect = Fx.none;
            hitShake = 0;
            hitSound = Sounds.none;
            fragBullets = 25;
            fragBullet = Bullets.fireball;
        }};

        smallPlasmaBullet = new VanillaBulletType(4, 120){{
            lifetime = 60;
            keepVelocity = false;
            hitEffect = Fx.flakExplosion;
            frontColor = Color.blue;
            backColor = Color.white;
            despawnEffect = Fx.flakExplosion;
            drag = 0.042f;
            pierce = false;
            artillery = true;
            radius = 3;

            lightning = 2;
            lightningLength = Mathf.random(5, 16);
            lightningColor = Color.blue;
            lightningDamage = 15;
        }};

        smallPlasmaBulletWhite = new VanillaBulletType(4, 120){{
            lifetime = 60;
            keepVelocity = false;
            hitEffect = Fx.flakExplosion;
            frontColor = Color.white;
            backColor = Color.blue;
            despawnEffect = Fx.flakExplosion;
            drag = 0.042f;
            pierce = false;
            artillery = true;
            radius = 3;

            lightning = 2;
            lightningLength = Mathf.random(5, 16);
            lightningColor = Color.white;
            lightningDamage = 15;
        }};

        plasmaBullet = new VanillaBulletType(7, 240){{
            lifetime = 120;
            hitEffect = Fx.explosion;
            radius = 8;
            difference = 2;
            despawnEffect = Fx.explosion;
            frontColor = Color.white;
            backColor = Color.blue;
            inTimeFrag = new BulletType[]{smallPlasmaBullet, smallPlasmaBulletWhite};
            chanceFrag = 4;

            lightning = 4;
            lightningLength = Mathf.random(10, 32);
            lightningColor = Color.blue;
            lightningDamage = 22;
        }};

        quantumLaser = new VanillaLaser(0.001f, 350){{
            length = 350;
            lifetime = 28;
            hitEffect = VanillaFx.quantumHit;
            despawnEffect = Fx.none;
            hitSize = 7;
            drawSize = 720;
            pierce = true;

            colors = new Color[]{Color.valueOf("00008bff"), Color.blue, Color.white};
            tscales = new float[]{3.5f, 3.2f, 3, 2.7f};
            lenscales = new float[]{1, 1.12f, 1.15f, 1.17f};
        }};

        quantumFrags = new VanillaFragBullets(0.1f, 0.1f){{
            directFrag = new BulletType[]{quantumLaser};
            directFrags = 1;
            fiveteenFrag = new BulletType[]{smallPlasmaBullet, smallPlasmaBulletWhite};
            fiveteenFrags = 6;

            lifetime = 0.1f;
            hitEffect = Fx.none;
            despawnEffect = Fx.none;
            pierce = false;
        }};

        neutronLaser = new SpecialNeutronLaser(0.001f, 70f){{
            length = 425;
            lifetime = 18;
            hitEffect = VanillaFx.neutronHit;
            despawnEffect = Fx.none;
            hitSize = 7;
            pierce = true;
            shootEffect = VanillaFx.neutronShoot;
            smokeEffect = Fx.lancerLaserShootSmoke;
        }};
    }
}