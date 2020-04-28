const drag = (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
}

const allowDrop = (ev) => {
    ev.preventDefault();
    if (hasClass(ev.target,"dropzone")) {
        addClass(ev.target,"droppable");
    }
}

const clearDrop = (ev) => {
    removeClass(ev.target,"droppable");
}

const drop = (event) => {
    event.preventDefault();
    //SaveHERE
    const data = event.dataTransfer.getData("text/plain");
    const element = document.querySelector(`#${data}`);
    try {
        // remove the spacer content from dropzone
        event.target.removeChild(event.target.firstChild);
        // add the draggable content
        event.target.appendChild(element);
        // remove the dropzone parent
        unwrap(event.target);
    } catch (error) {
    console.warn("can't move the item to the same place")
}
updateDropzones();
refreshData();
}
const deleteItem = (id) => {
    refreshData("delete",id);
}
const addItem = (id) => {
    refreshData("add",[$("#id-name").val(),$("#desc-text").val()]);
    $("#addModal #id-name").val("");
    $("#addModal #desc-text").val("");
    $("#addModal #closebtn").click()

}

const updateDropzones = () => {
    /* after dropping, refresh the drop target areas
    so there is a dropzone after each item
    using jQuery here for simplicity */
    
    var dz = $('<div class="dropzone rounded" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="clearDrop(event)"> &nbsp; </div>');
    
    // delete old dropzones
    $('.dropzone').remove();

    // insert new dropdzone after each item   
    dz.insertAfter('.card.draggable');
    
    // insert new dropzone in any empty swimlanes
    $(".items:not(:has(.card.draggable))").append(dz);
};

// helpers
function hasClass(target, className) {
    return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
}

function addClass(ele,cls) {
if (!hasClass(ele,cls)) ele.className += " "+cls;
}

function removeClass(ele,cls) {
if (hasClass(ele,cls)) {
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    ele.className=ele.className.replace(reg,' ');
}
}

function unwrap(node) {
    node.replaceWith(...node.childNodes);
}



//----------------------------------------------------------------------------------------------------------------------
// get
let urlParams = new URLSearchParams(window.location.search);
let scrum = urlParams.get('scrum') ? urlParams.get('scrum') : "test"
let idArray = [] 
firebase.database().ref(scrum).on('value', function(snapshot) {
    let data = snapshot.val();
    $(".headertitle").html("Scrumify-"+scrum);
    if (typeof data != "undefined" && data != null){
        idArray = data.idcollection;
        $(".items").html(`<div class="dropzone rounded" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="clearDrop(event)"> &nbsp; </div>`)
        if(typeof data.todo != "undefined" ){
            // $(".todo .items .card").remove()
            $(data.todo).each(function(e,v){
                $(".todo .items").append(markUp(v.id,v.description))
            })
        }
        if(typeof data.inprogress != "undefined" ){
            // $(".inprogress .items .card").remove()
            $(data.inprogress).each(function(e,v){
                $(".inprogress .items").append(markUp(v.id,v.description))
            })
        }
        if(typeof data.testing != "undefined" ){
            // $(".testing .items .card").remove()
            $(data.testing).each(function(e,v){
                $(".testing .items").append(markUp(v.id,v.description))
            })
        }
        if(typeof data.done != "undefined" ){
            // $(".done .items .card").remove()
            $(data.done).each(function(e,v){
                $(".done .items").append(markUp(v.id,v.description))
            })
        }
    }else{
        $(".items").html(`<div class="dropzone rounded" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="clearDrop(event)"> &nbsp; </div>`)
    }
    
});
//set
function refreshData(action,id){
    let todo = [];
    let inprogress = [];
    let testing = [];
    let done = [];
    let idcollection = [];
    if (action == "add"){
        if(!idArray.includes(id[0])){
            let ret = {"id":id[0],"description":$.trim(id[1])}
            todo.push(ret)
            idcollection.push(id[0])

        }else{
            alert("Cannot have duplicate titles.");
        }
    }
    $(".todo .items .card").each(function(e,k){
        let ret = {"id":$(k).find(".id").text(),"description":$.trim($(k).find(".description").text())}
        if (action == "delete"){
            if($(k).find(".id").text()!=id){
                todo.push(ret)
                idcollection.push($(k).find(".id").text())
            }
        }else{
            todo.push(ret)
            idcollection.push($(k).find(".id").text())
        }
        
    });
   
    $(".inprogress .items .card").each(function(e,k){
        let ret = {"id":$(k).find(".id").text(),"description":$.trim($(k).find(".description").text())}
        if (action == "delete"){
            if($(k).find(".id").text()!=id){
                inprogress.push(ret)
                idcollection.push($(k).find(".id").text())
            }
        }else{
            inprogress.push(ret)
            idcollection.push($(k).find(".id").text())
        }
    })
    $(".testing .items .card").each(function(e,k){
        let ret = {"id":$(k).find(".id").text(),"description":$.trim($(k).find(".description").text())}
        if (action == "delete"){
            if($(k).find(".id").text()!=id){
                testing.push(ret)
                idcollection.push($(k).find(".id").text())
            }
        }else{
            testing.push(ret)
            idcollection.push($(k).find(".id").text())
        }
    })
    $(".done .items .card").each(function(e,k){
        let ret = {"id":$(k).find(".id").text(),"description":$.trim($(k).find(".description").text())}
        if (action == "delete"){
            if($(k).find(".id").text()!=id){
                done.push(ret)
                idcollection.push($(k).find(".id").text())
            }
        }else{
            done.push(ret)
            idcollection.push($(k).find(".id").text())
        }
    })
    firebase.database().ref(scrum).set({
        idcollection: idcollection,
        todo: todo,
        inprogress: inprogress,
        testing: testing,
        done: done,
    });
}
$('#editModal').on('show.bs.modal', function (event) {
    debugger;
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('id') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
  })

function markUp(id,desc) {
    return `<div class="card draggable shadow-sm" id="${id}" draggable="true" ondragstart="drag(event)">
    <div class="card-body p-2">
        <div class="card-title">
            <div class="lead font-weight-light lightBlue id">${id}</div>
        </div>
        <div class="description">
            ${desc}
        </div>
        <hr>
        <button class="btn btn-danger btn-sm btn-block deletebtn" onclick="deleteItem('${id}')">Delete</button>
    </div>
</div>
<div class="dropzone rounded" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="clearDrop(event)"> &nbsp; </div>`
}
{/* <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#editModal" data-id="${id}" data-desc="${desc}" data-action="edit">Edit</button> */}