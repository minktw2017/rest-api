import { Elysia } from "elysia";
import act from "../models/activity-model";

type TFile = {
  sn: string;
  title: string;
  imagename: string;
  filename: string;
  imagepath: string;
  filepath: string;
  image: File;
  file: File;
  views: number;
}

export const UploadControllers = (app: Elysia) => {

  app.get("/upload", async ()=> {
    const acts = await act.find();
    return acts
  });

  app.post("/upload", async (c) => {
      const { sn, title, imagepath, filepath, image, imagename, file, filename, views } = c.body as TFile;

      // if (image) {
      //   await Bun.write(imagepath, image)
      // }
      
      // if (file) {
      //   await Bun.write(filepath, file);
      // }

      const newAct = await act.create({
        sn, title, filepath, imagepath, views
      })

    return newAct
  });

  app.put("/upload/:id", async (c)=> {
    const { id } = c.params;
    const { sn, title, imagepath, filepath, image, imagename, file, filename, views  } = c.body as TFile;

    // if(image) {
    //   const imagepath = `/data/public/${sn}/${imagename}`
    //   await Bun.write(imagepath, image)
    //   await act.findByIdAndUpdate(id, { imagepath}, {new: true})
    // }
    console.log(imagepath)

    const updateAct = await act.findByIdAndUpdate(id, {
      sn, title, imagepath, filepath, image, imagename, file, filename, views
    }, {new: true})
    return updateAct
  });

  app.get("/upload/:sn", async (c)=> {
    const { sn } = c.params;
    const singleAct = await act.find({sn: sn});
    return singleAct
  });

  app.delete("/upload/:id", async (c)=> {
    const { id } = c.params;
    await act.findByIdAndDelete(id, {new: true})
  });
  
  return Promise.resolve(app)
}