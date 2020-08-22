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

  let reloadMessages = function() {
     let last_message_id = $('.MessageBox:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main__contents').append(insertHTML);
        $('.main__contents').animate({ scrollTop: $('.main__contents')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});