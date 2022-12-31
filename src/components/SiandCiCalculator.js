import React, { useState } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";

function InterestChart({ si, ci }) {
	const data = [
		{ name: 1, Simple_Interest: si, Compound_Interest: ci },
		{ name: 2, Simple_Interest: si * 2, Compound_Interest: ci * 2 },
		{ name: 3, Simple_Interest: si * 3, Compound_Interest: ci * 3 },
	];

	return (
		<LineChart width={600} height={300} data={data}>
			<XAxis dataKey="name" />
			<YAxis />
			<CartesianGrid stroke="#eee" strokeDasharray="5 5" />
			<Tooltip />
			<Legend />
			<Line type="monotone" dataKey="Simple_Interest" stroke="#8884d8" />
			<Line type="monotone" dataKey="Compound_Interest" stroke="#82ca9d" />
		</LineChart>
	);
}

function SiCiCalculator() {
	const [formValues, setFormValues] = useState({
		principal: 0,
		rate: 0,
		term: 0,
	});

	function handleChange(event) {
		const { name, value } = event.target;
		setFormValues({ ...formValues, [name]: value });
	}

	function handleSubmit(event) {
		event.preventDefault();

		const { principal, rate, term } = formValues;
		const si = principal * rate * term;
		const ci = principal * Math.pow(1 + rate / 12, 12 * term);

		setFormValues({ ...formValues, si, ci });
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>
					Principal:
					<input
						type="number"
						name="principal"
						value={formValues.principal}
						onChange={handleChange}
					/>
				</label>
				<br />
				<label>
					Interest rate:
					<input
						type="number"
						name="rate"
						value={formValues.rate}
						onChange={handleChange}
					/>
				</label>
				<br />
				<label>
					Term (years):
					<input
						type="number"
						name="term"
						value={formValues.term}
						onChange={handleChange}
					/>
				</label>
				<br />
				<button type="submit">Calculate</button>
				<br />
				<br />
				<div>
					Simple interest: {formValues.si}
					<br />
					Compound interest: {formValues.ci}
				</div>
			</form>
			<InterestChart si={formValues.si} ci={formValues.ci} />
		</>
	);
}

export default SiCiCalculator;
