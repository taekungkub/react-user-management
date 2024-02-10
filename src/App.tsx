import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import TheNavbar from "./components/TheNavbar";
import UserPage from "./views/UserPage";
import UserActionPage from "./views/UserActionPage";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <>
      <TheNavbar />
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace={true} />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/users/:type/:id?" element={<UserActionPage />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
