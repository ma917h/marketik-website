#!/usr/bin/env python3
"""
marketik.jp へ記事を「下書き」で投稿する。

  python3 wp-draft.py 記事.md     記事を下書き投稿する
  python3 wp-draft.py --check     接続と権限だけ確認する（何も投稿しない）

記事ファイルの書式（先頭の --- で囲んだ部分がメタ情報）:

    ---
    title: 記事のタイトル
    slug: english-slug-here
    category: ニュース
    ---
    <p>本文をHTMLで書く。</p>
    <h2>見出し</h2>
    <p>段落。</p>

接続情報は環境変数、または ~/.marketik-wp から読む（KEY=VALUE 形式）:

    WP_URL=https://marketik.jp
    WP_USER=claude-bot
    WP_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx

このスクリプトはパスワードを画面に出さない。
status は 'draft' に固定してある。連携ユーザーは寄稿者権限なので、
仮にここを publish に書き換えてもWordPress側が公開を拒否する（二重の安全弁）。
"""

import json
import os
import re
import sys
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
from base64 import b64encode
from pathlib import Path

CONFIG_FILE = Path.home() / ".marketik-wp"
# 投稿スラッグに使えない予約語。固定ページ・カスタム投稿タイプと衝突する
RESERVED_SLUGS = {
    "blog", "service", "contact", "works", "member", "privacy-policy",
    "thanks", "category", "tag", "author", "page", "feed", "wp-admin",
}


def die(msg):
    print(f"\n[エラー] {msg}\n", file=sys.stderr)
    sys.exit(1)


def load_config():
    cfg = {}
    if CONFIG_FILE.exists():
        for line in CONFIG_FILE.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            cfg[k.strip()] = v.strip()
    # WordPressのユーザー名は sanitize_user() で連続する空白が1つに詰められる。
    # 設定ファイル側に空白が2つ入っていても、見た目では気付けないまま
    # 401 になるだけなので、保存されている形に合わせて正規化する。
    if cfg.get("WP_USER"):
        cfg["WP_USER"] = re.sub(r"\s+", " ", cfg["WP_USER"])
    for key in ("WP_URL", "WP_USER", "WP_APP_PASSWORD"):
        cfg[key] = os.environ.get(key) or cfg.get(key, "")
        if not cfg[key]:
            die(
                f"{key} が設定されていません。\n"
                f"       {CONFIG_FILE} に KEY=VALUE 形式で書くか、環境変数で渡してください。"
            )
    cfg["WP_URL"] = cfg["WP_URL"].rstrip("/")
    if not cfg["WP_URL"].startswith("https://"):
        die(
            f"WP_URL が『{cfg['WP_URL']}』になっています。\n"
            "       http:// だとアプリケーションパスワードが平文で流れます。\n"
            "       https:// に直してください。"
        )
    return cfg


def parse_article(path):
    text = Path(path).read_text(encoding="utf-8")
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", text, re.S)
    if not m:
        die(
            "記事ファイルの書式が違います。\n"
            "       1行目を --- で始め、メタ情報を書き、--- で閉じてから本文を書いてください。"
        )
    meta = {}
    for line in m.group(1).splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            meta[k.strip().lower()] = v.strip()
    body = m.group(2).strip()

    if not meta.get("title"):
        die("title が空です。")
    if not body:
        die("本文が空です。")
    return meta, body


def check_slug(slug):
    """英数字ハイフンのみか、予約語と衝突しないかを検査する。"""
    if not slug:
        die(
            "slug が空です。日本語タイトルのままだとURLが文字化けするため、\n"
            "       英数字のスラッグを必ず指定してください（例: youtube-algorithm-2026）。"
        )
    if unicodedata.normalize("NFKC", slug) != slug or not re.fullmatch(r"[a-z0-9-]+", slug):
        die(f"slug『{slug}』は半角の英小文字・数字・ハイフンのみにしてください。")
    if slug in RESERVED_SLUGS:
        die(f"slug『{slug}』は固定ページ等と衝突します。別の名前にしてください。")
    if slug.isdigit():
        die(f"slug『{slug}』は数字のみです。年月アーカイブと衝突するため避けてください。")


def check_slug_unused(cfg, slug):
    """同じslugの公開記事が既にないか確認する。

    WordPressは下書きの段階ではスラッグの重複を調整しない。公開した瞬間に
    -2 が付くため、スクリプトが表示する「公開後URL」と実際のURLがズレる。
    """
    found = request(cfg, "GET", "posts", query={"slug": slug})
    if found:
        die(
            f"slug『{slug}』は既に公開済みの記事で使われています"
            f"（投稿ID {found[0].get('id')}）。\n"
            "       このまま進めると、公開時に -2 が付いてURLがずれます。\n"
            "       別のslugを指定してください。"
        )


