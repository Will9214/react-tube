import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios'
import SearchBar from './components/search_bar';
import VideoDetail from './components/video_detail';
import VideoList from './components/video_list';

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch = this.videoSearch.bind(this);
  };

  videoSearch(term) {
    const url = 'https://www.googleapis.com/youtube/v3/search';

    const params = {
      part: 'snippet',
      key: API_KEY,
      q: term,
      type: 'video'
    };

    axios.get(url, { params: params })
    .then(response => {
      console.log(response);
      this.setState({
        videos: response.data.items,
        selectedVideo: response.data.items[0]
      })
    })
    .catch(error => {
      console.error(error);
    });
  };

  
  render() {
    return (
      <div className='container-fluid'>
        <SearchBar onSearchClick={this.videoSearch} />
        <div className='row'>
          <VideoDetail video={this.state.selectedVideo} />
          <VideoList 
            onVideoSelect={selectedVideo => this.setState({selectedVideo})}
            videos={this.state.videos} />
        </div>
      </div>
    );
  };
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


