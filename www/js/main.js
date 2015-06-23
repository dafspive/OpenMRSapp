/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var ajaxResult;

function checkForm()
{
    console.log('Check Form');
    //set login status
    localStorage['loginStatus'] = false;
    //check to see if pin stored
    console.log(localStorage['pin']);
    if (localStorage["pin"] == undefined) 
    {
        document.getElementById("loginForm").style.display = 'block';
        document.getElementById("pwError").style.display = 'none';
        document.getElementById("pinForm").style.display = 'none';
        document.getElementById("pinError").style.display = 'none';
    } else 
    {
        document.getElementById("loginForm").style.display = 'none';
        document.getElementById("pwError").style.display = 'none';
        document.getElementById("pinForm").style.display = 'block';
        document.getElementById("pinError").style.display = 'none';
    }
}


//login functions
function doPwLogin()
{
    //store data
    username = document.getElementById("usernameField").value;
    password = document.getElementById("passwordField").value;
    localStorage['authKey'] = 'Basic ' + window.btoa(username + ':' + password);
    console.log("Password entered");
    //check auth
    localStorage['loginStatus'] = "pw";
    doAjax("http://gw151.iu.xsede.org:8080/openmrs/ws/rest/v1/session", "login");
}

function doPinLogin()
{
    console.log("Pin Entered");
    //check if pin is saved
    if (localStorage["pin"] == undefined) 
    {
        //save pin
        localStorage['pin'] = document.getElementById('pinField').value;
        localStorage['loginStatus'] = "pin";
        doAjax("http://gw151.iu.xsede.org:8080/openmrs/ws/rest/v1/session", "login");
    } else
    {
        //check pin
        if (localStorage['pin'] == document.getElementById('pinField').value) 
        {
            console.log("Pin good");
            localStorage['loginStatus'] = "pin";
            doAjax("http://gw151.iu.xsede.org:8080/openmrs/ws/rest/v1/session", "login");
        }
        else 
        {
            console.log("Pin bad");
            document.getElementById("pinError").style.display = 'block';
        }
    }
    
    
}

//Ajax functions
function doAjax(url, status) {
    console.log('Url: ' + url);
    var xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) 
            {
                ajaxResult = JSON.parse(xhr.responseText);
                console.log(xhr.responseText);
                console.log('Status is ' + status);
                if (status == "login")
                {
                    ajaxAuthResponse();
                }
                else if (status == "userData")
                {
                    console.log('Ajax data call');
                    ajaxPatData();
                }
            } else {
                alert('Error: ' + xhr.status);
            }
        }
    };
    xhr.setRequestHeader("Authorization", localStorage['authKey']);
    xhr.send();
}

function ajaxAuthResponse()
{
    console.log("check response");
    console.log("User authenticated? " +localStorage['authenticated']);
    //check to see if authenicated
    if (localStorage["authenticated"] == 'false' || localStorage["authenticated"]== undefined )
    {
        authenticatedFalse();
    } 
    else
    {
        authenticatedTrue();
    }
}

function authenticatedFalse()
{
    console.log("check user response");
        //check to see if resonse is for authentication
        //if(ajaxResult.hasOwnProperty('user')) 
        if (ajaxResult.authenticated == true)
        {
            //store authenticated
            console.log(ajaxResult.user.display);
            if (ajaxResult.authenticated == true) 
            {
                console.log("user authenticated");
                localStorage['authenticated'] = true;
                if (localStorage['loginStatus'] == "pw")
                {
                    //turn on pin
                    document.getElementById("loginForm").style.display = 'none';
                    document.getElementById("pinForm").style.display = 'block';
                }
                
            } else
            {
                console.log("Bad user name");
            }
        }
        else
        {
            console.log("Bad user name");
            document.getElementById("pwError").style.display = 'block';
        }
}

function authenticatedTrue()
{
    console.log("User logged in");
    if (localStorage['loginStatus'] == "pw")
    {
        //turn on pin
        document.getElementById("loginForm").style.display = 'none';
        document.getElementById("pinForm").style.display = 'block';
    }
    else if (localStorage['loginStatus'] == "pin")
    {
        //goto context page
        console.log("goto context page");
        location.href='contentPage.html';
    }
    
}

//patient data
function getPatData()
{
    //store patient id
    localStorage['patUUID'] = 'ef42a5ee-1e0c-4870-adc1-3260af43becb';
    var patRequest = 'http://gw151.iu.xsede.org:8080/openmrs/ws/rest/v1/patient/' + localStorage['patUUID'];
    console.log('patUUID: ' + patRequest);
    
    doAjax(patRequest, "userData");
}

function ajaxPatData()
{
    console.log("results:" + ajaxResult.person.display);
    //document.getElementById("User Name").value = ajaxResult.person.display;
    document.getElementById("patNameField").value = ajaxResult.person.display;
    document.getElementById("genderField").value = ajaxResult.person.gender;
    var jsonBDate = ajaxResult.person.birthdate;
    var newBirthDate = jsonBDate.substring(0, 10);
    document.getElementById("birthdateField").value = newBirthDate;
    //set age
    var calAge = SetAge(newBirthDate);
    console.log('Age is ' + calAge);
    document.getElementById("calAgeField").value = calAge;
    
}

function SetAge(newBirthDate)
{
    var d1 = new Date(); //"now"
    var d2 = new Date(newBirthDate)  // some date
    var diff = parseInt(Math.abs(d1-d2)/31536000000);  // difference in milliseconds
    console.log('Age is ' + diff);
    
    return diff;
}


function locButtonClick()
{
    navigator.geolocation.getCurrentPosition(onLocSuccess, onLocError);
}

function onLocSuccess(position) 
{
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
        'Longitude: ' + position.coords.longitude + '<br />' +
        'Altitude: ' + position.coords.altitude + '<br />' +
        'Accuracy: ' + position.coords.accuracy + '<br />';
}
function onLocError(error) 
{
    alert('code: ' + error.code + '\n' +
    'message: ' + error.message + '\n');
}
function takePic()
{
    navigator.camera.getPicture(onPicSuccess, onPicFail, { quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    });
}


function onPicSuccess(imageData) 
{
    // Uncomment to view the base64-encoded image data
    console.log(imageData);
    var smimage = document.getElementById('smallImage');
    
    // Unhide image elements
    smimage.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    
    smimage.src = "data:image/jpeg;base64," + imageData;
}

function onPicFail(message) 
{
    alert('Failed because: ' + message);
}