const haos = extendContent(UnitType, "haos-antologist", {});
haos.abilities.add(
	UnitSpawnAbility(UnitTypes.horizon, 400, 65, -50),
	UnitSpawnAbility(UnitTypes.horizon, 400, -65, -50),
	UnitSpawnAbility(UnitTypes.zenith, 700, 0, -20)
);

haos.constructor = () => {
    const unit = extend(UnitEntity, {});
    return unit;
};