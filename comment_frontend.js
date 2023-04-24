<script>
  const commentForm = document.getElementById('comment-form');
  const commentInput = document.getElementById('comment-input');
  const commentList = document.getElementById('comment-list');

  function addComment(comment) {
    const li = document.createElement('li');
    li.innerText = comment;
    commentList.appendChild(li);
  }

  commentForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const comment = commentInput.value.trim();
    if (comment) {
      commentInput.disabled = true;
      const response = await fetch('/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment })
      });
      commentInput.disabled = false;
      if (response.ok) {
        addComment(comment);
        commentInput.value = '';
      }
    }
  });

  const socket = new WebSocket(`ws://${window.location.host}/comments`);
  socket.addEventListener('message', (event) => {
    const comment = event.data;
    addComment(comment);
  });
</script>
