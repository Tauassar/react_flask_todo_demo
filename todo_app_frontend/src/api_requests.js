
export function loadUserData(){
    return {}
}

export function loadTodoData(){
    const initialTodoState = [
        {
            id: 1,
            username: "AtestUser",
            email: "testUser@email.com",
            task: "testUser task 1",
            finished: true
        },
        {
            id: 2,
            username: "CtestUser",
            email: "testUser@email.com",
            task: "testUser task 2",
            finished: false
        },
        {
            id: 3,
            username: "BtestUser",
            email: "testUser@email.com",
            task: "testUser task 3",
            finished: false
        },
        {
            id: 4,
            username: "testUser",
            email: "testUser@email.com",
            task: "testUser task 4",
            finished: false
        },
    ]
    return initialTodoState;
}