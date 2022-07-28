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
        {/* 카드 클릭했을 때 상세페이지 이동 경로 => useNavigator 사용 */}
        <Route path="/detail/:postId" element={<Detail />} />
        <Route path="/write" element={<Write />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
