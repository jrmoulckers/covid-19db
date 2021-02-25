import SORT_TYPES from "./modelComponents/countrySortTypes";

function filterCountries(data, sortLowVal, sortHiVal, sortBy, searchValue) {
  return data
    .sort((a, b) => {
      // Sort cards by chosen category, reversing if necessary
      var reversed = sortLowVal > sortHiVal ? -1 : 1;
      switch (sortBy) {
        case SORT_TYPES.NAME:
          return reversed * a.name.localeCompare(b.name);
        case SORT_TYPES.ALPHA2:
          return (
            reversed * a.codes.alpha2Code.localeCompare(b.codes.alpha2Code)
          );
        case SORT_TYPES.ALPHA3:
          return (
            reversed * a.codes.alpha3Code.localeCompare(b.codes.alpha3Code)
          );
        case SORT_TYPES.NUM_CASES:
          return reversed * (a.cases - b.cases);
        case SORT_TYPES.POPULATION:
          return reversed * (a.population - b.population);
      }
    })
    .filter((v) => {
      const { name, cases, codes, population, capital, region } = v;
      const searchText = `
                ${name.toString().toLowerCase()} 
                Code: ${codes.alpha3Code.toString().toLowerCase()}, 
                ${codes.alpha3Code.toString().toLowerCase()} 
                Cases: ${cases?.toLocaleString()}
                Population: ${population.toLocaleString()} 
                Capital: ${capital?.name.toString().toLowerCase()}
                Region: ${region?.region?.toString().toLowerCase()}
              `;
      // Filter any instances outside of range
      const filterNone = sortLowVal == -1 && sortHiVal == -1;
      switch (sortBy) {
        case SORT_TYPES.NAME:
          v = name.charAt(0).charCodeAt(0);
          break;
        case SORT_TYPES.ALPHA2:
          v = codes.alpha2Code.charAt(0).charCodeAt(0);
          break;
        case SORT_TYPES.ALPHA3:
          v = codes.alpha3Code.charAt(0).charCodeAt(0);
          break;
        // Numerical cases: default to no filter and return entire range
        case SORT_TYPES.NUM_CASES:
          return filterNone
            ? cases
            : (cases - sortLowVal) * (cases - sortHiVal) <= 0 &&
                searchText.includes(searchValue);
        case SORT_TYPES.POPULATION:
          return filterNone
            ? population
            : (population - sortLowVal) * (population - sortHiVal) <= 0 &&
                searchText.includes(searchValue);
      }
      var slvNum = sortLowVal.charCodeAt(0);
      var shvNum = sortHiVal.charCodeAt(0);
      return (
        (v - slvNum) * (v - shvNum) <= 0 && searchText.includes(searchValue)
      );
    });
}

export { filterCountries, SORT_TYPES };
