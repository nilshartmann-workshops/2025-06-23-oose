import React, {
  ReactNode,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { twMerge } from "tailwind-merge";

import { incrementLikeOnServer } from "./increment-like-on-server.ts";
import styles from "./LoadingIndicator.module.css";

type LikesWidgetProps = {
  initialLikes: number;
};

// todo:
//  1. handle Like Click mit Transition
//  2. ErrorBoundary
//  3. optimistic likes

function MyErrorHandler({ error, resetErrorBoundary }: FallbackProps) {
  console.log("ERROR", error);
  return (
    <div>
      Fehler!
      <pre>{JSON.stringify(error)}</pre>
      <button onClick={() => resetErrorBoundary()}>Reset</button>
    </div>
  );
}

export default function LikesWidget({ initialLikes }: LikesWidgetProps) {
  return (
    <ErrorBoundary FallbackComponent={MyErrorHandler}>
      <LikesWidgetInternal initialLikes={initialLikes} />
    </ErrorBoundary>
  );
}

function LikesWidgetInternal({ initialLikes }: LikesWidgetProps) {
  const [likes, setLikes] = useState(initialLikes);

  if (likes === 3) {
    throw new Error("...");
  }

  const [optimisticLikes, setOptimisticLikes] = useOptimistic(likes);

  // const [loading, setLoading] = useState(false);
  const [loading, startLoading] = useTransition();

  const handleLikeClick = () => {
    startLoading(async () => {
      console.log("LIKES", likes);
      setOptimisticLikes(likes + 1);
      const newLikes = await incrementLikeOnServer();
      console.log("LIKES FERTIG", newLikes);
      setLikes(newLikes);
    });
  };

  const title = `Likes: ${optimisticLikes}`;

  return (
    <LikeButton onClick={handleLikeClick}>
      <title>{title}</title>
      <span>{optimisticLikes}</span>
      {/*{loading ? <LikeIndicator /> : <HeartIcon />}*/}
      <HeartIcon />
    </LikeButton>
  );
}

type LikeButtonProps = {
  disabled?: boolean;
  children: ReactNode;
  onClick(): void;
};

function LikeButton({ disabled, children, onClick }: LikeButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        "border-orange_2 text-orange_2 hover:bg-orange_2 me-2 flex space-x-2 rounded border bg-white p-2 text-[15px] hover:cursor-pointer hover:text-white disabled:cursor-default disabled:border-gray-900 disabled:bg-gray-300 disabled:text-gray-900 disabled:hover:text-gray-900",
      )}
    >
      {children}
    </button>
  );
}

function HeartIcon() {
  return (
    <span>
      <i className="fa-regular fa-heart mr-2"></i>
    </span>
  );
}

function LikeIndicator() {
  const bounceClass = `${styles.bounce}`;
  const placeholder = <i className="fa-regular fa-heart mr-2"></i>;

  return (
    <span className={`${styles.Spinner} ${styles.secondary}`}>
      {/*<div className={`${bounceClass} ${styles.bounce1}`}>{placeholder}</div>*/}
      <span className={`${bounceClass} ${styles.bounce2}`}>{placeholder}</span>
      {/*<div className={`${bounceClass} ${styles.bounce3}`}>{placeholder}</div>*/}
    </span>
  );
}
