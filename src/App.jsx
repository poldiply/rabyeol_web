import { useRoutes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { routes } from "./routes";

function App() {
  const element = useRoutes(routes);
  
  return (
    <div className="bg-white font-sans text-slate-900">
      <Navbar />
      {element}
    </div>
  );
}

export default App;