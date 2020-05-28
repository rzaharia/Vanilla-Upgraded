//Encore buggé ne l'utiliser pas !

//назначаем имя блока
const Dilueur = extendContent(GenericSmelter, "Dilueur", {	
//запускаем функцую загруживания
	load: function(){
		//загружаем картнику самого завода
		this.region = Core.atlas.find(this.name);
		//загружаем картнику ротатора завода
		this.rimRegion = Core.atlas.find(this.name + "-roe");

	},
	
//запускаем функцию генерации икон
	generateIcons: function(){
	return [
	//генерируем самую высокую картинку
		Core.atlas.find(modName + "-Dilueur")
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
		//загружаем картинку верхнюю завода (самую вехнюю часть)
		Draw.rect(this.rimRegion, tile.drawx() + 5, tile.drawy() + 5, entity.totalProgress * 2.2);
	}
});