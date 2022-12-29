import React, { useState } from "react";
import CalculateInterest from "./components/Graph";

const App = () => {
	const [principal, setPrincipal] = useState(0);
	const [rate, setRate] = useState(0);
	const [duration, setDuration] = useState(0);
	const [simpleInterest, setSimpleInterest] = useState(0);
	const [compoundInterest, setCompoundInterest] = useState(0);

	const calculateSimpleInterest = () => {
		setSimpleInterest((principal * rate * duration) / 100);
	};

	const calculateCompoundInterest = () => {
		setCompoundInterest(principal * (1 + rate / 100) ** duration - principal);
	};

	return (
		// 	<div>
		// 		<h1>Simple Interest Calculator</h1>
		// 		<label>
		// 			Principal:
		// 			<input
		// 				type="number"
		// 				value={principal}
		// 				onChange={(e) => setPrincipal(e.target.value)}
		// 			/>
		// 		</label>
		// 		<br />
		// 		<label>
		// 			Rate:
		// 			<input
		// 				type="number"
		// 				value={rate}
		// 				onChange={(e) => setRate(e.target.value)}
		// 			/>
		// 		</label>
		// 		<br />
		// 		<label>
		// 			Duration:
		// 			<input
		// 				type="number"
		// 				value={duration}
		// 				onChange={(e) => setDuration(e.target.value)}
		// 			/>
		// 		</label>
		// 		<br />
		// 		<button onClick={calculateSimpleInterest}>
		// 			Calculate Simple Interest
		// 		</button>
		// 		<br />
		// 		<button onClick={calculateCompoundInterest}>
		// 			Calculate Compound Interest
		// 		</button>
		// 		<br />
		// 		<h2>Simple Interest: {simpleInterest}</h2>
		// 		<h2>Compound Interest: {compoundInterest}</h2>
		// 	</div>
		<div>
			<CalculateInterest />
		</div>
	);
};

export default App;
