const product = [
  {
    id: 1,
    title: "Product 1",
    description: "Description for product 1",
    price: 100,
  },
  {
    id: 1,
    title: "Product 2",
    description: "Description for product 2",
    price: 200,
  },
  {
    id: 3,
    title: "Product 3",
    description: "Description for product 3",
    price: 300,
  },
];

export async function GET(request) {
  return Response.json(product);
}

export async function POST(request) {
  const data = await request.json();
  const newProduct = {
    ...data,
    id: new Date().getTime() + "",
  };
  console.log(data);
  product.push(newProduct);
  return Response.json({ message: "" }, { status: 201 });
}
