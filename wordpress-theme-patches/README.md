# marketik.jp WordPressテーマ 差分パッチ

> 作成日：2026-09-19
> 対象：https://marketik.jp の本番WordPressテーマ `marketik_theme`

このフォルダは **このNext.jsリポジトリのビルド対象ではありません。**
本番のWordPressテーマに手で貼り付けるためのファイル置き場です。

---

## 本番環境の情報

| 項目 | 値 |
|------|-----|
| ホスティング | エックスサーバー（`sv12067.xserver.jp`） |
| WordPress | 7.1.1 |
| テーマ | `marketik_theme`（表示名「WordPress Theme」／制作会社のオリジナル） |
| 有効なプラグイン | Advanced Custom Fields / Custom Post Type UI / WP File Manager |
| 停止中のプラグイン | Akismet / CloudSecure WP Security / Hello Dolly / TypeSquare Webfonts |
| SEOプラグイン | **なし**（Phase 2 で SEO SIMPLE PACK の追加を検討） |
| カスタム投稿タイプ | `works`（制作実績）、メンバー |
| CSS | `assets/css/style.css` 単一ファイル（FLOCSS/BEM 命名） |

---

## 調査で判明した「ブログが無い」理由

制作会社がブログ機能を **作りかけのまま納品** している。

| ファイル / 設定 | 状態 |
|---|---|
| `home.php`（記事一覧） | **中身が空**。`get_header()` と `get_footer()` のみ |
| `single-post.php`（記事個別） | ほぼ完成。ただし日付が `2023.10.01` 固定、サムネイルが `dummy.jpg` 固定 |
| 設定 → 表示設定 → 投稿ページ | **未設定**（`— 選択 —`）。これが「ブログのタブが無い」直接原因 |
| `functions.php` | `is_home()` のとき アーカイブタイトルを「ブログ」にする処理あり＝**ブログ運用は想定されていた** |

補助的な事実：

- `add_theme_support('post-thumbnails')` 済み → アイキャッチ画像は使える
- `add_theme_support('title-tag')` 済み → titleタグは自動生成
- `excerpt_length` = 80文字、`excerpt_more` = `...`
- `archive-works.php` が `wp_pagenavi()` を呼ぶが **WP-PageNavi は未インストール**
  → 本パッチではコア関数 `the_posts_pagination()` を使用
- `parts-bread.php` が `bcn_display()` を呼ぶが **Breadcrumb NavXT は未インストール**
  → パンくずは表示されない（`function_exists` で保護済みなのでエラーにはならない）

### ⚠️ 404が全てトップへ301リダイレクトされる

`functions.php` に以下があり、**存在しないURLは全てトップページへ301で飛ばされる**。

```php
add_action( 'template_redirect', 'is404_redirect' );
function is404_redirect() {
  if ( is_404() ) { wp_safe_redirect( home_url( '/' ), 301 ); exit(); }
}
```

作業上の影響：

1. ブログURLの設定ミスに気づきにくい（404ではなくトップが出る）
2. **301はブラウザに強くキャッシュされる。** 設定前に該当URLを開くと、
   設定後もトップに飛び続ける。検証はシークレットウィンドウで行うこと
3. SEO的にはソフト404扱いで好ましくない（別途改善を提案する）

---

## 収録ファイル

| ファイル | 貼り付け先 | 内容 | 本番反映 |
|---|---|---|---|
| `home.php` | テーマ直下 `home.php` を全置換 | 記事一覧を新規実装 | **済（2026-09-19）** |
| `single-post.php` | テーマ直下 `single-post.php` を全置換 | 日付・サムネイルを動的化、「一覧へ戻る」のフォールバック追加 | **済（2026-09-19）** |
| `parts-header.php` | `parts/parts-header.php` を全置換 | PC版グローバルナビに `Blog` を1行追加 | **済（2026-09-19）** |
| `parts-drawer.php` | `parts/parts-drawer.php` を全置換 | スマホ用ドロワーに `Blog` を1行追加 | **済（2026-09-19）** |
| `footer.php` | テーマ直下 `footer.php` を全置換 | フッターナビに `Blog` を1行追加 | **済（2026-09-19）** |

`Blog` の挿入位置はPC・スマホ・フッターとも `Company` の直前に揃えた。
ナビは3箇所とも別ファイルにHTML直書きで、`wp_nav_menu` は使っていない。
項目の追加・削除は3ファイルすべてを直す必要がある。

なお `Member` と `Works` の順序はPC版とスマホ版で元から入れ替わっており、
フッターには `MVV` が無いなどの不揃いがあるが、指示のない変更はしない方針に
よりそのままにしてある。

| | HEADER(PC) | DRAWER(SP) | FOOTER |
|---|---|---|---|
| 1 | About Us | About | About Us |
| 2 | Service | Service | Service |
| 3 | MVV | MVV | Works |
| 4 | Member | Works | Member |
| 5 | Works | Member | **Blog** |
| 6 | **Blog** | **Blog** | Company |
| 7 | Company | Company | Contact |
| 8 | Contact | Contact | Privacy Policy |

