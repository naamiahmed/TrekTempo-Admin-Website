import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignInPage.css";

const SignInPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!email && !password) {
            setError("Invalid Credentials");
            return;
        }
        if (!email) {
            setError("Enter the Email");
            return;
        }
        if (!password) {
            setError("Enter the Password");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/signin/", {
                email,
                password,
            });

            if (response.status === 200 && response.data) {
                console.log("Login successful:", response.data);
                navigate("/20"); // Navigate to success page
            } else {
                setError("Invalid Credentials");
            }
        } catch (err) {
            console.error("Error during sign-in:", err);
            setError("Invalid Credentials");
        }
    };

    return (
        <div className="login-page">
            <div className="form-container">
                <h2>SIGN IN</h2>
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        data-testid="email-input"
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        data-testid="password-input"
                    />
                    {error && <div className="error-message" data-testid="error-message">{error}</div>}
                    <button type="submit" data-testid="submit-button">SIGN IN</button>
                </form>
                <p className="signup-text">
                    Don't you have any account already? <a href="#">HELP</a>
                </p>
            </div>
            <div className="image-container1">
                <img src="/SrilankaImage.jpg" alt="Description" className="centered-image" />
            </div>
        </div>
    );
};

export default SignInPage;