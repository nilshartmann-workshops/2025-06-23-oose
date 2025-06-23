let likes = 0;

export function getLikes() {
  return likes;
}

export async function incrementLikeOnServer() {
  // Im echten Leben: fetch-Call o.ä.
  if (likes > 5) {
    throw new Error("Too many likes");
  }
  console.log("SERVER", likes);
  likes++;
  const x = await longRunningOperation(likes + 1, 200);
  return likes;
}

export function longRunningOperation<T>(value: T, duration = 2000): Promise<T> {
  return new Promise((res) => {
    setTimeout(() => res(value), duration);
  });
}
