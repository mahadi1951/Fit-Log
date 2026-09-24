"use client";

import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { PlanProvider } from "@/context/PlanContext";

const Providers = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <PlanProvider>
      {children}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />
    </PlanProvider>
  );
};

export default Providers;