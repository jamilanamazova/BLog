import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import HomePageRoute from "./pages/HomePage";
import AuthScreen from "./pages/sign-up-login/components/AuthScreen";
import NotFound from "./pages/not-found";
import CreatePost from "./components/CreatePost";
import MyPosts from "./components/MyPosts";
import PostDetail from "./components/PostDetail";
import PostDetailsPage from "./post-details/page";
import MyFavorites from "./pages/MyFavorites";
import MyLikes from "./pages/MyLikes";
import Profile from "./pages/Profile";
import ArticlesPage from "./pages/ArticlesPage";


function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" richColors />
      <Routes>
        <Route path="/" element={<HomePageRoute />} />
        <Route path="/home-page" element={<HomePageRoute />} />
        <Route path="/login" element={<AuthScreen />} />
        <Route path="/register" element={<AuthScreen />} />
        <Route path="/sign-up-login-screen" element={<AuthScreen />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/post-details-page" element={<PostDetailsPage />} />        
        <Route path="*" element={<NotFound />} />
        <Route path="/my-favorites" element={<MyFavorites />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/my-likes" element={<MyLikes />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
