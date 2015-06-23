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
    doAjax("http://gw151.iu.xsede.org:8080/openmrs/ws/rest/v1/session");
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
        doAjax("http://gw151.iu.xsede.org:8080/openmrs/ws/rest/v1/session");
    } else
    {
        //check pin
        if (localStorage['pin'] == document.getElementById('pinField').value) 
        {
            console.log("Pin good");
            localStorage['loginStatus'] = "pin";
            doAjax("http://gw151.iu.xsede.org:8080/openmrs/ws/rest/v1/session");
        }
        else 
        {
            console.log("Pin bad");
            document.getElementById("pinError").style.display = 'block';
        }
    }
    
    
}

//Ajax functions
function doAjax(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) 
            {
                ajaxResult = JSON.parse(xhr.responseText);
                console.log(xhr.responseText);
                //check response;
                ajaxResponse();
            } else {
                alert('Error: ' + xhr.status);
            }
        }
    };
    xhr.setRequestHeader("Authorization", localStorage['authKey']);
    xhr.send();
}

function ajaxResponse()
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
        else
        {
            //goto context page
            console.log("goto context page");
            location.href='contentPage.html';
        }
}