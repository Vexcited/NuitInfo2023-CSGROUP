export class APIError extends Error {
  constructor (message: string) {
    super(message);
  }
}

export const post = async <T, R>(path: string, data: T): Promise<R> => {
  const response = await fetch(path, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (response.status !== 200) {
    const error = await response.json() as {
      message: string
    };

    throw new APIError(error.message);
  }

  const text_content = await response.text();
  if (text_content.length > 0) {
    return JSON.parse(text_content) as R;
  }

  return text_content as R;
};

export const get = async <R>(path: string): Promise<R> => {
  const response = await fetch(path, {
    method: "GET"
  });

  if (response.status !== 200) {
    const error = await response.json() as {
      message: string
    };

    throw new APIError(error.message);
  }

  const text_content = await response.text();
  if (text_content.length > 0) {
    return JSON.parse(text_content) as R;
  }

  return text_content as R;
};
