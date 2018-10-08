# やるきさがし

## これは何？

* やる気を起こすべく、「環境」「想い」「理想」「現実」を入力して、自分自身を振り返るための簡易メモアプリ
* Nuxt.js + Firebase(Authentication, Cloud Firestore)を利用

![やるきさがし](http://www.rinsymbol.sakura.ne.jp/github_images/yaruki-finder/yaruki-finder.png)

### 実装状況（後ほどissueへ）

* [x] ログイン
* [x] ユーザ登録
* [ ] プロフィール
    * [ ] 参照
    * [ ] 登録
    * [ ] 更新
    * [ ] 退会
* [ ] ダッシュボード
    * [x] 現状整理データ一覧参照
    * [ ] 現状整理データ削除
* [ ] 現状整理詳細
    * [x] 参照
    * [x] 登録
    * [x] 更新
    * [x] 削除
    * [ ] クリア
* [ ] 現状整理検索
    * [ ] キーワード検索
* [ ] 現状整理のSNS連携
    * [ ] 画像データとして保存
    * [ ] 画像データをツイート
  

## 開始方法

### Firebaseプロジェクトを作成(詳細は省略)

* Authentication
    * ログイン方法: メール/パスワード
 
* Cloud Firestore
    * 作成するコレクション
        * envs
        * users
    * 作成するインデックス
        * コレクショングループ:envs
        * インデックス登録されているフィールド: user ASC created_dt DESC

### 開発環境構築

自分で作ったdocker定義([docker-for-nuxt](https://github.com/rinne-grid/docker-for-nuxtjs))を利用  
dockerイメージを作成する際に、[direnv](https://github.com/direnv/direnv)をインストールしている。

* ホストで実行

```sh
$ docker-compose up -d
$ docker-compose exec dev bash
$ cd ./frontend-nuxt
```

* direnvをfrontend-nuxt配下で実行し、.envrcを作成

```sh
$ direnv edit
```

* .envrcにFirebaseアプリケーション情報を追記

```sh
export APIKEY=YOUR_API_KEY
export AUTHDOMAIN=YOUR_AUTH_DOMAIN
export DATABASEURL=YOUR_DATABASE_URL
export PROJECTID=YOUR_PROJECTID
export STORAGEBUCKET=YOUR_STORAGE_BUCKET
export MESSAGINGSENDERID=YOUR_MESSAGING_SENDER_ID
```

* direnv allowを実行し、frontend-nuxt配下でのみ環境変数が読み込まれるように設定

```sh
$ direnv allow
# >>> 以下のメッセージが表示されればOK
# direnv: loading .envrc
# direnv: export +APIKEY +AUTHDOMAIN +DATABASEURL +MESSAGINGSENDERID +PROJECTID +STORAGEBUCKET

# 次回からはfrontend-nuxtに移動する際に毎回環境変数をセットしてくれる。
```

* モジュールインストールと開発モードで実行

```sh
$ yarn
$ yarn run dev
```

