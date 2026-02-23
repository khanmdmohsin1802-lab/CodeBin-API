import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(2, { msg: "name should have more than 2 letters" }),
  email: z.email({ msg: "Invalid email address" }),
  password: z.string().min(6, { msg: "password should 6 characters long" }),
});

const validateSignup = (req, res, next) => {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    const errorData =
      result.error.issues || result.error.errors || result.error;

    const errorMessage = Array.isArray(errorData)
      ? errorData.map((err) => err.message)
      : ["validation error occurred "];

    return res.status(400).json({
      error: "Validation failed",
      details: errorMessage,
    });
  }

  next();
};

export { validateSignup };
