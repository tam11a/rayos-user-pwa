export default async function urlToFile(url) {
  const res = await fetch(url);
  const blob = await res.blob();
  const file = new File([blob], url.substring(url.lastIndexOf("/") + 1), {
    type: blob.type,
  });
  return file;
}
