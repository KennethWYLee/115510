const project = {
  "id": "115510",
  "slug": "ntub-115510-artorias-castle",
  "repo": "115510",
  "title": "Artorias Castle 戰鬥系統展示中心",
  "shortName": "Artorias Castle",
  "subtitle": "UE5 動作遊戲設計、敵人 AI 與平衡測試",
  "eyebrow": "115510 專業化展示版",
  "source": "五專第115510組 Artorias castle 系統手冊",
  "mark": "AC",
  "accent": "#b91c1c",
  "accent2": "#d97706",
  "accent3": "#0891b2",
  "dark": "#0b0f17",
  "tabs": [
    "試玩總覽",
    "戰鬥系統",
    "敵人 AI",
    "關卡節點",
    "測試平衡"
  ],
  "metrics": [
    {
      "label": "玩家血量",
      "value": "82%",
      "note": "HUD 狀態系統"
    },
    {
      "label": "體力回復",
      "value": "14/s",
      "note": "翻滾、格擋、攻擊"
    },
    {
      "label": "敵人狀態",
      "value": "追擊",
      "note": "Behavior Tree"
    },
    {
      "label": "測試回合",
      "value": "27",
      "note": "平衡紀錄"
    }
  ],
  "visual": {
    "mode": "game",
    "nodes": [
      [
        "玩家",
        "輸入與狀態",
        16,
        34
      ],
      [
        "戰鬥",
        "攻擊/翻滾/格擋",
        42,
        18
      ],
      [
        "敵人 AI",
        "感知與決策",
        70,
        34
      ],
      [
        "HUD",
        "血量/體力",
        42,
        68
      ],
      [
        "存檔",
        "世界狀態",
        76,
        70
      ]
    ],
    "links": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        1,
        3
      ],
      [
        2,
        4
      ],
      [
        3,
        4
      ]
    ]
  },
  "panels": [
    {
      "title": "可測的戰鬥循環",
      "text": "把攻擊、翻滾、格擋、回血與體力消耗做成可觀測的狀態機。",
      "tag": "Combat loop"
    },
    {
      "title": "敵人 AI 行為樹",
      "text": "巡邏、感知、追擊、攻擊、退回與冷卻狀態清楚呈現，便於平衡測試。",
      "tag": "Behavior Tree"
    },
    {
      "title": "存檔與世界狀態",
      "text": "存放玩家狀態、敵人位置、關卡進度與測試回合，讓 Demo 不只是畫面展示。",
      "tag": "Save state"
    }
  ],
  "workflow": [
    "玩家進入城堡節點並觸發敵人感知",
    "依距離與體力決定攻擊、格擋或翻滾",
    "敵人 AI 在巡邏、追擊、攻擊間切換",
    "HUD 即時更新血量、體力與狀態",
    "保存回合資料供平衡分析"
  ],
  "form": {
    "title": "新增測試回合",
    "button": "記錄回合",
    "fields": [
      {
        "name": "weapon",
        "label": "武器",
        "type": "select",
        "options": [
          "長劍",
          "重劍",
          "盾劍",
          "雙刀"
        ],
        "value": "長劍"
      },
      {
        "name": "enemy",
        "label": "敵人類型",
        "type": "select",
        "options": [
          "巡邏士兵",
          "重甲騎士",
          "城堡守衛",
          "首領原型"
        ],
        "value": "重甲騎士"
      },
      {
        "name": "goal",
        "label": "測試重點",
        "type": "text",
        "value": "格擋後反擊窗口是否過長"
      }
    ]
  },
  "recordsTitle": "測試紀錄",
  "records": [
    {
      "title": "重甲騎士追擊",
      "meta": "平均戰鬥 86 秒 · 玩家勝率 62%",
      "status": "需平衡"
    },
    {
      "title": "翻滾無敵幀",
      "meta": "過早輸入會吃到傷害 · 已標記",
      "status": "修正中"
    },
    {
      "title": "城堡中庭節點",
      "meta": "3 條路徑 · 敵人視野正常",
      "status": "穩定"
    }
  ],
  "insights": [
    "遊戲展示應把不可見的狀態機、AI 決策與平衡數據可視化。",
    "敵人 AI 不只追擊玩家，還要有感知範圍、冷卻、失去目標與回巡邏。",
    "平衡測試需要記錄回合資料，才能看出體力、傷害與敵人反應是否合理。"
  ],
  "automation": [
    "AI 感知更新",
    "行為樹狀態切換",
    "HUD 百分比計算",
    "存檔狀態快照"
  ],
  "governance": [
    "版本化測試紀錄",
    "輸入延遲觀察",
    "關卡節點命名",
    "平衡參數備註"
  ],
  "events": [
    "重甲騎士切換為追擊",
    "玩家格擋成功觸發反擊窗口",
    "第 27 回合平衡資料已保存"
  ]
};

