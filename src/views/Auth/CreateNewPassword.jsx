import { useState, useEffect } from "react";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import apiInstance from "../../utils/axios";
import { useNavigate, useSearchParams } from "react-router-dom";
// import Toast from "../plugin/Toast";


function CreateNewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParam] = useSearchParams();

  const otp = searchParam.get("otp");
  const uuid = searchParam.get("uuid");
  const refresh_token = searchParam.get("refresh_token");

  const handleCreatePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (confirmPassword !== password) {
    //   Toast().fire({
    //     icon: "warning",
    //     title: "Passwords does not match",
    //   });
    console.log("Пароль ковно")
      return;
    } else {
      const formdata = new FormData();
      formdata.append("password", password);
      formdata.append("otp", otp);
      formdata.append("uuid", uuid);
      formdata.append("refreshToken", refresh_token);

      try {
        await apiInstance
          .post(`Auth/password-reset`, formdata)
          .then((res) => {
            console.log(res.data);
            setIsLoading(false);
            navigate("/login/");
            //   Toast().fire({
            //     icon: "warning",
            //     title: "Passwords does not match",
            //   });
            console.log("Пароль кавай")
          });
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }

    console.log("Password Created");
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
                  <h1 className="mb-1 fw-bold">Создайте новый пароль</h1>
                  <span>Создайте новый пароль для своей учетной записи</span>
                </div>
                <form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleCreatePassword}
                >
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Введите новый пароль
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="**************"
                      required=""
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      Пожалуйста введите пароль.
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Подтвердите новый пароль
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="**************"
                      required=""
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      Пожалуйста введите пароль.
                    </div>
                  </div>

                  <div>
                    <div className="d-grid">
                      {isLoading === true && (
                        <button
                          disabled
                          type="submit"
                          className="btn btn-primary"
                        >
                          В работе <i className="fas fa-spinner fa-spin"></i>
                        </button>
                      )}

                      {isLoading === false && (
                        <button type="submit" className="btn btn-primary">
                          Сохранить пароль{" "}
                          <i className="fas fa-check-circle"></i>
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

export default CreateNewPassword;