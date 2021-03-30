import React from 'react';
import '../Styles/Home.css';
import QuickSearchItems from './QuickSearchItems';

class HomePart2 extends React.Component{
    
    render(){
        const  { mealtypes } = this.props;
         return(
            <div>
                
                    <div className="quicksearch">
                        <p className="quicksearchHeading">
                            Quick Searches
                        </p>
                        <p className="quicksearchSubHeading">
                            Discover restaurants by type of meal
                        </p>
                        <div className="container-fluid">
                            <div className="row">
                                {mealtypes.map((item) => {
                                   return <QuickSearchItems id={item.id_} Name={item.Name} Content={item.Content} Image={item.Image}/>
                                })}
                                
                                
                            </div>
                            
                        </div>
                    </div>
            </div>
        )
    }
}

export default HomePart2;