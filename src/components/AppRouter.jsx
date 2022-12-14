import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Profcom from "../pages/Profcom";
import Npa from "../pages/Npa";
import Search from "../pages/Search";
import Journal from "../pages/Journal";
import Login from "../pages/Login";
import Support from "../pages/Support";
import DepartmentPostPage from "../pages/DepartmentPostPage";
import Register from "../pages/login pages/Register";
import NpaPostPage from "../pages/NpaPostPage";
import MyLoader from "./UI/MyLoader/MyLoader";
import { AuthContext } from "../context";
import ProfcomPostPage from "../pages/ProfcomPostPage";
import Polls from "../pages/Polls";

const AppRouter = props => {
  let { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <MyLoader />;
  }
  return (
    <>
      {isAuth ? (
        <Routes>
          <Route exact path="/departments" element={<Home />} key="1" />
          <Route
            exact
            path="/department/:id"
            element={<DepartmentPostPage />}
            key="8"
          />
          <Route exact path="/npa" element={<Npa />} key="3" />
          <Route exact path="/npa/:id" element={<NpaPostPage />} key="9" />
          <Route exact path="/profcom" element={<Profcom />} key="2" />
          <Route
            exact
            path="/profcom/:id"
            element={<ProfcomPostPage />}
            key="9"
          />
          <Route
            exact
            path="/search"
            element={<Search setPage={props.setPage} />}
            key="4"
          />
          <Route exact path="/journal" element={<Journal />} key="5" />
          <Route exact path="/support" element={<Support />} key="6" />
          <Route exact path="/polls" element={<Polls />} key="8" />
          <Route path="*" element={<Navigate to="/departments" />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            exact
            path="/login"
            element={
              <Login setPage={props.setPage} roleCheck={props.roleCheck} />
            }
            key="7"
          />
          <Route exact path="/login/register" element={<Register />} key="73" />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
};

export default AppRouter;
