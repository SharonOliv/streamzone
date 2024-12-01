import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // Email state
  const [message, setMessage] = useState(""); // Message to show to the user
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }
    setMessage(`A password reset link has been sent to ${email}.`);
    console.log("Password reset for email:", email);
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center mb-4">Forgot Password</h2>
        {message && (
          <div
            className={`alert ${
              message.includes("sent") ? "alert-success" : "alert-danger"
            } text-center`}
            role="alert"
          >
            {message}
          </div>
        )}
        <form onSubmit={handleReset}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Reset Password
          </button>
          <button
            type="button"
            className="btn btn-secondary w-100"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
