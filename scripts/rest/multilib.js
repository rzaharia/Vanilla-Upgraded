// Made by Mesokrix
// Color, Effects, Update for bullet, Update for block
module.exports = {
	// Color
	// In game items color
	copper: Color.valueOf("d99d73"),
	lead: Color.valueOf("8c7fa9"),
	metaglass: Color.valueOf("ebeef5"),
	graphite: Color.valueOf("b2c6d2"),
	sand: Color.valueOf("f7cba4"),
	coal: Color.valueOf("272727"),
	titanium: Color.valueOf("8da1e3"),
	thorium: Color.valueOf("f9a3c7"),
	scrap: Color.valueOf("777777"),
	silicon: Color.valueOf("53565c"),
	plastanium: Color.valueOf("cbd97f"),
	phasefabric: Color.valueOf("f4ba6e"),
	surgealloy: Color.valueOf("f3e979"),
	sporePod: Color.valueOf("7457ce"),
	blastCompound: Color.valueOf("ff795e"),
	pyratite: Color.valueOf("ffaa5f"),
	// Items color in the mod 
	aliresist: Color.valueOf("989aa3"), // Resistant alloy
	alisupra: Color.valueOf("959dc2"), // SupraConductor alloy
	emerald: Color.valueOf("6ecc79"),
	lithium: Color.valueOf("ffffff"),
	niobium: Color.valueOf("989aa3"),
	oberald: Color.valueOf("385947"),
	obsidian: Color.valueOf("000000"),
	tungstene: Color.valueOf("614852"),
	vibro: Color.valueOf("B18396"),
	// Team color
	teamy: Color.valueOf("ffd37f"), // Team yellow
	teamr: Color.valueOf("f25555"), // Team red
	teamb: Color.valueOf("4169e1"), // Team blue
	teamd: Color.valueOf("4d4e58"), // Team dark gray
	teamg: Color.valueOf("4dd98b"), // Team green
	teamp: Color.valueOf("9a4bdf"), // Team purple
	// Other color
	ormisfront: Color.valueOf("dd9933"), // Orange missile front
	ormisback: Color.valueOf("ffcc22"), // Orange missile back
	vibrocyan: Color.valueOf("00ffff"),
	darkblue: Color.valueOf("00008bff"),


	// Effects
	circleOne(x, y, col, radius, thickness, fin, fout){
		Draw.color(col);
		Lines.stroke(fout * thickness);
		Lines.circle(x, y, fin * radius);
		Draw.color();
	},

	circleTwo(x, y, col1, col2, radius, thickness, fin, fout){
		Draw.color(col1, col2, fin);
		Lines.stroke(fout * thickness);
		Lines.circle(x, y, fin * radius);
		Draw.color();
	},	

	circleBackOne(x, y, col, radius, thickness, fin, fout){
		Draw.color(col);
		Lines.stroke(fin * thickness);
		Lines.circle(x, y, fout * radius)
		Draw.color();
	},

	circleBackTwo(x, y, col1, col2, radius, thickness, fin, fout){
		Draw.color(col1, col2, fin);
		Lines.stroke(fin * thickness);
		Lines.circle(x, y, fout * radius)
		Draw.color();
	},

	fillCircleOne(x, y, col, radius){
		Draw.color(col);
		Fill.circle(x, y, radius);
		Draw.color();
	},

	fillCircleTwo(x, y, col1, col2, radius, fin){
		Draw.color(col1, col2, fin);
		Fill.circle(x, y, radius);
		Draw.color();
	},

	advancedFillCircleTwo(x1, y1, x2, y2, col1, col2, radius1, radius2){
		Draw.color(col1);
		Fill.circle(x1, y1, radius1);

		Draw.color(col2);
		Fill.circle(x2, y2, radius2);
		Draw.color();
	},

	fillSquareOneEffect(x, y, col, fout){
		Draw.color(col);
		Fill.square(x, y, 0.1 + fout * 2.8, 45);
	},


	fillSquareTwoEffect(x, y, col1, col2, fin, fout){
		Draw.color(col1, col2, fin);
		Fill.square(x, y, 0.1 + fout * 2.8, 45);
	},


	// Update for bullet
	lightningChanceBullet(chance, sound, name, color, damage, lenght){
		if(Mathf.chance(chance)){
			const vec = new Vec2();

			sound.at(name);

			vec.trns(name.rot() + Mathf.range(2.0), 12);
			Lightning.create(name.getTeam(), color, damage, name.x + vec.x + Mathf.range(24.0), name.y + vec.y + Mathf.range(24.0), name.rot() + Mathf.range(46.0), lenght);
		}
	},

	chanceCreateBullet(chance, bullet, team, x, y){
		if(Mathf.chance(chance)){
			Calls.createBullet(bullet, team, x, y, Mathf.random(360), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
		}	
	},

	// Update for block
	lightningChanceBlock(chance, sound, name, color, damage, lenght){
		if(Mathf.chance(chance)){
			sound.at(name);

			Lightning.create(name.getTeam(), color, damage, name.x, name.y, name.rot() + Mathf.random(0, 360), lenght);	
		}	
	}
}