//назначаем имя блока
const Usineasupra = extendContent(GenericSmelter, "usineasupra", {	
//запускаем функцую загруживания
	load: function(){
		//загружаем картнику самого завода
		this.region = Core.atlas.find(this.name);
		//загружаем картнику самой высокой части завода
		this.topRegionB = Core.atlas.find(this.name + "-topB");
		//загружаем картнику ротатора завода
		this.rimRegion = Core.atlas.find(this.name + "-rot");

	},
	
//запускаем функцию генерации икон
	generateIcons: function(){
	return [
	//генерируем самую высокую картинку
		Core.atlas.find("js?-usineasupra-topB")
	];},
	
//запускаем функцую рисования
	draw: function(tile){
		//загружаем изображения из load: function(){
		entity = tile.ent();
		//загружаем картинку самаго завода (самую нижную часть)
		Draw.rect(this.region, tile.drawx(), tile.drawy());
		Draw.color();
		//загружаем картинку ротатора завода (средную часть)
		Draw.rect(this.rimRegion, tile.drawx(), tile.drawy(), entity.totalProgress * 2.2);//заставляем крутится
		//загружаем картинку верхнюю завода (самую вехнюю часть)
		Draw.rect(this.topRegionB, tile.drawx(), tile.drawy());
	}
});