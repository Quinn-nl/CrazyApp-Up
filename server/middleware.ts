
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateRequest = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      res.status(400).json({ 
        message: "Validation failed",
        errors: error.errors 
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
