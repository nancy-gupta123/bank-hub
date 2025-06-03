import React, { useEffect, useState } from "react";

import Cards from "./Cards";
import * as MdIcons from 'react-icons/md';


import { useDispatch, useSelector } from "react-redux";
import * as FaIcons from "react-icons/fa";

import { logout } from "../features/authSlice";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [lazyloading,setlazyloading]=useState(true)
  const { accountNumber, pinCode, token } = useSelector((state) => state.auth);

  const [userdata, setuserdata] = useState([]);

  useEffect(() => {
    const timer=setTimeout(()=>{
      setlazyloading(false)
    },3000)
    fetch(`http://localhost:8080/account`)
      .then((response) => response.json())
      .then((data) => setuserdata(data))
      .catch((error) => console.error("Error fetching data:", error));

    if (!accountNumber || !token) {
      //const storedAccountNumber = localStorage.getItem("accountNumber");

      // if (!storedAccountNumber) {
      //   window.location = "/login";
      // }
    }
    return ()=>clearTimeout(timer)
  }, [accountNumber, token, pinCode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  /*const handlelogin= async (e)=>{
    e.preventDefault();
    
    try {
      const logincred = localStorage.getItem("Logincred:");
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: logincred,
        redirect: "follow",
      };
  
      const response = await fetch("http://localhost:8080/login", requestOptions);
  
      if (response.ok) {
        const newdata = await response.json();
        localStorage.setItem("accessToken", newdata.token);
        console.log("New token generated:", newdata.token);
        return newdata.token; // Return the new token
      } else {
        console.error("Error generating token:", response.statusText);
        alert("Failed to generate token. Please log in again.");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error during token generation:", error);
      alert("An error occurred while generating the token. Please log in again.");
      window.location.href = "/login";
    }
  }*/
  const logincred = localStorage.getItem("Logincred:");
  console.log(logincred);
  const handlelogin = async () => {
    try {
      // Fetch new token when Learn More is clicked
      const logincred = localStorage.getItem("Logincred");
      console.log(logincred)
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: logincred,
      });

      if (!response.ok) {
        throw new Error("Failed to generate token.");
      }

      const data = await response.json();

      // Store token and expiry in localStorage
      // Token valid for 15 minutes
      localStorage.setItem("refreshtoken:", data.token);

      console.log(localStorage.getItem("refreshtoken:"))

      alert("Token generated successfully! Proceed to transactions.");
    } catch (error) {
      //console.error("Error generating token:", error);
      alert("Failed to generate token. Please try again.");
    }
  };
  if (lazyloading) {
    
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        
        color: 'white',
        fontSize: '20px',
      }}>
         <iframe src="https://lottie.host/embed/569fbf3f-881a-445a-9ca0-639ae1e52343/oWvIeYkhVT.lottie" title="dash"></iframe>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="flex flex-col h-full md:flex-row">
        <aside className="flex flex-col items-center justify-between w-full py-5 bg-black md:w-20">
          <div className="space-y-6">
            <div className="text-3xl text-yellow-500">🏦</div>
            <div className="flex flex-col pt-10 space-y-5 text-gray-400 md:pt-20 ">
              <button className="hover:text-yellow-500 pb-9">
              <Link to="/">
                <FaIcons.FaHome style={{ fontSize: "24px", color: "white" }} />
                </Link>
              </button>
              <button className="hover:text-yellow-500 pb-9">
                <FaIcons.FaChartBar
                  style={{ fontSize: "24px", color: "white" }}
                />
                
              </button>
              <button className="hover:text-yellow-500 pb-9">
                <FaIcons.FaCog style={{ fontSize: "24px", color: "white" }} />
              </button>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-yellow-500"
          >
            <Link to="/login">
              <FaIcons.FaSignOutAlt
                style={{ fontSize: "24px", color: "white" }}
              />
            </Link>
          </button>
        </aside>

        <div className="flex-1 p-6 space-y-6">
          <header className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="flex-1 w-full md:w-auto ">
              <input
                type="text"
                placeholder="Type to search digital art..."
                className="w-full p-3 text-gray-300 border-black rounded-lg md:max-w-lg bg-darkgray focus:outline-none focus:ring focus:ring-yellow-500"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-600 rounded-full">
                <span>
                  <FaIcons.FaUserCircle
                    style={{ fontSize: "24px", color: "white" }}
                  />
                </span>
              </div>
            </div>
          </header>

          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Cards
              name="Trasaction History"
              url="https://lottie.host/embed/f61dd050-32f1-4359-ad9e-8bcd7e79cdc0/o4IvnItfp5.lottie"
              link="/transactionhistory"
              icon="FaTransfer"
            />
            <Cards
              name="Check Balance"
              url="https://lottie.host/embed/83180310-e822-46ae-92a9-19a4edd54d4c/4PLOoAkCjH.lottie"
              link="/checkbalance"
            />
            <Link to="/transfermoney">
            <div className="h-60">
              <div className="max-w-sm p-4">
                <div className="flex flex-col h-full p-8 bg-teal-400 rounded-lg dark:bg-cardbody">
                  <div className="flex items-center mb-3">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 mr-3 text-white bg-indigo-500 rounded-full dark:bg-iconcolor">
                      <MdIcons.MdPayment className="w-5 h-5 "></MdIcons.MdPayment>
                    </div>
                    <h2 className="text-lg font-medium text-white dark:text-white">
                      Transfer Money
                    </h2>
                  </div>
                  <div className="flex flex-col justify-between flex-grow ">
                    <div className="rounded-lg">
                      <iframe src="https://lottie.host/embed/eef416f4-f861-4cbe-ab3f-45ef9b19dbe1/Fbzc5fKoUK.lottie" title="das"></iframe>
                    </div>
                    
                      <button
                        className="inline-flex items-center mt-3 text-black rounded-sm dark:text-white hover:"
                        onClick={handlelogin}
                      >
                        
                        <FaIcons.FaArrowRight className="w-8 h-8 rounded-full bg-iconcolor"></FaIcons.FaArrowRight>
                      </button>
                    
                  </div>
                </div>
              </div>
            </div>
            </Link>
          </section>

          <section className="p-6 mt-6 bg-black rounded-lg shadow">
            <h3 className="mb-4 text-lg font-semibold text-white">
              All Transactions
            </h3>
            <div className="sm:max-h-[150px] md:max-h-[180px] lg:max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-neutral-500 dark:scrollbar-track-neutral-700">
              <table className="w-full text-sm text-white border border-gray-900">
                <thead>
                  <tr className="bg-darkgray">
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">First Name</th>
                    <th className="px-4 py-2 text-left">Last Name</th>

                    <th className="px-4 py-2 text-left">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {userdata.length > 0 ? (
                    userdata.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-darkgray even:bg-darkgray"
                      >
                        <td className="px-4 py-2">{user.id}</td>
                        <td className="px-4 py-2">{user.firstName || "N/A"}</td>
                        <td className="px-4 py-2">{user.lastName || "N/A"}</td>

                        <td className="px-4 py-2">
                          {new Date(user.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-4 py-2 text-center text-white"
                      >
                        No transactions available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
