const filterData = {
  newCaseFilterMappings: {
    0: 10000,
    10000: 10000,
    20000: 10000,
    30000: 10000,
    40000: 200000,
  },
  totalCasesFilterMappings: {
    0: 5000,
    5000: 15000,
    20000: 80000,
    100000: 400000,
    500000: 10000000,
  },
  totalCasesFilterRanges: [
    { text: "500,000+", value: 500000 },
    { text: "100,000 - 500,000", value: 100000 },
    { text: "20,000 - 100,000", value: 20000 },
    { text: "5,000 - 20,000", value: 5000 },
    { text: "0 - 5,000", value: 0 },
  ],
  totalDeathsFilterMappings: {
    0: 5000,
    5000: 5000,
    10000: 15000,
    25000: 25000,
    50000: 300000,
  },
  totalDeathsFilterRanges: [
    { text: "50,000+", value: 50000 },
    { text: "25,000 - 50,000", value: 25000 },
    { text: "10,000 - 25,000", value: 10000 },
    { text: "5,000 - 10,000", value: 5000 },
    { text: "0 - 5,000", value: 0 },
  ],
  totalRecoveredFilterMappings: {
    0: 5000,
    5000: 15000,
    20000: 80000,
    100000: 400000,
    500000: 10000000,
  },
  totalRecoveredFilterRanges: [
    { text: "500,000+", value: 500000 },
    { text: "100,000 - 500,000", value: 100000 },
    { text: "20,000 - 100,000", value: 20000 },
    { text: "5,000 - 20,000", value: 5000 },
    { text: "0 - 5,000", value: 0 },
  ],
  totalActiveFilterMappings: {
    0: 5000,
    5000: 15000,
    20000: 30000,
    50000: 150000,
    200000: 10000000,
  },
  totalActiveFilterRanges: [
    { text: "200,000+", value: 200000 },
    { text: "50,000 - 200,000", value: 50000 },
    { text: "20,000 - 50,000", value: 20000 },
    { text: "5,000 - 20,000", value: 5000 },
    { text: "0 - 5,000", value: 0 },
  ],
};

export default filterData;
