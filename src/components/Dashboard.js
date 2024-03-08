import { useEffect, useState } from "react";
import Logo from "../assets/logo512.png";
import "../styles/Dashboard.css";
import { Avatar } from "@files-ui/react";
import * as React from "react";

const fallBackImage =
  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

const Dashboard = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [clients, setClients] = useState(
    JSON.parse(localStorage.getItem("clients")) || []
  );
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  const openNav = (index) => {
    setIsSideNavOpen(true);
    setSelectedRowIndex(index);
  };

  const closeNav = () => {
    setIsSideNavOpen(false);
    setSelectedRowIndex(null);
  };

  const handleSaveClient = (clientData) => {
    if (selectedRowIndex !== null) {
      // Update only the clicked row
      const updatedClients = [...clients];
      updatedClients[selectedRowIndex] = {
        ...updatedClients[selectedRowIndex],
        ...clientData
      };
      setClients(updatedClients);
      closeNav();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-purple-900 text-white py-4 relative">
        <div className="container px-4 flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center">
            <img
              src={Logo}
              alt="Avatar"
              className="max-h-16 rounded-full"
              style={{ height: "70px", width: "70px" }}
            />
            <h1 className="text-4xl font-bold text-gray-300">
              Client Management Dashboard
            </h1>
          </div>
          <div className="absolute right-0 flex items-center">
            <h1 className="text-white-300 text-3xl mr-4">Welcome, Alex</h1>
            <div>
              <img
                src={Logo}
                alt="Avatar"
                className="h-8 w-8 rounded-full"
                style={{ height: "60px", width: "60px" }}
              />
            </div>
          </div>
          <div></div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">
        <div>
          <div
            id="mySidenav"
            className={`sidenav ${isSideNavOpen ? "open" : ""}`}
          >
            <div className="logo-container">
              <Avatar
                src={
                  selectedRowIndex !== null
                    ? clients[selectedRowIndex].avatar
                    : ""
                }
                onError={() => setSelectedRowIndex(fallBackImage)}
                accept=".pdf, .png"
                alt="Avatar2"
              />
            </div>
            <form className="form-container">
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  defaultValue={
                    selectedRowIndex !== null
                      ? clients[selectedRowIndex].name
                      : ""
                  }
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder="Company"
                  defaultValue={
                    selectedRowIndex !== null
                      ? clients[selectedRowIndex].company
                      : ""
                  }
                />
              </div>
              <div className="form-group">
                <select
                  id="plan"
                  name="plan"
                  defaultValue={
                    selectedRowIndex !== null
                      ? clients[selectedRowIndex].plan
                      : ""
                  }
                >
                  <option value="free">Free</option>
                  <option value="silver">Silver</option>
                  <option value="gold">Gold</option>
                </select>
              </div>
              <div className="button-container">
                <button
                  type="submit"
                  className="save-button"
                  onClick={(e) => {
                    e.preventDefault();
                    const name = document.getElementById("name").value;
                    const company = document.getElementById("company").value;
                    const plan = document.getElementById("plan").value;
                    handleSaveClient({ name, company, plan });
                  }}
                >
                  Save
                </button>
                <button type="button" className="cancel-button" onClick={closeNav}>
                  Cancel
                </button>
              </div>
            </form>
          </div>

          <div id="main">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-bold">User List</h2>
              <button
                className="bg-purple-900 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                onClick={() => openNav(null)}
              >
                New
              </button>
            </div>
            <table className="w-full">
              <thead className="border-b border-t border-gray-300">
                {/* Table headers */}
                <tr>
                  <th className="px-4 py-3">Avatar</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Reg. Date</th>
                  <th className="px-4 py-3">Plan</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {clients.map((client, index) => (
                  <tr key={index} onClick={() => openNav(index)}>
                    <td className="px-4 py-3 flex justify-center items-center">
                      <img
                        src={client.avatar}
                        alt="Avatar"
                        className="h-8 w-8 rounded-full"
                      />
                    </td>
                    <td className="px-4 py-3">{client.name}</td>
                    <td className="px-4 py-3">{client.company}</td>
                    <td className="px-4 py-3">{client.regDate}</td>
                    <td className="px-4 py-3">{client.plan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
