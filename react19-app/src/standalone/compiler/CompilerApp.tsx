import { singleRecipe } from "./ingredient-data.ts";
import IngredientsWidget from "./IngredientsWidget.tsx";

export default function CompilerApp() {
  return (
    <div className={"container mx-auto max-w-xl"}>
      <IngredientsWidget ingredients={singleRecipe.ingredients} />
    </div>
  );
}
