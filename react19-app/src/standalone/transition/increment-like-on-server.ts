let likes = 0;

export function getLikes() {
  return likes;
}

export async function incrementLikeOnServer() {
  // Im echten Leben: fetch-Call o.ä.
  if (likes > 5) {
    throw new Error("Too many likes");
  }
  likes = await longRunningOperation(likes + 1, 2000);
  return likes;
}

export function longRunningOperation<T>(value: T, duration = 2000): Promise<T> {
  return new Promise((res) => {
    setTimeout(() => res(value), duration);
  });
}
