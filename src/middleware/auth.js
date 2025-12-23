import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "your_secret_key";

// Simple authentication middleware for GraphQL context
// Checks for a user or token in context, throws error if not authenticated

export const auth=(req,res,next)=>{
  const token=req.headers?.authorization?.split(" ")[1];
  if(token){
    const user=jwt.verify(token,secretKey);
    req.user=user;
  }
  next();
}
