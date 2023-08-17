import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { CartProvider } from "./components/ContextReducer";
import UserOrders from "./pages/UserOrders";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";

function App() {
  const isAuthenticated = !!localStorage.getItem("authToken");
  return (
    <>
      <CartProvider>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              {!isAuthenticated ? (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/sign-up" element={<SignUp />} />{" "}
                </>
              ) : (
                <>
                  <Route path="/login" element={<Navigate to="/" />} />
                  <Route path="/sign-up" element={<Navigate to="/" />} />{" "}
                </>
              )}

              {isAuthenticated ? (
                <Route path="/myOrder" element={<UserOrders />} />
              ) : (
                <Route path="/myOrder" element={<Navigate to="/login" />} />
              )}

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
