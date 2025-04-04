import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateRequest = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync(req.body);
      req.body = parsed; // Replace with validated data
      next();
    } catch (error) {
      res.status(400).json({ 
        message: "Validation failed",
        errors: error.errors,
        receivedData: req.body 
      });
    }
  };
};

export const rateLimiter = (windowMs: number, maxRequests: number) => {
  const requests = new Map<string, number[]>();

  return (req: Request, res: Response, next: NextFunction) => {
    const now = Date.now();
    const ip = req.ip;

    if (!requests.has(ip)) {
      requests.set(ip, [now]);
      return next();
    }

    const userRequests = requests.get(ip)!;
    const windowStart = now - windowMs;

    while (userRequests.length && userRequests[0] <= windowStart) {
      userRequests.shift();
    }

    if (userRequests.length >= maxRequests) {
      return res.status(429).json({ message: "Too many requests" });
    }

    userRequests.push(now);
    next();
  };
};

export const timeout = (time: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const timeoutId = setTimeout(() => {
      res.status(408).json({ message: "Request timeout" });
    }, time);

    res.on('finish', () => {
      clearTimeout(timeoutId);
    });

    next();
  };
};