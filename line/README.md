# LINE リッチメニュー

公式LINEのリッチメニュー（トーク画面下のメニュー）用の素材です。
ボタンの行き先は、公式サイトと同じ場所にそろえています。

- `rich-menu.png` … LINEにアップロードする画像（2500×1686px）
- `rich-menu.html` … 画像の元データ（文字やアイコンを変えるときに編集）

## 設定内容（LINE公式アカウントマネージャー）

テンプレート：**大（6分割）** ／ メニューバーのテキスト：**メニュー** ／ デフォルト表示：**表示する**

| 位置 | ボタン | タイプ | リンク先 |
| --- | --- | --- | --- |
| A 左上 | お知らせ | リンク | https://owadousoukai01-lab.github.io/owa.dousoukai-official/#news |
| B 中上 | 桜和生を支援する | テキスト | 「桜和生を支援する」を送信 → 応答メッセージ「桜和Boost支援の案内」が自動返信 |
| C 右上 | お問い合わせ | リンク | https://docs.google.com/forms/d/e/1FAIpQLSdIPSlpCRuAYOnHgE4lTSLBRpb7VxJOLM5mbraNIneKmbVehQ/viewform |
| D 左下 | ホームページ | リンク | https://owadousoukai01-lab.github.io/owa.dousoukai-official/ |
| E 中下 | 役員に立候補する | リンク | https://docs.google.com/forms/d/e/1FAIpQLScCVlBqDU5cSwVnrnkZWkBW1D2YwZuq8OjIEfnBWPkEzAd5bQ/viewform |
| F 右下 | Instagram | リンク | https://www.instagram.com/owa.dousoukai25/ |

## 自動返信（応答メッセージ）

- タイトル：桜和Boost支援の案内（キーワード応答）
- キーワード：「桜和生を支援する」「活動支援」「桜和Boost」（完全一致）
- 内容：活動支援の申し込みフォーム、クラウドファンディング（#fund）、公式サイト（#projects）への案内
- 応答設定：手動チャット＋応答メッセージ（2026年10月19日に変更）
- 活動支援フォーム：https://docs.google.com/forms/d/e/1FAIpQLSdKHG3GZsqUpRFfBR_CmOClu_Uqi3FAgUO7ZM8aAl5Bh3Mgww/viewform

> リッチメニューは、公式アカウントと**1対1のトーク**でのみ表示されます。クラスのグループLINEの中には表示されません。

## 画像を作り直すとき

1. `rich-menu.html` を編集する
2. サイトのフォルダでローカルサーバーを起動し、Edge で書き出す

```bash
"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless=new --hide-scrollbars --force-device-scale-factor=1 --window-size=2500,1686 --virtual-time-budget=8000 --screenshot="C:\桜和高校Webサイト\line\rich-menu.png" "http://localhost:5173/line/rich-menu.html"
```

3. 1MB以下であることを確認して、マネージャーから画像を差し替える
