import { Elysia } from "elysia";
import act from "../models/activity-model";
import mongoose from "mongoose";
import { readdir, mkdir } from "node:fs/promises";
import { join } from "node:path";
import fs from 'fs';

type TAct = {
  sn: string;
  title: string;
  imagepath: string;
  filepath: string;
  views: number;
  likes: number;
}
type TFile = {
  uploadfile: File;
}

const current: string = import.meta.dirname;
const controlPath: string = join(current, "../../", "public");

export const UploadControllers = (app: Elysia) => {
  // 讀取全部活動
  app.get("/upload", async ()=> {
    const acts = await act.find();
    return acts
  });
  // 新增活動
  app.post("/upload", async (c) => {
      const { sn, title, imagepath, filepath, views, likes } = c.body as TAct;

      const newAct = await act.create({
        sn,
        title,
        filepath,
        imagepath: `/data/public/act/${sn}/image.webp`,
        views,
        likes
      })

    return newAct
  });
  // 修改活動
  app.put("/upload/:id", async (c)=> {
    const { id } = c.params;
    const { sn, title, imagepath, filepath, views, likes } = c.body as TAct;

    const updateAct = await act.findByIdAndUpdate(id, {
      sn,
      title,
      filepath,
      imagepath: `/data/public/act/${sn}/image.webp`,
      views,
      likes
    }, {new: true})
    return updateAct
  });

  app.put("/upload/movie/:sn", async (c) => {
    const { sn } = c.params;
    const { uploadfile } = c.body as TFile;
    const singleMovie = await act.find({ sn: sn });
    const moviePath = `${controlPath}/act/${singleMovie[0].sn}/`;
    const movieName = `${moviePath}movie.webm`;

    try {
      console.log(moviePath)
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

  app.put("/upload/thumb/:sn", async (c) => {
    const { sn } = c.params;
    const { uploadfile } = c.body as TFile;
    const singleMovie = await act.find({ sn: sn });
    const imagePath = `${controlPath}/act/${singleMovie[0].sn}/`;
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

  app.get("/upload/:sn", async (c)=> {
    const { sn } = c.params;
    const singleAct = await act.find({sn: sn});
    return singleAct
  });

  app.delete("/upload/:id", async (c)=> {
    const { id } = c.params;
    await act.findByIdAndDelete(id, {new: true})
    return {
      success: true,
    };
  });
  
  return Promise.resolve(app)
}