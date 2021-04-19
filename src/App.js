import { useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import './App.css';

const App = () => {
	const [datePicker, setDatePicker] = useState(new Date());

	const handleChange = e => {
		console.log(e.target.value);
		// console.log(day.toISOString().slice(0, 10));
		// setDatePicker({ selectedDay: day });
	}

	// const styleDate = {
	// 	"border-radius": "7px"
	// }

	return (
		<div className="App">

			<h1>Histórico de cotizaciones</h1>
			<form>
				<div className="form-group">
					<div className="row select-title" >
						<label htmlFor="money">Selecciona la moneda de referencia</label>
					</div>
					<div className="row">
						<select className="form-control input-styles" id="money">
							<option value="">Moneda</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
						</select>
					</div>
					<div className="row">
						<div className="row select-title">
							<label htmlFor="money">Ingrese la fecha de cotización</label>
						</div>
						<input className="input-styles" type="date" onChange={handleChange} />
					</div>
					<div className="row">
						<button className="button-style" type="submit">Buscar cotizaciones</button>
					</div>
				</div>
			</form>

		</div>
	);
}

export default App;
