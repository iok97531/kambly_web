const httpRequest = async (baseUrl: string, method: string, path: string, body: any = null) => {
  
  const url = `${baseUrl}${path}`;
  
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    });
    
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const host = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://api.kambly.com'; // TODO: production url 설정

const api = {
  get: (path: string) => httpRequest(host, 'GET', path),
  post: (path: string, body: any) => httpRequest(host, 'POST', path, body),
  put: (path: string, body: any) => httpRequest(host, 'PUT', path, body),
  delete: (path: string) => httpRequest(host, 'DELETE', path),
}

export default api;
