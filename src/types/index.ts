import {z} from "zod"
export const signInTypes = z.object({
    email:z.string().email(),
    password:z.string().min(6, "atleast 6 charcters"),
});

export const signUpTypes = signInTypes.extend({
    username:z.string()
});

