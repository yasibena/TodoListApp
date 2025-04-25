import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { MainProvider } from "./context/mainContext";

function App() {
  return (
    <MainProvider>
      <RouterProvider router={router} />
    </MainProvider>
  );
}

export default App;
