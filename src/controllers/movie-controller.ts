import Elysia from "elysia";
import movie from "../models/movie-model";
import mongoose from "mongoose";
import { readdir, mkdir } from "node:fs/promises";

type TCategory = {
  name: string;
  category: [mongoose.Types.ObjectId];
  actress: [string];
  movieURL: string;
  sn: string;
  available: boolean;
  thumbURL: string;
  views: number;
  likes: number;
}

export const MovieControllers = (app: Elysia) => {

  app.post("/movie", async (c) => {
    const { name, category, actress, movieURL, sn, available, thumbURL, views, likes } = c.body as TCategory;
    const newMovie = await movie.create({
      name, category, actress, movieURL, sn, available, thumbURL, views, likes
    });
    return newMovie
  });

  app.post("/file", async (c) => {
    console.log(c)
  });

  app.put("/movie/:id", async (c) => {
    const { id } = c.params;
    const { name, category, actress, movieURL, sn, available, thumbURL, views, likes } = c.body as TCategory;
    const updateMovie = await movie.findByIdAndUpdate(id, {
      name, category, actress, movieURL, sn, available, thumbURL, views, likes
    }, { new: true })
    return updateMovie
  });

  app.get("/movie", async () => {
    const movies = await movie.find();
    return movies
  });

  app.get("/movie/:name", async (c) => {
    const { name } = c.params;
    const singleMovie = await movie.find({ sn: name });
    return singleMovie
  });

  app.delete("/movie/:id", async (c) => {
    const { id } = c.params;
    await movie.findByIdAndDelete(id, { new: true })
  });

  app.get("/movie/checkdir", async () => {
    const path1 = `${process.env.PUBLIC_PATH}/image/banner`;
    const path2 = `${process.env.PUBLIC_PATH}/image/anner`;

    let exists = false;
    try {
      await readdir(path2);
      exists = true;
    } catch (err) { }

    if (exists) {
      return new Response(path2 + " exists.")
    } else {
      // await mkdir(path2, { recursive: true });
      return new Response(path2 + " doesn't exist. /n And built now.")
    }
  });

  return Promise.resolve(app)
}