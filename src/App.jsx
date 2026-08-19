import React, { useState } from "react";
import {
  BookOpen,
  Feather,
  Settings,
  X,
  Search,
  ChevronRight,
  CheckCircle2,
  Lock,
  Flame,
  Home,
} from "lucide-react";

const WALL_TAGS = [
  { id: "relation", label: "人間関係" },
  { id: "work", label: "仕事・勉強" },
  { id: "confidence", label: "自信のなさ" },
  { id: "anxiety", label: "焦り・不安" },
  { id: "vague", label: "なんとなくのモヤモヤ" },
];

const SNIPPETS = {
  relation: {
    category: "教学の言葉",
    text: "相手を変えようとする前に、まず自分の一念を変える。そこから関係は少しずつ動き出す、という考え方があります。",
  },
  work: {
    category: "今日のことば",
    text: "大きな目標も、今日の一歩の積み重ねでしかできあがらない。焦らず、今日の分だけ進めばいい。",
  },
  confidence: {
    category: "教学用語：仏性",
    text: "すべての人に、本来そなわった尊い生命の力がある。まだ見えていないだけで、なくなったわけではない。",
  },
  anxiety: {
    category: "今日のことば",
    text: "不安は、まだ来ていない未来を先取りして苦しむこと。今日できることだけに、心を戻してみる。",
  },
  vague: {
    category: "教学の言葉",
    text: "モヤモヤは、変化の前ぶれであることが多い。無理に晴らそうとせず、そのまま書き出してみる。",
  },
};

const LESSONS = [
  { id: 1, title: "仏法ってなに？", kind: "基礎", done: true },
  { id: 2, title: "唱題ってどういう意味？", kind: "用語", done: true },
  { id: 3, title: "今日のことば：挑戦", kind: "指導", done: true },
  { id: 4, title: "人間革命という考え方", kind: "用語", done: false, current: true },
  { id: 5, title: "今日のことば：継続の力", kind: "指導", done: false },
  { id: 6, title: "感謝という実践", kind: "用語", done: false },
];

const LESSON_CONTENT = {
  1: "仏法とは、生命をどう生きるかについて説かれてきた、長い歴史を持つ考え方の体系です。難しく見えても、根っこにあるのは「今をどう生きるか」というシンプルな問いです。",
  2: "「唱題」とは「南無妙法蓮華経」と声に出して唱えることです。特別な儀式というより、自分の生命の状態を整える、日々のシンプルな習慣として捉えられています。",
  3: "挑戦とは、結果がすぐに出ることではなく、昨日の自分より半歩でも前に出ようとする姿勢そのものを指す、という考え方があります。",
  4: "「人間革命」とは、一人の人間が内面から変わっていくことで、その影響がまわりにも広がっていく、という考え方です。特別な誰かの話ではなく、日々の小さな変化の積み重ねを指します。",
  5: "継続とは、大きな力で一気に進むことではなく、小さな行動を止めずに繰り返すことだという考え方があります。派手さはなくても、積み重ねた分だけ土台になります。",
  6: "感謝とは、恵まれた状況にだけ向けるものではなく、当たり前に見える日常の中に価値を見出す実践として捉えられることがあります。",
};

const QUIZ = {
  4: {
    question: "「人間革命」の考え方に近いのはどれ？",
    options: [
      { id: "a", text: "環境が変われば、人も自然に変わる", correct: false },
      { id: "b", text: "自分の内面が変わることで、まわりにも変化が広がる", correct: true },
      { id: "c", text: "生まれ持った性格は一生変えられない", correct: false },
    ],
    explain:
      "「人間革命」は特別な誰かの話ではなく、一人ひとりの内面の変化が、まわりの環境や関係にも波及していく、という考え方です。",
  },
};

const DICTIONARY = [
  { term: "唱題", reading: "しょうだい", desc: "「南無妙法蓮華経」と声に出して唱えること。" },
  { term: "御書", reading: "ごしょ", desc: "日蓮大聖人がしたためた手紙や教えをまとめたもの。" },
  { term: "人間革命", reading: "にんげんかくめい", desc: "一人の内面の変化が、まわりにも広がっていくという考え方。" },
  { term: "仏性", reading: "ぶっしょう", desc: "すべての人に本来そなわっている、仏になれる可能性・生命の力。" },
  { term: "広宣流布", reading: "こうせんるふ", desc: "仏法の考え方を、世の中に広めていくこと。" },
  { term: "一念", reading: "いちねん", desc: "今、この瞬間の心のあり方・意識のこと。" },
];

