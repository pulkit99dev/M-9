{
    // method to submit form data using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form')

        newPostForm.submit(function(e){
            e.preventDefault();

            // Manually Submitting the post creating request in AJAX
            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                }, error: function(error){
                    console.log(error.resposeText)
                }
            })

        })
    }
    createPost();
}

// Method to create Post using DOM