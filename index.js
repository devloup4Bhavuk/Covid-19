// statewise:
// https://api.covid19india.org/data.json# 
// diswise:
// https://api.covid19india.org/state_district_wise.json

let obj1 = {},
    obj2 = {};

let state_list = document.getElementById('state_wise'),
    dist_list  = document.getElementById('dist_wise');

let select_elem = '',
    state_name  = '';


var xhr = new XMLHttpRequest();
xhr.open('GET','https://api.covid19india.org/data.json#');
xhr.send();
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        stateList(myObj.statewise)
        obj1 = myObj;
    }
};
function stateList(states) {
    for(var i=0;i<states.length;i++) {
        var option = document.createElement('option');
        option.className ="dropdown-item";
        option.value = i;
        option.textContent = states[i].state;
        state_list.appendChild(option);
        
    }
    // console.log(states);
}


state_list.addEventListener('change',function (event) {
    
    var index = event.target.value;
    console.log(obj1.statewise[index].confirmed)
    document.getElementById('state_confirmed').innerHTML = "Confirmed: "+obj1.statewise[index].confirmed + "<br><hr>Active: "+obj1.statewise[index].active + "<br><hr>Deaths: "+obj1.statewise[index].deaths;
    document.getElementById('dist_confirmed').innerHTML = "0";
    document.getElementById('dist_confirmed').innerHTML = "district Data"
    dist_wise(obj1.statewise[index].state);
})


function dist_wise(state_name) {
    var xhr2 = new XMLHttpRequest();
    xhr2.open('GET','https://api.covid19india.org/state_district_wise.json');
    xhr2.send();
    var my_dist = '';
    xhr2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj2 = JSON.parse(this.responseText);
            obj2 = myObj2;
        }
        Object.keys(obj2).forEach((key,index) => {
            if(key === state_name){
            // console.log(obj2[key].districtData);
            my_dist = obj2[key].districtData;
            dist_data(obj2[key].districtData);
        }
    });
}

    function dist_data(dist) {
        select_elem ='<option value="">Select District</option>';
        Object.entries(dist).forEach(entry =>{
            select_elem = select_elem + '<option class="dist" value="' + entry[0] + '">' + entry[0] + '</option>'
            dist_list.innerHTML = select_elem;
        });
    }
    dist_list.addEventListener('change',function (event){
        console.log(event.target.value);
        Object.entries(my_dist).forEach(entry =>{
            if(entry[0]=== event.target.value){
                console.log(entry[1].confirmed);
                document.getElementById('dist_confirmed').innerHTML = "Confirmed: "+entry[1].confirmed + "<br><hr>Active:"+ +entry[1].active;
            }
        });
    })
};
