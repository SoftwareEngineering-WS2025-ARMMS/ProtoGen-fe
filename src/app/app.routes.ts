import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { StepperComponent } from './stepper/stepper.component';
import { canActivateAuthRole } from './auth/auth-role.guard';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'create-protocol',
    component: StepperComponent,
    canActivate: [canActivateAuthRole],
  },
];
