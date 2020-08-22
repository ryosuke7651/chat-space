$(function(){

  function buildHTML(message){
    if ( message.image ) {
      let html =
      `<div class="MessageBox" data-message-id=${message.id}>
        <div class="main__contents__chat">
          <div class="main__contents__chat__message">
            <div class="main__contents__chat__message__name">
              ${message.user_name}
            </div>
            <div class="main__contents__chat__message__date">
              ${message.created_at}
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`  
      return html;
    } else {
      let html =
      `<div class="MessageBox" data-message-id=${message.id}>
        <div class="main__contents__chat">
          <div class="main__contents__chat__message">
            <div class="main__contents__chat__message__name">
              ${message.user_name}
            </div>
            <div class="main__contents__chat__message__date">
              ${message.created_at}
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }

  $('.Form').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false 
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main__contents').append(html);      
      $('form')[0].reset();
      $('.main__contents').animate({ scrollTop: $('.main__contents')[0].scrollHeight});
      $('.submit-btn').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.submit-btn').prop("disabled", false);
    });
  });
});