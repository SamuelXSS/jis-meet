import api from "../services/api";

interface Response {
  user: {
    id: number;
    username: string;
    name: string;
    email: string;
    token: string;
  };
}

export async function signIn(user: string, pass: string): Promise<Response> {
  const res = await api.post("/auth", {
    username: user,
    pass: pass,
  });
  return new Promise((resolve) => {
    resolve({
      user: {
        id: res.data.id,
        username: res.data.username,
        token: res.data.token,
        name: res.data.name,
        email: res.data.email,
      },
    });
  });
}
