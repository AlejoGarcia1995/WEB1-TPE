 // Ocultar menu
 
 document.getElementById("toggleBtn").addEventListener("click", function(e) {
    
    var menuItems = document.getElementById("menuItems");
        
        if (menuItems.style.display === "none") {
        
            menuItems.style.display = "block";
        
        } 
        else {
        
            menuItems.style.display = "none";
        
        }
});
