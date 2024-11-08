import { Elysia } from "elysia";
import { staticPlugin } from '@elysiajs/static'
import mongoose, { ConnectOptions } from "mongoose";
import { UserControllers } from "./controllers/users-controller";
import { CategoryControllers } from "./controllers/category-controller";
import { MovieControllers } from "./controllers/movie-controller";
import { UploadControllers } from "./controllers/upload-controller";
import { ElementControllers } from "./controllers/element-controller";

const app = new Elysia()
  .use(UserControllers)
  .use(CategoryControllers)
  .use(MovieControllers)
  .use(UploadControllers)
  .use(ElementControllers);

const PORT = parseInt(process.env.PORT as string) || 3001;

mongoose
  .connect((process.env.LOCAL_DATABASE_URL as string), {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    dbName: "Elysia",
  } as ConnectOptions)
  .then(() => {
    app.use(staticPlugin()).listen(PORT, () => {
      console.log(
        `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
      );
    })
  })
  .catch(err => console.log(err))
