{let t=function(){let t=$("#new-post-form");t.submit((function(o){o.preventDefault(),$.ajax({type:"post",url:"/post/create",data:t.serialize(),success:function(t){let o=e(t.data.post);$(" #posts-list-container>ul").prepend(o),n($(" .delete-post-button",o)),new PostComments(t.data.post._id),new ToggleLike($(" .toggle-like-button",o)),new Noty({theme:"relax",text:"Post published!",type:"success",layout:"topRight",timeout:500}).show()},error:function(t){console.log(t.responseText)}})}))},e=function(t){return $(`\n    <li id="post-${t._id}">\n   \n\n        <a class="delete-post-button" href="/post/destroy/${t._id}">XXXXX</a>\n        <p>${t.content}</p>\n        <br>\n        <small>${t.user.name}</small>\n        <small>\n                            \n                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${t._id}&type=Post">\n                                    0 Likes\n                                </a>\n                            \n                        </small>\n\n\n  <div class="post-comments">\n    <form id="post-${t._id}-comments-form" action="/comment/create" method="POST">\n      <input\n        type="text"\n        name="content"\n        placeholder="Type Here to add comment..."\n        required\n      />\n      <input type="hidden" name="post" value="${t._id}" />\n      <input type="submit" value="Add Comment" />\n    </form>\n\n    <div class="post-comments-list">\n      <ul id="post-comments-${t._id}">\n      \n      </ul>\n    </div>\n  </div>\n</li>`)},n=function(t){$(t).click((function(e){e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(t){$("#post-"+t.data.post_id).remove(),new Noty({theme:"relax",text:"Post Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})}))},o=function(){$("#posts-list-container>ul>li").each((function(){let t=$(this),e=$(" .delete-post-button",t);n(e);let o=t.prop("id").split("-")[1];new PostComments(o)}))};t(),o()}