package vanilla.content;

import arc.*;
import arc.graphics.*;
import arc.graphics.g2d.*;
import arc.math.*;
import arc.math.geom.*;
import arc.struct.*;
import arc.util.*;
import mindustry.entities.*;
import mindustry.game.*;
import mindustry.gen.*;
import mindustry.graphics.*;
import mindustry.type.*;
import mindustry.ui.*;

import static arc.graphics.g2d.Draw.rect;
import static arc.graphics.g2d.Draw.*;
import static arc.graphics.g2d.Lines.*;
import static arc.math.Angles.*;
import static mindustry.Vars.*;

public class VanillaFx{
	public static final Effect

	regeneration = new Effect(15f, e -> {
		Draw.color(Color.valueOf("6dff5d"), Color.valueOf("47a73d"), e.fout());
	    Lines.stroke(2 * e.fout());
	    Draw.blend(Blending.additive);
	    Lines.square(e.x, e.y, 5, e.fout());
	    Draw.blend();
	}),

	largeRegeneration = new Effect(15f, e -> {
		Draw.color(Color.valueOf("6dff5d"), Color.valueOf("47a73d"), e.fout());
	    Lines.stroke(2 * e.fout());
	    Draw.blend(Blending.additive);
	    Lines.square(e.x, e.y, 10, e.fout());
	    Draw.blend();
	}),

	hugeRegeneration = new Effect(15f, e -> {
		Draw.color(Color.valueOf("6dff5d"), Color.valueOf("47a73d"), e.fout());
	    Lines.stroke(2 * e.fout());
	    Draw.blend(Blending.additive);
	    Lines.square(e.x, e.y, 15, e.fout());
	    Draw.blend();
	}),

	giganticRegeneration = new Effect(15f, e -> {
		Draw.color(Color.valueOf("6dff5d"), Color.valueOf("47a73d"), e.fout());
	    Lines.stroke(2 * e.fout());
	    Draw.blend(Blending.additive);
	    Lines.square(e.x, e.y, 20, e.fout());
	    Draw.blend();
	}),

	avoid = new Effect(15f, e -> {
		Draw.color(Pal.accent, Color.white, e.fout());
	    Lines.stroke(2f * e.fout());
	    Draw.blend(Blending.additive);
	    Lines.square(e.x, e.y, 5f, e.fout());
	    Draw.blend();
	}),

	largeAvoid = new Effect(15f, e -> {
		Draw.color(Pal.accent, Color.white, e.fout());
	    Lines.stroke(2f * e.fout());
	    Draw.blend(Blending.additive);
	    Lines.square(e.x, e.y, 10f, e.fout());
	    Draw.blend();
	}),

	hugeAvoid = new Effect(15f, e -> {
		Draw.color(Pal.accent, Color.white, e.fout());
	    Lines.stroke(2 * e.fout());
	    Draw.blend(Blending.additive);
	    Lines.square(e.x, e.y, 15f, e.fout());
	    Draw.blend();
	}),

	giganticAvoid = new Effect(15f, e -> {
		Draw.color(Pal.accent, Color.white, e.fout());
	    Lines.stroke(2f * e.fout());
	    Draw.blend(Blending.additive);
	    Lines.square(e.x, e.y, 20f, e.fout());
	    Draw.blend();
	}),

	plasmaCharge = new Effect(70f, e -> {
	    Draw.color(Color.blue, Color.white, e.fin());
		Lines.stroke(e.fin() * 6f);
		Lines.circle(e.x, e.y, e.fout() * 120f);
		Draw.color();
	}),

	plasmaShoot = new Effect(30f, e -> {
		Draw.color(Color.blue, Color.white, e.fin());
		Lines.stroke(e.fout() * 4f);
		Lines.circle(e.x, e.y, e.fin() * 50f);
		Draw.color();
	}),

	plasmaChargeBegin = new Effect(70f, e -> {
	    Draw.color(Color.blue);
	    Fill.circle(e.x, e.y, e.fin() * 8f);

	    Draw.color(Color.white);
	    Fill.circle(e.x, e.y, e.fin() * 6f);
	}),

	quantumChargeBegin = new Effect(90f, e -> {
	    Draw.color(Color.blue);
	    Fill.circle(e.x, e.y, e.fin() * 10f);

	    Draw.color(Color.white);
	    Fill.circle(e.x, e.y, e.fin() * 8f);
	}),

	quantumcharge = new Effect(90f, e -> {
	    Draw.color(Color.blue, Color.white, e.fin());
		Lines.stroke(e.fin() * 6f);
		Lines.circle(e.x, e.y, e.fout() * 120f);
		Draw.color();
	}),

	quantumHit = new Effect(23f, e -> {
	    Draw.color(Color.blue, Color.white, e.fin());
	    Fill.circle(e.x, e.y, e.fout() * 60f);
	}),

	quantumShoot = new Effect(30f, e -> {
		Draw.color(Color.blue, Color.white, e.fin());
		Lines.stroke(e.fout() * 4f);
		Lines.circle(e.x, e.y, e.fin() * 50f);
		Draw.color();
	}),

	neutronChargeBegin = new Effect(200f, e -> {
	    Draw.color(Color.blue);
	    Fill.circle(e.x, e.y, e.fin() * 10);

	    Draw.color(Color.white);
	    Fill.circle(e.x, e.y, e.fin() * 8);
	}),

	neutroncharge = new Effect(200f, e -> {
	    Draw.color(Color.blue, Color.white, e.fin());
		Lines.stroke(e.fin() * 6f);
		Lines.circle(e.x, e.y, e.fout() * 120f);
		Draw.color();
	}),

	neutronShoot = new Effect(70f, e -> {
		Draw.color(Color.blue, Color.white, e.fin());
		Lines.stroke(e.fout() * 8f);
		Lines.circle(e.x, e.y, e.fin() * 80f);
		Draw.color();
	}),

	neutronHit = new Effect(23f, e -> {
	    Draw.color(Color.blue, Color.white, e.fin());
	    Fill.circle(e.x, e.y, e.fout() * 60f);
	});
}