import { IUser } from "./authSlice";

let USERS = [{
  id: 0,
  login: 'User',
  role: 'user',
  password: 'user_password',
}, {
  id: 1,
  login: 'Admin',
  role: 'admin',
  password: 'admin_password',
}];

type ResponseType = { data: IUser | null, status: 'success' | 'failed', error?: string };

export function auth(login: string, password: string) {
  return new Promise<ResponseType>((resolve) => {
    const user: any = USERS.find(e => (e.login === login ));

    setTimeout(() => {
      if (user) {
        const { id, login, role } = user;
        if (user.password === password) {
          resolve({ data: { id, login, role }, status: 'success' });
        } else {
          resolve({ data: null, status: 'failed', error: 'Wrong password' });
        }
      } else {
        resolve({ data: null, status: 'failed', error: 'No such user' });
      }
    }, 500);
  });
}