`footer.php` は末尾に `wp_footer()` と `</body></html>` を含む。
ここを落とすとJSが読み込まれずハンバーガーメニュー等が動かなくなるため注意。

### 検証方法

本番に適用する前に、`php -l` での構文チェックに加え、WordPress関数をスタブ化した
ハーネスで実際に実行し、以下を確認している。

- 実行時エラー・警告ゼロ（`E_ALL`）
- 記事0件／ページ送り無し／アイキャッチ無し／カテゴリ無しの各異常系
- タイトルへのXSS混入がエスケープされること
- `archive-works.php` とレンダリング結果のマークアップ骨格が一致すること
  （タグ＋class を順に抽出して diff。ページ送り以外は完全一致）

### 設計方針：CSSは1行も足さない

`assets/css/style.css` はコンパイル済みの単一ファイルで、手編集は危険。
そのため `home.php` は **`archive-works.php` と同じクラス名（`p-worksArchive__*`）を
そのまま流用**している。新しいクラスを作らないので、CSSを触らずに
制作実績一覧と同じ見た目が出る。

本番のブログ運用が固まった段階で、`p-blogArchive__*` への分離を検討する。

### home.php の主な実装判断

- **メインクエリ（`have_posts()`）を使用。** `archive-works.php` のような
  `new WP_Query` は使わない。`home.php` ではメインクエリがそのまま投稿一覧になり、
  「表示設定 → アーカイブページに表示する最新の投稿数（10件）」とページ送りが正しく効く
- 制作実績カードの「クライアント / 制作年」の位置に **投稿日**（`Y.m.d`）を表示
- カテゴリを chip として表示
- アイキャッチ未設定時は `assets/images/dummy-works.png` にフォールバック
- ページ送りは `the_posts_pagination()`。`.p-pagenavi` でラップし、
  テーマ側にCSSがあれば拾われるようにしてある

---

## 適用手順（要約）

1. エックスサーバーの自動バックアップ（過去14日分）があることを確認
2. **貼り付け前に、現在のファイル内容を全選択してテキストに退避**（即時ロールバック用）
3. 外観 → テーマファイルエディター で対象ファイルを開き、全置換して「ファイルを更新」
4. 固定ページ「Blog」を作成 → 設定 → 表示設定 → 投稿ページ に指定
5. シークレットウィンドウで表示確認

---

## 本番適用の記録（2026-09-19）

1. 固定ページ `Blog` を作成し、設定 → 表示設定 → 投稿ページ に指定 → `/blog/` が開通
2. `home.php` 適用。記事一覧が制作実績と同じデザインで表示されることを確認
3. `single-post.php` 適用。日付が固定値 `2023.10.01` から実際の投稿日に変わることを確認

4. `parts-header.php` / `parts-drawer.php` / `footer.php` 適用。PC・スマホ・フッターの
   3箇所すべてに `Blog` が出ることを確認
5. **パーマリンクを「日付と投稿名」から「投稿名」へ変更。**
   `/works/` の一覧・個別ページが無傷であることを実機で確認済み
   （前方スラッグが変わらないため影響しない、という事前判断どおりの結果）
6. カテゴリ `ニュース(news)` `ノウハウ(knowhow)` `実績・事例(case-study)` を作成。
   初期カテゴリーを `ニュース` に変更
7. コメント受付を停止。サンプル投稿 `Hello world!` を削除

### 判明した追加情報

- **パーマリンク構造は「日付と投稿名」**（`/2026/04/12/hello-world/`）
  SEO上は `/%postname%/` が有利。変更するなら記事を本格投稿する前が唯一のタイミング。
  ただし `works` などカスタム投稿タイプの `with_front` 挙動を precheck すること
  （front に `/blog/` のような静的接頭辞を持つ構造にすると works のURLが壊れる）
- 投稿はWordPress既定のサンプル `Hello world!` 1件のみ。作業完了後に削除する
- グローバルナビはHTML直書き（`wp_nav_menu` 未使用）。PC・スマホ・フッターで別ファイル

## 未着手 / 次の調査対象

- `footer.php`（または `parts` 配下） … フッターナビへの `Blog` 追加。
  フッターは `About Us / Service / Works / Member / Company / Contact / Privacy Policy`
- `archive.php` … カテゴリ別一覧。`single-post.php` の「一覧へ戻る」の遷移先
- サーバーパネルの「WordPressセキュリティ設定」に **REST APIアクセス制限**がないか
  （ONだと Claude 連携がブロックされる）
- SEOプラグイン（SEO SIMPLE PACK）の導入
  - `header.php` に `<title>` の直書きは無く、`add_theme_support('title-tag')` 経由の
    `wp_head()` 出力のみ。**タイトル二重出力の競合リスクは無い**と確認済み
  - `header.php` に OGP・meta description が一切無い。現状サイト全ページで
    SNSシェア時のカード表示が効いていない
- Google Search Console の設定（月次の効果測定に必要）
- `works` の既存スラッグが日本語（例: `/works/仙台89ers-bプレミア開幕-.../`）。
  URLエンコードで長大化するがインデックス済みのため変更しない。
  **ブログ記事では必ず英語スラッグを使うこと**（自動化時のルールに組み込む）