def request(cfg, method, path, payload=None, query=None):
    url = f"{cfg['WP_URL']}/wp-json/wp/v2/{path}"
    if query:
        url += "?" + urllib.parse.urlencode(query)
    data = json.dumps(payload).encode("utf-8") if payload is not None else None
    token = b64encode(f"{cfg['WP_USER']}:{cfg['WP_APP_PASSWORD']}".encode()).decode()
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Authorization", f"Basic {token}")
    req.add_header("Content-Type", "application/json; charset=utf-8")
    req.add_header("User-Agent", "marketik-wp-draft/1.0")
    try:
        with urllib.request.urlopen(req, timeout=30) as res:
            return json.loads(res.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", "replace")[:400]
        hint = ""
        if e.code == 401:
            hint = "\n       → ユーザー名かアプリケーションパスワードが違います。"
        elif e.code == 403:
            hint = (
                "\n       → 権限不足か、サーバー側でREST APIが遮断されています。"
                "\n         エックスサーバーの『国外アクセス制限 → REST API』は"
                "\n         日本国内からの接続なら通ります。海外/VPN経由でないか確認してください。"
            )
        die(f"WordPressが {e.code} を返しました。{hint}\n       応答: {detail}")
    except urllib.error.URLError as e:
        die(f"{cfg['WP_URL']} に接続できません: {e.reason}")


def resolve_category(cfg, name):
    """カテゴリ名からIDを引く。見つからなければ中断する（勝手に作らない）。"""
    if not name:
        return None
    found = request(cfg, "GET", "categories", query={"search": name, "per_page": 100})
    for c in found:
        if c.get("name") == name:
            return c["id"]
    names = "、".join(c.get("name", "") for c in found) or "（該当なし）"
    die(f"カテゴリ『{name}』が見つかりません。候補: {names}")


def check_connection(cfg):
    """接続・認証・権限・カテゴリを確認する。記事は一切作らない。

    初期セットアップの動作確認用。テスト記事を作って消す手間を無くし、
    権限が強すぎる場合に気付けるようにする。
    """
    me = request(cfg, "GET", "users/me", query={"context": "edit"})
    roles = me.get("roles") or []

    print("\n接続できました。")
    print(f"  接続先   : {cfg['WP_URL']}")
    print(f"  ユーザー : {me.get('name') or '(表示名なし)'} （{me.get('slug') or cfg['WP_USER']}）")

    if roles:
        label = {
            "administrator": "管理者",
            "editor": "編集者",
            "author": "投稿者",
            "contributor": "寄稿者",
            "subscriber": "購読者",
        }
        print(f"  権限     : {'、'.join(label.get(r, r) for r in roles)}")
    else:
        print("  権限     : 取得できませんでした（投稿には支障ありません）")

    cats = request(cfg, "GET", "categories", query={"per_page": 100})
    names = [c.get("name", "") for c in cats]
    print(f"  カテゴリ : {' / '.join(names) if names else '（未作成）'}")
    print("             ↑ 記事の category: はこの名前と完全一致させてください")

    # 公開できてしまう権限なら警告する。パスワード漏洩時の被害範囲が変わる。
    strong = [r for r in roles if r in ("administrator", "editor", "author")]
    if strong:
        print(
            "\n  [注意] このユーザーは記事を公開できる権限を持っています。"
            "\n         アプリケーションパスワードが漏れると、そのまま悪用されます。"
            "\n         記事投稿用には寄稿者権限の専用ユーザーを使ってください。"
        )
    elif "contributor" in roles:
        print("\n  寄稿者権限です。公開はできません（意図どおり）。")

    print("\nセットアップは完了しています。\n")


def main():
    if len(sys.argv) != 2:
        die("使い方: python3 wp-draft.py 記事.md\n"
            "             python3 wp-draft.py --check")

    cfg = load_config()

    if sys.argv[1] in ("--check", "-c"):
        check_connection(cfg)
        return

    meta, body = parse_article(sys.argv[1])
    check_slug(meta.get("slug", ""))
    check_slug_unused(cfg, meta["slug"])

    payload = {
        "title": meta["title"],
        "slug": meta["slug"],
        "content": body,
        "status": "draft",  # 固定。公開は人間が管理画面で行う
    }
    cat_id = resolve_category(cfg, meta.get("category"))
    if cat_id:
        payload["categories"] = [cat_id]

    post = request(cfg, "POST", "posts", payload)

    print("\n下書きを作成しました。")
    print(f"  タイトル : {post.get('title', {}).get('raw') or meta['title']}")
    print(f"  状態     : {post.get('status')}")
    print(f"  公開後URL: {cfg['WP_URL']}/{meta['slug']}/")
    print(f"  編集画面 : {cfg['WP_URL']}/wp-admin/post.php?post={post.get('id')}&action=edit")
    print("\n内容を確認し、問題なければ管理画面から公開してください。\n")


if __name__ == "__main__":
    main()
