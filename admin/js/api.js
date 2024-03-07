export function dataObjectResidence(params) {
  let newDataResidence;
  return (newDataResidence = {
    id: params.dataResidence.actions.length + 1,
    title: params.title.value,
    desc: params.desc.value,
    space: {
      spaceArea: params.spaceArea.value,
      spaceResidence: params.spaceResidence.value,
      type: params.type.value,
      areaType: params.areaType.value,
      standardCapacity: params.standardCapacity.value,
      maximumCapacity: params.maximumCapacity.value,
    },
    options: {
      premium: params.premium,
      quickly: params.quickly,
      special: params.special,
      sahel: params.sahel,
      estakhr: params.estakhr,
      view: params.view,
      rusta: params.rusta,
    },
    countRooms: params.countRooms.value,
    price: params.price.value,
    discount: params.discount.value,
    srcImg: '1',
    state: params.state.value,
    city: params.city.value,
    date: '',
    time: '',
  });
}

export function getDataResidence() {
  return fetch('https://659d09af633f9aee790872ee.mockapi.io/residence')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
}
export function getDataUsers() {
  return fetch('https://659d09af633f9aee790872ee.mockapi.io/users')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log('getUser Err:' + err);
    });
}
export function deleteDataUser(id) {
  fetch(`https://659d09af633f9aee790872ee.mockapi.io/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
export function postDataUser(data) {
  fetch('https://659d09af633f9aee790872ee.mockapi.io/users', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function putDataResidence(data, id) {
  return new Promise((resolve, reject) => {
    fetch(`https://659d09af633f9aee790872ee.mockapi.io/residence/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        resolve(data); // در صورت موفقیت‌آمیز بودن درخواست، از resolve() استفاده می‌کنیم
      })
      .catch((err) => {
        reject(err); // در صورت بروز خطا، از reject() استفاده می‌کنیم
      });
  });
}
