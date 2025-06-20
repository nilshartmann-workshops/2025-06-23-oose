import { createFileRoute } from "@tanstack/react-router";

import ArticleLayout from "../../components/ArticleLayout.tsx";
import { PageTitle } from "../../components/Heading.tsx";

export const Route = createFileRoute("/_static/privacy")({
  component: PrivateRoute,
});

function PrivateRoute() {
  return (
    <ArticleLayout>
      <PageTitle>Privacy Policy</PageTitle>
      <p>
        Your privacy is important to us. It is our policy to respect your
        privacy regarding any information we may collect from you across our
        website.
      </p>

      <p>
        We only ask for personal information when we truly need it to provide a
        service to you. We collect it by fair and lawful means, with your
        knowledge and consent. We also let you know why we’re collecting it and
        how it will be used.
      </p>

      <p>
        We only retain collected information for as long as necessary to provide
        you with your requested service.
      </p>

      <p>
        Your continued use of our website will be regarded as acceptance of our
        practices around privacy and personal information.
      </p>

      <p>
        If you have any questions about how we handle user data and personal
        information, feel free to contact us.
      </p>
    </ArticleLayout>
  );
}
