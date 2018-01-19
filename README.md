# 事前にユーザ固有情報を設定し、AlexaからKickされた時にユーザ固有情報を元に処理を行うサンプル

## 環境構築手順(とりあえず動かしたい人向け)

### 事前準備


- 設定
  - [これ](https://github.com/nemuzuka/serverless-sample)を動作するようにしてください
  - [事前設定](docs/事前設定.md)

### 1. clone or zip展開
ローカルにcloneしたプロジェクトかzipを展開して配置します。以降の作業は、カレントディレクトリを(delicious-stick-takoyaki)とします

### 2. npm install(初回のみでOK)

```
$ npm install
```

### 3. 環境変数を設定
```
$ cp conf/config.sample.json conf/config.dev.json
```

`conf/config.dev.json`を修正します

- `REGION`: リージョンを指定します
- `ENDPOINT`: [これ](https://github.com/nemuzuka/serverless-sample)をAWS上にデプロイした際のURL(Amazon API Gatewayを直接使用するか、Amazon CloudFront を組み合わせて使用するかご注意ください)

### 4. デプロイ
```
$ sls deploy -v
```

lambdaのコンソールを確認し、Alexaと紐づけてください。

Alexaアプリを有効にする時、アカウントリンクのtabが立ち上がるので認証しておきます。
![6 alexa](https://user-images.githubusercontent.com/1412761/35142358-6550a7b6-fd41-11e7-9256-1433ce24f852.png)

![7 alexa-link](https://user-images.githubusercontent.com/1412761/35142360-66df9c0e-fd41-11e7-9b9b-781dd219fdb6.png)

### 5. 使い方

#### 設定

[これ](https://github.com/nemuzuka/serverless-sample) をAWS上にデプロイした際のURLからSlackの設定を行います(初回はSign Upが必要です)。

- `SLACK_URL` : SLACKのwebhook URL を指定します
- `SLACK_MESSAGE` : SLACKに通知するメッセージを設定します

![setting](https://user-images.githubusercontent.com/1412761/35142526-ea35c466-fd41-11e7-88f0-492bfed0d86c.png)

上記情報は、ログインしたユーザに紐づく情報として保存されます。


#### Alexa起動
Alexaに話しかけると、設定したSLACKのチャンネルにメッセージが通知されます。
アカウントリンクの際に指定したユーザに紐付く情報を取得し、通知します。

# License

[MIT](https://opensource.org/licenses/MIT "MIT")

Copyright (c) 2017 Kazumune Katagiri
