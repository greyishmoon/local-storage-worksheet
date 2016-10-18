/*
 * Please see the included README.md file for license terms and conditions.
 */


// This file is a suggested starting place for your code.
// It is completely optional and not required.
// Note the reference that includes it in the index.html file.


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */



// This file contains your event handlers, the center of your application.
// NOTE: see app.initEvents() in init-app.js for event handler initialization code.



function setStorage() {
//    alert("Storage SET");
    
    // SIMPLE KEY_VALUE PAIRS
    window.localStorage.setItem( "Pen", "Red" );
    window.localStorage.setItem( "Phone", "Moto 5" );
    window.localStorage.setItem( "Laptop", "PC Specialist" );
    
    // COMPLEX OBJECT SERIALISATION
    var chocoBars = JSON.stringify(getChocoBars());
    window.localStorage.setItem("Bars", chocoBars);
    
    
    setText();
}

function clearStorage() {
//    alert("Storage CLEARED");
    
    window.localStorage.clear();
    
    var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('DROP TABLE LOGS');
    });

    setText();
}

function setText() {

    $("#val1").text("Key: Pen - Value: " + checkValue(window.localStorage.getItem("Pen")));
    $("#val2").text("Key: Phone - Value: " + checkValue(window.localStorage.getItem("Phone")));
    $("#val3").text("Key: Laptop - Value: " + checkValue(window.localStorage.getItem("Laptop")));
    
    $("#length").text("# of key-value pairs: " + window.localStorage.length);
    
    
    // Create JSON object and print:
    var chocBar = getChocoBars();
    
    var output = '';
        $.each(chocBar, function (index, value) {
            output += '<li>Bar:' + value.name + '</li>' + '<ul><li>Energy: ' + value.nutrition.energy + '</li> <li> Protein: ' + value.nutrition.protein + '</li></ul>';
                
        });
        $('#chocobars').html(output);
    
    // Retrieve JSON object from local storage, deserialise and print:
    var localChocBar = window.localStorage.getItem("Bars");
    var deserialisedBars = JSON.parse(localChocBar);
    
    if (deserialisedBars) {
        var localOutput = '';
        $.each(deserialisedBars, function (index, value) {
            localOutput += '<li>Bar: ' + checkValue(value.name) + '</li>' + '<ul><li>Energy: ' + value.nutrition.energy + '</li> <li> Protein: ' + value.nutrition.protein + '</li></ul>';
                
        });
        $('#localchocobars').html(localOutput);
    } else {
        $('#localchocobars').html("<li>NO DATA</li>");
    } 
    
    
    
}

function checkValue(value){
    if (value) {
        return value;
    } else {
        return "NO DATA";
    } 
}

function getChocoBars(){
    
    var chocBar  = [{
        "name": "Bounty",
        "manufacturer": "Mars",
        "nutrition": {
            "energy": "2036kJ",
            "fat": "25.7g",
            "protein": "3.7g",
            "carbohydrates": "58.9g",
            }
        }, {
        "name": "Double Decker",
        "manufacturer": "Cadbury",
        "nutrition": {
            "energy": "1925kJ",
            "fat": "17g",
            "protein": "4.1g",
            "carbohydrates": "71g",
            }
        }];
    
    return chocBar;
}

function createDB() {
    var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
    
    var msg;

    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
        tx.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "foobar")');
        tx.executeSql('INSERT INTO LOGS (id, log) VALUES (2, "logmsg")');
        tx.executeSql('INSERT INTO LOGS (id, log) VALUES (3, "baz")');
        tx.executeSql('INSERT INTO LOGS (id, log) VALUES (4, "qux")');
        msg = '<p>LOG table created and 4 rows inserted.</p>';
        document.querySelector('#dbstatus').innerHTML =  msg; 
    }); 
}
 
function queryDB() {
    
    var opendb = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
    var qrymsg;
    
    opendb.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) {
            var len = results.rows.length, i;
            
                qrymsg = "<p>Found rows: " + len + "</p>";
                document.querySelector('#dbresponse').innerHTML =  qrymsg;

                for (i = 0; i < len; i++){
                    qrymsg = "<p><b>" + results.rows.item(i).id + "   " 
                        + results.rows.item(i).log + "</b></p>";
                    document.querySelector('#dbresponse').innerHTML +=  qrymsg;
                }
        }, null);   
    });
    
}



// ...additional event handlers here...


