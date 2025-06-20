import React, { ReactNode, useContext, useState } from "react";
import { twMerge } from "tailwind-merge";

import { Ingredient } from "./ingredient-data.ts";
import logo from "./logo.png";

type Currency = {
  currency: string;
  rate: number;
};

const EUR = {
  currency: "EUR",
  rate: 1,
};

const USD = {
  currency: "USD",
  rate: 1.2,
};

const CurrencyContext = React.createContext<Currency>(EUR);
//      ^--- Zwei Komponenten: Consumer und Provider

type CurrencyProviderProps = {
  children: ReactNode;
};
export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [currency, setCurrency] = useState<Currency>(EUR);

  return (
    <CurrencyContext.Provider value={currency}>
      <div className={"flex space-x-4"}>
        <Button onClick={() => setCurrency(EUR)} selected={currency === EUR}>
          EUR
        </Button>
        <Button onClick={() => setCurrency(USD)} selected={currency === USD}>
          USD
        </Button>
      </div>
      {children}
    </CurrencyContext.Provider>
  );
}

type ButtonProps = {
  children: ReactNode;
  onClick?(): void;
  selected?: boolean;
  secondary?: boolean;
};
function Button({ children, onClick, selected, secondary }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "hover:pointer border-orange_2-500 hover:bg-orange_2-200 rounded border p-2",
        selected ? "bg-orange_2 hover:bg-orange_2" : "bg-white",
        secondary && "border-gray-300 p-1 text-sm",
      )}
    >
      {children}
    </button>
  );
}

type IngredientsProps = {
  ingredients: Ingredient[];
};
export default function IngredientsWidget({ ingredients }: IngredientsProps) {
  console.log("RENDER IngredientsWidget");
  const [servings, setServings] = useState(4);

  const onDecreaseServings = () => setServings(servings - 1);
  const onIncreaseServings = () => setServings(servings + 1);

  return (
    <>
      <div className={"flex items-center justify-between"}>
        <Header>Ingredients</Header>
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
  console.log("RENDER ServingsChooserProps");
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
  console.log("RENDER IngredientItem");
  return (
    <div
      className={
        "font-inter flex items-center space-x-2 border-b border-dotted border-gray-300 pt-2 pb-2 text-gray-500"
      }
    >
      <div className={"flex w-full justify-between"}>
        <div className={"flex"}>
          <CheckIcon />
          <Amount
            amount={(ingredient.amount / 4) * servings}
            unit={ingredient.unit}
          />
          <Label>{ingredient.name}</Label>
        </div>
        <div>
          <Price id={ingredient.name} price={ingredient.price} />
        </div>
      </div>
    </div>
  );
}

type PriceProps = {
  id: string;
  price: number;
};

function Price({ id, price }: PriceProps) {
  console.log("RENDER Price for ", id);

  const [showPrices, setShowPrices] = useState(true);

  const currency = useContext(CurrencyContext);

  return (
    <>
      {showPrices && currency && (
        <span className={"p-2"}>
          {price * currency.rate} {currency.currency}
        </span>
      )}
      <Button secondary onClick={() => setShowPrices(!showPrices)}>
        {showPrices ? "Hide Price" : "Show Price"}
      </Button>
    </>
  );
}

type HeaderProps = {
  children: ReactNode;
};

function Header({ children }: HeaderProps) {
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
  return <h2 className={"font-space px-4 text-3xl font-bold"}>{children}</h2>;
}

type AmountProps = {
  amount: number;
  unit: string;
};
function Amount({ amount, unit }: AmountProps) {
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
  return <span className={"p-2"}>{children}</span>;
}

type CheckIconProps = {
  className?: string;
};
function CheckIcon({ className }: CheckIconProps) {
  return (
    <i
      className={twMerge(
        "fa-regular fa-circle-check text-orange_2 p-2",
        className,
      )}
    ></i>
  );
}

function RecipifyIcon() {
  return <img src={logo} alt={"Recipify icon"} />;
}

type IconButtonProps = {
  icon: "plus" | "minus";
  onButtonClick(): void;
  disabled?: boolean;
};

function IconButton({ disabled, icon, onButtonClick }: IconButtonProps) {
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
