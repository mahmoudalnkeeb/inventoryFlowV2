// Variable
// 
let totalSales = document.getElementById('totalSales'),
     tableOut  = document.getElementById('sold-out_inner-out'),
     usernameInputField = document.getElementById('usernameInputField'),
     passwordInputField = document.getElementById('passwordInputField'),
     CloseBTN = document.getElementById('CloseBTN'),
     errorMSGInner = document.getElementById('ErrorMSG');
let    mainLinks = document.querySelector('.mainLinks');
let    togglerBTN = document.querySelector('.togglerBTN');
     
     let apiurl = 'https://imsapi.onrender.com/products';
     let totalresult = 0 ;
     let ID;



if (document.querySelector('html').lang === 'ar') {
     document.body.style.fontFamily= " 'Cairo',system-ui ";
     document.getElementById('langBTN').style.marginLeft= 'initial'
     document.getElementById('langBTN').style.marginRight= '28px'
 }else{
     document.body.style.fontFamily= " 'Poppins',system-ui ";
}

togglerBTN.addEventListener('click',(e)=>{
     mainLinks.classList.toggle('active');
})



FETCH_SOLDOUT_DATA()
async function FETCH_SOLDOUT_DATA(api){
     const response = await fetch(apiurl+'/sold',) ;
     const data     = await response.json();
     
     INNER_DATA(data);
}

function INNER_DATA(api){

     tableOut.innerHTML=''

     for(let i=0 ; i < api.length; i++){
          totalresult += ( +(api[i].price) + +(api[i].taxes) + +(api[i].ads) - +(api[i].discount) )
          totalSales.textContent = totalresult;


          // HTML Elements
          let tableRow = document.createElement('tr'),
               tableHead = document.createElement('th'),
               tabledataName = document.createElement('td'),
               tabledataCategory = document.createElement('td'),
               tabledataPrice = document.createElement('td'),
               tabledataTaxes = document.createElement('td'),
               tabledataAds = document.createElement('td'),
               tabledataDiscount = document.createElement('td'),
               tabledataTotal = document.createElement('td'),
               tabledataCount = document.createElement('td'),
               tabledataBtnDel= document.createElement('td'),
               ButtonBtnDel   = document.createElement('button');

  
  
          tableRow.appendChild(tableHead);
          tableRow.appendChild(tabledataName);
          tableRow.appendChild(tabledataCategory);
          tableRow.appendChild(tabledataPrice);
          tableRow.appendChild(tabledataTaxes);
          tableRow.appendChild(tabledataAds);
          tableRow.appendChild(tabledataDiscount);
          tableRow.appendChild(tabledataTotal);
          tableRow.appendChild(tabledataCount);
          tableRow.appendChild(tabledataBtnDel);

          tabledataBtnDel.appendChild(ButtonBtnDel);
          
  
          tableHead.appendChild(document.createTextNode(i+1))
          tabledataName.appendChild(document.createTextNode(api[i].name));
          tabledataCategory.appendChild(document.createTextNode(api[i].category));
          tabledataPrice.appendChild(document.createTextNode(api[i].price));
          tabledataTaxes.appendChild(document.createTextNode(api[i].taxes));
          tabledataAds.appendChild(document.createTextNode(api[i].ads));
          tabledataDiscount.appendChild(document.createTextNode(api[i].discount));
          tabledataTotal.appendChild(document.createTextNode( +(api[i].price) + +(api[i].taxes) + +(api[i].ads) - +(api[i].discount) ));
          tabledataCount.appendChild(document.createTextNode(api[i].count));
          
          ButtonBtnDel.className = 'btn btn-danger'
          ButtonBtnDel.setAttribute('data-id',api[i]._id);
          ButtonBtnDel.setAttribute('data-bs-toggle','modal');
          
          // experimental
          //under Development
          // ButtonBtnDel.setAttribute('data-bs-target','#exampleModal');
          

          if (document.querySelector('html').lang === 'ar') {
               ButtonBtnDel.appendChild(document.createTextNode('مسح'))
               
          }else{
               ButtonBtnDel.appendChild(document.createTextNode('Delete'))
          }

          ButtonBtnDel.addEventListener('click', (e)=>{
               // ID = e.target.dataset.id ;
           })



          tableOut.appendChild(tableRow);

     }

}

// experimental
//under Development


// async function DELETE_PRODUCT(){
//      const response = await fetch(apiurl ,
//            {headers:{'Content-Type': 'application/json',} 
//            , method:'DELETE',body:JSON.
//                stringify({
//                     filter : ID,
//                     user : usernameInputField.value,
//                     pass :passwordInputField.value, 
//                })})

//      let data = await response.json()

//      if (data.user === false) {
          
//           errorMSGInner.textContent = 'The wrong UserName'
//      }else if(data.pass === false ){
          
//           errorMSGInner.textContent = 'The wrong Password'
//      }else if(data.pass === false && data.user === false ){
          
//           errorMSGInner.textContent = 'The wrong UserName and Password'
//      }else if(data.pass === true && data.user === true){
          
//           if (document.querySelector('html').lang === 'ar') {
               
//                errorMSGInner.textContent = 'حسنا تم مسح العنصر'
//           }else{
               
//                errorMSGInner.textContent = 'Okay , Item is Deleted'
//           }

//           setTimeout(() => {
//                CloseBTN.click()
//           },100 );

//      }
//      console.log(data);
// }