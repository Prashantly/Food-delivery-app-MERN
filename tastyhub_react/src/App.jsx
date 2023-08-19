import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { CartProvider } from "./components/ContextReducer";
import UserOrders from "./pages/UserOrders";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import PrivateRoutes from "./utils/PrivateRoute";

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />{" "}
            <Route element={<PrivateRoutes />}>
              <Route path="/myOrder" element={<UserOrders />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </CartProvider>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
