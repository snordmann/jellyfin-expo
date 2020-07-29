/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
/* eslint-env browser */

const NativeShell = `
function postExpoEvent(event, data) {
  window.ReactNativeWebView.postMessage(JSON.stringify({
    event: event,
    data: data
  }));
}

// List of supported features as reported in Safari
const ExpoSupportedFeatures = [
  // 'filedownload',
  'exitmenu',
  'plugins',
  'externallinks',
  'externalpremium',
  'externallinkdisplay',
  'fullscreenchange',
  'physicalvolumecontrol',
  'remotecontrol',
  'remotevideo',
  'displaylanguage',
  'otherapppromotions',
  'displaymode',
  'subtitleappearancesettings',
  'subtitleburnsettings',
  'fileinput',
];

window.console = Object.assign(window.console, {
  debug: text => postExpoEvent('console.debug', text),
  error: text => postExpoEvent('console.error', text),
  info: text => postExpoEvent('console.info', text),
  log: text => postExpoEvent('console.log', text),
  warn: text => postExpoEvent('console.warn', text)
});

window.NativeShell = {
  AppHost: {
    init: function() {
      postExpoEvent('AppHost.init', window.ExpoAppInfo);
      return Promise.resolve(window.ExpoAppInfo);
    },

    appName: function() {
      postExpoEvent('AppHost.appName', window.ExpoAppInfo.appName);
      return window.ExpoAppInfo.appName;
    },

    appVersion: function() {
      postExpoEvent('AppHost.appVersion', window.ExpoAppInfo.appVersion);
      return window.ExpoAppInfo.appVersion;
    },

    deviceId: function() {
      postExpoEvent('AppHost.deviceId', window.ExpoAppInfo.deviceId);
      return window.ExpoAppInfo.deviceId;
    },

    deviceName: function() {
      postExpoEvent('AppHost.deviceName', window.ExpoAppInfo.deviceName);
      return window.ExpoAppInfo.deviceName;
    },

    exit: function() {
      postExpoEvent('AppHost.exit');
    },

    getDefaultLayout: function() {
      postExpoEvent('AppHost.getDefaultLayout', 'mobile');
      return 'mobile';
    },

    getDeviceProfile: function(profileBuilder) {
      postExpoEvent('AppHost.getDeviceProfile');
      return profileBuilder({
        enableMkvProgressive: false,
        disableHlsVideoAudioCodecs: ['ac3', 'eac3', 'opus']
      });
    },

    getSyncProfile: function(profileBuilder) {
      postExpoEvent('AppHost.getSyncProfile');
      return profileBuilder({
        enableMkvProgressive: false,
        disableHlsVideoAudioCodecs: ['ac3', 'eac3', 'opus']
      });
    },

    supports: function(command) {
      const isSupported = command && ExpoSupportedFeatures.indexOf(command.toLowerCase()) != -1;
      postExpoEvent('AppHost.supports', {
        command: command,
        isSupported: isSupported
      });
      return isSupported;
    }
  },

  downloadFile: function(url) {
    postExpoEvent('downloadFile', { url: url });
  },

  enableFullscreen: function() {
    postExpoEvent('enableFullscreen');
  },

  disableFullscreen: function() {
    postExpoEvent('disableFullscreen');
  },

  getPlugins: function() {
    postExpoEvent('getPlugins');
    return [];
  },

  openUrl: function(url, target) {
    postExpoEvent('openUrl', {
      url: url,
      target: target
    });
  },

  updateMediaSession: function(mediaInfo) {
    postExpoEvent('updateMediaSession', { mediaInfo: mediaInfo });
  },

  hideMediaSession: function() {
    postExpoEvent('hideMediaSession');
  }
};
`;

export default NativeShell;
