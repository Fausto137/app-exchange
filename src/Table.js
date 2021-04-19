import { useState, useEffect } from 'react';
import './App.css';

const Table = (prop) => {
    const [counter, setCounter] = useState(4);
    
    useEffect(() => {
        for(let i=4; i < prop.arrayRates.length; i++){
            console.log('ACA');
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
                        prop.arrayRates.map((e, i) =>
                            <tr key={i} id={i}>
                                <th scope="row"><img src={e.flag} alt=""/></th>
                                <td>{e.country}</td>
                                <td>{e.value}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <button className="button-style" onClick={addRows} >Ver más cotizaciones</button>
        </div>
    )
}

export default Table;