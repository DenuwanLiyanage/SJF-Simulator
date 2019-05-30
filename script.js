var arrHead = new Array();
arrHead = [ '','Process Name', 'Arrival Time', 'CPU Burst'];      


function createTable() {
    var empTable = document.createElement('table');
    empTable.setAttribute('id', 'empTable');           

    var tr = empTable.insertRow(-1);

    for (var h = 0; h < arrHead.length; h++) {
        var th = document.createElement('th');          
        th.innerHTML = arrHead[h];
        tr.appendChild(th);
    }

    var div = document.getElementById('cont');
    div.appendChild(empTable);    
}


var no=0;
function addRow() {
    
    
    var empTab = document.getElementById('empTable');

    var rowCnt = empTab.rows.length;        
    var tr = empTab.insertRow(rowCnt);      
    tr = empTab.insertRow(rowCnt);


    for (var c = 0; c < arrHead.length; c++) {
        var td = document.createElement('td');          
        td = tr.insertCell(c);

        if (c == 0) {           
            var button = document.createElement('input');

            
            button.setAttribute('type', 'button');
            button.setAttribute('value', 'Remove');

            
            button.setAttribute('onclick', 'removeRow(this)');

            td.appendChild(button);
        }
        
        else if(c == 1){
            var pName=document.createElement('input');
            pName.setAttribute('type', 'text');
            pName.setAttribute('value','P'+no);
            no=no+1;
            td.appendChild(pName);
        }
        else if(c == 2){
            var pName=document.createElement('input');
            pName.setAttribute('type', 'text');
            pName.setAttribute('value','0');
            td.appendChild(pName);
        }
        else {
            
            var ele = document.createElement('input');
            ele.setAttribute('type', 'text');
            ele.setAttribute('value', '');
            
            td.appendChild(ele);
        }
        
    }
    
}


function removeRow(oButton) {
    var empTab = document.getElementById('empTable');
    empTab.deleteRow(oButton.parentNode.parentNode.rowIndex);     
}

function sumbit() {
    var myTab = document.getElementById('empTable');
    var values = new Array();
    var newno=0;
    var newVal= new Array ();

    
    for (row = 1; row < myTab.rows.length - 1; row++) {
        
        for (c = 1; c < myTab.rows[row].cells.length; c++) {   

            var element = myTab.rows.item(row).cells[c];
            if (element.childNodes[0].getAttribute('type') == 'text') {
                values.push( element.childNodes[0].value );
            }
        }
       
    }
    
    
   for (var elem = 0; elem<=values.length; elem=elem+2){
        newVal[newno]={processname:values[elem],arrival:values[elem+1],burst:values[elem+2]};
        
        newno=newno+1;
        elem=elem+1;
    }
    newVal.pop(); 
    

    var finalArray = newVal.slice(0);
    finalArray.sort(function(a,b) {
        return a.burst - b.burst;
    });
    

draw(finalArray);   
return myTab;
}

function draw(finalArray){
    var total=0;
    var sum=0;
    var canvas = document.getElementById('canvas');
    
    for(var i=0; i<finalArray.length; i++){
        var context = canvas.getContext('2d');
        setTimeout(function(){},);
        if (canvas.getContext) {
            context.strokeRect(51*(i+1),45,50,50);
            context.font="italic bold 15px Comic Sans MS";
            context.fillStyle = "red";
            context.fillText(finalArray[i].processname+" "+finalArray[i].burst,52*(i+1),70);   
        }
    } 
    for(var j =0; j<finalArray.length-1; j=j+1){
        sum=sum+Number(finalArray[j].burst);
        for(var k =0; k<=j; k=k+1){
            total=total+Number(finalArray[k].burst);
        }
    }  
    sum=sum+Number(finalArray[finalArray.length-1].burst);
    context.fillText("Average Waiting Time " +(total/finalArray.length)+" S",50,150);
    context.fillText("Average Turnaround Time " +((total+sum)/finalArray.length)+" S",50,170);
    return context;
}

function reset(){
    var myTab=sumbit();
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.clearRect (0, 0, 795,250);
    for(var i = 1; i<myTab.rows.length+1; i=i+1){
        myTab.deleteRow(i);

    } 
    no=0;

    
    
    
}
