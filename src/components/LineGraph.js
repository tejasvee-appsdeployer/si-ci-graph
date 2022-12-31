import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const LineGraph = () => {
	const [principal, setPrincipal] = useState();
	const [rate, setRate] = useState();
	const [term, setTerm] = useState();
	const [si, setSI] = useState();
	const [ci, setCI] = useState();

	const InvestmentCalculator = (principal, rate, time) => {
		const data = [];
		for (let i = 1; i <= time; i++) {
			const simpleInterest = (principal * rate * i) / 100;
			const compoundInterest = (principal * (1 + rate / 12)) ^ (12 * term);
			data.push({ year: i, simpleInterest, compoundInterest });
		}
		return data;
	};

	const data = {
		labels: [],
		datasets: [
			{
				label: "Simple Interest",
				fill: false,
				lineTension: 0.1,
				backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
				borderCapStyle: "butt",
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: "miter",
				pointBorderColor: "rgba(75,192,192,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "rgba(75,192,192,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: [],
			},
			{
				label: "Compound Interest",
				fill: false,
				lineTension: 0.1,
				backgroundColor: "rgba(255,99,132,0.4)",
				borderColor: "rgba(255,99,132,1)",
				borderCapStyle: "butt",
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: "miter",
				pointBorderColor: "rgba(255,99,132,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "rgba(255,99,132,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: [],
			},
		],
	};

	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		},
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSI((principal * rate * term) / 100);
		setCI(principal * Math.pow(1 + rate / 100, term) - principal);
	};

	const values = InvestmentCalculator(principal, rate, term);
	values.forEach((value) => {
		data.labels.push(`Year ${value.year}`);
		data.datasets[0].data.push(value.simpleInterest);
		data.datasets[1].data.push(value.compoundInterest);
	});

	return (
		<div className="row">
			<div className="col-3">
				<form onSubmit={handleSubmit}>
					<h2 className="text-center">Interest Calculator</h2>
					<div className="mb-3">
						<label for="exampleInputEmail1" className="form-label">
							Principle Amount
						</label>
						<input
							type="number"
							className="form-control"
							id="exampleInputEmail1"
							value={principal}
							onChange={(e) => setPrincipal(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<label for="rateInput" className="form-label">
							Annual Interest Rate
						</label>
						<input
							type="number"
							className="form-control"
							id="rateInput"
							value={rate}
							onChange={(e) => setRate(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<label for="termInput" className="form-label">
							Term of loan, in Years
						</label>
						<input
							type="number"
							className="form-control"
							id="termInput"
							value={term}
							onChange={(e) => setTerm(e.target.value)}
						/>
					</div>
					<div className="d-flex justify-content-between">
						<button type="submit" className="btn btn-primary">
							Submit
						</button>
						<button type="reset" className="btn btn-primary">
							Reset
						</button>
					</div>
				</form>
				<hr />
				<p>Principle Amount: Rs.{principal}</p>
				<p>Simple Interest: Rs.{si}</p>
				<p>Compound Interest: Rs.{ci}</p>
			</div>
			<div className="col">
				<Line className="" data={data} options={options} />
			</div>
		</div>
	);
};

export default LineGraph;