const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
const state = {
  activeTab: 0,
  events: [...project.events],
  records: project.records.map((record) => ({ ...record })),
  metricBoost: 0,
  advisorText: ""
};

function pill(text, type = "ai") {
  return `<span class="pill ${type}">${text}</span>`;
}

function statusType(status) {
  if (/完成|穩定|正常|活躍|已確認|可輸出|已排程/.test(status)) return "good";
  if (/待|需|修訂|接近|處理中|進行中|分析中|審核中/.test(status)) return "warn";
  return "ai";
}

function toast(message) {
  const box = qs("#toast");
  box.textContent = message;
  box.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => box.classList.remove("show"), 2400);
}

function addEvent(message) {
  state.events.unshift(message);
  state.events = state.events.slice(0, 8);
}

function renderChrome() {
  qs("#nav").innerHTML = project.tabs.map((tab, index) => `
    <button class="${index === state.activeTab ? "active" : ""}" data-tab="${index}">${tab}</button>
  `).join("");
  qsa("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeTab = Number(button.dataset.tab);
      render();
    });
  });
  qs("#viewTitle").textContent = project.tabs[state.activeTab];
  qs("#statusLine").innerHTML = [
    pill("系統正常", "good"),
    pill("免登入全權限", "ai"),
    pill(`事件 ${state.events.length}`, "warn")
  ].join("");
}

function metricGrid() {
  return `<div class="metric-grid">${project.metrics.map((metric, index) => {
    const value = index === 0 && state.metricBoost ? String(Number.parseInt(metric.value, 10) + state.metricBoost || metric.value) : metric.value;
    return `<article class="metric"><span>${metric.label}</span><strong>${value}</strong><p class="muted">${metric.note}</p></article>`;
  }).join("")}</div>`;
}

function visualPanel() {
  return `<section class="panel"><div class="panel-head"><h2>系統視覺模型</h2><span>${project.source}</span></div><canvas id="visualCanvas" class="visual" width="980" height="420"></canvas></section>`;
}

function cards(items) {
  return `<div class="cards">${items.map((item) => `
    <article class="card">
      <div class="record-head"><strong>${item.title}</strong>${pill(item.tag || "模組", "ai")}</div>
      <small>${item.text}</small>
    </article>
  `).join("")}</div>`;
}

function eventList() {
  return `<div class="events">${state.events.map((event, index) => `
    <article class="record"><div class="record-head"><strong>${index + 1}. ${event}</strong>${pill(index === 0 ? "最新" : "紀錄", index === 0 ? "warn" : "ai")}</div><small>模擬營運紀錄，供公開展示使用。</small></article>
  `).join("")}</div>`;
}

function overview() {
  return `
    <section class="view">
      ${metricGrid()}
      <div class="grid two">
        ${visualPanel()}
        <section class="panel"><div class="panel-head"><h2>專業化模組</h2><span>從學生構想到正式產品流程</span></div>${cards(project.panels)}</section>
      </div>
      <div class="grid two">
        <section class="panel"><div class="panel-head"><h2>核心洞察</h2><span>設計判斷</span></div>${insightList(project.insights)}</section>
        <section class="panel"><div class="panel-head"><h2>近期事件</h2><span>操作留痕</span></div>${eventList()}</section>
      </div>
    </section>
  `;
}

function workflow() {
  return `
    <section class="view">
      <div class="grid two">
        <section class="panel">
          <div class="panel-head"><h2>主要流程</h2><span>可執行工作流</span></div>
          <div class="timeline">${project.workflow.map((step, index) => `<div class="step"><span>${index + 1}</span><div><strong>${step}</strong><p class="muted">已整理成公開展示版的互動流程。</p></div></div>`).join("")}</div>
        </section>
        <section class="panel">
          <div class="panel-head"><h2>${project.form.title}</h2><span>模擬建立流程</span></div>
          <form id="mainForm">${project.form.fields.map(fieldTemplate).join("")}<button type="submit">${project.form.button}</button></form>
        </section>
      </div>
      <section class="panel"><div class="panel-head"><h2>流程狀態</h2><span>建立後會寫入事件紀錄</span></div>${eventList()}</section>
    </section>
  `;
}

