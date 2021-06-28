
    
    let Month=5;
    let NBUlistUSDrate=[];
    let acc=0;

    //let CurrDate=new Date(2021,Month, dayOfMonth);

    


for (let dayOfMonth=1; dayOfMonth<=31; dayOfMonth++){
    
    
    
   

    const URL = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=2021${ Month > 9 ? Month : '0'+Month }${dayOfMonth > 9 ? dayOfMonth : '0'+dayOfMonth}&json`;

    let xhr = new XMLHttpRequest();

    xhr.open('GET', URL);

    
            
    

        xhr.onload = function(){

            

            let data = JSON.parse(xhr.responseText);

        

            //let currentDate= new Date(2021,Month-1, dayOfMonth);
            //currentDate = currentDate.toLocaleDateString().split('.').reverse().join('-');

            //console.log(currentDate);
            //console.log(data);
        
        
            for (let i=0; i<data.length; i++ ) {

                if (data[i].cc == 'USD'){

                    NBUlistUSDrate.push(
                        {
                            day: data[i].exchangedate.split('.').reverse().join('-'),
                            rate: data[i].rate,
                        }
                    );

                   

                   break;

                    
                    
                    
                } 

               
               
        


            }

            NBUlistUSDrate.sort(function(a,b){
                if (a.day>b.day){
                    return 1;
                }
    
                if (a.day<b.day){
                    return -1;
                }
    
                
                    return 0;
                
    
                
            });
            
            acc = dayOfMonth;
            for(let i=acc-1; i<NBUlistUSDrate.length; i++){

                //console.log(` ${NBUlistUSDrate[i].day.split('-').reverse().join('.')} - ${NBUlistUSDrate[i].rate} грн`);
            
              
                
                    console.log(` ${NBUlistUSDrate[i].day.split('-').reverse().join('.')} - ${NBUlistUSDrate[i].rate.toFixed(4)} грн.`);
            
                    tr=resBigTable.insertRow();
                    td = tr.insertCell();
                    td.innerText=`${NBUlistUSDrate[i].day.split('-').reverse().join('.')}`;
            
                    td = tr.insertCell();
                    td.innerText=` - `;
            
                    td = tr.insertCell();
                    td.innerText=`${NBUlistUSDrate[i].rate.toFixed(4)} грн.`;

                    //console.log(i);
                    //console.log(dayOfMonth);
                


                
            
            
            }
            
            //console.log(NBUlistUSDrate);
            
    
            

        
       
        
        }

        

        xhr.send();
}  

    console.log(NBUlistUSDrate);


    

        



  