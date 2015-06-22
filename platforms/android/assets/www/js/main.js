/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var patData;
var xhr;

function Login()
{
    //check login
    
    //connect to openMRS
    
    //open page
    location.href='contentPage.html';
}

function getPatInfo()
{
    var patUUID = 'ef42a5ee-1e0c-4870-adc1-3260af43becb';
    //set get
    var daturl = 'http://gw151.iu.xsede.org:8080/openmrs/ws/rest/v1/patient/'+patUUID;
    //get data from openmrs
    
    //getJSON(daturl).then(function(data) 
    //{
    //    alert('Your Json result is:  ' + data.result); //you can comment this, i used it to debug

    //    result.innerText = data.result; //display the result in an HTML element
    //}, function(status) { //error detection....
    //    alert('Something went wrong.');
    //});
    
    
    getRequest(daturl);
    //parse data
    //document.getElementById("myDiv").innerHTML = xhr.responseText;
    //alert('Patient Data: ' + patData);
}

function patientInfo(patUUID)
{
    // Initialize the Ajax request (We ignore IE5, IE6 here)
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'http://gw151.iu.xsede.org:8080/openmrs/ws/rest/v1/patient/'+patUUID);
    xhr.setRequestHeader("Authorization", "Basic bWhlYWx0aDpNaGVhbHRoQDEyMw==");
    // Track the state changes of the request
    xhr.onreadystatechange = function () 
            {
                // Ready state 4 means the request is done
                if (xhr.readyState === 4) 
                {
                    // 200 is a successful
                    if (xhr.status === 200) 
                    {
                        document.getElementById("myDiv").innerHTML = xhr.responseText 
                        // loading data into myDiv
                    } else 
                    {
                        alert('Error: ' + xhr.status);
                        // An error occurred during the request
                    }
                }
            }
}

var getJSON = function(url) {
    return new Promise(function(resolve, reject) 
        {
            var xhr = new XMLHttpRequest();
            xhr.open('get', url, true);
            xhr.responseType = 'json';
            xhr.onload = function() 
                {
                    var status = xhr.status;
                    if (status == 200) 
                    {
                        resolve(xhr.response);
                    } else {
                        reject(status);
                    }
                };
            xhr.send();
        });
    };






function getRequest(daturl)
{
    //alert('start getrequest' + getFunction);
    // Initialize the Ajax request (We ignore IE5, IE6 here)
    xhr = new XMLHttpRequest();
    xhr.open('get', daturl);
    //xhr.responseType = 'json';
    xhr.setRequestHeader("Authorization", "Basic bWhlYWx0aDpNaGVhbHRoQDEyMw==");
    // Track the state changes of the request
    xhr.onreadystatechange = function () 
        {
            // Ready state 4 means the request is done
                if (xhr.readyState === 4) 
                {
                    // 200 is a successful
                    if (xhr.status === 200) 
                    {
                        
                        //alert('Godd data');
                        document.getElementById("myDiv").innerHTML = xhr.responseText;
                        //var myObj = eval ( xhr.responseText );
                        //var parsedData = JSON.parse(myObj);

                        //myFunction(myObj);
                        //arr.display;
                        //document.getElementById("disp").innerHTML = parsedData.display;
                        
                        
                        //patData = JSON.parse(xhr.responseText);
                        //resolve(xhr.response);

                        //var jsonResponse = JSON.parse(xhr.responseText);
                        
                        
                        //var strJSON = xhr.responseText;
                        //var objJSON = eval("(function(){return " + strJSON + ";})()");
                        //alert(objJSON.result);
                        //alert(objJSON.person);
                        //var myArr = JSON.parse(xhr.responseText);
                        //myFunction(myArr);
                    } else 
                    {
                        alert('Error: ' + xhr.status);
                        // An error occurred during the request
                    }
                }
        };
    // Send the request to '/ws/rest/v1/patient'
    xhr.send();
}

function myFunction(arr) 
{
    alert('start parse');
    var out = "";
    out = arr.display;
    document.getElementById("disp").innerHTML = out;
    }

function connOpenMRS()
{
    // Initialize the Ajax request (We ignore IE5, IE6 here)
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'http://gw151.iu.xsede.org:8080/openmrs/ws/rest/v1/patient?q=John');
            xhr.setRequestHeader("Authorization", "Basic bWhlYWx0aDpNaGVhbHRoQDEyMw==");
            // Track the state changes of the request
            xhr.onreadystatechange = function () 
            {
                // Ready state 4 means the request is done
                if (xhr.readyState === 4) 
                {
                    // 200 is a successful
                    if (xhr.status === 200) 
                    {
                        document.getElementById("myDiv").innerHTML = xhr.responseText 
                        // loading data into myDiv
                    } else 
                    {
                        alert('Error: ' + xhr.status);
                        // An error occurred during the request
                    }
                }
            }
            // Send the request to '/ws/rest/v1/patient'
            xhr.send();
}