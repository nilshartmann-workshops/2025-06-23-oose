import Card from "./Card.tsx";

export default function PlaceholderCard() {
  return (
    <Card className={"h-20 animate-pulse"}>
      <div className={"flex items-center justify-between"}>
        <div className={"h-10 w-72 rounded-md bg-gray-100"} />
        <div className={"flex space-x-4"}>
          <div className={"h-8 w-32 rounded-md bg-gray-100"} />
          <div className={"h-8 w-32 rounded-md bg-gray-100"} />
        </div>
      </div>
    </Card>
  );
}
