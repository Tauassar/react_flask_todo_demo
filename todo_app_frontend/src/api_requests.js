
export function loadUserData(){
    return {
        username: "TestUser",
        isAdmin: false,
        email: "TestUser@email.com"
    }
}

export function loadTodoData(){
    const initialTodoState = [
        {
            id: 1,
            username: "testUser",
            email: "testUser@email.com",
            task: "testUser task 1",
            finished: false
        },
        {
            id: 2,
            username: "testUser",
            email: "testUser@email.com",
            task: "testUser task 2",
            finished: false
        },
        {
            id: 3,
            username: "testUser",
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