const API_URL = process.env.REACT_APP_API_URL;
let authToken: string | null = null;

const handleErrors = (response: Response): Response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

const commonHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  return headers;
};

const setAuthToken = (token: string) => {
  authToken = token;
};

const get = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      headers: commonHeaders(),
    });
    handleErrors(response);

    const data = await response.json();

    return data;
  } catch (e) {
    console.error('API Error:', e);
    throw e;
  }
};

const post = async <T, K = object>(uri: string, data: K): Promise<T> => {
  try {
    const response = await fetch(`${API_URL}${uri}`, {
      method: 'POST',
      headers: commonHeaders(),
      body: JSON.stringify(data),
    });

    handleErrors(response);

    const responseJson = await response.json();

    return responseJson;
  } catch (e) {
    console.error('API Error:', e);
    throw e;
  }
};

const apiService = {
  setAuthToken,
  get,
  post,
};

export default apiService;
