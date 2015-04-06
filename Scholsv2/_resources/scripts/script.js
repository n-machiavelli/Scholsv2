if(window.responsiveNav) {
   var navigation = responsiveNav(".resp-nav", {
	   customToggle: "#nav-toggle-header",
	   animate: Modernizr.csstransitions,
	   jsClass: "js-nav"
   });
   /*for devices using Safari; overrides gray highlight*/
   document.addEventListener("touchstart", function(){}, true);
}

$('#searchform').searchBox();

$('#print_page').click(function() {
    window.print();
    return false;
});
