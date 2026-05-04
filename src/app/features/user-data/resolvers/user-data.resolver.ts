import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { UserService } from "../services/user.service";
import { Injectable } from "@angular/core";

@Injectable()
export class UserResolve implements Resolve<any> {
  constructor(private usersService: UserService) {}

  resolve() {
    return this.usersService.init();
  }
}