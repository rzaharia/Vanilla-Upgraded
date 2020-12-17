package vanilla.content;

import arc.graphics.*;
import arc.struct.*;
import mindustry.ai.types.*;
import mindustry.annotations.Annotations.*;
import mindustry.ctype.*;
import mindustry.entities.abilities.*;
import mindustry.entities.bullet.*;
import mindustry.gen.*;
import mindustry.graphics.*;
import mindustry.type.*;
import mindustry.world.meta.*;
import mindustry.content.*;

import static mindustry.Vars.*;

public class VanillaUnits implements ContentList{
    // region definitions

    // legs
    public static @EntityDef(value = {Unitc.class, Legsc.class}, legacy = true) UnitType sprictoritos;
    
    // endregion

    @Override
    public void load(){
        sprictoritos = new UnitType("sprictoritos"){{
            constructor = LegsUnit::create;

            drag = 0.1f;
            speed = 0.4f;
            hitSize = 65f;
            health = 258300;
            armor = 38f;

            rotateSpeed = 1.9f;

            legCount = 9;
            legMoveSpace = 0.8f;
            legPairOffset = 3;
            legLength = 95f;
            legExtension = -30;
            legBaseOffset = 12f;
            landShake = 1f;
            legSpeed = 0.1f;
            legLengthScl = 1.33f;
            rippleScale = 3f;
            legSpeed = 0.27f;
            ammoType = AmmoTypes.powerHigh;

            legSplashDamage = 90;
            legSplashRange = 50;

            hovering = true;
            allowLegStep = true;
            visualElevation = 1.2f;
            groundLayer = Layer.legUnit + 0.3f;

            BulletType sapper = new SapBulletType(){{
                sapStrength = 1.25f;
                length = 175f;
                damage = 89;
                shootEffect = Fx.shootSmall;
                hitColor = color = Color.valueOf("bf92f9");
                despawnEffect = Fx.none;
                width = 0.55f;
                lifetime = 30f;
                knockback = -1f;
            }};

            weapons.add(
            new Weapon("spiroct-weapon"){{
                reload = 8.5f;
                x = 44f;
                y = 15f;
                rotate = true;
                bullet = sapper;
                shootSound = Sounds.sap;
            }},

            new Weapon("spiroct-weapon"){{
                reload = 8.6f;
                x = 40f;
                y = 18f;
                rotate = true;
                bullet = sapper;
                shootSound = Sounds.sap;
            }},

            new Weapon("spiroct-weapon"){{
                reload = 8.7f;
                x = 36f;
                y = 21f;
                rotate = true;
                bullet = sapper;
                shootSound = Sounds.sap;
            }},

            new Weapon("spiroct-weapon"){{
                reload = 8.8f;
                x = 33f;
                y = 25f;
                rotate = true;
                bullet = sapper;
                shootSound = Sounds.sap;
            }});

            weapons.add(
            new Weapon("spiroct-weapon"){{
                reload = 8.9f;
                x = 20f;
                y = 29f;
                rotate = true;
                bullet = sapper;
                shootSound = Sounds.sap;
            }},
            new Weapon("spiroct-weapon"){{
                reload = 9f;
                x = 17f;
                y = 33f;
                rotate = true;
                bullet = sapper;
                shootSound = Sounds.sap;
            }});

            weapons.add(new Weapon("toxopid-cannon"){{
                y = 18f;
                x = 10f;
                shootY = 7f;
                mirror = true;
                reload = 210;
                shake = 10f;
                recoil = 10f;
                rotateSpeed = 1f;
                ejectEffect = Fx.casing3;
                shootSound = Sounds.artillery;
                rotate = true;

                bullet = new ArtilleryBulletType(6f, 227){{
                    hitEffect = Fx.sapExplosion;
                    knockback = -3f;
                    lifetime = 30f;
                    width = height = 25f;
                    collidesTiles = collides = true;
                    ammoMultiplier = 4f;
                    splashDamageRadius = 90f;
                    splashDamage = 134f;
                    backColor = Pal.sapBulletBack;
                    frontColor = lightningColor = Pal.sapBullet;
                    lightning = 5;
                    lightningLength = 20;
                    smokeEffect = Fx.shootBigSmoke2;
                    hitShake = 10f;

                    status = StatusEffects.sapped;
                    statusDuration = 60f * 10;

                    fragLifeMin = 0.3f;
                    fragBullets = 21;

                    fragBullet = new ArtilleryBulletType(2.3f, 485){{
                        hitEffect = Fx.sapExplosion;
                        knockback = -3f;
                        lifetime = 60f;
                        width = height = 20f;
                        collidesTiles = false;
                        splashDamageRadius = 80f;
                        splashDamage = 40f;
                        backColor = Pal.sapBulletBack;
                        frontColor = Pal.sapBullet;
                        smokeEffect = Fx.shootBigSmoke2;
                        hitShake = 5f;

                        status = StatusEffects.sapped;
                        statusDuration = 60f * 10;
                    }};
                }};
            }},
            new Weapon("toxopid-cannon"){{
                y = -8f;
                x = 34f;
                shootY = 7f;
                mirror = true;
                reload = 214;
                shake = 10f;
                recoil = 10f;
                rotateSpeed = 1f;
                ejectEffect = Fx.casing3;
                shootSound = Sounds.artillery;
                rotate = true;

                bullet = new ArtilleryBulletType(11f, 327){{
                    hitEffect = Fx.sapExplosion;
                    knockback = -3f;
                    lifetime = 30f;
                    width = height = 25f;
                    collidesTiles = collides = true;
                    ammoMultiplier = 4f;
                    splashDamageRadius = 90f;
                    splashDamage = 134f;
                    backColor = Pal.sapBulletBack;
                    frontColor = lightningColor = Pal.sapBullet;
                    lightning = 5;
                    lightningLength = 20;
                    smokeEffect = Fx.shootBigSmoke2;
                    hitShake = 10f;

                    status = StatusEffects.sapped;
                    statusDuration = 60f * 10;

                    fragLifeMin = 0.3f;
                    fragBullets = 21;

                    fragBullet = new ArtilleryBulletType(2.3f, 485){{
                        hitEffect = Fx.sapExplosion;
                        knockback = -3f;
                        lifetime = 60f;
                        width = height = 20f;
                        collidesTiles = false;
                        splashDamageRadius = 80f;
                        splashDamage = 40f;
                        backColor = Pal.sapBulletBack;
                        frontColor = Pal.sapBullet;
                        smokeEffect = Fx.shootBigSmoke2;
                        hitShake = 5f;

                        status = StatusEffects.sapped;
                        statusDuration = 60f * 10;
                    }};
                }};
            }});
        }};
    }
}