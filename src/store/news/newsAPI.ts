import { INew } from "./newsSlice";

let NEWS = Array(10).fill(1).map((e, i) => {
  const date = new Date();
  date.setDate((new Date()).getDate() - i);
  return ({
    id: i,
    published: !!(i%3),
    title: `Новость ${i + 1}`,
    text: `Текст ${i + 1}`,
    createdAt: `${date}`,
  });
});



export function fetchNews(search = '') {
  return new Promise<{ data: INew[] }>((resolve) => {
    const newsFiltered = NEWS
      .filter(e => e.title.search(search) > -1)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setTimeout(() => resolve({ data: newsFiltered }), 500)
  });
}

export function addNews(news: INew) {
  return new Promise<{ success: boolean }>((resolve) => {
    NEWS = NEWS.concat(news);
    setTimeout(() => resolve({ success: true }), 500)
  });
}

export function removeNews(id: number) {
  return new Promise<{ success: boolean }>((resolve) => {
    NEWS = NEWS.filter(n => n.id !== id);
    setTimeout(() => resolve({ success: true }), 500)
  });
}

export function approveNews(id: number) {
  return new Promise<{ success: boolean, id: number }>((resolve) => {
    NEWS = NEWS.map(n => (
      n.id === id
        ? { ...n, published: true }
        : n
    ));
    setTimeout(() => resolve({ success: true, id }), 500)
  });
}
