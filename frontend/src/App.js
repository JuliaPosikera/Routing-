import { createBrowserRouter, RouterProvider } from "react-router-dom";

import EventsPage, { loader as eventsLoader } from "./pages/EventsPage";
import HomePage from "./pages/HomePage";
import EventDetailPage from "./pages/EventDetailPage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import EventsRoot from "./pages/EventsRoot";
import NewsLetterPage, {
  action as newsletteractions,
} from "./pages/Newsletter";
import { loader as eventDetailLoader } from "./pages/EventDetailPage";
import { action as deleteItemAction } from "./pages/EventDetailPage";
import { action as editEventAction } from "./components/EventForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":eventID",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteItemAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: editEventAction,
              },
            ],
          },

          { path: "new", element: <NewEventPage />, action: editEventAction },
        ],
      },
      {
        path: "newsletter",
        element: <NewsLetterPage />,
        action: newsletteractions,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
