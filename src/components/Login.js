import { useEffect, useState } from "react";
import image from '../utils/30456.jpg';

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [Message, setMessage] = useState("");
  const [lazyloading,setlazyloading]=useState(true);
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ accountNumber: "", pinCode: "" });
  
  useEffect(() => {

    
    const setload=setTimeout(()=>{
      setlazyloading(false)
    },3000)
    const storedAccountNumber = localStorage.getItem("accountnumber");
    const storedpinCode = localStorage.getItem("pinCode");
    if (storedAccountNumber && storedpinCode) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        accountNumber: storedAccountNumber,
        pinCode: storedpinCode,
      }));
    }
    
    return ()=>clearTimeout(setload)
  }, []);

  const handleChange = (e) => {
    
    //console.log(`${e.target.name}: ${e.target.value}`);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form fields
    if (!formData.accountNumber || !formData.pinCode) {
      setMessage("All fields are required.");
      return;
    }
  
    try {
      // Prepare payload
      const payload = {
        accountNumber: parseInt(formData.accountNumber, 10), // Ensure conversion to an integer
        pinCode: formData.pinCode.toString(), // Ensure PIN is a string
      };
  
      // Store credentials locally
      localStorage.setItem("Logincred", JSON.stringify(payload));
  
      // Prepare headers and request options
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(payload),
        redirect: "follow",
      };
  
      // Perform the fetch call
      const response = await fetch("http://13.51.242.117:8080/login", requestOptions);
  
      // Check if the response is okay
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Login failed: ${errorText}`);
      }

      
  
      // Check response content type
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        localStorage.setItem("accessToken", JSON.stringify(result));
        setMessage("Login Successful");
        console.log("Login Successful");
        localStorage.setItem("Logincred", JSON.stringify(payload))
        console.log(localStorage.getItem("Logincred"));
        // Redirect to the dashboard
        navigate('/dashboard')
      } else {
        const text = await response.text();
        throw new Error(`Unexpected response format: ${text}`);
      }
    } catch (error) {
      // Log and display the error
      console.error("Error during login:", error);
      setMessage(error.message || "An error occurred during login.");
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
         <iframe src="https://lottie.host/embed/569fbf3f-881a-445a-9ca0-639ae1e52343/oWvIeYkhVT.lottie" title="dashboard-report"></iframe>
      </div>
    );
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
      <div
        style={{
          backgroundColor: "#1A1A1D",
          padding: "30px",
          paddingTop: "10px",
          marginTop: "100px",
          borderRadius: "15px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{ textAlign: "center", marginBottom: "20px" }}
          className="text-3xl font-bold text-white"
        >
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="number"
              name="accountNumber"
              placeholder="Account Number"
              value={formData.accountNumber}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="password"
              name="pinCode"
              placeholder="Pin Code"
              value={formData.pinCode}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              backgroundColor: "#3B1C32",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {Message && (
          <p style={{ marginTop: "15px", textAlign: "center", color: "green" }}>
            {Message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
