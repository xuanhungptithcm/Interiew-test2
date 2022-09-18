const filterPrice = ({ compare_at_price, priceFrom, priceTo }) => {
  console.log({ compare_at_price, priceFrom, priceTo });
  return compare_at_price >= priceFrom && compare_at_price <= priceTo;
};

const makeFilter = (
  list = [],
  searchFilter = [],
  textSearch = "",
  priceFrom,
  priceTo
) => {
  return list.reduce((total, current) => {
    const isAccept = searchFilter.some((item) => {
      if (typeof current[item.key] === "string") {
        return current[item.key]
          .toLowerCase()
          .startsWith(textSearch.toLowerCase());
      }
      return false;
    });
    if (isAccept) {
      if (priceFrom && priceTo) {
        console.log(current);
        if (
          filterPrice({
            compare_at_price: parseInt(current.variants[0].compare_at_price),
            priceFrom,
            priceTo,
          })
        ) {
          total.push(current);
        }
      } else {
        total.push(current);
      }
    }
    return total;
  }, []);
};

export default makeFilter;
