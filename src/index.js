/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import 'primer-css/build/build.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Clippy from 'react-icons/lib/go/clippy';
import GitHub from 'react-icons/lib/go/mark-github';
import DiffRenamed from 'react-icons/lib/go/diff-renamed';
import Clipboard from 'clipboard';
import InApp from './inapp';
import qrcode from './qrcode.png';
import './index.css';

class App extends Component {

  state = {
    inapp: null,
    value: '',
    uri: '',
  }

  componentWillMount() {
    const useragent = navigator.userAgent || navigator.vendor || window.opera;
    const inapp = new InApp(useragent);
    const value = [`${useragent}`];
    if (navigator) for (let key in navigator) value.push(`${key}=${navigator[key]}`); // eslint-disable-line

    // https://apps.apple.com/app/id1161108457
    let location = "https://ziplet.app.link/"//"itms-appss://apps.apple.com/app/id1161108457";

    const isAndroid = useragent.indexOf("android") > -1;
    if (isAndroid) {
      location = "intent://open?link_click_id=1069825942863582451";
    }

    this.setState({ inapp, value: value.join('\n'), uri: location });
  }

  componentDidMount() {
    new Clipboard('.copy'); // eslint-disable-line
  }

  onUriChange = e => this.setState({ uri: e.target.value });

  onOpenClick = async () => {
    const { uri } = this.state;
    window.open(uri, '_system', 'location=no');
  }

  render() {
    const { inapp, value, uri } = this.state;

    return (
      <div>
        <div className="container">
          <div>
            <textarea id="useragent" defaultValue={value} style={{ width: '100%' }} rows="10" />
          </div>
          <div>
            <span className="input-group-button">
              <button className="btn copy" data-clipboard-target="#useragent">
                <Clippy />&nbsp;Copy UserAgent
              </button>
              <a className="btn" target="inapp" href={`https://github.com/f2etw/detect-inapp/issues/new?title=%5BUserAgent%5D&body=${encodeURIComponent(value)}`}>
                <GitHub />&nbsp;Share
              </a>
            </span>
          </div>
        </div>
        <hr />
        <div className="container">
          <div className="p-3 border position-relative">
            {inapp.browser}
            <div className="border position-absolute right-0 top-0 p-1">inapp.browser</div>
          </div>
          <div className="p-3 border position-relative">
            {inapp.isMobile ? 'true' : 'false'}
            <div className="border position-absolute right-0 top-0 p-1">inapp.isMobile()</div>
          </div>
          <div className="p-3 border position-relative">
            {inapp.isDesktop ? 'true' : 'false'}
            <div className="border position-absolute right-0 top-0 p-1">inapp.isDesktop()</div>
          </div>
          <div className="p-3 border position-relative">
            {inapp.isInApp ? 'true' : 'false'}
            <div className="border position-absolute right-0 top-0 p-1">inapp.isInApp()</div>
          </div>
          <div className="p-3 border position-relative">
            <div className="input-group">
              <input className="form-control" type="text" defaultValue={uri} onChange={this.onUriChange} />
              <span className="input-group-button">
                <button className="btn" onClick={this.onOpenClick} id="btn-send">
                  <DiffRenamed />
                </button>
              </span>
            </div>
            <div className="border position-absolute right-0 top-0 p-1">inapp.open()</div>
          </div>
        </div>
        <hr />
        <div className="container">
          <div className="qrcode">
            <img src={qrcode} alt="qrcode" />
          </div>
          <div>
            <a className="github-button" href="https://github.com/f2etw/detect-inapp/issues" data-size="large" data-show-count="true" data-icon="octicon-issue-opened" aria-label="Issue f2etw/detect-inapp on GitHub">Issue</a>&nbsp;
            <a className="github-button" href="https://github.com/f2etw/detect-inapp/fork" data-size="large" data-show-count="true" data-icon="octicon-repo-forked" aria-label="Fork f2etw/detect-inapp on GitHub">Fork</a>&nbsp;
            <a className="github-button" href="https://github.com/f2etw/detect-inapp" data-size="large" data-show-count="true" data-icon="octicon-star" aria-label="Star f2etw/detect-inapp on GitHub">Star</a>



            <a href="itms-appss://apps.apple.com/app/id1161108457">Test</a>
            <a href="https://play.google.com/store/apps/details?id=com.loop.loopfeedback">Test 2</a>
            <a href="https://play.app.goo.gl/?link=https://play.google.com/store/apps/details?id=com.loop.loopfeedback">Test 3</a>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
