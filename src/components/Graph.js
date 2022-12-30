import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const CalculateInterest = () => {
	const [principal, setPrincipal] = useState(1000);
	const [rate, setRate] = useState(10);
	const [time, setTime] = useState(5);
	const [compound, setCompound] = useState(2);

	const calculateSI = () => {
		return (principal * rate * time) / 100;
	};

	const calculateCI = () => {
		return (
			principal * Math.pow(1 + rate / compound, compound * time) - principal
		);
	};

	const data = {
		labels: ["Simple Interest"],
		datasets: [
			{
				label: "Simple Interest",
				backgroundColor: "rgba(255,99,132,0.2)",
				borderColor: "rgba(255,99,132,1)",
				borderWidth: 1,
				hoverBackgroundColor: "rgba(255,99,132,0.4)",
				hoverBorderColor: "rgba(255,99,132,1)",
				data: [calculateSI()],
			},
		],
	};

	return (
		<div style={{ width: 700 }}>
			<h2>Calculate Interest</h2>
			<p>
				Principal:{" "}
				<input
					type="number"
					value={principal}
					onChange={(e) => setPrincipal(e.target.value)}
				/>
			</p>
			<p>
				Rate:{" "}
				<input
					type="number"
					value={rate}
					onChange={(e) => setRate(e.target.value)}
				/>
				%
			</p>
			<p>
				Time:{" "}
				<input
					type="number"
					value={time}
					onChange={(e) => setTime(e.target.value)}
				/>{" "}
				years
			</p>
			<p>
				Compound:{" "}
				<input
					type="number"
					value={compound}
					onChange={(e) => setCompound(e.target.value)}
				/>{" "}
				times/year
			</p>
			<Bar data={data} />
		</div>
	);
};

export default CalculateInterest;
