export default (response) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(response.contents, 'application/xml');
  //   console.log(doc);
  return doc;
};
