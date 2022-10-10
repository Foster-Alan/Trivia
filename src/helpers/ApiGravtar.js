const urlGravatar = async () => {
  const url = 'https://br.gravatar.com/site/implement/hash/';
  const request = await fetch(url);
  const response = await request.json();
  return response;
};

export default urlGravatar;
