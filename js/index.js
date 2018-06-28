let currentPage = 0;
let isLoading = false;
const client_id = '80stfocyvne9dzzxyvz4j4x9yl75bd'

window.onload = () => {

  let sendHttpRequest = () => {
    let targetUrl = `https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends&client_id=${client_id}`;
    let request = new XMLHttpRequest();
    request.open("GET", targetUrl);
    request.onload = () => {
      data = JSON.parse(request.responseText);
      render_page(data);
    };
    request.send();
  }

  sendHttpRequest();
  
  let render_page = (data) => {
    let total_stream_num = 9;
    for (let i = 0; i < total_stream_num; i++) {
      document.querySelector(`#block-${i + 1} .channel_name`).innerText = data.streams[i].channel.display_name;
      document.querySelector(`#block-${i + 1} .owner_name`).innerText = data.streams[i].channel.name;
      document.querySelector(`#block-${i + 1} .avatar img`).src = data.streams[i].channel.logo;
      document.querySelector(`#block-${i + 1} .preview img`).src = data.streams[i].preview.medium
    }
  };

  // infinite scroll 為偵測 scrollTop + window height === document height 時觸發載入
  //計算document 總高度
  const body = document.body;
  const html = document.documentElement;
  const height = Math.max(
    body.offsetHeight,
    body.scrollHeight,
    html.clientHeight,
    html.offsetHeight,
    html.scrollHeight
  );

  // 滑動時執行該函式
  window.onscroll = () => {
    let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    if (scrollTop + window.innerHeight >= height - 100) {
      // 做載入的動作
      console.log('succese')
    }
  }

  // 準備用來增加HTML的載入動作
  let getColumn = (data) => {
    const placeholder = 'https://static-cdn.jtvnw.net/ttv-static/404_preview-320x180.jpg'
    return `
  <div class='col' id='block-1'>
    <div class='preview'>
      <img src='${data.streams[i].channel.display_name}' />
    </div>
    <div class='bottom'>
      <div class="avatar">
        <img class='avatar_img' src='${data.streams[i].channel.logo}' />
      </div>
      <div class='intro'>
        <div class='channel_name'>${data.streams[i].channel.display_name}</div>
        <div class='owner_name'>${data.streams[i].channel.name}</div>
      </div>
    </div>
  </div>  
  `
  }

}