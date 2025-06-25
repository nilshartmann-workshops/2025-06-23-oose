# Testen von React Komponenten

# Dateien

- src/components/FoodtruckSelect.test.tsx (anlegen)

# Aufgabe

* Schreibe Testfälle für die `FoodtruckSelect`-Komponente

# Schritte

1. Lege die Datei `src/components/FoodtruckSelect.test.tsx` an
2. Implementiere dort eine oder mehrere Testfälle (mit `test` oder `it` von vitest)
    - Tipps:
        - mit
          `screen.debug()` kannst du dir den in JavaScript gerenderten DOM ansehen. Das ist hilfreich, wenn dein Test fehlschägt, um zu sehen, was genau (nicht) gerendert wurde
        - Du kannst parallel den
          `ReservationEditor` in der fertigen Anwendung offen haben und darin im Browser das Verhalten der
          `FoodtruckSelect`-Komponente kontrollieren (z.B. was gerendert wird, wenn du auf die Select-Box klickst)
        - Testdaten (Foodtrucks) findest du in der Konstante `foodTrucks` in der Datei
          `src/data.ts`. Diese kannst du als `availableFoodTrucks` an die `FoodtruckSelect`-Komponente übergeben
3. Die `FoodtruckSelect`-Komponente ist eine "kontrollierte" (controlled) Komponente
    - Das bedeutet, sie hat keinen State, sondern informiert ihre Parent-Komponente per Property, wenn sich etwas ändert
    - Wenn du dieses Verhalten testen möchtest, kannst du dir eine einfache Wrapper-Komponente schreiben, die einen State hat und die
      `FoodtruckSelect`-Komponente rendert. Diese Wrapper-Komponente renderst du dann im Test
    - Alternativ kannst du auch "nur" prüfen, ob bei der Auswahl eines Eintrags die entsprechende Callback-Funktion mit den erwarteten Argumenten aufgerufen wurde
4. Du kannst die Tests ausführen:
    - Entweder direkt aus der IDE (in IntelliJ/Webstorm wie gewohnt über die grünen Pfeile neben einem Testfall)
    - Über die Kommandozeile `npm run test`
      - In diesem Fall wird Vitest im "watch"-Modus gestartet, d.h. der Runner wird nach der Ausführung nicht beendet. Sobald du Änderungen im Source-Code machst und speicherst, werden die Tests so automatisch erneut ausgeführt.

# Material

- Vitest: https://vitest.dev/
    - `expect`: https://vitest.dev/api/expect.html
    - Mock functions: https://vitest.dev/api/mock.html
    - assertions for verifying dom elements: https://vitest.dev/guide/browser/assertion-api
- React Testing Library: https://testing-library.com/docs/react-testing-library/intro/
    - Render React components: https://testing-library.com/docs/react-testing-library/api#render
    - Query functions: https://testing-library.com/docs/react-testing-library/cheatsheet#queries
    - User Events: https://testing-library.com/docs/user-event/intro/#writing-tests-with-userevent
    - Common mistakes with React Testing Library (eine Art Best Practice Guide): https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
