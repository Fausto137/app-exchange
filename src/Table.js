import { useState, useEffect } from 'react';
import './App.css';

const Table = (prop) => {
    const [counter, setCounter] = useState(4);
    
    //muestro las primeras 4
    useEffect(() => {
        for(let i=4; i < prop.arrayRates.length; i++){
            let element = document.getElementById(i);
            if(element != null){
                element.style.display = 'none';
            }
        }
	}, [prop.arrayRates]);

    const addRows = () => {
        for(let i = counter; i < counter + 4; i++){
            let element = document.getElementById(i);
            if(element != null){
                element.style.display = '';
            }            
        }
        setCounter(counter + 4);
    }



    return (
        <div className="row">
            <table className="table table-styles">
                <tbody>
                    {
                        prop.arrayRates.map((element, i) =>
                            <tr key={i} id={i}>
                                <th><img src={element.flag} alt=""/></th>
                                <td>{element.currency}</td>
                                <td>{element.value}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <button className="button-more" onClick={addRows} >Ver más cotizaciones</button>
        </div>
    )
}

export default Table;