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
          $(" #posts-list-container>ul").prepend(newPost);
          deletePost($(" .delete-post-button", newPost));

          new PostComments(data.data.post._id);

          new ToggleLike($(" .toggle-like-button", newPost));

          new Noty({
            theme: "relax",
            text: "Post published!",
            type: "success",
            layout: "topRight",
            timeout: 500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  // Method to create Post using DOM

  let newPostDom = function (post) {
    return $(`
    <li id="post-${post._id}">
   

        <a class="delete-post-button" href="/post/destroy/${post._id}">XXXXX</a>
        <p>${post.content}</p>
        <br>
        <small>${post.user.name}</small>
        <small>
                            
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                    0 Likes
                                </a>
                            
                        </small>


  <div class="post-comments">
    <form id="post-${post._id}-comments-form" action="/comment/create" method="POST">
      <input
        type="text"
        name="content"
        placeholder="Type Here to add comment..."
        required
      />
      <input type="hidden" name="post" value="${post._id}" />
      <input type="submit" value="Add Comment" />
    </form>

    <div class="post-comments-list">
      <ul id="post-comments-${post._id}">
      
      </ul>
    </div>
  </div>
</li>`);
  };

  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#post-${data.data.post_id}`).remove();

          new Noty({
            theme: "relax",
            text: "Post Deleted",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  let convertPostsToAjax = function () {
    $("#posts-list-container>ul>li").each(function () {
      let self = $(this);
      let deleteButton = $(" .delete-post-button", self);
      deletePost(deleteButton);

      // get the post's id by splitting the id attribute
      let postId = self.prop("id").split("-")[1];
      new PostComments(postId);
    });
  };

  createPost();
  convertPostsToAjax();
}