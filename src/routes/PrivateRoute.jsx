import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
    const { isAuthenticated, checkingAuth } = useSelector(
        (state) => state.auth
    );

    // Refresh ke time auth check complete hone ka wait
    if (checkingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] text-white">
                <p className="text-sm">Checking authentication...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;