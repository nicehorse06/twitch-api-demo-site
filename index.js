let targetUrl =
  "https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends&client_id=80stfocyvne9dzzxyvz4j4x9yl75bd";
let re = new XMLHttpRequest();
let data
re.open("GET", targetUrl);
re.onload = () => {
  data = JSON.parse(re.responseText);
  render_page();
};
re.send();

let render_page = () => {
  document.querySelector('#block-1 .display_name').innerText = data.streams[0].channel.display_name;
  document.querySelector('#block-1 .streamer-name').innerText = data.streams[0].channel.name
  document.querySelector('#block-1 .channel-info-photo').src = data.streams[0].channel.logo
  document.querySelector('#block-1 .channel-image').style.backgroundImage = `url('${data.streams[0].preview.medium}')`
}

