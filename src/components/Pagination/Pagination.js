import React from 'react';

export default function Pagination(props){
    const [pagination, setPagination] = React.useState(props.pagination);
    const [pageArray, setPageArray] = React.useState([]);

    function getArray(){
        let newArray = [];
        for(var i=0; i<pagination.last_page; i++){
            newArray.push(1);
        }
        setPageArray(newArray)
    }
    React.useEffect(()=>{
        getArray();
    },[])

    return(
    <div>
        <nav>
            <ul id="horizontal-list" aria-label="Pagination">
                {pagination.prev_link?
                <li onClick={()=>props.loadData(pagination.prev_link)}>
                    <p >&lt;</p>
                </li>
                :null}

                {pageArray.map((value, key)=>(
                    <li onClick={()=>props.loadData(pagination.path_page + (key+1))} className={`${pagination.current_page === key+1? 'active-page': null}`}>
                        <p>
                        {key+1}
                        </p>
                    </li>
                ))}
                {pagination.next_link?
                <li onClick={()=>props.loadData(pagination.next_link)} >
                    <p>&gt;</p>
                </li>
                :null}
            </ul>
        </nav>
    </div>
    )
}
