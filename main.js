const postLists=document.querySelector('.post-lists')
const addpostform=document.querySelector('.add-post-form')
const titleval=document.getElementById('title-val')
const descval=document.getElementById('desc-val')
let output=''
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const renderposts=(posts)=>
{
    posts.forEach(post=> {
        // console.log(post);
        output+=`
        <div class="card mt-2 col-md-6" >
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${post.body}</h6>
              <p class="card-text">Some quick example text to build on the card title</p>
              <a href="#" class="card-link" id='edit-post'>Edit</a>
              <a href="#" class="card-link" id='delete-post'>Delete</a>
            </div>
          </div>
        `
        postLists.innerHTML=output;
    })
}

const URL="https://jsonplaceholder.typicode.com/posts";

postLists.addEventListener('click',(e)=>
{
// console.log(e.target.id);
let delpostpressed=e.target.id=='edit-post'
let editpostpressed=e.target.id=='delete-post'
if(delpostpressed)
{
console.log("Remove post");
}
if(editpostpressed)
{
  console.log("Edit post");

}
})

//method GET
fetch(URL)
.then(res=>res.json())
.then(data=>renderposts(data));

// Method POST//
addpostform.addEventListener('submit',(e)=>{
    e.preventDefault()
    // console.log(titleval.value);
    // console.log(titleval.value);
fetch(URL,{
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
        body: descval.value,
        title: titleval.value
      })
    })
    .then(response => response.json())
    .then(result => 
      {
        console.log(result);
        const resArr=[];
        resArr.push(result)
        renderposts(resArr);
      })
    .catch(error => console.log('error', error));
})