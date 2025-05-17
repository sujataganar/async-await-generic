let cl = console.log ;


const postform = document.getElementById("postform")
const Titlecontrol = document.getElementById("Title")
const Contentcontrol = document.getElementById("Content")
const UserIdcontrol = document.getElementById("UserId")
const postcontainer = document.getElementById("postcontainer")




const baseUrl = `https://crud-b17-js-12673-default-rtdb.firebaseio.com`;
const PostUrl = `${baseUrl}/posts.json`


let postarr = []
//step 3
const createcards = (arr) => {
    let result = '';
    arr.forEach(post => {
        result += `<div class="col-md-6 mt-4" id="${post.id}" >
                    <div class="card">
                        <div class="card-header">
                            <h3>${post.title}</h3>
                        </div>
                        <div class="card-body">
                            <p>${post.content}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                            <button class="btn-sm btn-outline-info">Edit</button>
                            <button class="btn-sm btn-outline-danger">Remove</button>
                        </div>
                    </div>
                </div> `
        
    });
    postcontainer.innerHTML = result;
}
//step 1

const makeapicall = async (url,methodname,msgbody) => {
    try{
        msgbody = msgbody ? JSON.stringify(msgbody):null

        let res = await fetch(url, {
            method : methodname,
            body : msgbody,
            headers : {
                'Content-type' : 'application/json',
                Auth : 'Token (From LS)'
            }
        })
        return res.json()
    }catch(err) {
        snackbar(err, 'error')
    }
}
//step 6
const objtoarr = (obj) => {
    let arr = []
    for (const key in obj) {
        arr.push({...obj[key],id:key})
            
        }
        return arr
    }

//step 5
const fetchallpost = async () => {
    let data =await makeapicall(PostUrl,"GET")

    let postarr = objtoarr(data)

    createcards(postarr)
}

//step 2
const onaddpost = async (eve) => {
    eve.preventDefault()

    let newpostobj = {
        title : Titlecontrol.value,
        content : Contentcontrol.value,
        userid : UserIdcontrol.value
    }
    
    let res = await makeapicall(PostUrl, 'POST' , newpostobj)
    postform.reset()

    let card = document.createElement('div');
    card.className = 'card';
    card.id = res.name;
    card.innerHTML = `  <div class="card-header">
                            <h3>${newpostobj.title}</h3>
                        </div>
                        <div class="card-body">
                            <p>${newpostobj.content}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                            <button class="btn-sm btn-outline-info">Edit</button>
                            <button class="btn-sm btn-outline-danger">Remove</button>
                        </div>`

                        postcontainer.append(card)
}









postform.addEventListener("submit" , onaddpost)