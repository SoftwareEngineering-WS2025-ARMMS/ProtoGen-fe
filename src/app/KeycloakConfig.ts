import {
  provideKeycloak,
  AutoRefreshTokenService,
  UserActivityService,
  createInterceptorCondition,
  IncludeBearerTokenCondition,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  includeBearerTokenInterceptor,
} from 'keycloak-angular';
import { environment } from '../environment/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

const condition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: /^.*$/i, // TODO: fix this to match the backend api, for now matching all patterns
  bearerPrefix: 'Bearer',
});

export const provideKeycloakAngular = () =>
  provideKeycloak({
    config: environment.keycloakConfig,
    initOptions: {
      pkceMethod: 'S256',
      onLoad: 'login-required',
    },
    providers: [
      AutoRefreshTokenService,
      UserActivityService,
      {
        provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
        useValue: [condition],
      },
      provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
    ],
  });
