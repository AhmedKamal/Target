var todolist;

window.onload = function () {
    todolist = document.getElementById("todolist");

    loadQuotes();
    addNewClearItem()
    showQuote()
    var currentInput = document.getElementsByClassName("noteinput")[0];
    var currentRemoveBtn = document.getElementsByClassName("noteremove")[0];
    var colorOptions = document.getElementsByClassName("coloroption");

    currentInput.onkeydown = function (e) {
        if(currentInput.value != "") {
            onEnterPressed(e);
            }
        }
    currentRemoveBtn.onclick= function (e) {
        destroyElement(e);
    }


    for(var i =0; i<colorOptions.length; i++)
    {
        var coption = colorOptions.item(i);

        coption.onclick = function(e){
        var sender = e.target;
        //TODO Add an effect on selected color
        //ApplySelectionEffect(sender);
        var todocbs = document.getElementsByClassName("notecb");
        var targetcolor = window.getComputedStyle(sender , null).backgroundColor;
         for(var j=0; j<todocbs.length; j++){
             if(todocbs.item(j).checked){
                 var myparent = todocbs.item(j).parentNode;
                 myparent.style.backgroundColor = targetcolor;
                 myparent.children[1].style.backgroundColor = targetcolor;
                 myparent.children[2].style.backgroundColor = targetcolor;

                }
            }
        }
    }
}

function showQuote() {
   var index = Math.floor((Math.random()*33) +1)
   targetQuote = q[index];

   var quoteViewer = document.getElementById("quote");
   var quoteWriter = document.getElementById("quote-writer");

   quoteViewer.innerText = targetQuote.quote;
   quoteWriter.innerText = "— " + targetQuote.source;
}

//currentInput.onmouseout = function (currentInput) {
//    //get the child index
//    var index =0;
//    var myparent = currentInput.parentNode;
//    while((myparent = myparent.previousSibling) != null){
//        index++;
//    }
//    onMouseOut(index);
//}
//    function ApplySelectionEffect(element){
//        var myparent = element.parentNode;
//        for(var i=0; i<myparent.children.length; i++){
//
//        }
//    }

function destroyElement (e) {
    var targetItem = e.target.parentNode;

    if(isParentFirstElement(targetItem))
        return;

    targetItem.remove()
}

function isParentFirstElement(myparent) {
    var firsttodo = todolist.firstElementChild;

    if(myparent == firsttodo)
        return true
    else
        return false
}

function onChecked (currentcb){

    var myparent = currentcb.parentNode;
    if(currentcb.checked == true){
        myparent.children[1].style.textDecoration = "line-through";
    }

    if(currentcb.checked != true){
        myparent.children[1].style.textDecoration = "none";
    }

}

function onEnterPressed(e){
    if(e.keyCode == 13) {

        if(isItemsLessThanLimit()) {
            addNewClearItem();

            var firstelementinput = todolist.children[0].children[1];
            firstelementinput.focus();
            firstelementinput.onkeydown = function (e) {
                if (firstelementinput.value != "")
                    onEnterPressed(e);
            }
        }
    }
}

maxItemsNumber = 5;
function isItemsLessThanLimit() {
    var cnt = todolist.children.length;
    if(cnt < maxItemsNumber)
        return true;
    else
        return false;
}

function onMouseOut(itemId){
    StorageArea.set({'id' : itemId });

}

function addNewClearItem() {

    //create the container div
    var newitem = document.createElement("div");
    var cbinputelement = document.createElement("input");

    //create the cb of the element
    cbinputelement.type="checkbox";
    cbinputelement.className = "notecb";
    cbinputelement.onclick = function (e) {
        onChecked(e.target);
    }
    //create the input of the element
    var textinputelement = document.createElement("input");
    textinputelement.type = "text";
    textinputelement.className = "noteinput";
    textinputelement.autofocus = "";

    var removebuttonelement = document.createElement("input");
    removebuttonelement.type="button";
    removebuttonelement.value = "✖";
    removebuttonelement.className="noteremove";
    removebuttonelement.onclick = function (e) {
        destroyElement(e);
    }

    newitem.border = "solid"
    newitem.appendChild(cbinputelement);
    newitem.appendChild(textinputelement);
    newitem.appendChild(removebuttonelement);

    //insert the element in the html before other elements
    todolist.insertBefore(newitem , todolist.children[0]);
}
