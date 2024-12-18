import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import "./Body.css";

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
          <div onClick={() => navigate("/AllAccommodation")}>View</div>
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
  <div className="stat-card" style={{ background: `linear-gradient(45deg, ${color[0]}, ${color[1]})` }}>
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

  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log('Fetching stats...');
        const [users, events, places, accommodations] = await Promise.all([
          axios.get('https://trektempo.onrender.com/api/auth/user-count'),
          axios.get('https://trektempo.onrender.com/api/getEventCount/'),
          axios.get('https://trektempo.onrender.com/api/getPlaceCount'),
          axios.get('https://trektempo.onrender.com/api/getAccommodationCount')
        ]);
  
        console.log('User response:', users.data);
  
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

  const barColors = [
    ['#eb5900', '#923700'], 
  ['#01a6f3', '#015277'], 
  ['#f00000', '#8a0303'], 
  ['#00c898', '#045642']  
  ];

  return (
    <div className="MainContent">
      <div className="dashboard-container">
        <div className="stats-grid">
          <StatCard title="Total Users" count={stats.users} color={barColors[0]} />
          <StatCard title="Requested Events" count={stats.events} color={barColors[1]} />
          <StatCard title="Requested Places" count={stats.places} color={barColors[2]} />
          <StatCard title="Requested Accommodation" count={stats.accommodations} color={barColors[3]} />
        </div>

        <div className="charts-grid">
          <div className="chart-container">
            <h3>Overview Statistics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <defs>
                  {barColors.map((colors, index) => (
                    <linearGradient id={`colorUv${index}`} x1="0" y1="0" x2="0" y2="1" key={index}>
                      <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={colors[1]} stopOpacity={0.8}/>
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`url(#colorUv${index})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h3>Request Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <defs>
                  {barColors.map((colors, index) => (
                    <linearGradient id={`colorPv${index}`} x1="0" y1="0" x2="0" y2="1" key={index}>
                      <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={colors[1]} stopOpacity={0.8}/>
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`url(#colorPv${index})`} />
                  ))}
                </Pie>
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
  );
};

export default Body;