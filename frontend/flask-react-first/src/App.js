import logo from './logo.svg';
import './App.css';
import axios from "axios"
import { useState } from "react"
import fileDownload from 'js-file-download'




function App() {
  const [youtubeURL, setYoutubeURL] = useState(null)
 const [srcVideo, setSrcVideo] = useState(null)

  const downloadAction = () => {
    axios.post("/download", {youtubeURL})
    .then((res) => {console.log(res.data)
    //   let blob = new Blob([res.data], {type: "video/mp4"})
    //  let  url = URL.createObjectURL(blob)
    //  console.log(url,"hola")
    //   setSrcVideo(url)
      fileDownload(res.data, "file.mp4")
    })
    .catch((err) => console.log(err))
  }

  return (
    <div>
      <div className="centerBox">
        <p>Youtube downloader</p>
        <p>Please type youtube url</p>
        <input type="text" onChange={(e) => setYoutubeURL(e.target.value)}></input>
          <p onClick={() => downloadAction()}>Download</p>
      </div>
      {/* <video width="320" height="240" src={srcVideo} /> */}
    </div>
  );
}

export default App;
