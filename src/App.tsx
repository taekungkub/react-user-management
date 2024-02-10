// This is a React Router v5 app
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import TheNavbar from "./components/TheNavbar";
import HomePage from "./views/HomePage";
import UserPage from "./views/UserPage";
import UserAddPage from "./views/UserAddPage";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <>
      <TheNavbar />
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/users/:type/:id?" element={<UserAddPage />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
