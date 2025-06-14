import React, { useEffect } from 'react'
import { useState } from 'react';
import image from '../utils/30456.jpg';

const Transactionhis = () => {
    const [formData,setFormData]=useState({});
    const [transactionDetails, setTransactionDetails] = useState(null); // To store response
  const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        
        const storedpinCode = localStorage.getItem("pinCode");
        if (storedpinCode) {
             setFormData((prevFormData) => ({
            ...prevFormData,
            pinCode: storedpinCode,
          }));
        }
      }, []);

    const handleChange = (e) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [e.target.name]: e.target.value,
        }));
      };


//console.log(localStorage.getItem("accessToken"))
const handleSubmit = async (e) => {
    e.preventDefault();    
    const myHeaders = new Headers();
    const accessToken1 = localStorage.getItem("accessToken");
    const accessToken = JSON.parse(accessToken1);
    //console.log("Token at Submit:", accessToken);
    const pinCode = formData.pinCode;

    // Log token and pinCode for debugging
    //console.log("Access Token:", accessToken.accountNumber);
    //console.log("Pin Code:", pinCode);

    if (!accessToken || !pinCode) {
      console.error("Access Token or Pin Code is missing");
      return;
    }

    // Append headers
    myHeaders.append("Token", accessToken.token);
    myHeaders.append("PinCode", pinCode);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

try{
const response=await fetch("http://localhost:8080/transaction/history", requestOptions)
if (!response.ok) {
    const errorData = await response.json();
    setErrorMessage(errorData.message || "Failed to fetch transaction history.");
    return;
  }

  const result = await response.json();
  setTransactionDetails(result); // Store the response in state
  setErrorMessage(""); // Clear any previous error
} catch (error) {
  setErrorMessage(error.message || "An error occurred while fetching transaction history.");
}

}

  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <div className="w-full max-w-lg p-6 rounded-lg shadow-lg bg-darkgray">
        <h2 className="pb-5 mb-4 text-3xl font-bold text-center text-white">
          Transaction History
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <input
              type="password"
              name="pinCode"
              placeholder="Pin Code"
              value={formData?.pinCode || ""}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <button type="submit" className="w-full px-4 py-2 text-white transition duration-300 rounded-lg bg-iconcolor hover:">Submit</button>
            </form>
            {errorMessage && (
        <p className="mt-4 text-center text-red-500">{errorMessage}</p>
      )}
      {transactionDetails && (
        <div className="mt-6">
          <h3 className="mb-2 text-lg font-semibold text-center text-white">Transaction History:</h3>
          <ul className="space-y-4">
            {transactionDetails.map((transaction, index) => (
              <li
                key={index}
                className="p-4 transition transform bg-gray-100 border rounded-lg shadow-sm hover:scale-105 hover:shadow-md"
              >
                <p><strong>Transaction ID:</strong> {transaction.transactionId}</p>
                <p><strong>From Account:</strong> {transaction.fromAccount}</p>
                <p><strong>To Account:</strong> {transaction.toAccount}</p>
                <p><strong>Amount:</strong> ${transaction.amount}</p>
                <p><strong>Time:</strong> {new Date(transaction.time).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
  )
}


export default Transactionhis