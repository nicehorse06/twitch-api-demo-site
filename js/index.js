const client_id = '80stfocyvne9dzzxyvz4j4x9yl75bd'
let targetUrl =
  `https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends&client_id=${client_id}`;
let re = new XMLHttpRequest();
re.open("GET", targetUrl);
re.onload = () => {
  let data = JSON.parse(re.responseText);
  render_page(data);
};
re.send();

let render_page = (data) => {
  let total_stream_num = 9;
  for (let i = 0; i < total_stream_num; i++) {
    document.querySelector(`#block-${i + 1} .channel_name`).innerText = data.streams[i].channel.display_name;
    document.querySelector(`#block-${i + 1} .owner_name`).innerText = data.streams[i].channel.name;
    document.querySelector(`#block-${i + 1} .avatar img`).src = data.streams[i].channel.logo;
    document.querySelector(`#block-${i + 1} .preview img`).src = data.streams[i].preview.medium
  }
};
