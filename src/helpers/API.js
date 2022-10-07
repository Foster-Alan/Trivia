const fetchAPI = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL);
  const dataAPI = await response.json();
  return dataAPI.token;
};

export default fetchAPI;
