import { NextFunction, Request, Response } from 'express';

export function LoggerGlobal(req: Request, res: Response, next: NextFunction) {
  const currentDateTime = new Date().toLocaleTimeString();

  console.log(
    `Estás ejecutando un método ${req.method} en la ruta ${req.url} a las ${currentDateTime}`,
  );
  next();
}

// loggerGlobal es un middleware aplicado de forma global como funcion en mi app//
