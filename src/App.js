import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import './App.css';
import Table from './Table';
// import CurrencyFlag from 'react-currency-flags';


const App = () => {
	
	const access_key = '6cee9f5c5f94eb3548f6f482781c67e7';
	const [datePickerState, setDatePickerState] = useState(new Date());
	const [moneyState, setMoneyState] = useState('USD');
	const [rates, setRates] = useState([]);	
	
	useEffect(() => {
		let dateString = datePickerState.toISOString().slice(0, 10);
		fetchRates('http://api.exchangeratesapi.io/v1/' + dateString + '?access_key='+ access_key);
	}, []);//lo refresco una vez
	
	const mapperRates = (rates) => {
		return Object.entries(rates).map(element => {
			return {
				'flag' : `./${element[0]}.png`, 
				'currency' : element[0],
				'value' : element[1] * (1 / Number(rates[moneyState]) ) 
			}
		});
	}
	
	const fetchRates = async (url) => {
		const apiCall = await fetch(url);
		const responseRates = await apiCall.json();	
		const mappedRates = await mapperRates(responseRates.rates);
		
		let othersRates = mappedRates.filter(e => e.currency !== 'CAD' && e.currency !== 'GBP' && e.currency !== 'USD' && e.currency !== 'EUR')
		let firstFour = mappedRates.filter(e => e.currency === 'CAD' || e.currency === 'GBP' || e.currency === 'USD' || e.currency === 'EUR')
		
		setRates([ ...firstFour, ...othersRates ]);
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
						{rates.map((r, i) => <option key={i} value={r.currency}>{r.currency}</option>)}
					</select>
				</div>
					<div className="row form-group">
						<div className="select-title" >
							<label htmlFor="money">Ingrese la fecha de cotización</label>	
						</div>
						<div id="input_container">
							<DatePicker
								id="input"
								className="form-control input-styles" 
								name="date" 
								dateFormat="dd MM yyyy" 
								selected={datePickerState}
								onChange={date => setDatePickerState(date)}
								placeholderText="DD / MM / YYYY"
								maxDate={new Date()}
							/>
							<img id="input_img" src="./calendar-icon.png" alt=""/>
						</div>
					</div>
					<div className="row"><i className="fa fa-search"></i>
						<input type="button" className="button-find" onClick={btnSubmit} value="Buscar cotizaciones" />
					</div>					
				</form>				
				<Table arrayRates={rates} />
			</div>
		</div>
	);
}

export default App;
