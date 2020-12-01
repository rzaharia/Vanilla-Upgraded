const cryo = extendContent(UnitType, "explocryo", {});

cryo.groundLayer = Layer.legUnit;
cryo.constructor = () => {
    const unit = extend(LegsUnit, {});
    return unit;
};