const SEED_LOG = [
  { id: 1, date: "8/15", tagId: "work", snippet: SNIPPETS.work.text, journal: "焦ってたけど、今日の分だけでいいと思えた。" },
  { id: 2, date: "8/17", tagId: "confidence", snippet: SNIPPETS.confidence.text, journal: "まだ何もできてないと思ってたけど、少し楽になった。" },
];

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;600;700;800&family=Zen+Maru+Gothic:wght@400;500;700&display=swap');
.ippo-root { --bg:#F2EFE6; --ink:#2B2A33; --ink-soft:#847F87; --manabu:#C98A2E; --manabu-soft:#F3E4C8;
  --mitsumeru:#4A4066; --mitsumeru-soft:#E6E1F0; --moss:#7A8B6F; --card:#FBF9F5; --line:#E6E1D4;
  font-family:'Zen Maru Gothic',sans-serif; color:var(--ink); }
.ippo-root *{ box-sizing:border-box; }
.ippo-display{ font-family:'Shippori Mincho',serif; }
.ippo-stage{ min-height:100vh; display:flex; align-items:center; justify-content:center; padding:40px 16px;
  background: radial-gradient(circle at 18% 12%, #F3E4C8 0%, transparent 45%), radial-gradient(circle at 88% 88%, #E6E1F0 0%, transparent 50%), #EDEAE1; }
.ippo-phone{ width:390px; height:780px; max-width:100%; background:var(--bg); border-radius:44px;
  box-shadow:0 30px 60px -20px rgba(43,42,51,0.35), 0 0 0 10px #1c1b21; overflow:hidden; display:flex;
  flex-direction:column; position:relative; }
.ippo-statusbar{ display:flex; justify-content:space-between; padding:16px 28px 2px; font-size:12px; font-weight:700; }
.ippo-notch{ position:absolute; top:10px; left:50%; transform:translateX(-50%); width:120px; height:26px; background:#1c1b21; border-radius:20px; }
.ippo-header{ display:flex; align-items:center; justify-content:space-between; padding:10px 22px 16px; transition:background .4s ease; }
.ippo-header--home{ background:linear-gradient(180deg,#EEE7EE,transparent); }
.ippo-header--manabu{ background:linear-gradient(180deg,var(--manabu-soft),transparent); }
.ippo-header--mitsumeru{ background:linear-gradient(180deg,var(--mitsumeru-soft),transparent); }
.ippo-logo{ font-size:19px; font-weight:700; letter-spacing:.04em; cursor:pointer; }
.ippo-header-actions{ display:flex; align-items:center; gap:8px; }
.ippo-icon-btn{ width:34px; height:34px; border-radius:50%; border:1px solid var(--line); background:var(--card);
  display:flex; align-items:center; justify-content:center; color:var(--ink-soft); cursor:pointer; flex-shrink:0; }
.ippo-content{ flex:1; overflow-y:auto; padding:4px 22px 24px; scrollbar-width:none; }
.ippo-content::-webkit-scrollbar{ display:none; }
.ippo-nav{ display:flex; border-top:1px solid var(--line); background:var(--card); }
.ippo-nav-btn{ flex:1; display:flex; flex-direction:column; align-items:center; gap:4px; padding:12px 0 18px;
  border:none; background:none; cursor:pointer; color:var(--ink-soft); font-size:12px; font-weight:700;
  font-family:'Zen Maru Gothic',sans-serif; }
.ippo-nav-btn.is-active{ color:var(--manabu); }
.ippo-nav-btn--mitsumeru.is-active{ color:var(--mitsumeru); }
.ippo-nav-btn.is-active::before{ content:''; display:block; width:26px; height:3px; border-radius:2px; background:currentColor; }
.ippo-section-title{ font-size:20px; font-weight:700; margin:12px 0 4px; }
.ippo-section-sub{ font-size:13px; color:var(--ink-soft); margin-bottom:18px; }
.ippo-path{ position:relative; padding-left:34px; margin-top:6px; }
.ippo-path::before{ content:''; position:absolute; left:15px; top:8px; bottom:8px; width:2px; background:var(--line); }
.ippo-lesson-row{ display:flex; align-items:center; gap:14px; padding:10px 0; position:relative; cursor:pointer; }
.ippo-lesson-dot{ width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center;
  background:var(--card); border:2px solid var(--line); position:absolute; left:-34px; z-index:1; }
.ippo-lesson-dot.done{ background:var(--moss); border-color:var(--moss); color:#fff; }
.ippo-lesson-dot.current{ background:var(--manabu); border-color:var(--manabu); color:#fff; }
.ippo-lesson-dot.locked{ opacity:.6; }
.ippo-lesson-card{ flex:1; background:var(--card); border:1px solid var(--line); border-radius:16px; padding:14px 16px;
  display:flex; align-items:center; justify-content:space-between; }
.ippo-lesson-card.locked{ opacity:.5; }
.ippo-lesson-kind{ font-size:11px; padding:2px 8px; border-radius:20px; background:var(--manabu-soft); color:var(--manabu); font-weight:700; }
.ippo-lesson-title{ font-size:14px; font-weight:700; margin-top:4px; }
.ippo-chip-row{ display:flex; flex-wrap:wrap; gap:8px; margin:14px 0 18px; }
.ippo-chip{ padding:8px 14px; border-radius:20px; border:1.5px solid var(--line); background:var(--card);
  font-size:13px; cursor:pointer; color:var(--ink-soft); font-family:inherit; }
.ippo-chip.selected{ background:var(--mitsumeru); border-color:var(--mitsumeru); color:#fff; }
.ippo-textarea{ width:100%; border:1.5px solid var(--line); border-radius:16px; padding:14px; font-family:inherit;
  font-size:14px; resize:none; background:var(--card); min-height:80px; }
.ippo-btn{ width:100%; padding:14px; border-radius:16px; border:none; font-weight:700; font-size:15px; cursor:pointer;
  font-family:'Zen Maru Gothic',sans-serif; color:#fff; margin-top:10px; }
.ippo-btn--manabu{ background:var(--manabu); }
.ippo-btn--mitsumeru{ background:var(--mitsumeru); }
.ippo-btn:disabled{ opacity:.4; cursor:not-allowed; }
.ippo-btn-secondary{ background:transparent; color:var(--ink-soft); border:1.5px solid var(--line); }
.ippo-snippet-card{ background:linear-gradient(160deg,var(--mitsumeru),#6c5f8f); color:#fff; border-radius:20px; padding:26px 22px; margin:18px 0; }
.ippo-snippet-cat{ font-size:11px; letter-spacing:.1em; opacity:.75; margin-bottom:10px; text-transform:uppercase; }
.ippo-snippet-text{ font-size:17px; line-height:1.9; }
.ippo-streak{ display:flex; align-items:center; gap:6px; background:#FBE9D0; color:#B5651D; padding:6px 12px;
  border-radius:20px; font-size:13px; font-weight:700; width:fit-content; margin-bottom:14px; }
.ippo-log-entry{ border-left:2px solid var(--line); padding:4px 0 20px 18px; margin-left:6px; position:relative; }
.ippo-log-entry::before{ content:''; width:10px; height:10px; border-radius:50%; background:var(--mitsumeru); position:absolute; left:-6px; top:6px; }
.ippo-log-date{ font-size:12px; color:var(--ink-soft); font-weight:700; }
.ippo-log-tag{ display:inline-block; font-size:11px; background:var(--mitsumeru-soft); color:var(--mitsumeru); padding:2px 8px; border-radius:20px; margin-left:6px; }
.ippo-log-snippet{ font-size:13px; color:var(--ink-soft); margin:8px 0 4px; }
.ippo-log-journal{ font-size:14px; background:var(--card); border:1px solid var(--line); border-radius:12px; padding:10px 12px; }
.ippo-dict-search{ display:flex; align-items:center; gap:8px; border:1.5px solid var(--line); border-radius:14px;
  padding:10px 14px; margin:12px 0 18px; background:var(--card); }
.ippo-dict-search input{ border:none; outline:none; flex:1; font-family:inherit; font-size:14px; background:transparent; }
.ippo-dict-item{ padding:14px 0; border-bottom:1px solid var(--line); }
.ippo-dict-term{ font-weight:700; font-size:15px; }
.ippo-dict-reading{ font-size:11px; color:var(--ink-soft); margin-left:6px; }
.ippo-dict-desc{ font-size:13px; color:var(--ink-soft); margin-top:4px; line-height:1.6; }
.ippo-modal-overlay{ position:absolute; inset:0; background:rgba(43,42,51,.45); display:flex; align-items:flex-end; z-index:10; }
.ippo-modal{ background:var(--bg); width:100%; border-radius:28px 28px 0 0; padding:24px 24px 34px; max-height:88%; overflow-y:auto; }
.ippo-quiz-option{ display:block; width:100%; text-align:left; padding:14px 16px; border-radius:14px; border:1.5px solid var(--line);
  background:var(--card); margin-bottom:10px; font-size:14px; cursor:pointer; font-family:inherit; }
.ippo-quiz-option.correct{ border-color:var(--moss); background:#EAF0E6; }
.ippo-quiz-option.incorrect{ border-color:#C2554B; background:#F6E7E5; }
.ippo-dash-card{ display:flex; align-items:center; gap:14px; padding:18px; border-radius:20px; margin-bottom:14px; cursor:pointer; border:1px solid var(--line); }
.ippo-dash-card--manabu{ background:linear-gradient(120deg,var(--manabu-soft),var(--card)); }
.ippo-dash-card--mitsumeru{ background:linear-gradient(120deg,var(--mitsumeru-soft),var(--card)); }
.ippo-dash-card-icon{ width:42px; height:42px; border-radius:14px; display:flex; align-items:center; justify-content:center; background:var(--card); flex-shrink:0; }
.ippo-dash-card--manabu .ippo-dash-card-icon{ color:var(--manabu); }
.ippo-dash-card--mitsumeru .ippo-dash-card-icon{ color:var(--mitsumeru); }
.ippo-dash-card-body{ flex:1; }
.ippo-dash-card-title{ font-size:16px; font-weight:700; }
.ippo-dash-card-sub{ font-size:12px; color:var(--ink-soft); margin-top:2px; }
.ippo-dash-link{ font-size:12px; color:var(--mitsumeru); background:none; border:none; cursor:pointer; font-weight:700; font-family:inherit; }
.ippo-onboard{ flex:1; display:flex; flex-direction:column; justify-content:space-between; padding:36px 26px 34px; transition:background .4s ease; }
.ippo-onboard--manabu{ background:linear-gradient(180deg,var(--manabu-soft),transparent 60%); }
.ippo-onboard--mitsumeru{ background:linear-gradient(180deg,var(--mitsumeru-soft),transparent 60%); }
.ippo-onboard-skip{ align-self:flex-end; font-size:13px; color:var(--ink-soft); background:none; border:none; cursor:pointer; }
.ippo-onboard-icon{ width:52px; height:52px; border-radius:16px; background:var(--card); display:flex; align-items:center; justify-content:center; margin-bottom:18px; }
.ippo-onboard--manabu .ippo-onboard-icon{ color:var(--manabu); }
.ippo-onboard--mitsumeru .ippo-onboard-icon{ color:var(--mitsumeru); }
.ippo-onboard-title{ font-size:26px; font-weight:700; line-height:1.55; margin-bottom:16px; }
.ippo-onboard-body{ font-size:14px; line-height:1.9; color:var(--ink-soft); }
.ippo-onboard-dots{ display:flex; gap:6px; justify-content:center; margin:20px 0; }
.ippo-dot{ width:6px; height:6px; border-radius:50%; background:var(--line); }
.ippo-dot.active{ background:var(--ink); width:18px; border-radius:4px; }
@media (max-width:480px){ .ippo-stage{ padding:0; background:var(--bg); } .ippo-phone{ width:100%; height:100vh; border-radius:0; box-shadow:none; } .ippo-notch{ display:none; } }
`;

const ONBOARD_SLIDES = [
  {
    title: "ようこそ、一歩ログへ。",
    body: "仏教の知恵を、むずかしくなく。日々の小さな迷いに、そっと寄り添うアプリです。",
    accent: null,
  },
  {
    title: "「まなぶ」で、少しずつ。",
    body: "仏法の言葉や考え方を、短いレッスンで。むずかしい専門用語には、いつもやさしい説明がついてきます。",
    accent: "manabu",
    icon: "book",
  },
  {
    title: "「みつめる」で、今日と向き合う。",
    body: "今日の壁を選ぶと、寄り添う言葉が届きます。感じたことを書き残せば、それが「一歩ログ」になっていきます。",
    accent: "mitsumeru",
    icon: "feather",
  },
  {
    title: "学会員でも、そうでなくても。",
    body: "知っている人も、初めての人も、同じペースで使えます。さあ、今日の一歩から。",
    accent: null,
  },
];

function Onboarding({ step, setStep, finish }) {
  const slide = ONBOARD_SLIDES[step];
  const isLast = step === ONBOARD_SLIDES.length - 1;
  const accentClass = slide.accent ? `ippo-onboard--${slide.accent}` : "";
  return (
    <div className={`ippo-onboard ${accentClass}`}>
      <button className="ippo-onboard-skip" onClick={finish}>スキップ</button>
      <div>
        {slide.icon && (
          <div className="ippo-onboard-icon">
            {slide.icon === "book" ? <BookOpen size={24} /> : <Feather size={24} />}
          </div>
        )}
        <div className="ippo-onboard-title ippo-display">{slide.title}</div>
        <div className="ippo-onboard-body">{slide.body}</div>
      </div>
      <div>
        <div className="ippo-onboard-dots">
          {ONBOARD_SLIDES.map((_, i) => <div key={i} className={`ippo-dot ${i === step ? "active" : ""}`} />)}
        </div>
        <button className="ippo-btn ippo-btn--mitsumeru" onClick={() => (isLast ? finish() : setStep(step + 1))}>
          {isLast ? "はじめる" : "つぎへ"}
        </button>
      </div>
    </div>
  );
}

const TUTORIAL_STEPS = [
  {
    icon: "book",
    title: "まなぶでできること",
    bullets: [
      "短いレッスンで仏法の言葉や考え方を学べます",
      "専門用語には、いつでもやさしい解説がつきます",
      "クイズで理解をたしかめながら進められます",
    ],
  },
  {
    icon: "feather",
    title: "みつめるでできること",
    bullets: [
      "今日の気持ちに近い言葉が届きます",
      "感じたことを、ひとことだけでも書き残せます",
      "記録は「一歩ログ」として、あとからいつでも読み返せます",
    ],
  },
];

function Tutorial({ step, setStep, finish, skip }) {
  const s = TUTORIAL_STEPS[step];
  const isLast = step === TUTORIAL_STEPS.length - 1;
  return (
    <div className="ippo-modal-overlay">
      <div className="ippo-modal">
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}>
          <button className="ippo-onboard-skip" onClick={skip}>スキップ</button>
        </div>
        <div className="ippo-onboard-icon">
          {s.icon === "book" ? <BookOpen size={24} color="var(--manabu)" /> : <Feather size={24} color="var(--mitsumeru)" />}
        </div>
        <div className="ippo-section-title ippo-display" style={{ marginTop: 0 }}>{s.title}</div>
        <ul style={{ margin: "10px 0 22px", paddingLeft: 18, fontSize: 14, lineHeight: 2, color: "var(--ink-soft)" }}>
          {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
        <div className="ippo-onboard-dots">
          {TUTORIAL_STEPS.map((_, i) => <div key={i} className={`ippo-dot ${i === step ? "active" : ""}`} />)}
        </div>
        <button className={`ippo-btn ippo-btn--${s.icon === "book" ? "manabu" : "mitsumeru"}`} onClick={() => (isLast ? finish() : setStep(step + 1))}>
          {isLast ? "はじめる" : "つぎへ"}
        </button>
      </div>
    </div>
  );
}

function HomeDashboard({ lessons, log, streak, onGoManabu, onGoMitsumeru, onGoLog, tagLabel }) {
  const doneCount = lessons.filter((l) => l.done).length;
  const nextLesson = lessons.find((l) => !l.done);
  const latest = log.length > 0 ? log[0] : null;
  return (
    <div>
      <div className="ippo-section-title ippo-display">おかえりなさい</div>
      <div className="ippo-section-sub">今日も、一歩から。</div>
      <div className="ippo-streak"><Flame size={14} /> {streak}日連続で一歩を積み重ねています</div>

      <div className="ippo-dash-card ippo-dash-card--manabu" onClick={onGoManabu}>
        <div className="ippo-dash-card-icon"><BookOpen size={20} /></div>
        <div className="ippo-dash-card-body">
          <div className="ippo-dash-card-title">まなぶ</div>
          <div className="ippo-dash-card-sub">
            {doneCount} / {lessons.length} レッスン終了
            {nextLesson ? `・次は「${nextLesson.title}」` : ""}
          </div>
        </div>
        <ChevronRight size={18} color="var(--manabu)" />
      </div>

      <div className="ippo-dash-card ippo-dash-card--mitsumeru" onClick={onGoMitsumeru}>
        <div className="ippo-dash-card-icon"><Feather size={20} /></div>
        <div className="ippo-dash-card-body">
          <div className="ippo-dash-card-title">みつめる</div>
          <div className="ippo-dash-card-sub">{latest ? `前回：${latest.date}に記録` : "今日はまだ記録していません"}</div>
        </div>
        <ChevronRight size={18} color="var(--mitsumeru)" />
      </div>

      {latest && (
        <div style={{ marginTop: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-soft)" }}>最近の一歩ログ</div>
            <button className="ippo-dash-link" onClick={onGoLog}>すべて見る</button>
          </div>
          <div className="ippo-log-entry">
            <span className="ippo-log-date">{latest.date}</span>
            <span className="ippo-log-tag">{tagLabel(latest.tagId)}</span>
            <div className="ippo-log-journal">{latest.journal}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function ManabuPath({ lessons, onOpen, onDict }) {
  const doneCount = lessons.filter((l) => l.done).length;
  const currentIndex = lessons.findIndex((l) => l.current);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div className="ippo-section-title ippo-display">まなぶ</div>
          <div className="ippo-section-sub">{doneCount} / {lessons.length} レッスン終了</div>
        </div>
        <button className="ippo-icon-btn" onClick={onDict}><Search size={16} /></button>
      </div>
      <div className="ippo-path">
        {lessons.map((l, i) => {
          const state = l.done ? "done" : l.current ? "current" : i > currentIndex ? "locked" : "current";
          return (
            <div key={l.id} className="ippo-lesson-row" onClick={() => state !== "locked" && onOpen(l)}>
              <div className={`ippo-lesson-dot ${state}`}>
                {state === "done" ? <CheckCircle2 size={16} /> : state === "locked" ? <Lock size={14} /> : <span style={{ fontSize: 12, fontWeight: 700 }}>{l.id}</span>}
              </div>
              <div className={`ippo-lesson-card ${state === "locked" ? "locked" : ""}`}>
                <div>
                  <span className="ippo-lesson-kind">{l.kind}</span>
                  <div className="ippo-lesson-title">{l.title}</div>
                </div>
                <ChevronRight size={16} color="var(--ink-soft)" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LessonModal({ lesson, quiz, answer, setAnswer, onClose, onComplete }) {
  const content = LESSON_CONTENT[lesson.id];
  return (
    <div className="ippo-modal-overlay" onClick={onClose}>
      <div className="ippo-modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span className="ippo-lesson-kind">{lesson.kind}</span>
          <button className="ippo-icon-btn" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="ippo-section-title ippo-display" style={{ fontSize: 19 }}>{lesson.title}</div>
        <p style={{ fontSize: 14, lineHeight: 1.9, color: "var(--ink-soft)", margin: "14px 0 22px" }}>{content}</p>
        {quiz ? (
          <>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>{quiz.question}</div>
            {quiz.options.map((opt) => {
              const chosen = answer === opt.id;
              const showState = !answer ? "" : opt.correct ? "correct" : chosen ? "incorrect" : "";
              return (
                <button key={opt.id} className={`ippo-quiz-option ${showState}`} onClick={() => !answer && setAnswer(opt.id)} disabled={!!answer}>
                  {opt.text}
                </button>
              );
            })}
            {answer && (
              <>
                <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.8, margin: "14px 0" }}>{quiz.explain}</p>
                <button className="ippo-btn ippo-btn--manabu" onClick={onComplete}>次へ進む</button>
              </>
            )}
          </>
        ) : (
          <button className="ippo-btn ippo-btn--manabu" onClick={onComplete}>わかった</button>
        )}
      </div>
    </div>
  );
}

function Dictionary({ query, setQuery, items, onBack }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <button className="ippo-icon-btn" onClick={onBack}><ChevronRight size={16} style={{ transform: "rotate(180deg)" }} /></button>
        <div className="ippo-section-title ippo-display" style={{ margin: 0 }}>用語ミニ辞典</div>
      </div>
      <div className="ippo-dict-search">
        <Search size={15} color="var(--ink-soft)" />
        <input placeholder="ことばで検索" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      {items.map((d) => (
        <div key={d.term} className="ippo-dict-item">
          <span className="ippo-dict-term">{d.term}</span>
          <span className="ippo-dict-reading">{d.reading}</span>
          <div className="ippo-dict-desc">{d.desc}</div>
        </div>
      ))}
      {items.length === 0 && <div style={{ fontSize: 13, color: "var(--ink-soft)", padding: "20px 0" }}>見つかりませんでした</div>}
    </div>
  );
}

function MitsumeruToday({ flowStep, selectedTag, setSelectedTag, freeText, setFreeText, journalText, setJournalText, onReceive, onNextToJournal, onSave, onRestart, onGoLog, tagLabel }) {
  if (flowStep === "input") {
    return (
      <div>
        <div className="ippo-section-title ippo-display">今日、気になっていることは？</div>
        <div className="ippo-section-sub">近いものを選んでください</div>
        <div className="ippo-chip-row">
          {WALL_TAGS.map((t) => (
            <button key={t.id} className={`ippo-chip ${selectedTag === t.id ? "selected" : ""}`} onClick={() => setSelectedTag(t.id)}>{t.label}</button>
          ))}
        </div>
        <textarea className="ippo-textarea" placeholder="（自由に書いてもOK。書かなくても大丈夫）" value={freeText} onChange={(e) => setFreeText(e.target.value)} />
        <button className="ippo-btn ippo-btn--mitsumeru" disabled={!selectedTag} onClick={onReceive}>言葉を受け取る</button>
        <button className="ippo-btn ippo-btn-secondary" onClick={onGoLog}>これまでのログを見る</button>
      </div>
    );
  }
  if (flowStep === "card") {
    const s = SNIPPETS[selectedTag];
    return (
      <div>
        <div className="ippo-section-sub">「{tagLabel(selectedTag)}」に寄せて</div>
        <div className="ippo-snippet-card">
          <div className="ippo-snippet-cat">{s.category}</div>
          <div className="ippo-snippet-text ippo-display">{s.text}</div>
        </div>
        <button className="ippo-btn ippo-btn--mitsumeru" onClick={onNextToJournal}>感じたことを書いてみる</button>
      </div>
    );
  }
  if (flowStep === "journal") {
    return (
      <div>
        <div className="ippo-section-title ippo-display" style={{ fontSize: 18 }}>この言葉を読んで、浮かんだことは？</div>
        <textarea className="ippo-textarea" style={{ minHeight: 120, marginTop: 14 }} placeholder="うまく言葉にならなくても大丈夫。ひとことだけでも。" value={journalText} onChange={(e) => setJournalText(e.target.value)} />
        <button className="ippo-btn ippo-btn--mitsumeru" onClick={onSave}>記録する</button>
      </div>
    );
  }
  return (
    <div style={{ textAlign: "center", paddingTop: 40 }}>
      <div style={{ fontSize: 36, marginBottom: 12 }}>🔥</div>
      <div className="ippo-section-title ippo-display" style={{ fontSize: 19 }}>記録しました</div>
      <div className="ippo-section-sub">3日連続の一歩です</div>
      <button className="ippo-btn ippo-btn--mitsumeru" onClick={onGoLog}>一歩ログを見る</button>
      <button className="ippo-btn ippo-btn-secondary" onClick={onRestart}>ホームに戻る</button>
    </div>
  );
}

function MitsumeruLog({ entries, streak, filter, setFilter, tagLabel, onBack }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <button className="ippo-icon-btn" onClick={onBack}><ChevronRight size={16} style={{ transform: "rotate(180deg)" }} /></button>
        <div className="ippo-section-title ippo-display" style={{ margin: 0 }}>一歩ログ</div>
      </div>
      <div className="ippo-streak"><Flame size={14} /> {streak}日連続で記録中</div>
      <div className="ippo-section-sub">同じ壁にまたぶつかったとき、ここに戻ってきてください。</div>
      <div className="ippo-chip-row">
        <button className={`ippo-chip ${!filter ? "selected" : ""}`} onClick={() => setFilter(null)}>すべて</button>
        {WALL_TAGS.map((t) => (
          <button key={t.id} className={`ippo-chip ${filter === t.id ? "selected" : ""}`} onClick={() => setFilter(t.id)}>{t.label}</button>
        ))}
      </div>
      {entries.map((e) => (
        <div key={e.id} className="ippo-log-entry">
          <span className="ippo-log-date">{e.date}</span>
          <span className="ippo-log-tag">{tagLabel(e.tagId)}</span>
          <div className="ippo-log-snippet">{e.snippet}</div>
          <div className="ippo-log-journal">{e.journal}</div>
        </div>
      ))}
      {entries.length === 0 && <div style={{ fontSize: 13, color: "var(--ink-soft)", padding: "20px 0" }}>まだ記録がありません</div>}
    </div>
  );
}

function SettingsModal({ onClose }) {
  return (
    <div className="ippo-modal-overlay" onClick={onClose}>
      <div className="ippo-modal" onClick={(e) => e.stopPropagation()} style={{ maxHeight: "50%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div className="ippo-section-title ippo-display" style={{ margin: 0, fontSize: 18 }}>設定</div>
          <button className="ippo-icon-btn" onClick={onClose}><X size={16} /></button>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
          <span style={{ fontSize: 14 }}>毎日の通知</span>
          <span style={{ fontSize: 13, color: "var(--ink-soft)" }}>オン</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0" }}>
          <span style={{ fontSize: 14 }}>ことばづかい</span>
          <span style={{ fontSize: 13, color: "var(--ink-soft)" }}>やさしめ</span>
        </div>
      </div>
    </div>
  );
}

export default function IppoApp() {
  const [onboarding, setOnboarding] = useState(true);
  const [onboardStep, setOnboardStep] = useState(0);
  const [tab, setTab] = useState(null);
  const [manabuView, setManabuView] = useState("path");
  const [activeLesson, setActiveLesson] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [lessons, setLessons] = useState(LESSONS);
  const [dictQuery, setDictQuery] = useState("");
  const [mitsumeruView, setMitsumeruView] = useState("today");
  const [flowStep, setFlowStep] = useState("input");
  const [selectedTag, setSelectedTag] = useState(null);
  const [freeText, setFreeText] = useState("");
  const [journalText, setJournalText] = useState("");
  const [log, setLog] = useState(SEED_LOG);
  const [logFilter, setLogFilter] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tutorial, setTutorial] = useState(null);

  const streak = 3;

  const openLesson = (lesson) => { setActiveLesson(lesson); setQuizAnswer(null); };
  const closeLesson = () => setActiveLesson(null);
  const completeLesson = () => {
    setLessons((prev) => prev.map((l) => (l.id === activeLesson.id ? { ...l, done: true, current: false } : l.id === activeLesson.id + 1 ? { ...l, current: true } : l)));
    setActiveLesson(null);
  };

  const startFlow = () => { setFlowStep("input"); setSelectedTag(null); setFreeText(""); setJournalText(""); };
  const receiveWord = () => { if (selectedTag) setFlowStep("card"); };
  const saveJournal = () => {
    const entry = { id: Date.now(), date: "今日", tagId: selectedTag, snippet: SNIPPETS[selectedTag].text, journal: journalText || "（ひとこと記録なし）" };
    setLog((prev) => [entry, ...prev]);
    setFlowStep("saved");
  };

  const goHome = () => setTab(null);
  const goManabu = () => setTab("manabu");
  const goMitsumeru = () => { setTab("mitsumeru"); setMitsumeruView("today"); setFlowStep("input"); };
  const goLog = () => { setTab("mitsumeru"); setMitsumeruView("log"); };

  const filteredDict = DICTIONARY.filter((d) => d.term.includes(dictQuery) || d.desc.includes(dictQuery));
  const filteredLog = logFilter ? log.filter((e) => e.tagId === logFilter) : log;
  const tagLabel = (id) => {
    const found = WALL_TAGS.find((t) => t.id === id);
    return found ? found.label : "";
  };

  const headerClass = tab === null ? "home" : tab;

  return (
    <div className="ippo-root">
      <style>{STYLES}</style>
      <div className="ippo-stage">
        <div className="ippo-phone">
          <div className="ippo-statusbar"><span>9:41</span><div className="ippo-notch" /><span>●●●</span></div>

          {onboarding ? (
            <Onboarding step={onboardStep} setStep={setOnboardStep} finish={() => { setOnboarding(false); setTutorial(0); }} />
          ) : (
            <>
              <header className={`ippo-header ippo-header--${headerClass}`}>
                <span className="ippo-logo ippo-display" onClick={goHome}>一歩ログ</span>
                <div className="ippo-header-actions">
                  {tab !== null && <button className="ippo-icon-btn" onClick={goHome}><Home size={16} /></button>}
                  <button className="ippo-icon-btn" onClick={() => setSettingsOpen(true)}><Settings size={16} /></button>
                </div>
              </header>

              <main className="ippo-content">
                {tab === null && (
                  <HomeDashboard lessons={lessons} log={log} streak={streak} onGoManabu={goManabu} onGoMitsumeru={goMitsumeru} onGoLog={goLog} tagLabel={tagLabel} />
                )}
                {tab === "manabu" && manabuView === "path" && (
                  <ManabuPath lessons={lessons} onOpen={openLesson} onDict={() => setManabuView("dictionary")} />
                )}
                {tab === "manabu" && manabuView === "dictionary" && (
                  <Dictionary query={dictQuery} setQuery={setDictQuery} items={filteredDict} onBack={() => setManabuView("path")} />
                )}
                {tab === "mitsumeru" && mitsumeruView === "today" && (
                  <MitsumeruToday
                    flowStep={flowStep}
                    selectedTag={selectedTag} setSelectedTag={setSelectedTag}
                    freeText={freeText} setFreeText={setFreeText}
                    journalText={journalText} setJournalText={setJournalText}
                    onReceive={receiveWord}
                    onNextToJournal={() => setFlowStep("journal")}
                    onSave={saveJournal}
                    onRestart={startFlow}
                    onGoLog={() => setMitsumeruView("log")}
                    tagLabel={tagLabel}
                  />
                )}
                {tab === "mitsumeru" && mitsumeruView === "log" && (
                  <MitsumeruLog entries={filteredLog} streak={streak} filter={logFilter} setFilter={setLogFilter} tagLabel={tagLabel} onBack={() => setMitsumeruView("today")} />
                )}
              </main>

              {tab !== null && (
                <nav className="ippo-nav">
                  <button className={`ippo-nav-btn ${tab === "manabu" ? "is-active" : ""}`} onClick={goManabu}>
                    <BookOpen size={20} /><span>まなぶ</span>
                  </button>
                  <button className={`ippo-nav-btn ippo-nav-btn--mitsumeru ${tab === "mitsumeru" ? "is-active" : ""}`} onClick={goMitsumeru}>
                    <Feather size={20} /><span>みつめる</span>
                  </button>
                </nav>
              )}
            </>
          )}

          {activeLesson && (
            <LessonModal lesson={activeLesson} quiz={QUIZ[activeLesson.id]} answer={quizAnswer} setAnswer={setQuizAnswer} onClose={closeLesson} onComplete={completeLesson} />
          )}
          {settingsOpen && <SettingsModal onClose={() => setSettingsOpen(false)} />}
          {tutorial !== null && (
            <Tutorial step={tutorial} setStep={setTutorial} finish={() => setTutorial(null)} skip={() => setTutorial(null)} />
          )}
        </div>
      </div>
    </div>
  );
}
