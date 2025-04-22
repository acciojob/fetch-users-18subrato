import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [clicked, setClicked] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (clicked) {
      axios.get("https://reqres.in/api/users")
        .then((response) => {
          setUserData(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [clicked]);

  // Styling
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#f5f8fa",
    minHeight: "100vh",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  };

  const buttonStyle = {
    padding: "8px 16px",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "4px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const buttonHoverStyle = {
    backgroundColor: "#218838",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  };

  const thStyle = {
    backgroundColor: "#007bff",
    color: "white",
    padding: "12px 16px",
    textAlign: "left",
  };

  const tdStyle = {
    padding: "12px 16px",
    borderBottom: "1px solid #ddd",
  };

  const imageStyle = {
    borderRadius: "50%",
    height: "50px",
    width: "50px",
    objectFit: "cover",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1>Blue Whales</h1>
        <button
          className="btn"
          style={buttonStyle}
          onClick={() => setClicked(true)}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
        >
          Get User List
        </button>
      </div>

      <div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>First Name</th>
              <th style={thStyle}>Last Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Avatar</th>
            </tr>
          </thead>
          <tbody>
            {clicked && userData.length > 0 ? (
              userData.map((user) => (
                <tr key={user.id}>
                  <td style={tdStyle}>{user.first_name}</td>
                  <td style={tdStyle}>{user.last_name}</td>
                  <td style={tdStyle}>{user.email}</td>
                  <td style={tdStyle}>
                    <img
                      src={user.avatar}
                      alt={`${user.first_name}`}
                      style={imageStyle}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={tdStyle} colSpan="4">
                No data found to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;