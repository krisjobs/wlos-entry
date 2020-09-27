import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, UrlSerializer } from '@angular/router';

import { appRoutes } from './routes';


@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        preloadingStrategy: NoPreloading,
        scrollPositionRestoration:'enabled',
        paramsInheritanceStrategy: 'always',
        relativeLinkResolution: 'corrected',
        malformedUriErrorHandler:
            (error: URIError, urlSerializer: UrlSerializer, url:string) =>
              urlSerializer.parse("/page-not-found")
    }
      )
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