function fieldTemplate(field) {
  if (field.type === "select") {
    return `<label>${field.label}<select name="${field.name}">${field.options.map((option) => `<option ${option === field.value ? "selected" : ""}>${option}</option>`).join("")}</select></label>`;
  }
  return `<label>${field.label}<input name="${field.name}" value="${field.value}"></label>`;
}

function records() {
  return `
    <section class="view">
      <div class="grid two">
        <section class="panel"><div class="panel-head"><h2>${project.recordsTitle}</h2><span>業務資料</span></div><div class="records">${state.records.map(recordTemplate).join("")}</div></section>
        <section class="panel"><div class="panel-head"><h2>分析摘要</h2><span>資料驅動決策</span></div>${insightList(project.insights)}<div class="actions"><button data-action="analyze">重新分析</button><button data-action="approve">核准第一筆待辦</button></div></section>
      </div>
      ${visualPanel()}
    </section>
  `;
}

function recordTemplate(record, index) {
  return `
    <article class="record">
      <div class="record-head"><div><strong>${record.title}</strong><small>${record.meta}</small></div>${pill(record.status, statusType(record.status))}</div>
      <div class="bar" style="--bar:var(--accent2);--value:${Math.max(28, 92 - index * 21)}%"><span></span></div>
    </article>
  `;
}

function automation() {
  return `
    <section class="view">
      <div class="grid two">
        <section class="panel"><div class="panel-head"><h2>AI / 自動化能力</h2><span>展示版模擬運算</span></div><div class="grid two">${project.automation.map((item, index) => `<article class="card"><strong>${item}</strong><small>狀態：${index % 2 ? "待人工確認" : "已產生建議"}</small></article>`).join("")}</div></section>
        <section class="panel">
          <div class="panel-head"><h2>智慧建議</h2><span>依目前資料產生</span></div>
          <textarea id="advisorInput" rows="5">請根據目前系統狀態提出下一步優化建議。</textarea>
          <div class="actions"><button data-advisor="risk">風險</button><button data-advisor="next">下一步</button><button data-advisor="report">報告摘要</button></div>
          <div id="advisorResult" class="card"><strong>建議摘要</strong><small>${state.advisorText || project.insights[0]}</small></div>
        </section>
      </div>
      <section class="panel"><div class="panel-head"><h2>治理原則</h2><span>公開展示版保護界線</span></div><div class="grid three">${project.governance.map((item) => `<article class="card"><strong>${item}</strong><small>正式系統需保留設定、稽核與人工確認流程。</small></article>`).join("")}</div></section>
    </section>
  `;
}

function governance() {
  return `
    <section class="view">
      <div class="grid two">
        <section class="panel"><div class="panel-head"><h2>治理與稽核</h2><span>可公開展示，不含真實個資</span></div><div class="grid two">${project.governance.map((item) => `<article class="card"><strong>${item}</strong><small>此項已納入公開展示版設計界線。</small></article>`).join("")}</div></section>
        <section class="panel"><div class="panel-head"><h2>事件紀錄</h2><button class="download" id="downloadBtn">下載摘要</button></div>${eventList()}</section>
      </div>
      <section class="panel"><div class="panel-head"><h2>部署準備</h2><span>GitHub Pages</span></div><div class="grid three"><article class="card"><strong>純靜態</strong><small>無後端、資料庫、API key 或真實服務連線。</small></article><article class="card"><strong>免登入</strong><small>管理端、使用端與展示端能力合併開放。</small></article><article class="card"><strong>可部署</strong><small>推送到 main branch 後可設定 Pages / root。</small></article></div></section>
    </section>
  `;
}

function insightList(items) {
  return `<div class="insights">${items.map((item) => `<article class="record"><strong>${item}</strong><small>依學生文件延伸出的產品化判斷。</small></article>`).join("")}</div>`;
}

function render() {
  renderChrome();
  const views = [overview, workflow, records, automation, governance];
  qs("#app").innerHTML = views[state.activeTab]();
  bindCurrentView();
  drawVisual();
}

