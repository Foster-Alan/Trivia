const TriviaApi = async () => {
  const token = localStorage.getItem('token');
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const request = await fetch(url);
  const response = await request.json();
  return response;
};

export default TriviaApi;
