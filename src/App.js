import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";


import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserProfile from "./components/userProfile";
import AdminHome from "./components/admin/adminHome";

import Login from "./components/admin/adminLogin";
import { store, persistor } from "./utils/store/store";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  }, {
    path: "/logout",
    element: <Home />,
  }, {
    path: "/profile",
    element: <UserProfile />,
  }, {
    path: "/admin",
    element: <Login />,
  }, {
    path: "/admin/home",
    element: <AdminHome />,
  }
]);



function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;











// import Navbar from './components/Navbar'
// import Login from './components/Login'
// import Signup from './components/Signup'
// import Content from './components/Content'