function bindCurrentView() {
  const form = qs("#mainForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const first = project.form.fields[0];
      const value = new FormData(form).get(first.name);
      state.metricBoost += 1;
      addEvent(`${project.form.button}：${value}`);
      toast("工作已建立並寫入事件紀錄。");
      render();
    });
  }
  qsa("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.action === "approve") {
        const target = state.records.find((record) => /待|需|修訂|處理|審核/.test(record.status));
        if (target) target.status = "已確認";
        addEvent("人工審核已更新第一筆待辦資料");
      } else {
        addEvent("資料已重新分析並更新洞察摘要");
      }
      toast("狀態已更新。");
      render();
    });
  });
  qsa("[data-advisor]").forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.advisor;
      const options = {
        risk: project.insights[1] || project.insights[0],
        next: `建議優先完成「${project.workflow[1]}」與「${project.workflow[2]}」，並保留人工確認節點。`,
        report: `${project.shortName} 目前已具備 ${project.panels.map((p) => p.title).join("、")} 等核心能力。`
      };
      state.advisorText = options[mode];
      addEvent(`AI 顧問產生「${button.textContent}」建議`);
      toast("AI 顧問已產生建議。");
      render();
    });
  });
  const download = qs("#downloadBtn");
  if (download) {
    download.addEventListener("click", () => {
      const content = [project.title, "", "近期事件:", ...state.events.map((event) => "- " + event)].join("\n");
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = project.slug + "-summary.txt";
      a.click();
      URL.revokeObjectURL(url);
      toast("摘要檔已產生。");
    });
  }
}

function drawVisual() {
  const canvas = qs("#visualCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  const css = getComputedStyle(document.body);
  const accent = css.getPropertyValue("--accent").trim();
  const accent2 = css.getPropertyValue("--accent2").trim();
  const accent3 = css.getPropertyValue("--accent3").trim();
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  if (project.visual.mode === "game") {
    drawGame(ctx, width, height, accent, accent2, accent3);
    return;
  }
  ctx.strokeStyle = "rgba(20, 35, 55, 0.12)";
  for (let x = 0; x < width; x += 42) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
  }
  for (let y = 0; y < height; y += 42) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
  }
  const points = project.visual.nodes.map(([title, sub, x, y]) => ({ title, sub, x: width * x / 100, y: height * y / 100 }));
  ctx.lineWidth = 4;
  ctx.strokeStyle = "rgba(37, 99, 235, 0.25)";
  for (const [from, to] of project.visual.links) {
    ctx.beginPath();
    ctx.moveTo(points[from].x, points[from].y);
    ctx.lineTo(points[to].x, points[to].y);
    ctx.stroke();
  }
  points.forEach((point, index) => {
    ctx.fillStyle = index % 3 === 0 ? accent : index % 3 === 1 ? accent2 : accent3;
    roundRect(ctx, point.x - 88, point.y - 31, 176, 62, 10);
    ctx.fill();
    ctx.fillStyle = index % 3 === 2 ? "#101820" : "#fff";
    ctx.font = "700 20px Microsoft JhengHei, Arial";
    ctx.fillText(point.title, point.x - 68, point.y - 4);
    ctx.font = "14px Microsoft JhengHei, Arial";
    ctx.fillText(point.sub, point.x - 68, point.y + 20);
  });
}

function drawGame(ctx, width, height, accent, accent2, accent3) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#111827");
  gradient.addColorStop(1, "#2b1111");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  for (let i = 0; i < 9; i += 1) ctx.fillRect(70 + i * 95, 95 + (i % 3) * 28, 48, 210);
  ctx.fillStyle = accent3;
  ctx.fillRect(120, 330, 740, 10);
  ctx.fillStyle = accent2;
  ctx.fillRect(210, 240, 58, 88);
  ctx.fillStyle = accent;
  ctx.fillRect(675, 218, 74, 110);
  ctx.fillStyle = "#fff";
  ctx.font = "700 24px Microsoft JhengHei, Arial";
  ctx.fillText("玩家：格擋準備", 170, 70);
  ctx.fillText("敵人 AI：追擊", 610, 70);
  meter(ctx, 170, 90, 260, "HP", 82, accent);
  meter(ctx, 610, 90, 260, "Stamina", 64, accent3);
}

function meter(ctx, x, y, w, label, value, color) {
  ctx.fillStyle = "rgba(255,255,255,0.22)";
  ctx.fillRect(x, y, w, 12);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w * value / 100, 12);
  ctx.fillStyle = "#fff";
  ctx.font = "14px Microsoft JhengHei, Arial";
  ctx.fillText(`${label} ${value}%`, x, y + 34);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

render();
