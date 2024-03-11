// import fetch from "node-fetch";








export async function fetchUser(){
    const api = 'http://localhost:5000/user/5'
    var request = await fetch(api,{}
       
)
    .then(response => response.json())
    .then((data) => { return data; } )
    .catch(error => console.log('Error while fetching:', error));
    return ({
        // type:ActionTypes.FETCH_TODOLIST,
        payload:request
    })
}


const x =  await fetchUser()
console.log(x.payload.user)


// const api = 'https://1ptmv3htdd.execute-api.us-east-2.amazonaws.com/TEST/helloworld'

// const params = new URLSearchParams();
// params.append('param1', 1);
// params.append('param2', 1);

// const body = {
//     query: "SELECT * FROM TestTable"
    
// }
// const response = await fetch(api, {method: 'POST', body: JSON.stringify(body)});
// const data = await response.json();

// console.log(data);

