'use strict';

const Alexa = require('alexa-sdk')
const AWS = require('aws-sdk')
const request = require('request-promise');

const URL = process.env.ENDPOINT

module.exports.skill = (event, context, callback) => {
  const alexa = Alexa.handler(event, context)
  alexa.registerHandlers(handlers)
  alexa.execute()
};

const handlers = {
  'LaunchRequest': function () {
    this.emit('SlackIntent')
  },
  'Unhandled': function () {
    this.emit(':tell', 'すみません。ちょっとわかりません');
  },
  'SlackIntent': function() {
    const self = this
    const accessToken = this.event.session.user.accessToken
    if (typeof accessToken === 'undefined' || accessToken == null) {
      self.emit(':tell', 'おっと、アカウントリンクが無効なようです。アカウントリンクの設定を確認していただけますか？')
      return
    }

    callSlack(accessToken).then(dataJson => {
      return postSlack(dataJson)
    }).then(data => {
      self.emit(':tell', 'Slackに通知しておきました')
    }).catch(error=>{
      console.log(error)
      self.emit(':tell', 'おや、何か失敗したようです')
    });
  }
};

const callSlack = (accessToken) => {
  return new Promise((resolve, reject) => {
      getSettings(accessToken).then(data =>{
        const value = data.value;
        const dataJson = JSON.parse(value);
        const url = dataJson.SLACK_URL
        const msg = dataJson.SLACK_MESSAGE
        if(typeof url === 'undefined' || url == null || url === "" ||
            typeof msg === 'undefined' || msg == null || msg === "") {
          reject("error: SLACK_URL=" + url + " SLACK_MESSAGE=" + msg);
        } else {
          resolve(dataJson);
        }
      }).catch(error=>{
        reject(error);
      });
    })
}

const postSlack = (settings) => {
  return request({
    "method":"POST",
    "uri": settings.SLACK_URL,
    "json": true,
    "headers": {
      "Content-type": "application/json"
    },
    "json": {
      "text": settings.SLACK_MESSAGE
    }
  });
}

const getSettings = (accessToken) => {
  return request({
    "method":"GET",
    "uri": URL + "/api/settings",
    "json": true,
    "headers": {
      "Authorization": accessToken
    }
  });
}
