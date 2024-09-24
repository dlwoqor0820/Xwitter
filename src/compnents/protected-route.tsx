import React from "react";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

interface IChildren {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: IChildren) {
  const user = auth.currentUser;
  console.log(user);
  if (!user) return <Navigate to="/login" />;

  return children;
}
