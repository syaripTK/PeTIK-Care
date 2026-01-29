const { z } = require("zod");

const loginSchema = z.object({
    email: z.string().email("Email tidak valid"), 
    password: z.string().min(6, "Password ")
})