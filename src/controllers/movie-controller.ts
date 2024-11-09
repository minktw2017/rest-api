import Elysia from "elysia";
import movie from "../models/movie-model";
import mongoose from "mongoose";
import { readdir, mkdir } from "node:fs/promises";
import { join } from "node:path";
import fs from 'fs';

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
    const { name, category, actress, sn, available, views, likes } = c.body as TCategory;
    const newMovie = await movie.create({
      name,
      category,
      actress,
      movieURL: `/data/public/movie/${sn}/movie.webm`,
      sn,
      available,
      thumbURL: `/data/public/movie/${sn}/image.webm`,
      views,
      likes,
    });
    return newMovie
  });

  app.put("/movie/:id", async (c) => {
    const { id } = c.params;
    const { name, category, actress, sn, available, views, likes } = c.body as TCategory;
    const updateMovie = await movie.findByIdAndUpdate(id, {
      name,
      category,
      actress,
      movieURL: `/data/public/movie/${sn}/movie.webm`,
      sn,
      available,
      thumbURL: `/data/public/movie/${sn}/image.webp`,
      views,
      likes
    }, { new: true })
    return updateMovie
  });

  app.put("/movie/movie/:sn", async (c) => {
    const { sn } = c.params;
    const { uploadfile } = c.body as TFile;
    const singleMovie = await movie.find({ sn: sn });
    const moviePath = `${controlPath}/movie/${singleMovie[0].sn}/`;
    const movieName = `${moviePath}movie.webm`;

    try {
      const stats = fs.statSync(moviePath);
      if (stats.isDirectory()) {
        await Bun.write(movieName, uploadfile)
      } else {
        console.log('路徑不是目錄');
      }
    } catch (err) {
      console.log('目錄不存在');
      await mkdir(moviePath);
      await Bun.write(movieName, uploadfile);
    };

    return {
      success: true,
      data: singleMovie,
    };
  });

  app.put("/movie/thumb/:sn", async (c) => {
    const { sn } = c.params;
    const { uploadfile } = c.body as TFile;
    const singleMovie = await movie.find({ sn: sn });
    const imagePath = `${controlPath}/movie/${singleMovie[0].sn}/`;
    const imageName = `${imagePath}image.webp`;

    console.log("first")

    try {
      const stats = fs.statSync(imagePath);
      if (stats.isDirectory()) {
        await Bun.write(imageName, uploadfile);
      } else {
        console.log('路徑不是目錄');
      }
    } catch (err) {
      console.log('目錄不存在');
      await mkdir(imagePath);
      await Bun.write(imageName, uploadfile);
    };

    return {
      success: true,
      data: singleMovie,
    };
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
    return {
      success: true,
    };
  });

  return Promise.resolve(app)
}