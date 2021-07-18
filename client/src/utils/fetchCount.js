import { database } from "../firebase";

export default async function fetchCount(category, articlesPerPage) {
  const data = await database.counter.doc("B2ZJVxfS4FNo31PGf2ew").get();
  const numberOfPages = Math.ceil(data.get(category) / articlesPerPage);
  const pagesArray = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pagesArray.push(i);
  }
  return pagesArray;
}
