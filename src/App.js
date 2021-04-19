import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import './App.css';
import Table from './Table'

const App = () => {
	const [datePickerState, setDatePickerState] = useState(new Date());
	const [rates, setRates] = useState([]);

	const url = 'http://api.exchangeratesapi.io/v1/latest?access_key=60418b5b795136e35091e4f5366ba8fe';
	let objectRates = {
		"AUD": 1.566015,
		"CAD": 1.560132,
		"CHF": 1.154727,
		"CNY": 7.827874,
		"GBP": 0.882047,
		"JPY": 132.360679,
		"USD": 1.23396,
		"PPP": 1.23396,
		"AAA": 1.23396,
		"CCC": 1.23396,
		"HHH": 1.23396,
		"OKO": 1.23396,
		"SSA": 1.23396,
		"XXX": 1.23396,
		"EPA": 132.360679
	}

	let arrayRates = Object.entries(objectRates).map((e) => ({ 'flag' : `./${e[0]}.png`, 'country' : e[0], 'value' : e[1]  }));

	const handleChange = e => {
		console.log(e.toISOString().slice(0, 10));
		// console.log(day.toISOString().slice(0, 10));
		// setDatePickerState({ selectedDay: e.target.value.toISOString().slice(0, 10) });
	}

	const fetchRates = async () => {
		const apiCall = await fetch(url);
		const responseRates = await apiCall.json();
		setRates({ ...responseRates.rates });
	}

	useEffect(() => {
		// fetchRates();
		setRates([
			...arrayRates
		]);
	}, []);

	return (
		<div className="App d-flex align-content-center flex-wrap">
			<div className="container">
				<h1>Histórico de cotizaciones</h1>
				<form>
					<div className="row form-group">									
						<div className="select-title">
							<label htmlFor="money">Selecciona la moneda de referencia</label>
						</div>
						<select className="form-control input-styles" id="money">
							<option value="">Moneda</option>							
							{rates.map((r, i) => <option key={i} value="{r.value}">{r.country}</option>)}
						</select>
					</div>
					<div className="row form-group">
						<div className="select-title" >
							<label htmlFor="money">Ingrese la fecha de cotización</label>	
						</div>
						<DatePicker className="form-control input-styles" name="date" dateFormat="dd MM yyyy" onChange={handleChange} placeholderText="DD / MM / YYYY" /> 
					</div>	
					<div className="row">
						<button className="button-style" type="submit">Buscar cotizaciones</button>
					</div>					
				</form>				
				<Table arrayRates={arrayRates} />
			</div>
		</div>
	);
}

export default App;
