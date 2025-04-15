import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = (route.data['role'] || '').toLowerCase();
    const actualRole = (this.authService.getUserRole() || '').toLowerCase();

    console.log('RoleGuard - expected:', expectedRole, 'actual:', actualRole);

    if (expectedRole && expectedRole === actualRole) {
      return true;
    }

    this.authService.logout();
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
