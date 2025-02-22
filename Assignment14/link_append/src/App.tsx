import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function App() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleButtonClick = () => {
    const newPath = location.pathname === "/" ? `/${input}` : `${location.pathname}/${input}`;
    navigate(newPath);
    setInput("");
  };

  return (
    <div>
      <input type="text" value={input} onChange={handleChange} />
      <button onClick={handleButtonClick}>Go</button>
    </div>
  );
}

export default App;
