# Globaler Zustand mit zustand.js

# Files

- src/components/AppLayout.tsx
- src/components/timezone-store.ts (anlegen!)
- src/components/use-date-formatter.ts

# Aufgabe

* Implementiere eine Funktion zum Setzen der Zeitzone
* Die Zeiten sollen dann entsprechend der Zeitzone angezeigt werden

# Schritte

1. Füge in der `AppLayout.tsx` die (fast) fertige Komponente `<TimezoneChooser />` ein
    - Hierüber soll ein Benutzer seine Zeitzone einstellen können
2. Erstelle einen Zustand Store, der die aktuelle Zeitzone enthält
    - Der State soll zwei Eigenschaften haben:
        - Property `timezone` als `string` (z. B. `Europe/Berlin`)
        - Eine Funktion `setTimezone`, die ein `string` mit der neuen Zeitzone entgegennimmt
    - Wenn `setTimezone` aufgerufen wird, soll das Property `timezone` im State auf den übergebenen Wert gesetzt werden
3. Verwende den Store in `TimezoneChooser`, um die Zeitzone einstellbar zu machen (s. TODOs dort)
4. In
   `use-date-formtatter.ts` musst du die aktuelle Zeitzone auslesen und zum berechnen des Zeitpunkts verwenden (s. TODOs dort)
    - Wenn du die Zeitzone jetzt über die Chooser-Komponente umänderst, sollten die Uhrzeit entsprechend aktualisiert werden
    - Das sollte in der Liste und in der Einzeldarstellung passieren

# Material

* Zustand: https://zustand.docs.pmnd.rs/
    * Store erzeugen: https://zustand.docs.pmnd.rs/getting-started/introduction#first-create-a-store
    * TypeScript Support: https://zustand.docs.pmnd.rs/guides/typescript
    * State abfragen: https://zustand.docs.pmnd.rs/getting-started/introduction#then-bind-your-components,-and-that's-it!
* Hintergrund Timezone in `dayjs`: https://day.js.org/docs/en/timezone/timezone