// import axios from 'axios';

// export default (value) => {
//   const promiseData = axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(value.url)}`)
//     .then((response) => {
//       if (response.status === 200) return response.data;
//       throw new Error('Network response was not ok.');
//     })
//     .then((data) => {
//       const parser = new DOMParser();
//       const doc = parser.parseFromString(data.contents, 'application/xml');
//       return doc;
//     });
//   return promiseData;
// };
