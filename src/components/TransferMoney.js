import { useState } from "react";
import image from '../utils/30456.jpg';

const TransferMoney = () => {
  const [transferData, setTransferData] = useState({
    toAccount: "",
    amount: "",
  });
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setTransferData({ ...transferData, [e.target.name]: e.target.value });
  };
  //console.log(localStorage.getItem("refreshtoken:"))

  
  
  const handleTransfer = async (e) => {
    e.preventDefault();
    /*const logincred = localStorage.getItem("Logincred:");
    console.log(logincred);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: logincred,
      redirect: "follow",
    };

    const refresh = await fetch(
      "http://localhost:8080/login",
      requestOptions
    )
    if (!refresh.ok) {
      if (refresh.status === 401) {
        // If session expired, clear credentials and redirect
        alert("Session expired. Please log in again.");
        localStorage.removeItem("Logincred:");
        localStorage.removeItem("refreshtoken:");
        window.location.href = "/login";
      } else {
        // Handle other server errors
        const errorData = await refresh.json();
        console.error("Login error:", errorData.message || "Unknown error");
        alert(errorData.message || "Login failed. Please try again.");
      }
      return;
    }

    const newdata = await refresh.json();
    console.log(newdata.token);
    localStorage.setItem("refreshtoken:",newdata.token);*/

    
    
    try {
      const transferPayload = {
        "accountNumber": parseInt(transferData.toAccount),
        "pinCode": transferData.pinCode.toString(),
        "amount": parseInt(transferData.amount),
      };
      
      
      //console.log(localStorage.getItem("refreshtoken:"))
      
      
      // Perform the transfer request
      const myHeaders = new Headers();
      myHeaders.append(
        "Token",
        localStorage.getItem("refreshtoken:")
      );
      

      const raw = JSON.stringify(transferPayload);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response=await fetch("http://13.51.242.117:8080/transaction", requestOptions)
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Transaction failed.");
        setTransactionDetails(null);
        return;
      }

      const result = await response.json();
      setTransactionDetails({
        transactionId: result.transactionId,
        fromAccount: result.fromAccount,
        toAccount: result.toAccount,
        amount: result.amount,
        time: result.time,
      });
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message || "An error occurred during the transaction.");
      setTransactionDetails(null);
      window.location.href = "/login";
      
    }
  };

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
    <form onSubmit={handleTransfer} className="w-full max-w-md p-6 rounded-lg shadow-md bg-darkgray">
    <h2 className="pb-5 mb-4 text-3xl font-bold text-center text-white">Transfer Money</h2>
    <div className="mb-4">
    <label className="block mb-2 font-medium text-white" htmlFor="toAccount">
      Recipient Account Number
    </label>
      <input
        type="number"
        name="toAccount"
        placeholder="Recipient Account Number"
        value={transferData.toAccount}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required

      />
      </div>

    <div className="mb-4">
    <label className="block mb-2 font-medium text-white" htmlFor="pinCode">
      Pin Code
    </label>
      <input
       type="password"
       name="pinCode"
       placeholder="Pin Code"
       value={transferData.pinCode}
       onChange={handleChange}
       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      </div>
    <div className="pb-5 mb-4">
    <label className="block mb-2 font-medium text-white" htmlFor="amount">
      Amount
    </label>
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={transferData.amount}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
        required
      />
      </div>
      <button type="submit" className="w-full py-3 text-white transition-colors rounded-lg bg-iconcolor hover: ">Transfer Money</button>
      {errorMessage && <p  className="mt-3 text-sm text-center text-red-500">{errorMessage}</p>}

      {transactionDetails && (
        <div className="p-4 mt-6 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-white">Transaction Details</h3>
          <ul className="mt-3 space-y-2">
            <li><strong>Transaction ID:</strong> {transactionDetails.transactionId}</li>
            <li><strong>From Account:</strong> {transactionDetails.fromAccount}</li>
            <li><strong>To Account:</strong> {transactionDetails.toAccount}</li>
            <li><strong>Amount:</strong> {transactionDetails.amount}</li>
            <li><strong>Time:</strong> {new Date(transactionDetails.time).toLocaleString()}</li>
          </ul>
        </div>
      )}
    </form>
    </div>
  );
};

export default TransferMoney;
