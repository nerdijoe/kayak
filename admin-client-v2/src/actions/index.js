import axios from 'axios';

import * as actionType from './constants';

export const adminSignIn = (data) => {
  return {
    type: actionType.ADMIN_SIGNIN,
    data,
  };
};

export const adminSignOutReducer = () => {
  return {
    type: actionType.ADMIN_SIGNOUT,
  };
};

export const adminSignOut = () => (dispatch) => {
  console.log('adminSignOut');

  // need to log before clearing out localStorage
  // dispatch(axiosAddActivity(actionType.adminSignOut, 'User sign out'));
  
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_id');
  localStorage.removeItem('admin_firstname');
  localStorage.removeItem('admin_lastname');
  localStorage.removeItem('admin_email');

  // router.push('/');
  dispatch(adminSignOutReducer());

  console.log("here");

  // return {
  //   type: actionType.USER_SIGN_OUT,
  // };
};

export const addNewCar = (data) => {
  return {
    type: actionType.CAR_ADD,
    data,
  };
};
export const editCar = (data) => {
  return {
    type: actionType.CAR_EDIT,
    data,
  };
};
export const deleteCar = (data) => {
  return {
    type: actionType.CAR_DELETE,
    data,
  };
};


export const fetchCar = (data) => {
  return {
    type: actionType.FETCH_CAR,
    data,
  };
};

export const fetchCarDealer = (data) => {
  return {
    type: actionType.FETCH_CAR_DEALER,
    data,
  };
};

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

// add by NaYue 11/21/2017
export const fetchUser = (data) => {
    return {
        type: actionType.FETCH_USER,
        data,
    };
};

// add by NaYue 11/22/2017
export const editUser = (data) => {
    return {
        type: actionType.EDIT_USER,
        data,
    };
};


export const axiosSignIn = (data, router) => (dispatch) => {
  axios.post('http://localhost:3000/authadmin/signin', {
    email: data.email,
    password: data.password,
  }).then((res) => {
    // if signin is successful, then save the token in the local storage
    console.log('axiosSignIn done', res);
    console.log('axiosSignIn res.status', res.status);
    localStorage.setItem('admin_token', res.data.token);
    localStorage.setItem('admin_id', res.data.id);
    localStorage.setItem('admin_firstname', res.data.firstname);
    localStorage.setItem('admin_lastname', res.data.lastname);
    localStorage.setItem('admin_email', res.data.email);

    router.push('/dashboardkayak');

    dispatch(adminSignIn(data));

    // dispatch(signInErrorClear());
    // dispatch(signUpErrorClear());
    // dispatch(signUpSuccessClear());
    // dispatch(axiosAddActivity(actionType.USER_SIGN_IN, 'User sign in'));
  }).catch((err) => {
    console.log('Error when signin', err);
    console.log('---err.response.status', err.response.status);
    // display the error message
    // dispatch(signInError({ message: 'Sign in failed. Please check your username and password.' }));
  });
};

export const axiosAddNewCar = data => (dispatch) => {
  const admin_token = localStorage.getItem('admin_token');
  console.log('axiosAddNewCar data=', data);
  axios.post('http://localhost:3000/cars', {
    type: data.type,
    make: data.make,
    model: data.model,
    dealer: data.dealer,
    description: data.description,
    price: data.price,
    doorNumber: data.doorNumber,
    capacity: data.capacity,
  }, {
    headers: {
      admin_token,
    },
  })
    .then((res) => {
      console.log('-------------------after axiosAddNewCar');
      console.log(res);

      dispatch(addNewCar(res.data));
    }).catch((err) => {
      console.log(err);
    });
};

export const axiosEditCar = data => (dispatch) => {
  const admin_token = localStorage.getItem('admin_token');
  console.log('axiosAddNewCar data=', data);

  axios.put(`http://localhost:3000/cars/${data._id}`, {
    type: data.type,
    make: data.make,
    model: data.model,
    dealer: data.dealer,
    description: data.description,
    price: data.price,
    doorNumber: data.doorNumber,
    capacity: data.capacity,
  }, {
    headers: {
      admin_token,
    },
  })
    .then((res) => {
      console.log('-------------------after axiosEditCar');
      console.log(res);

      dispatch(editCar(res.data));
    }).catch((err) => {
      console.log(err);
    });
};

export const axiosDeleteCar = data => (dispatch) => {
  const admin_token = localStorage.getItem('admin_token');
  console.log('axiosAddNewCar data=', data);

  axios.delete(`http://localhost:3000/cars/${data._id}`, {
    headers: {
      admin_token,
    },
  })
    .then((res) => {
      console.log('-------------------after axiosDeleteCar');
      console.log(res);

      dispatch(deleteCar(data));
    }).catch((err) => {
      console.log(err);
    });
};

export const axiosFetchCar = () => (dispatch) => {
  //get admin token

  axios.get('http://localhost:3000/cars')
    .then((res) => {
      console.log('--- after axiosFetchCar');
      console.log(res.data);

      dispatch(fetchCar(res.data));
    }).catch((err) => {
      console.log(err);
    });
};

export const axiosFetchCarDealer = () => (dispatch) => {
  //get admin token

  axios.get('http://localhost:3000/cardealers')
    .then((res) => {
      console.log('--- after axiosFetchCarDealer');
      console.log(res.data);

      dispatch(fetchCarDealer(res.data));
    }).catch((err) => {
      console.log(err);
    });
};


export const axiosFetchCarBillingAll = () => (dispatch) => {
  //get admin token
  const token = localStorage.getItem('admin_token');
  axios.get('http://localhost:3000/carbillings', {
    headers: {
      token,
    },
  })
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
  const token = localStorage.getItem('admin_token');

  axios.get('http://localhost:3000/carbillings/aggregate/count', {
    headers: {
      token,
    },
  })
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
  const token = localStorage.getItem('admin_token');

  axios.get('http://localhost:3000/carbillings/aggregate/total', {
    headers: {
      token,
    },
  })
    .then((res) => {
      console.log('--- after axiosFetchCarBillingTotal');
      console.log(res.data);

      dispatch(fetchCarBillingTotal(res.data));
    }).catch((err) => {
      console.log(err);
    });
};

export const axiosFetchUser = () => (dispatch) => {
    //get admin token

    axios.get('http://localhost:3000/users')
        .then((res) => {
            console.log('--- after axiosFetchUser');
            console.log(res.data);

            dispatch(fetchUser(res.data));
        }).catch((err) => {
        console.log(err);
    });
};

export const axiosEditUser = (user) => (dispatch) => {
    //get admin token
    const admin_token = localStorage.getItem('admin_token');
    const id = user.id;
    console.log("before edit user, the id is : "+ id);
    console.log(user);
    axios.put(`http://localhost:3000/users/${id}`, user)
        .then((res) => {
        console.log('-------------- after axiosEditUser--------------');
    console.log(res.data);
    console.log(user);
    dispatch(editUser(user));
}).catch((err) => {
        console.log(err);
});
};
