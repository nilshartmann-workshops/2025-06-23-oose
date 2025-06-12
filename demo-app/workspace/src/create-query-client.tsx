import { QueryClient } from "@tanstack/react-query";

export const createQueryClient = () => {
  // Diese QueryClient-Einstellungen sind nur für unseren Workshop
  // gewählt.
  // Für eine "echte" Anwendung können auch die Default-Einstellungen
  // des QueryClients verwendet werden (s. https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults)
  // aber die finde ich zum Lernen zu verwirrend, deswegen habe ich das Verhalten vereinfacht
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Im Fehlerfall nicht nochmal probieren
        retry: false,
        // -> führt dazu, dass Daten, die "stale" sind beim mounten
        //    einer Komponente neu geladen werden
        refetchOnMount: true, // true ist der Default
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: false,
      },
    },
  });
};
