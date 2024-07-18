
function getElemenFromString(string){
   let div = document.createElement('div') ;
   div.innerHTML = string ;
   return div.firstElementChild ; 
}

let addedParamCount  = 0;

let parametersBox = document.getElementById('parametersBox') ;
let requestJsonBox = document.getElementById('requestJsonBox') ;


let jsonRadio = document.getElementById('jsonRadio') ;
let paramsRadio = document.getElementById('paramsRadio') ;
jsonRadio.addEventListener('click',()=>{
    parametersBox.style.display='none' ;
    requestJsonBox.style.display='block' ;
})

paramsRadio.addEventListener('click',()=>{
    requestJsonBox.style.display='none' ;
    parametersBox.style.display='block' ;
})

let addParam = document.getElementById('addParam') ;
addParam.addEventListener('click' , ()=>{
    let params = document.getElementById('params') 
    let string = `
    <div class="form-row my-2">
        <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
        <div class="col-md-4">
        <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter Key ${addedParamCount + 2}">
        </div>
        <div class=" col-md-4">
        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter value ${addedParamCount + 2}">
        </div>
        <button class="btn btn-primary deleteParam " > - </button>
    </div> `     
    
                addedParamCount ++ ;
                let paramElement = getElemenFromString(string) ;
                params.appendChild(paramElement) ;
                let deleteParam = document.getElementsByClassName('deleteParam') ;
                for( item of deleteParam){
                    item.addEventListener('click' , (e)=>{
                        a = confirm('do u wanna delete') ;
                        if(a){
                            e.target.parentElement.remove() ;
                        }
                    })
                }
})

let submit = document.getElementById('submit') ;
submit.addEventListener('click' , ()=>{
   document.getElementById('responseJsonText').value = 'Please Wait ...' 


   let url = document.getElementById('url').value ;
   let requestType = document.querySelector("input[name='requestType']:checked").value ;
   let contentType = document.querySelector("input[name='contentType']:checked").value ;

   if(contentType == 'params'){
    data = {} ;
    for(let i=0; i<  addedParamCount ;i++){
       if ( document.getElementById('parameterKey' + (i + 1)) != undefined ){
         let key = document.getElementById('parameterKey' + (i+1)  ).value ;
         let value = document.getElementById('parameterValue' + (i+1)).value ;
         data [key] = value ;
       }
       }
       data = JSON.stringify(data) ;
    }else{
        data = document.getElementById('requestJsonText').value ;
    }

   console.log('URL is  : ', url);
   console.log('RequestType is ,', requestType);
   console.log('ContentType is ,',contentType) ;
  

   
   if(requestType == 'GET'){
        fetch(url , {
            method : 'GET'
        }).then((response)=>{
            response.text() 
        }).then((text)=>{
            document.getElementById('responseJsonText').value = text ;
        })
   }else{
        fetch(url , {
            method : 'POST',
            body : data , 
            headers : {
                'Content-type': 'application/json ;charset=UTF-8'
            }
        }).then((response)=>{
            response.text() 
        }).then((text)=>{
            document.getElementById('responseJsonText').value = text ;
        })
   }
   console.log('Data is',data )


})