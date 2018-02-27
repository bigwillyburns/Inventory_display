// ==UserScript==
// @name        Show Stock Numbers
// @include https://www.ae.com/*/s-prod/*
// @downloadURL https://github.com/bigwillyburns/Inventory_display/raw/master/Show%20Stock%20Numbers.user.js
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @version     1.7
// ==/UserScript==
var totalInventoryNum = function(){
		var sizeOptions = document.getElementsByClassName('size-option available');
		var totalStock = 0;
		for (var i = 0; i < sizeOptions.length; i++) {
			var curNum = sizeOptions[i].getAttribute('data-stock');
			curNum = Number(curNum);
			totalStock = totalStock + curNum;
		}
    return totalStock;
    };
var totalINVLable = function(){
			totalStock = totalInventoryNum();
			var labeldiv = document.getElementsByClassName('dropdown-text');
                if(totalStock === 0){
                  labeldiv[0].innerHTML ='Size - Boss Only';
                }
                else{
                  labeldiv[0].innerHTML ='Size - Total Inv- '+totalStock;
                }
};
var showMeStockNumbers = function (){
	setTimeout(function(){
		var sizeOptions = document.getElementsByClassName('size-option');
		totalStock = totalInventoryNum();
		for (var i = 0; i < sizeOptions.length; i++) {
			var stock = sizeOptions[i].getAttribute('data-stock');
			var SKU = sizeOptions[i].getAttribute('data-sku');
		    var aChild = sizeOptions[i].childNodes;
		    var Size = aChild[1].getAttribute('data-size');
			var outOfStock = sizeOptions[i].getAttribute('data-outofstock');
		    if (outOfStock == "false" && stock == 0) {
		    aChild[1].innerHTML =""+Size+" - BOSS Only";
            aChild[1].setAttribute("title",SKU);
		    }
            else if(outOfStock == "true" && stock == 0){
            aChild[1].setAttribute("title",SKU);
            }
		    else{
		    aChild[1].innerHTML =""+Size+" - Inv: "+stock;
		    aChild[1].setAttribute("title",SKU);
		}
		}
	},40);
setTimeout(totalINVLable,4000);};
showMeStockNumbers();
var swatch = document.getElementsByClassName('psp-swatch-img');
for (var i = 0; i < swatch.length; i++) {
	swatch[i].addEventListener('click', showMeStockNumbers, false);
}