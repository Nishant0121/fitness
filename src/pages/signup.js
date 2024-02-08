import { auth, provider, db } from "../config/config";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import logo from "../images/fitness app logo.jpeg";
import "../styles/style.css";
import { useEffect } from "react";

export const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const signinwithgoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const userinfo = {
      userid: result.user.uid,
      name: result.user.displayName,
      email: result.user.email,
      profilephoto: result.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(userinfo));
    navigate("/home");
    await setDoc(doc(db, "users", userinfo.userid), userinfo);
    alert("Sign in successfully");
  };
  return (
    <div className="container m-3">
      <div className="msg">
        <h1>Wellcome To family</h1>
        <img className="Logo" src={logo} alt="Logo" />
      </div>
      <div className="signup">
        <div className="card text-center mb-3">
          <div className="card-body">
            <h3 className="card-title p-3">Welcome to Bhago! 🏃‍♀️ </h3>
            <p className="card-text p-3">
              Sign in to manage your finances effortlessly and gain control over
              your expenses.{" "}
            </p>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                fill="currentColor"
                className="bi bi-google m-2"
                viewBox="0 0 16 16"
              >
                <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
              </svg>
              <p className="btn btn-primary mb-0" onClick={signinwithgoogle}>
                Sign In WIth Google
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
