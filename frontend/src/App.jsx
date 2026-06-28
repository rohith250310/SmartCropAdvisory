import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: Number(e.target.value),
    });
  };

  const predictCrop = async () => {
    try {
      const response = await fetch(
  "https://smartcropadvisory-3y25.onrender.com/recommend_crop",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  }
);

      const data = await response.json();

      console.log(data);

      setResult(data.recommended_crop);
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h1>🌱 Smart Crop Advisory System</h1>

      <input
        type="number"
        name="N"
        placeholder="Nitrogen (N)"
        onChange={handleChange}
      />
      <br />
      <br />

      <input
        type="number"
        name="P"
        placeholder="Phosphorus (P)"
        onChange={handleChange}
      />
      <br />
      <br />

      <input
        type="number"
        name="K"
        placeholder="Potassium (K)"
        onChange={handleChange}
      />
      <br />
      <br />

      <input
        type="number"
        name="temperature"
        placeholder="Temperature"
        onChange={handleChange}
      />
      <br />
      <br />

      <input
        type="number"
        name="humidity"
        placeholder="Humidity"
        onChange={handleChange}
      />
      <br />
      <br />

      <input
        type="number"
        name="ph"
        placeholder="pH"
        step="0.1"
        onChange={handleChange}
      />
      <br />
      <br />

      <input
        type="number"
        name="rainfall"
        placeholder="Rainfall"
        onChange={handleChange}
      />
      <br />
      <br />

      <button onClick={predictCrop}>
        Recommend Crop
      </button>

      <h2 style={{ marginTop: "20px" }}>
        Recommended Crop: {result}
      </h2>
    </div>
  );
}

export default App;
