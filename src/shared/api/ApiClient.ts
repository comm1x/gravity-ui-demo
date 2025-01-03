import { sleep } from 'shared/utils/promiseUtils';

class ApiClient {
  async login(login: string, password: string): Promise<string> {
    await sleep(1000);
    if (login === 'ivan' && password === 'password1') {
      return 'token-example-for-user-ivan';
    }
    throw new Error('Password wrong');
  }
}

export const apiClient = new ApiClient();
