import ky from "ky";
import { useEffect } from "react";

import { CardDtoList } from "../types.ts";
import CardEditor from "./CardEditor.tsx";

export default function App() {
  useEffect(() => {
    async function d() {
      const r = await ky.get("http://localhost:7100/cards").json();

      const x = CardDtoList.safeParse(r);
      console.log(x);
    }
    d();
  });

  return (
    <div className={"container mx-auto pt-8"}>
      <CardEditor />
      {/*<Card*/}
      {/*  title={"Sun, Sand"}*/}
      {/*  message={*/}
      {/*    "Wishing you a fun-filled vacation! May your days be full of adventure\n" +*/}
      {/*    "        and relaxation."*/}
      {/*  }*/}
      {/*  image={"01.png"}*/}
      {/*/>*/}
    </div>
  );
}
