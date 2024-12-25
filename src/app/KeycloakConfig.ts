import {
  provideKeycloak,
  AutoRefreshTokenService,
  UserActivityService,
  createInterceptorCondition,
  IncludeBearerTokenCondition,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  includeBearerTokenInterceptor,
} from 'keycloak-angular';
import { environment } from '../environment/environment.prod';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

const localhostCondition =
  createInterceptorCondition<IncludeBearerTokenCondition>({
    urlPattern: /^(\/api)(\/.*)?$/i, // TODO: fix this to match the backend api
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
        useValue: [localhostCondition],
      },
      provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
    ],
  });
