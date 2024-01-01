import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
export const metadata = {
  title: "Add Product - MyDukaan",
};
async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageURL = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageURL || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: { name, description, imageURL, price },
  });
  redirect("/");
}

export default async function AddProductPage() {
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="input-bordered input mb-3 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea-bordered textarea mb-3 w-full"
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input-bordered input mb-3 w-full"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input-bordered input mb-3 w-full"
        />
        <button className="btn btn-warning" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}
