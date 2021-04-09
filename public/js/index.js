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
$('#deleteUserBtn').click(function() {
    var id =$(this).attr("data-id")
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

//searching user
$('#search-button').click(function() {
    var query = $('#search-input').val()
    $('#search-input').val('')
    if(query){
        $('#allUsersBtn').css('visibility','visible')
        window.location.href = 'http://localhost:3000/search?searchQuery='+query
        
    }
    else
    $('#errorSearch').text('Enter user name')
})