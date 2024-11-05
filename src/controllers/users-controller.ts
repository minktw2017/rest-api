import Elysia from "elysia";
import user from "../models/users-model";

type TUser = {
  name: string;
  email: string;
  password: string;
}

export const UserControllers = (app: Elysia) => {

  app.post("/user", async (c) => {
    const { name, email, password } = c.body as TUser;
    const newUser = await user.create({
      name, email, password
    });
    return newUser
  });

  app.put("/user/:id", async (c) => {
    const { id } = c.params;
    const { name, email, password } = c.body as TUser;
    const updateUser = await user.findByIdAndUpdate(id, {
      name, email, password
    }, { new: true })
    return updateUser
  });

  app.get("/user", async () => {
    const users = user.find();
    return users
  });

  app.get("/", async () => {
    return new Response(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
  });

  app.delete("/user/:id", async (c) => {
    const { id } = c.params;
    await user.findByIdAndDelete(id, { new: true })
  });

  return Promise.resolve(app)
}