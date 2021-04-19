import { useState, useEffect } from 'react';
import './App.css';

const Table = (prop) => {
    const [counter, setCounter] = useState(4);
    
    useEffect(() => {
        console.log('ACA!!!!');
        for(let i=4; i < prop.arrayRates.length; i++){
            let element = document.getElementById(i);
            if(element != null){
                element.style.display = 'none';
            }            
        }
	}, []);

    const addRows = () => {
        console.log('ACA');
        for(let i = counter; i < counter + 4; i++){
            console.log('entro');
            let element = document.getElementById(i);
            if(element != null){
                element.style.display = '';
            }            
        }
        setCounter(counter + 4)
        console.log(counter);
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