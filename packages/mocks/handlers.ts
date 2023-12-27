import { HttpHandler, HttpResponse, http } from "msw";

export const handlers: HttpHandler[] = [
  http.get("/posts", () => {
    console.log('Captured a "GET /posts" request');
  }),
  http.post("/posts", () => {
    HttpResponse.json({ name: "raven" });
  }),
  http.delete("/posts/:id", ({ params }) => {
    console.log(`Captured a "DELETE /posts/${params.id}" request`);
  }),
];
