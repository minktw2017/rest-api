import Elysia from "elysia";
import category from "../models/category-model";

type TCategory = {
  name: string;
  slug: string;
  imageURL: string;
}

export const CategoryControllers = (app: Elysia) => {

  app.post("/category", async (c)=> {
    const { name, slug, imageURL } = c.body as TCategory;
    const newcategory = await category.create({
      name, slug, imageURL
    });
    return newcategory
  });

  app.put("/category/:id", async (c)=> {
    const { id } = c.params;
    const { name, slug, imageURL } = c.body as TCategory;
    const updatecategory = await category.findByIdAndUpdate(id, {
      name, slug, imageURL
    }, {new: true})
    return updatecategory
  });

  app.get("/category", async ()=> {
    const categories = await category.find();
    return categories
  });

  app.get("/category/:name", async (c)=> {
    const { name } = c.params;
    const categories = await category.find({slug: name});
    return categories
  });

  app.delete("/category/:id", async (c)=> {
    const { id } = c.params;
    await category.findByIdAndDelete(id, {new: true})
  });

  return Promise.resolve(app)
}