const name_text = "NAME"
const desc_text = "DESCRIPTION"
const price_text = 10.11

const body =JSON.stringify({
    name_text: name_text,
    desc_text: desc_text,
    price_text: price_text})

// console.log(body)


// fetch("http://localhost:5000/additem", {
//   method: "post",
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },

//   //make sure to serialize your JSON body
//   body: JSON.stringify({
//     name_text: name_text,
//     desc_text: desc_text,
//     price_text: price_text
//   })
// })
// .then( (response) => { 
//    //do something awesome that makes the world a better place
// });

/////////////////////

async function F(){

    const response = await fetch('http://localhost:5000/additem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name_text: name_text,
            desc_text: desc_text,
            price_text: price_text
        })
    }
    );
    console.log(response)
    return response
}
    
const x = F()

console.log(x)
    
console.log('DONE')

//////////////



// async function F(){

//     const response = await fetch('http://localhost:5000/items', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         mode: "cors", 
//     });
//     console.log(response)
//     return response
// }
    
// const x = F()

// console.log(x)
    
// console.log('DONE')














// import fetch from "node-fetch";








// export async function fetchUser(){
//     const api = 'http://localhost:5000/user/5'
//     var request = await fetch(api,{}
       
// )
//     .then(response => response.json())
//     .then((data) => { return data; } )
//     .catch(error => console.log('Error while fetching:', error));
//     return ({
//         // type:ActionTypes.FETCH_TODOLIST,
//         payload:request
//     })
// }


// const x =  await fetchUser()
// console.log(x.payload.user)


// // const api = 'https://1ptmv3htdd.execute-api.us-east-2.amazonaws.com/TEST/helloworld'

// // const params = new URLSearchParams();
// // params.append('param1', 1);
// // params.append('param2', 1);

// // const body = {
//     query: "SELECT * FROM TestTable"
    
// }
// const response = await fetch(api, {method: 'POST', body: JSON.stringify(body)});
// const data = await response.json();

// console.log(data);

