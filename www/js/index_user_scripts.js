/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    
     /* button  Clear local storage */
    $(document).on("click", ".uib_w_7", function(evt)
    {
        clearStorage();
         return false;
        
    });
    
        /* button  Set local storage */
    $(document).on("click", ".uib_w_6", function(evt)
    {
        setStorage();
         return false;
    });
     
         /* button  Create Database */
    $(document).on("click", ".uib_w_10", function(evt)
    {
        createDB();
         return false;
    });
    
        /* button  Fire Database Query */
    $(document).on("click", ".uib_w_9", function(evt)
    {
        queryDB()
         return false;
    });
    
    
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
