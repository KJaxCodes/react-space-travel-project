import React from "react";
import { useNavigate, useLocation } from 'react-router-dom'

export default function BackButton() {
    const navigate = useNavigate();
    const location = useLocation();

    if (location.pathname === '/') return null;

    return (
        <button className="back-button" onClick={() => navigate(-1)}>
            ← Back
        </button>
    )
}