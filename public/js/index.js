//adding user alert message
$('#add_user').submit(function(event){
    alert('Data Inserted Successfully')
})


//updating user after from submission
$('#update_user').submit(function(event){

    event.preventDefault()
    //after submitting form all the submitted data will be inside this array
    var unindexedArray = $(this).serializeArray()
    //console.log(unindexedArray)
    let data = {'id':'','name':'','email':'','age':'','password':'','gender':''}
    let keys = Object.keys(data)
    unindexedArray.map((item,i) => {
        data[keys[i]] = item['value']
    })
    //console.log(data.id)
    // $('#update_user').reset()
    var request = {
        "url":`http://localhost:3000/updateUser/${data.id}`,
        "method":"PATCH",
        "data":data
    }
    $.ajax(request).done(function(res) {
        
        alert('User updated successfully!')
        window.location.href = 'http://localhost:3000/'
    })
})

//deleting user
$('table > tbody > tr > td > a.delete').click(function() {
    var id =$('table > tbody > tr > td > a.delete').attr("data-id")
    var request = {
        "url":`http://localhost:3000/deleteUser/${id}`,
        "method":"DELETE",
    }
    if(confirm("Are you sure you want to delete this User?")){
        $.ajax(request).done(function(res) {
            alert('User deleted successfully!')
            location.reload()
        })
    }

})

//searching and filtering user
$('#search-button').click(function() {
    var query = $('#search-input').val()
    var filter = $( "#user-filters option:selected" ).val();
    var queryAndFilter = query+','+filter
    //console.log('q&f  '+queryAndFilter)
    if(query && filter){
        window.location.href = `http://localhost:3000/search&Filter?searchQuery=${queryAndFilter}`
    }
    else if(query){
        window.location.href = 'http://localhost:3000/search?searchQuery='+query
        
    }
    else if(filter){
        window.location.href = 'http://localhost:3000/filter?searchQuery='+filter
    }
    else{
        $('#errorSearch').text('Enter user name')
    }
    

})

