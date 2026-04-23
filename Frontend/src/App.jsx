
import './App.css'
import Landing from "./Components/Landing.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import SoilAnalysis from "./Components/SoilAnalysis.jsx";
import WeatherPrediction from "./Components/WeatherPrediction.jsx";
import PestDetection from "./Components/PestDetection.jsx";
import GovtSchemes from "./Components/GovtSchemes.jsx";
import RippleCursor from "./components/ui/RippleCursor.jsx";

function App() {

    const appRouter=createBrowserRouter([
        {
            path: "/",
            element: <Landing/>
        },
        {
            path:"/soil",
            element: <SoilAnalysis/>
        },
        {
            path:"/weather",
            element: <WeatherPrediction/>
        },
        {
            path:"/pest",
            element:<PestDetection/>
        },{
            path:"/govt-schemes",
            element: <GovtSchemes/>
        }
    ])
  return (
    <div>
        <RippleCursor />
        <RouterProvider router={appRouter}>
        </RouterProvider>
    </div>
  )
}

export default App;