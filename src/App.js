import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [target, setTarget] = useState('');
    const [result, setResult] = useState('');

    const handleScan = async () => {
        try {
            const response = await axios.post('http://localhost:5000/scan', { target });
            setResult(response.data);
        } catch (error) {
            setResult(`Error: ${error.message}`);
        }
    };

    return (
        <div className="App">
            <h1>Network Scanner</h1>
            <input
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="Enter target IP"
            />
            <button onClick={handleScan}>Scan</button>
            <pre>{result}</pre>
        </div>
    );
}

export default App;
