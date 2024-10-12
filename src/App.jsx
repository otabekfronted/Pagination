import "./App.css";

// react-router-dom
import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom"; // v6...

// pages
import Home from "./pages/Home";
import Scroll from "./pages/Scroll";

// layouts
import RootLayout from "./layout/RootLayout";

function App() {
    const routes = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="/scroll" element={<Scroll />} />
                {/* <Route path="*" element={<PageNotFound />} /> */}
            </Route>
        )
    );

    return (
        <div className="flex justify-center items-center min-h-screen custom-shadow my-20">
            <RouterProvider router={routes} />
        </div>
    );
}

export default App;
