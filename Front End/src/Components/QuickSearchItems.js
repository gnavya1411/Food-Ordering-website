import React from 'react';
import { withRouter } from 'react-router-dom';

class QuickSearchItems extends React.Component{
    handleclick = (id) => {
        const mealtype = id;

        this.props.history.push(`/Search/?mealtype=${mealtype}`);
    }
    render(){
        const { id,Name,Content,Image } = this.props;
        return(
            <div className="col-sm-12 col-md-12 col-lg-4" onClick={()=>this.handleclick(id)}>
                <div className="tileContainer" >
                    <div className="tileComponent1">
                        <img src={require("../" + Image)} height="150" width="140" />
                    </div>
                    <div className="tileComponent2">
                        <div className="componentHeading">
                            {Name}
                        </div>
                        <div className="componentSubHeading">
                            {Content}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(QuickSearchItems);