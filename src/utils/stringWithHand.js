const isStringWithHand = (str = "") => {
  const result = str.search(/✋🏻|✋/);

  return result !== -1;
};

module.exports = isStringWithHand;
