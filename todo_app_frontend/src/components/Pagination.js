import { useTodoContext } from 'context/TodoContext'
import { useSearchParams } from "react-router-dom"

function Pagination(){
    const {todo_list} = useTodoContext();
    const [searchParams, setSearchParams] = useSearchParams({});

    const current_page = ()=>{
        let current_page = 1;
        const total_pages = Math.ceil(todo_list.length/3);
        if(searchParams.get('page'))
            current_page = searchParams.get('page');
        if(current_page>total_pages && total_pages > 0 && current_page > 0)
            setSearchParams({page: total_pages})
        if(current_page<1)
            setSearchParams({page: 1})
        return current_page;
    }

    const has_prev_page = ()=>{
        if(current_page()>1)
            return true;
        else
            return false;
    }

    const has_next_page = ()=>{
        const total_pages = Math.ceil(todo_list.length/3);
        if(current_page()<total_pages)
            return true;
        else
            return false;
    }

    const handlePreviousPage = ()=>{
        if(has_prev_page())
            return setSearchParams({page: current_page()-1});
    }

    const handleNextPage = ()=>{
        if(has_next_page())
            return setSearchParams({page: parseInt(current_page())+1});
    }
    
    return (
        <div className="pagination column is-half is-offset-one-quarter mt-3">
            <span 
                className={`${has_prev_page()?'is-clickable':'is-non-clickable'} mr-3`} 
                onClick={handlePreviousPage}
            >
                Previous page
            </span>
            <span>{current_page()}</span>
            <span
                className={`${has_next_page()?'is-clickable':'is-non-clickable'} ml-3`}
                onClick={handleNextPage}
            >
                Next page
            </span>
        </div>
    );
}

export default Pagination;
