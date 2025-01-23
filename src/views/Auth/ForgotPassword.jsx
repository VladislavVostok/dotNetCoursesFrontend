import { useState, useEffect } from "react";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import { Link } from "react-router-dom";
import apiInstance from "../../utils/axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiInstance.get(`Auth/password-reset-email/${email}/`).then((res) => {
        console.log(res.data);
        setIsLoading(false);
        alert("Password Reset Email Sent");
      });
    } catch (error) {
      console.log("error: ", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <BaseHeader />

      <section
        className="container d-flex flex-column vh-100"
        style={{ marginTop: "150px" }}
      >
        <div className="row align-items-center justify-content-center g-0 h-lg-100 py-8">
          <div className="col-lg-5 col-md-8 py-8 py-xl-0">
            <div className="card shadow">
              <div className="card-body p-6">
                <div className="mb-4">
                  <h1 className="mb-1 fw-bold">Забыли пароль</h1>
                  <span>Мы поможем вам вернуться в аккаунт</span>
                </div>
                <form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleEmailSubmit}
                >
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Эл. почта
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      name="email"
                      placeholder="example@host.ru"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="d-grid">
                      {isLoading === true && (
                        <button disabled type="submit" className="btn btn-primary">
                          В работе <i className="fas fa-spinner fa-spin"></i>
                        </button>
                      )}

                      {isLoading === false && (
                        <button type="submit" className="btn btn-primary">
                          Сбросить пароль <i className="fas fa-arrow-right"></i>
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  );
}

export default ForgotPassword;