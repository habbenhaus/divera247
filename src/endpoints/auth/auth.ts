import {LoginApiResult} from "./models/login-api-result.model";
import {BaseClient} from "../../base-client";
import {DiveraResponse} from "../divera-response.model";

export class Auth extends BaseClient {
  getAccessToken(username: string, password: string): Promise<string> {
    return this.get<LoginApiResult>('v2/auth/login/', {
      username,
      password,
      jwt: false
    }).then(resp => resp.data.user?.access_token);
  }

  getJWT(): Promise<string> {
    return this.get<DiveraResponse<{jwt: string}>>('v2/auth/jwt').then(resp => resp.data.jwt);
  }
}
