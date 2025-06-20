import { singleRecipe } from "./ingredient-data.ts";
import IngredientsWidget from "./IngredientsWidget.tsx";

export default function CompilerApp() {
  // todo: hier noch ein Beispiel zeigen:
  //   -> lokaler State
  //   -> IngredientsWidget memo
  //   -> ein Objekt (oder Array), das sich NICHT ändert ("Config")
  //   -> IngredientsWidget wird zu häufig gerendert
  //   -> Außerdem:
  //       -> useEffect in IngredientsWidget mit Config als Dependency

  return (
    <div className={"container mx-auto max-w-xl"}>
      <IngredientsWidget ingredients={singleRecipe.ingredients} />
    </div>
  );
}
