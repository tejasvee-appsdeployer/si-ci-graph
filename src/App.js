import React, { useState } from "react";
import "./App.css";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";

const App = () => {
	const [principal, setPrincipal] = useState(0);
	const [rate, setRate] = useState(0);
	const [duration, setDuration] = useState(0);
	const [simpleInterest, setSimpleInterest] = useState(0);
	const [compoundInterest, setCompoundInterest] = useState(0);
	const [unit, setUnit] = useState("year");

	const calculateSimpleInterest = () => {
		if (unit === "months") {
			setUnit("years");
			setDuration(duration / 12);
		}
		setSimpleInterest((principal * rate * duration) / 100);
	};

	const calculateCompoundInterest = () => {
		if (unit === "months") {
			setUnit("years");
			setDuration(duration / 12);
		}
		setCompoundInterest(principal * (1 + rate / 100) ** duration - principal);
	};

	return (
		<div className="App">
			<h1 className="text-center">Interest Calculator</h1>
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
							label={`Duration (in ${unit})`}
						>
							<Form.Control
								type="number"
								value={duration}
								onChange={(e) => setDuration(e.target.value)}
							/>
						</FloatingLabel>
					</Col>
					<Col md>
						<Form.Select
							className="mb-2"
							label="Unit Type"
							onChange={(e) => setUnit(e.target.value)}
						>
							<option value="years">Duration Unit</option>
							<option value="years">Years</option>
							<option value="months">Months</option>
						</Form.Select>
					</Col>
				</Row>
				<div className="d-flex justify-content-between">
					<Button variant="primary" onClick={calculateSimpleInterest}>
						Calculate SI
					</Button>
					<Button variant="primary" onClick={calculateCompoundInterest}>
						Calculate CI
					</Button>
				</div>
				<Form.Text>
					<h3>Simple Interest: Rs.{simpleInterest}</h3>
					<h3>Compound Interest: Rs.{compoundInterest}</h3>
				</Form.Text>
			</Form>
		</div>
	);
};

export default App;
