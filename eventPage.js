    /**
 * Created by akamal8 on 09/08/2014.
 */


//Global Variables
var todolist;

window.onload= function () {
    todolist = document.getElementById("todolist");
    var currentInput = document.getElementsByClassName("noteinput")[0];
    var currentcb = document.getElementsByClassName("notecb")[0];
    var currentremovebtn = document.getElementsByClassName("noteremove")[0];
    var coloroptions = document.getElementsByClassName("coloroption");
    currentInput.onkeydown = function (e) {
        if(currentInput.value != "") {
            OnEnterPressed(e);
            }
        }

    currentInput.onmouseout = function (currentInput) {
        //get the child index
        var index =0;
        var myparent = currentInput.parentNode;
        while((myparent = myparent.previousSibling) != null){
            index++;
        }
        //alert(index);
        OnMouseOut(index);
    }

    currentcb.onclick = function (e) {
        OnChecked(e.target);
    }


    currentremovebtn.onclick= function (e) {
        DestroyElement(e);
    }
    for(var i =0; i<coloroptions.length; i++)
    {
        var coption = coloroptions.item(i);

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


//    function ApplySelectionEffect(element){
//        var myparent = element.parentNode;
//        for(var i=0; i<myparent.children.length; i++){
//
//        }
//    }


    function DestroyElement (e) {
        var firsttodo= document.getElementById("todolist").firstElementChild;
        var element = e.target;
        var myparent = element.parentNode;
        if(myparent == firsttodo) return;
        while(myparent.hasChildNodes()){
            myparent.removeChild(myparent.lastChild);
        }
    }
    function OnChecked (currentcb){

        var myparent = currentcb.parentNode;
        if(currentcb.checked == true){

            myparent.children[1].style.textDecoration = "line-through";
        }

        if(currentcb.checked != true){

            myparent.children[1].style.textDecoration = "none";
        }

    }


function OnEnterPressed(e){
    if(e.keyCode == 13) {
        addNewClearItem();

        var firstelementinput = todolist.children[0].children[1];
        firstelementinput.focus();
        firstelementinput.onkeydown = function (e) {
            if(firstelementinput.value != "")
            OnEnterPressed(e);
        }
    }
}

function OnMouseOut(itemId){
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
        OnChecked(e.target);
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
        DestroyElement(e);
    }

    newitem.appendChild(cbinputelement);
    newitem.appendChild(textinputelement);
    newitem.appendChild(removebuttonelement);

    //insert the element in the html before other elements
    todolist.insertBefore(newitem , todolist.children[0]);
}
