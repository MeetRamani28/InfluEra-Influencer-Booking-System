import { useDispatch } from "react-redux";
import { googleLoginUser } from "../../features/auth/AuthActions";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();

  const handleGoogleLogin = () => {
    dispatch(googleLoginUser());
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium"
    >
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
