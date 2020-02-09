import {Injectable} from '@angular/core';
import {
  ActivatedRoute, ActivatedRouteSnapshot,
  CanActivate, CanActivateChild, Router, RouterStateSnapshot

} from '@angular/router';
import {JwtService} from '../services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private jwtService: JwtService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isAuthenticated(state.url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }

  isAuthenticated(url: string): boolean {
    if (!this.jwtService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    this.jwtService.redirectURL = url;

    return true;
  }
}
