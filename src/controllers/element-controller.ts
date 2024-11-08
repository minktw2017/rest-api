import Elysia from "elysia";
import element from "../models/element-model";
import { join } from "node:path";

type TElement = {
    name: string;
    alias: string;
    imgOne: string;
    imgTwo: string;
    imgThree: string;
    imgFour: string;
}

type TFile = {
	uploadfile: File;
}

const current: string = import.meta.dirname;
const controlPath: string = join(current, "../../", "public");

export const ElementControllers = ( app: Elysia ) => {

	app.get("/element", async ()=> {
    const elements = await element.find();

		if(elements) {
			return elements
		}

    return new Response("Nothing here yet.")
  });

	app.get("/element/:name", async (c)=> {
    const { name } = c.params;
    const singleElement = await element.find({name: name});
    return singleElement
  });

	app.put("/element/:id", async (c)=> {
    const { id } = c.params;
		const { name, alias, imgOne, imgTwo, imgThree, imgFour } = c.body as TElement;
		const updateElement = await element.findByIdAndUpdate(id, {
			name, alias, imgOne, imgTwo, imgThree, imgFour
		}, { new: true });

		return updateElement
  });

	app.put("/element/banner/:field", async (c)=> {
		const { field } = c.params;
		const {uploadfile} = c.body as TFile;

		const imagePath = `${controlPath}/image/banner/${field}.jpg`

		await Bun.write(imagePath, uploadfile)

		return {
			response: "ok"
		}
	})

	app.put("/element/sv/:field", async (c)=> {
		const { field } = c.params;
		const {uploadfile} = c.body as TFile;

		const imagePath = `${controlPath}/image/sv/${field}.jpg`

		await Bun.write(imagePath, uploadfile)

		return {
			response: "ok"
		}
	})

	app.put("/element/feature/:field", async (c)=> {
		const { field } = c.params;
		const {uploadfile} = c.body as TFile;

		const imagePath = `${controlPath}/image/feature/${field}.jpg`

		await Bun.write(imagePath, uploadfile)

		return {
			response: "ok"
		}
	})

	app.post("element", async(c) => {
		const { name, alias, imgOne, imgTwo, imgThree, imgFour } = c.body as TElement;
		const newElement = await element.create({
			name, alias, imgOne, imgTwo, imgThree, imgFour
		});

		return newElement
	});

	app.put("/element/:id", async(c) => {
		const { id } = c.params;
		const { name, alias, imgOne, imgTwo, imgThree, imgFour } = c.body as TElement;
		const updateElement = await element.findByIdAndUpdate(id, {
			name, alias, imgOne, imgTwo, imgThree, imgFour
		}, { new: true });

		return updateElement
	});

	app.delete("/element/:id", async(c) => {
		const { id } = c.params;
		await element.findByIdAndDelete(id, {new: true})
	});

  return Promise.resolve(app)
}