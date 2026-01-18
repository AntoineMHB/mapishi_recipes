import { LoginForm } from "@/components/login-form";
import { SignupForm } from "@/components/signup-form";
import Home from "@/pages/Home";
import { Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </div>
  );
};
