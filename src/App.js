import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import './App.css';
import Table from './Table'

const App = () => {
	
	const access_key = '6cee9f5c5f94eb3548f6f482781c67e7';
	const [datePickerState, setDatePickerState] = useState(new Date());
	const [moneyState, setMoneyState] = useState('USD');
	const [rates, setRates] = useState([]);	
	
	useEffect(() => {
		let dateString = datePickerState.toISOString().slice(0, 10);
		fetchRates('http://api.exchangeratesapi.io/v1/' + dateString + '?access_key='+ access_key);
	}, []);

	const fetchRates = async (url, money) => {
		const apiCall = await fetch(url);
		const responseRates = await apiCall.json();		
		let arrayRates = Object.entries(responseRates.rates).map((e) => ({ 'flag' : `./${e[0]}.png`, 'country' : e[0], 'value' : e[1] * (1 / Number(responseRates.rates[moneyState]) ) }))
		setRates([ ...arrayRates ]);
	}

	const btnSubmit = () => {
		let dateString = datePickerState.toISOString().slice(0, 10);
		fetchRates('http://api.exchangeratesapi.io/v1/' + dateString + '?access_key='+ access_key);
	}

	return (
		<div className="App d-flex align-content-center flex-wrap">
			<div className="container">
				<h1>Histórico de cotizaciones</h1>
				<form>
					<div className="row form-group">									
						<div className="select-title">
							<label htmlFor="money">Selecciona la moneda de referencia</label>
						</div>
						<select 
							className="form-control input-styles" 
							id="money" onChange={e => setMoneyState(e.target.value)}>
							<option value={moneyState}>{moneyState}</option>
							{rates.map((r, i) => <option key={i} value={r.country}>{r.country}</option>)}
						</select>
					</div>
					<div className="row form-group">
						<div className="select-title" >
							<label htmlFor="money">Ingrese la fecha de cotización</label>	
						</div>
						<DatePicker 
							className="form-control input-styles" 
							name="date" 
							dateFormat="dd MM yyyy" 
							selected={datePickerState}
							onChange={date => setDatePickerState(date)}
							placeholderText="DD / MM / YYYY"
						/> 
					</div>	
					<div className="row">
						<input type="button" className="button-style" onClick={btnSubmit} value="Buscar cotizaciones" />
					</div>					
				</form>				
				<Table arrayRates={rates} />
			</div>
		</div>
	);
}

export default App;
