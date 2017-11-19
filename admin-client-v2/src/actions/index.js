import axios from 'axios';

import * as actionType from './constants';

export const fetchCarBillingAll = (data) => {
  return {
    type: actionType.FETCH_CAR_BILLING_ALL,
    data,
  };
};

export const fetchCarBillingCount = (data) => {
  return {
    type: actionType.FETCH_CAR_BILLING_COUNT,
    data,
  };
};

export const fetchCarBillingTotal = (data) => {
  return {
    type: actionType.FETCH_CAR_BILLING_TOTAL,
    data,
  };
};


export const axiosFetchCarBillingAll = () => (dispatch) => {
  //get admin token

  axios.get('http://localhost:3000/carbillings/all')
    .then((res) => {
      console.log('--- after axiosFetchCarBillingAll');
      console.log(res.data);

      dispatch(fetchCarBillingAll(res.data));
    }).catch((err) => {
      console.log(err);
    });
};

export const axiosFetchCarBillingCount = () => (dispatch) => {
  //get admin token

  axios.get('http://localhost:3000/carbillings/aggregate/count')
    .then((res) => {
      console.log('--- after axiosFetchCarBillingCount');
      console.log(res.data);

      dispatch(fetchCarBillingCount(res.data));
    }).catch((err) => {
      console.log(err);
    });
};

export const axiosFetchCarBillingTotal = () => (dispatch) => {
  //get admin token

  axios.get('http://localhost:3000/carbillings/aggregate/total')
    .then((res) => {
      console.log('--- after axiosFetchCarBillingTotal');
      console.log(res.data);

      dispatch(fetchCarBillingTotal(res.data));
    }).catch((err) => {
      console.log(err);
    });
};
