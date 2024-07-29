import { useState, useEffect } from "react";
import { useUserLoginMutation } from "../../features/auth/authService";
import { setUserToken } from "../../app/reducers/authReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const [login, response] = useUserLoginMutation();

  console.log("Response : ", response);

  const errors = response.error?.data?.errors ? response.error.data.errors : [];

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = { username, password };

    login(userData);
  };

  useEffect(() => {
    if (response.isSuccess) {
      const token = response?.data?.token;

      localStorage.setItem("user-token", token);
      dispatch(setUserToken(token));
      navigate("/dashboard");
    }
  }, [response.isSuccess]);

  return (
    <div className="relative h-screen w-full bg-[#f5e8d8]">
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <form
          onSubmit={onSubmit}
          className="bg-[#ffffffcc] border border-[#c8b7a6] p-8 w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 rounded-md shadow-lg"
          style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
        >
          <h3 className="text-[#5c3d2e] text-center mb-6 capitalize font-semibold text-xl">
            Admin Panel
          </h3>
          {errors.length > 0 &&
            errors.map((error, key) => (
              <div key={key}>
                <p className="text-red-500 text-center">{error.msg}</p>
              </div>
            ))}
          <div className="mb-4">
            <input
              className="w-full bg-[#e1c4a5] p-4 rounded outline-none text-[#5c3d2e] placeholder-[#5c3d2e] border border-[#c8b7a6] focus:ring-2 focus:ring-[#c8b7a6]"
              type="text"
              onChange={onChange}
              value={username}
              name="username"
              id="username"
              placeholder="Username..."
              required
            />
          </div>
          <div className="mb-6">
            <input
              className="w-full bg-[#e1c4a5] p-4 rounded outline-none text-[#5c3d2e] placeholder-[#5c3d2e] border border-[#c8b7a6] focus:ring-2 focus:ring-[#c8b7a6]"
              type="password"
              onChange={onChange}
              value={password}
              name="password"
              id="password"
              placeholder="Password..."
              required
            />
          </div>
          <div>
            <input
              type="submit"
              value={response.isLoading ? "Loading ..." : "Sign In"}
              className="bg-[#8c6b52] w-full p-4 cursor-pointer text-white rounded-lg hover:bg-[#5c3d2e] transition duration-200"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
