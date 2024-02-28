import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { IoHomeOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { BsInfoSquare } from "react-icons/bs";
import { MdOutlineLocalPhone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { VscThreeBars } from "react-icons/vsc";
import { auth } from "../config/config";
import Lottie from "lottie-react";
import running from "../assets/running.json";
import { useGetSteps } from "../hooks/useGetSteps";

export const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { profilephoto } = useGetUserInfo();
  const { name } = useGetUserInfo();
  const { steps } = useGetSteps();
  const navigate = useNavigate();

  // const data = [
  //   {
  //     name: "Mon",
  //     uv: 4000,
  //     Steps: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: "Tues",
  //     uv: 3000,
  //     Steps: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: "Wed",
  //     uv: 2000,
  //     Steps: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: "Thrus",
  //     uv: 2780,
  //     Steps: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: "Fri",
  //     uv: 1890,
  //     Steps: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: "Sat",
  //     uv: 2390,
  //     Steps: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: "Sun",
  //     uv: 3490,
  //     Steps: 4300,
  //     amt: 2100,
  //   },
  // ];

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate("/");
  };
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date().getDay(); // 0 (Sunday) to 6 (Saturday)
  const currentDay = weekdays[today];

  // Get the step count for the current day
  const stepCount = steps.find((steps) => steps[currentDay])?.[currentDay] || 0;
  // console.log(name);
  // console.log(steps);

  return (
    <div
      className={`Home ${
        isDarkMode ? "bg-black text-light" : "bg-light text-dark"
      }`}
    >
      <nav
        className={`navbar p-1 ${
          isDarkMode ? "bg-black text-light" : "bg-light text-dark"
        }`}
      >
        <div className="container-fluid nav_">
          <div className="profile">
            <img
              className="rounded-circle"
              src={profilephoto}
              alt="Logo"
              width="34"
              height="34"
            />
          </div>
          <div className="name">
            <h2>{name}</h2>
          </div>
          <div className="hamburger">
            <div onClick={toggleMenu}>
              <IoClose
                size="44px"
                className={`navbar p-1 ${isOpen ? "d-block" : "d-none"}`}
              />
              <VscThreeBars
                size="44px"
                className={`navbar p-1 ${isOpen ? "d-none" : "d-block"}`}
              />
            </div>
          </div>
          <div className="toggle">
            <label className="switch">
              <input type="checkbox" onClick={toggleMode} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </nav>

      <div
        className={`main d-flex  ${
          isDarkMode ? "bg-black text-light" : "bg-light text-dark"
        }`}
      >
        <div
          className={`menu rounded flex flex-col justify-around border bg-opacity-25 p-1 ${
            isDarkMode
              ? "text-light border-white bg-dark"
              : "text-dark border-black"
          }`}
        >
          <Lottie
            className="menu_item running"
            animationData={running}
            loop={true}
          />
          <div className="menu_item">
            <IoHomeOutline size="23px" />
            <h3 className="menu_i bi">Home</h3>
          </div>
          <div className="menu_item">
            <BsInfoSquare size="23px" />
            <h3 className="menu_i">About</h3>
          </div>
          <div className="menu_item">
            <MdOutlineLocalPhone size="23px" />
            <h3 className="menu_i">Contact</h3>
          </div>
          <div className="menu_item">
            <FaPhoneAlt size="23px" />
            <h3 className="menu_i">Services</h3>
          </div>
          <div className="menu_item">
            <FaPhoneAlt size="23px" />
            <h3 className="menu_i">Blog</h3>
          </div>
          <div className="menu_item">
            <button
              className="btn text-light h3 bg-danger "
              onClick={handleLogout}
            >
              LogOut
            </button>
          </div>
        </div>
        <div
          className={`data d-flex rounded flex-column border ${
            isDarkMode ? "text-light border-white" : "text-dark border-black"
          }`}
        >
          <div className="content rounded ">
            <div className="steps">
              <div className="steps_1">
                <div
                  className={`card bg-opacity-50  ${
                    isDarkMode
                      ? "text-light border-white bg-bark"
                      : "text-dark border-black bg-light"
                  }`}
                >
                  <h5 className="card-header text-centre">Daily Steps</h5>
                  <div className="card-body">
                    {/* <h5 className="card-title">Special title treatment</h5> */}

                    <p className="card-text h3">{stepCount}</p>
                  </div>
                </div>
              </div>

              <div className="steps_1">
                <div
                  className={`card bg-opacity-50  ${
                    isDarkMode
                      ? "text-light border-white bg-dark"
                      : "text-dark border-black bg-light"
                  }`}
                >
                  <h5 className="card-header text-centre">Daily Goal</h5>
                  <div className="card-body">
                    {/* <h5 className="card-title">Special title treatment</h5> */}
                    <p className="card-text h3">4573</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`graphs rounded border bg-opacity-25 m-1 p-1 ${
                isDarkMode
                  ? "text-light border-white bg-dark"
                  : "text-dark border-black bg-light"
              }`}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={steps}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  barSize={20}
                >
                  <XAxis
                    dataKey="Monday"
                    scale="point"
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar
                    dataKey="Saturday"
                    fill="#2093ff"
                    background={{ fill: "#eee" }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {steps.map((steps) => {
            const {
              id,
              Friday,
              Saturday,
              Sunday,
              Monday,
              Tuesday,
              Wednesday,
              Thursday,
            } = steps;
            return (
              <div className="day_steps d-flex justify-between">
                <li key={id} className="list-group-item listi d-flex">
                  <div className="steps_2">
                    <div
                      className={`card bg-opacity-25 ${
                        isDarkMode
                          ? "text-light border-white bg-dark"
                          : "text-dark border-black bg-light"
                      }`}
                    >
                      <h5 className="card-header text-centre">Monday</h5>
                      <div className="card-body">
                        <p className="card-text h3">{Monday}</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li key={id} className="list-group-item listi d-flex">
                  <div className="steps_2">
                    <div
                      className={`card bg-opacity-25 ${
                        isDarkMode
                          ? "text-light border-white bg-dark"
                          : "text-dark border-black bg-light"
                      }`}
                    >
                      <h5 className="card-header text-centre">Tuesday</h5>
                      <div className="card-body">
                        <p className="card-text h3">{Tuesday}</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li key={id} className="list-group-item listi d-flex">
                  <div className="steps_2">
                    <div
                      className={`card bg-opacity-25 ${
                        isDarkMode
                          ? "text-light border-white bg-dark"
                          : "text-dark border-black bg-light"
                      }`}
                    >
                      <h5 className="card-header text-centre">Wednesday</h5>
                      <div className="card-body">
                        <p className="card-text h3">{Wednesday}</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li key={id} className="list-group-item listi d-flex">
                  <div className="steps_2">
                    <div
                      className={`card bg-opacity-25 ${
                        isDarkMode
                          ? "text-light border-white bg-dark"
                          : "text-dark border-black bg-light"
                      }`}
                    >
                      <h5 className="card-header text-centre">Thursday</h5>
                      <div className="card-body">
                        <p className="card-text h3">{Thursday}</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li key={id} className="list-group-item listi d-flex">
                  <div className="steps_2">
                    <div
                      className={`card bg-opacity-25 ${
                        isDarkMode
                          ? "text-light border-white bg-dark"
                          : "text-dark border-black bg-light"
                      }`}
                    >
                      <h5 className="card-header text-centre">Friday</h5>
                      <div className="card-body">
                        <p className="card-text h3">{Friday}</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li key={id} className="list-group-item listi d-flex">
                  <div className="steps_2">
                    <div
                      className={`card bg-opacity-25 ${
                        isDarkMode
                          ? "text-light border-white bg-dark"
                          : "text-dark border-black bg-light"
                      }`}
                    >
                      <h5 className="card-header text-centre">Saturday</h5>
                      <div className="card-body">
                        <p className="card-text h3">{Saturday}</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li key={id} className="list-group-item listi d-flex">
                  <div className="steps_2">
                    <div
                      className={`card bg-opacity-25 ${
                        isDarkMode
                          ? "text-light border-white bg-dark"
                          : "text-dark border-black bg-light"
                      }`}
                    >
                      <h5 className="card-header text-centre">Sunday</h5>
                      <div className="card-body">
                        <p className="card-text h3">{Sunday}</p>
                      </div>
                    </div>
                  </div>
                </li>
              </div>
            );
          })}
        </div>
      </div>

      {isOpen && (
        <div
          className={`ham_menu border rounded  ${isOpen ? "open " : "close "} ${
            isDarkMode
              ? "bg-black border-white text-light"
              : "bg-light border-black text-dark"
          }`}
        >
          <div className="pic">
            <img src={profilephoto} alt="Pofile" srcset="" />
          </div>
          <div className="name">
            <h2>{name}</h2>
          </div>
          <div className="toggle_ham">
            <label className="switch">
              <input type="checkbox" onClick={toggleMode} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="ham_menu_item">
            <IoHomeOutline size="23px" />
            <h3 className="menu_i_ bi">Home</h3>
          </div>
          <div className="ham_menu_item">
            <BsInfoSquare size="23px" />
            <h3 className="menu_i_">About</h3>
          </div>
          <div className="ham_menu_item">
            <MdOutlineLocalPhone size="23px" />
            <h3 className="menu_i_">Contact</h3>
          </div>
          <div className="ham_menu_item">
            <FaPhoneAlt size="23px" />
            <h3 className="menu_i_">Services</h3>
          </div>
          <div className="ham_menu_item">
            <button
              className="btn text-light h3 bg-danger "
              onClick={handleLogout}
            >
              LogOut
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
