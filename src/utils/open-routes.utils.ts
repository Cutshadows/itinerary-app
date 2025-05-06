interface OpenRoutesResponse {
  routes: Array<{
    summary: {
      distance: number;
      duration: number;
    };
  }>;
}

const getDistans = async (
  start: string,
  end: string,
): Promise<OpenRoutesResponse> => {
  const params = new URLSearchParams({
    api_key: process.env.OPENROUTES_API_KEY || '',
    start,
    end,
  });
  const locations = await fetch(
    `${process.env.OPENROUTES_URL}driving-car?${params.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const data: OpenRoutesResponse =
    (await locations.json()) as OpenRoutesResponse;

  return data;
};

export { getDistans };
