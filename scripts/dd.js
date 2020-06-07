//назначаем имя блока
const Dilueur = extendContent(GenericSmelter, "dilueur", {	
//запускаем функцую загруживания
	load: function(){
		//загружаем картнику самого завода
		this.region = Core.atlas.find(this.name);
		this.liquidRegion = Core.atlas.find(this.name + "-liquid");
	},
	
//запускаем функцию генерации икон
	generateIcons: function(){
	return [
	//генерируем иконку
		Core.atlas.find(this.name)
	];},
	
//запускаем функцую рисования
	draw: function(tile){
		//загружаем изображения из load: function(){
		mod = tile.entity.liquids;
		//загружаем картинку самаго завода (самую нижную часть)
		Draw.rect(this.region, tile.drawx(), tile.drawy());

			if(mod.total() > 0.001){
			Draw.color(this.outputLiquid.liquid.color);
			Draw.alpha(mod.get(this.outputLiquid.liquid) / this.liquidCapacity);
			Draw.rect(this.liquidRegion, tile.drawx(), tile.drawy());
			Draw.color();
		};
	}
});
