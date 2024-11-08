import Elysia from "elysia";
import movie from "../models/movie-model";
import mongoose from "mongoose";
import { readdir, mkdir } from "node:fs/promises";
import { join } from "node:path";

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

type TFile = {
	uploadfile: File;
}

const current: string = import.meta.dirname;
const controlPath: string = join(current, "../../", "public");

export const MovieControllers = (app: Elysia) => {

  app.post("/movie", async (c) => {
    const { name, category, actress, movieURL, sn, available, thumbURL, views, likes } = c.body as TCategory;
    const newMovie = await movie.create({
      name, category, actress, movieURL, sn, available, thumbURL, views, likes
    });
    return newMovie
  });

  app.put("/movie/:id", async (c) => {
    const { id } = c.params;
    const { name, category, actress, movieURL, sn, available, thumbURL, views, likes } = c.body as TCategory;
    const updateMovie = await movie.findByIdAndUpdate(id, {
      name, category, actress, movieURL, sn, available, thumbURL, views, likes
    }, { new: true })
    return updateMovie
  });

  app.put("/data/movie/:sn", async (c)=> {
		const { sn } = c.params;
		const {uploadfile} = c.body as TFile;
    let dirExist: boolean = false;

		const imagePath = `${controlPath}/movie/${sn}/movie.webm`

    console.log(imagePath)

    try {
      await readdir(imagePath);
		  // await Bun.write(imagePath, uploadfile)
      dirExist = true;
      return {
        response: "Dir exist."
      }} catch (err) {
        // await mkdir(imagePath);
        // await Bun.write(imagePath, uploadfile)
        return {
          response: "Dir doesn't exist."
        }
      }

	})

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