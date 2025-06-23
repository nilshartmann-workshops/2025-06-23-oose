import { ReactNode, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { Ingredient } from "./ingredient-data.ts";
import { logRender, useLogRenderDone } from "./log-render.ts";
import logo from "./logo.png";

type IngredientsProps = {
  ingredients: Ingredient[];
};
export default function IngredientsWidget({ ingredients }: IngredientsProps) {
  logRender("IngredientsWidget");
  const [counter, setCounter] = useState(0);
  const [servings, setServings] = useState(4);
  const config = { documentTitle: "Huhu" };
  // const config = useMemo(() => {
  //   return { documentTitle: "Huhu" };
  // }, []);

  const onDecreaseServings = () => setServings(servings - 1);
  const onIncreaseServings = () => setServings((s) => s + 1);

  const handler = () => {
    // asynchron sicher!
    setTimeout(() => setServings((currentState) => currentState + 1), 7000);

    setServings((currentState) => {
      console.log(currentState);

      return currentState;
    });
  };

  useEffect(() => {
    console.log("EFFECT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    window.document.title = config.documentTitle;
  }, [config]);

  // useEffect(() => {
  //   console.log("EFFECT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  //   window.document.title = config.documentTitle;
  // }, [config.documentTitle]);

  useLogRenderDone();

  return (
    <>
      <div className={"flex items-center justify-between"}>
        <Header config={config}>Ingredients</Header>
        <button onClick={() => setCounter(counter + 1)}>{counter}</button>

        <ServingsChooser
          servings={servings}
          onMinusClick={onDecreaseServings}
          onPlusClick={onIncreaseServings}
        />
      </div>
      {ingredients.map((ingredient) => (
        <IngredientItem
          key={ingredient.name}
          ingredient={ingredient}
          servings={servings}
        />
      ))}
    </>
  );
}

// Die folgende Komponentenhierarchie ist etwas übertrieben,
// soll hier aber ein möglichst komplexes "real world"-Szenario
// beschreiben

type ServingsChooserProps = {
  servings: number;
  onPlusClick(): void;
  onMinusClick(): void;
};

function ServingsChooser({
  onPlusClick,
  onMinusClick,
  servings,
}: ServingsChooserProps) {
  logRender("  ServingsChooser");
  return (
    <div className={"mt-8 mb-8 flex items-center justify-between"}>
      <div
        className={
          "rounded-lg border border-dotted border-gray-500 p-2 text-lg"
        }
      >
        <IconButton
          icon={"minus"}
          disabled={servings < 2}
          onButtonClick={onMinusClick}
        />
        <span className={"text-gray-500"}> {servings} servings </span>
        <IconButton icon={"plus"} onButtonClick={onPlusClick} />
      </div>
    </div>
  );
}

type IngredientItemProps = {
  ingredient: Ingredient;
  servings: number;
};

function IngredientItem({ ingredient, servings }: IngredientItemProps) {
  logRender(`  IngredientItem "${ingredient.name}"`);
  return (
    <div
      className={
        "font-inter flex items-center space-x-2 border-b border-dotted border-gray-300 pt-2 pb-2 text-gray-500"
      }
    >
      <CheckIcon />
      <Amount
        amount={(ingredient.amount / 4) * servings}
        unit={ingredient.unit}
      />
      <Label>{ingredient.name}</Label>
    </div>
  );
}

type HeaderProps = {
  children: ReactNode;
  config: any;
};
// memo
function Header({ children, config }: HeaderProps) {
  console.log("config", config);
  logRender("  Header");
  return (
    <span className={"flex items-center space-x-2 px-4"}>
      <RecipifyIcon />
      <Heading>{children}</Heading>
    </span>
  );
}

type HeadingProps = {
  children: ReactNode;
};
function Heading({ children }: HeadingProps) {
  logRender("    Heading");
  return <h2 className={"font-space px-4 text-3xl font-bold"}>{children}</h2>;
}

type AmountProps = {
  amount: number;
  unit: string;
};
function Amount({ amount, unit }: AmountProps) {
  logRender("    Amount");
  return (
    <span className={"p-2"}>
      {amount} {unit}
    </span>
  );
}

type LabelProps = {
  children: ReactNode;
};
function Label({ children }: LabelProps) {
  logRender("    Label");
  return <span className={"p-2"}>{children}</span>;
}

function CheckIcon() {
  logRender("    CheckIcon");
  return <i className="fa-regular fa-circle-check text-orange_2 p-2"></i>;
}

function RecipifyIcon() {
  logRender("    RecipifyIcon");
  return <img src={logo} alt={"Recipify icon"} />;
}

type IconButtonProps = {
  icon: "plus" | "minus";
  onButtonClick(): void;
  disabled?: boolean;
};

function IconButton({ disabled, icon, onButtonClick }: IconButtonProps) {
  logRender("    IconButton");
  return (
    <button onClick={disabled ? undefined : onButtonClick}>
      <i
        className={twMerge(
          icon === "plus" ? "fa-circle-plus" : "fa-circle-minus",
          "fa-solid text-orange_2 p-2",
          disabled ? "" : "hover:text-orange_2-500 hover:cursor-pointer",
        )}
      />
    </button>
  );
}
