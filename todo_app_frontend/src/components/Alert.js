import {useTodoContext} from 'context/TodoContext';

function Alert() {
    const { alert } = useTodoContext();
    
    const set_error_or_notification = ()=>{
        const is_error = alert.type==='error' ? true:false;
        return is_error?'danger':'success';
    }

    const renderAlertSign = () => {
        if(alert.type==='error'){
            return(
                <i className={
                    `fa-solid fa-circle-exclamation has-text-${set_error_or_notification()} fa-2x mr-3`}></i>
            )
        }else{
            return(
                <i className={`fa-solid fa-circle-check  has-text-${set_error_or_notification()} fa-2x mr-3`}></i>
            );
        }
    }

    return (
            <div className={`alert-box box is-flex has-border-${set_error_or_notification()} is-align-items-center`}>
                <span>
                    {renderAlertSign()}
                </span>
                <h1 className={`alert-title has-text-${set_error_or_notification()}`}>{alert.message}</h1>
            </div>
    );
}

export default Alert;
