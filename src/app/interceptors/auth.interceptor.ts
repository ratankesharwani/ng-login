import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('accessToken');
  const isAuthRequest = req.url.includes('/auth/login') || req.url.includes('/auth/register');

  // ⛔ Don't attach token for auth endpoints
  if (isAuthRequest) {
    return next(req);
  }
  const authReq = token
    ? req.clone({
      setHeaders: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
    })
    : req;
  return next(authReq);
};
