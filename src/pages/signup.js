import { auth, provider, db } from "../config/config";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import logo from "../images/logo.png";
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
    <div className="h-dvh">
      <section className="bg-gray-900 h-dvh text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r  from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Welcome to Fitness App
              <span className="sm:block">Track your workouts and progress</span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              Monitor your daily activity and see your progress over time. Get
              custom workout plans tailored to your fitness goals.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                onClick={signinwithgoogle}
              >
                Get Started
              </button>

              <a
                className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                href="/"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
