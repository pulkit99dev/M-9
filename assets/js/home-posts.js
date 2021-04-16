{
  // method to submit form data using AJAX
  let createPost = function () {
    let newPostForm = $("#new-post-form");

    newPostForm.submit(function (e) {
      e.preventDefault();

      // Manually Submitting the post creating request in AJAX
      $.ajax({
        type: "post",
        url: "/post/create",
        data: newPostForm.serialize(),
        success: function (data) {
          let newPost = newPostDom(data.data.post);
          $('#post-list-container>ul').prepend(newPost)
        },
        error: function (error) {
          console.log(error.resposeText);
        },
      });
    });
  };
  createPost();
}

// Method to create Post using DOM

let newPostDom = function (post) {
  return $(`
    <li id="post-${post._id}">
    <p>${post.content}</p>
    <small>${post.user.name}</small>

        <a class="delete-post-button" href="/post/destroy/${post.id}">XXXXX</a>

  <div class="post-comment">
    <form action="/comment/create" method="POST">
      <input
        type="text"
        name="content"
        placeholder="Type Here to add comment..."
        required
      />
      <input type="hidden" name="post" value="${post._id}" />
      <input type="submit" value="Add Comment" />
    </form>

    <div class="post-comment-list">
      <ul id="post-comment-${post._id}">
      
      </ul>
    </div>
  </div>
</li>

    `);
};
