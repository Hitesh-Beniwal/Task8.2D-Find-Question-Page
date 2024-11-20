import React from "react";
import { Route, Routes } from "react-router-dom";
import PostPage from './PostPage';
import FindQuestionsPage from './FindQuestionsPage';
import Navbar from './Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostPage />} />
        <Route path="/find-questions" element={<FindQuestionsPage />} />
      </Routes>
    </div>
  );
}

export default App;
