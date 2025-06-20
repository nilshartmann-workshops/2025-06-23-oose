import ky from "ky";

// taskApiKy ist eine ky-Instanz, die verwendet wird, um auf das Task API Backend
// zuzugreifen.
//
// Hier können gemeinsame Eigenschaften festgelegt werden
//

//  Man könnte hier für den Test z.B. eine eigene URL setzen o.ä.

export const taskApiKy = ky.create({
  retry: 0,
  prefixUrl: "http://localhost:3002",
});
