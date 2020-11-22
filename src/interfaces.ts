import { Router } from "express";

export interface BaseLogger {
  logError: (error: Error) => void;
}

export interface BaseController {
  initRoutes: VoidFunction;
  router: Router;
  baseRoute: string;
}

export interface BaseModule {
  initModule: (BaseLogger, ...initArgs: any[]) => void;
  controller?: BaseController;
}
