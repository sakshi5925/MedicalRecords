import { createSelector } from "reselect";
import get from "lodash/get"; 
import moment from "moment";

const allData = (state) => get(state, "medical.allMedical.data", []);

export const dataBookSelector = createSelector(allData, (data) => {
  const formattedData = decorateOrderData(data);
  return formattedData;
});

const decorateOrderData = (data) => {
  return data.map((item) => {
    const orderObj = {
      recordId: Number(item[0]),
      timestamp: Number(item[1]),
      name: item[2],
      age: Number(item[3]),
      gender: item[4],
      bloodType: item[5],
      allergies: item[6],
      diagnosis: item[7],
      treatment: item[8],
    };

 
    const decorated = decorateOrder(orderObj);
    console.log("data", decorated.name);  // ✅ will print 'sakhi' and 'dadhiqu'
    return decorated;
  });
};

const decorateOrder = (data) => {
  const precision = 100000;

  let recordIdNew = Math.round(Number(data.recordId) * precision) / precision;
  let ageNew = Math.round(Number(data.age) * precision) / precision;

  console.log("data.name", data.name); // ✅ will print 'sakhi' and 'dadhiqu'

  return {
    ...data,
    recordIdNew,
    ageNew,
    formattedTimestamp: moment
      .unix(Number(data.timestamp))
      .format("h:mm:ssa d MMM yyyy"),
  };
};
