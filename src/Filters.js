import React from 'react';
import './Filter.css'
class Filter extends React.Component {
    render() {
        return (<div className="divstyle">
                <input type="text" placeholder="Location"></input>&ensp;&ensp;
                <input type="text" placeholder="Designation"></input>&ensp;&ensp;
                <input type="text" placeholder="Company"></input>&ensp;&ensp;
        </div>)
    }
}
export default Filter;