// const { default: axios } = require("axios");

function deletEvent() 
{
    let btn = document.getElementById('deleteBtn');
    let id = btn.getAttribute('data-id');
    axios.delete('/events/delete/'+ id )
    .then((res) => {
        console.log(res.data)
        alert('Event Was Deleted ')
        window.location.href = '/events'
    })
    .catch((err)=>{
        console.log(err)
    })
    // console.log(id);
}
//upload avatar 

function readURL(input) {

    if(input.files && input.files[0]) {

        var reader = new FileReader()

        reader.onload = function (e) {

            let image = document.getElementById('imagePlaceholder')
            image.style.display = "block"
            image.src = e.target.result 
        }
        reader.readAsDataURL(input.files[0])
    }
}