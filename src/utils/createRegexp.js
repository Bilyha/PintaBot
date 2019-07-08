const createRegExp = items => {
  if (Array.isArray(items)) {
    return items.map(item => new RegExp(item, "i"));
  }

  return new RegExp(items, "i");
};

module.exports = createRegExp;
