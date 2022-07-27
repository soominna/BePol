import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./pages/Detail.jsx";
import Login from "./pages/Login.jsx";
import Main from "./pages/Main.jsx";
import Write from "./pages/Write.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail=:postId" element={<Detail />} />
        <Route path="/write" element={<Write />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
