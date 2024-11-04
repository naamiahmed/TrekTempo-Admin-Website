import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { Fade } from "react-reveal";
import "./Body.css";

// NavigationBar Component (commented out but preserved)
/*
const NavigationBar = () => {
  return (
    <header className="navbar">
      <div className="logo-section">
        <img src="/AppIcon.png" alt="Logo" className="logo-icon" />
        <h1 className="App-name">TrackTempo</h1>
      </div>
      <div className="user-section">
        <img src="/Notifications.png" alt="Notifications" className="icon" />
      </div>
    </header>
  );
};
*/

// AddPlaces Component
const AddPlaces = () => {
  const navigate = useNavigate();

  return (
    <div className="Placecard">
      <img src="/AddPlaceIcon.png" alt="Add Places" className="card-icon" />
      <div className="flex-container">
        <h2>Places</h2>
        <div className="listofthings">
          <div onClick={() => navigate("/25")}>View</div>
          <div onClick={() => navigate("/26")}>Add</div>
          <div onClick={() => navigate("/21")}>Req</div>
        </div>
      </div>
    </div>
  );
};

// AddEvents Component
const AddEvents = () => {
  const navigate = useNavigate();

  return (
    <div className="Placecard">
      <img src="/AddEventIcon.png" alt="Add Events" className="card-icon" />
      <div className="flex-container">
        <h2>Events</h2>
        <div className="listofthings">
          <div onClick={() => navigate("/23")}>View</div>
          <div onClick={() => navigate("/add-event")}>Add</div>
          <div onClick={() => navigate("/22")}>Req</div>
        </div>
      </div>
    </div>
  );
};

// RequetedAccommodation Component
const RequetedAccommodation = () => {
  const navigate = useNavigate();

  return (
    <div className="Placecard">
      <img src="/AddPlace.png" alt="Requested Accommodation" className="card-icon" />
      <div className="flex-container">
        <h2>Accommodation</h2>
        <div className="listofthings">
          <div onClick={() => navigate("#")}>View</div>
          <div onClick={() => navigate("/add-accommodation")}>Add</div>
          <div onClick={() => navigate("/27")}>Req</div>
        </div>
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = () => {
  return (
    <div className="Sidebar">
      <img src="/AppIcon.png" alt="Sidebar Image" className="sidebar-image" />
      <p className="sidebar-text">TRACKTEMPO</p>
      <div className="horizontal-line"></div>
    </div>
  );
};

// CenteredContainer Component
const CenteredContainer = () => {
  return (
    <div className="CenteredContainer">
      <h2 className="centered-text">Dashboard</h2>
    </div>
  );
};

// StatCard Component
const StatCard = ({ title, count, color }) => (
  <div className="stat-card" style={{ backgroundColor: color }}>
    <div className="stat-info">
      <h3>{title}</h3>
      <p>{count}</p>
    </div>
  </div>
);

// MainContent Component
const MainContent = () => {
  const [stats, setStats] = useState({
    users: 0,
    events: 0,
    places: 0,
    accommodations: 0
  });

  // In MainContent component, update the fetchStats function:
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log('Fetching stats...'); // Debug log
        const [users, events, places, accommodations] = await Promise.all([
          axios.get('http://localhost:5000/api/auth/user-count'),
          // axios.get('http://localhost:5000/api/events/count'),
          // axios.get('http://localhost:5000/api/places/count'),
          // axios.get('http://localhost:5000/api/accommodations/count')
        ]);
  
        console.log('User response:', users.data); // Debug log
  
        setStats({
          users: users.data.count || 0,
          events: events?.data?.count || 0,
          places: places?.data?.count || 0,
          accommodations: accommodations?.data?.count || 0
        });
  
        setChartData([
          { name: 'Users', value: users.data.count || 0 },
          { name: 'Events', value: events?.data?.count || 0 },
          { name: 'Places', value: places?.data?.count || 0 },
          { name: 'Accommodations', value: accommodations?.data?.count || 0 }
        ]);
  
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats(prevStats => ({
          ...prevStats,
          users: 0
        }));
      }
    };
  
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="MainContent">
      <div className="dashboard-container">
        <div className="stats-grid">
          <StatCard title="Total Users" count={stats.users} color="#4CAF50" />
          {/* <StatCard title="Pending Events" count={stats.events} color="#2196F3" />
          <StatCard title="Requested Places" count={stats.places} color="#FF9800" />
          <StatCard title="Accommodation Requests" count={stats.accommodations} color="#9C27B0" /> */}
        </div>

        <div className="charts-grid">
          <div className="chart-container">
            <h3>Overview Statistics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h3>Request Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Body Component that renders all sections
const Body = () => {
  return (
    // <Fade>
      <div className="Body">
        <Sidebar />
        <div style={{ marginTop: "280px" }}>
          <AddPlaces />
          <AddEvents />
          <RequetedAccommodation />
        </div>
        <CenteredContainer />
        <MainContent />
      </div>
    // </Fade>
  );
};

export default Body;