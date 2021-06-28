
    let Month=5;
    let NBUlistUSDrate=[];
       
for (let dayOfMonth=1; dayOfMonth<=31; dayOfMonth++){
    
         
    const URL = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=2021${ Month > 9 ? Month : '0'+Month }${dayOfMonth > 9 ? dayOfMonth : '0'+dayOfMonth}&json`;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', URL);
               

        xhr.onload = function(){

            console.log('день месяца',dayOfMonth);
            let data = JSON.parse(xhr.responseText);
      
      
        
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

            if (NBUlistUSDrate.length==31){

                NBUlistUSDrate.sort(function(a,b){
                    if (a.day>b.day){
                        return 1;
                    }
        
                    if (a.day<b.day){
                        return -1;
                    }       
                    
                        return 0;     
                            
                });

                        
                    
                for(let i=0; i<NBUlistUSDrate.length; i++){
        
                           
                        console.log(` ${NBUlistUSDrate[i].day.split('-').reverse().join('.')} - ${NBUlistUSDrate[i].rate.toFixed(4)} грн.`);
            
                        tr=resBigTable.insertRow();
                        td = tr.insertCell();
                        td.innerText=`${NBUlistUSDrate[i].day.split('-').reverse().join('.')}`;
            
                        td = tr.insertCell();
                        td.innerText=` - `;
            
                        td = tr.insertCell();
                        td.innerText=`${NBUlistUSDrate[i].rate.toFixed(4)} грн.`;
                  
                }

            }
    
        
        }

        

        xhr.send();
}  

    console.log('Массив с датами и курсами', NBUlistUSDrate, NBUlistUSDrate.length);


    

        



  