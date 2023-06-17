import type { Request, Response, NextFunction } from 'express';

declare global {
  type ExpressRequest = Request;
  type ReqWithAuth = ExpressRequest & { userId: string };

  type Res = Response;
  type NextFn = NextFunction;
}
