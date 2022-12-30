import React, { useState } from "react";
import "./App.css";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

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

	const calculateInterest = () => {
		const simpleInterestData = [principal];
		const compoundInterestData = [principal];
		let simpleInterest = principal;
		let compoundInterest = principal;
		for (let i = 0; i < duration; i++) {
			simpleInterest += simpleInterest * (rate / 100);
			compoundInterest += compoundInterest * (rate / 100);
			simpleInterestData.push(simpleInterest);
			compoundInterestData.push(compoundInterest);
		}
		return [simpleInterestData, compoundInterestData];
	};
	const getLabels = () => {
		let years = [];
		for (let year = 1; year <= duration; year += 1) {
			years.push(`Year ${year}`);
		}
		return years;
	};

	const [simpleInterestData, compoundInterestData] = calculateInterest();

	const data = {
		labels: getLabels(),
		datasets: [
			{
				label: "Simple Interest",
				data: simpleInterestData,
				borderColor: "#3e95cd",
				fill: false,
			},
			{
				label: "Compound Interest",
				data: compoundInterestData,
				borderColor: "#8e5ea2",
				fill: false,
			},
		],
	};

	return (
		<div className="App">
			<h1 className="text-center my-4">Interest Calculator</h1>
			<Form>
				<Row className="g-2">
					<Col md>
						<FloatingLabel
							className="mb-2"
							controlId="floatingInput"
							label="Principle"
						>
							<Form.Control
								type="number"
								value={principal}
								onChange={(e) => setPrincipal(e.target.value)}
							/>
						</FloatingLabel>
					</Col>
					<Col md>
						<FloatingLabel
							className="mb-2"
							controlId="floatingInput"
							label="Rate"
						>
							<Form.Control
								type="number"
								value={rate}
								onChange={(e) => setRate(e.target.value)}
							/>
						</FloatingLabel>
					</Col>
				</Row>
				<Row className="g-2">
					<Col md>
						<FloatingLabel
							className="mb-2"
							controlId="floatingInput"
							label={`Duration (in years)`}
						>
							<Form.Control
								type="number"
								value={duration}
								onChange={(e) => setDuration(e.target.value)}
							/>
						</FloatingLabel>
					</Col>
				</Row>
				<Row className="g-2">
					<Button
						className=""
						variant="success"
						onClick={() => {
							calculateCompoundInterest();
							calculateSimpleInterest();
						}}
					>
						Calculate
					</Button>
				</Row>
				<Form.Text>
					<h3>Simple Interest: Rs.{simpleInterest}</h3>
					<h3>Compound Interest: Rs.{compoundInterest}</h3>
				</Form.Text>
			</Form>
			<Line
				data={data}
				options={{
					title: {
						display: true,
						text: "Interest over Time",
					},
					scales: {
						yAxes: [
							{
								scaleLabel: {
									display: true,
									labelString: "Amount",
								},
							},
						],
					},
				}}
			/>
		</div>
	);
};

export default App;
