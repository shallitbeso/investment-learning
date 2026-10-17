// 章节清单：新增章节只需在这里添加一项
const CHAPTERS = [
  { id: "01", file: "01-投资前的准备.html", title: "投资前的准备", desc: "先把家底理清：应急金、负债、保险和目标，这些比选股更重要。" },
  { id: "02", file: "02-核心概念.html", title: "必懂的核心概念", desc: "复利、通胀、风险与收益、流动性——一切投资决策的底层逻辑。" },
  { id: "03", file: "03-投资品种全览.html", title: "投资品种全览", desc: "从存款、国债到股票、基金、黄金、期货，逐一认识它们的脾气。" },
  { id: "04", file: "04-股票入门.html", title: "股票入门", desc: "股票是什么、怎么交易、如何看财报和估值。" },
  { id: "05", file: "05-基金与指数投资.html", title: "基金与指数投资", desc: "新手最友好的工具：基金分类、费用、挑选方法和定投。" },
  { id: "06", file: "06-资产配置与风险管理.html", title: "资产配置与风险管理", desc: "不把鸡蛋放在一个篮子里，以及如何决定每个篮子放多少。" },
  { id: "07", file: "07-投资心理与常见错误.html", title: "投资心理与常见错误", desc: "最大的敌人往往是自己：追涨杀跌、损失厌恶等行为陷阱。" },
  { id: "08", file: "08-防骗与风险警示.html", title: "防骗与风险警示", desc: "识别荐股群、杀猪盘、庞氏骗局，守住本金。" },
  { id: "09", file: "09-实操指南.html", title: "实操指南：迈出第一步", desc: "开户、选平台、税费、制定计划，手把手完成第一笔投资。" },
  { id: "10", file: "10-术语表.html", title: "投资术语表", desc: "随时查阅的常用名词速查手册。" },
  { id: "11", level: "进阶", file: "11-深入读懂财报.html", title: "深入读懂财报", desc: "三张报表如何勾稽、杜邦分析、现金流质量与财务造假信号。" },
  { id: "12", level: "进阶", file: "12-估值方法进阶.html", title: "估值方法进阶", desc: "DCF 现金流折现、PEG、EV/EBITDA、分行业估值与安全边际。" },
  { id: "13", level: "进阶", file: "13-宏观经济与市场周期.html", title: "宏观经济与市场周期", desc: "利率、货币政策、通胀、经济周期如何影响各类资产。" },
  { id: "14", level: "进阶", file: "14-债券进阶.html", title: "债券进阶", desc: "到期收益率、久期、凸性、收益率曲线与信用风险。" },
  { id: "15", level: "进阶", file: "15-组合理论与因子投资.html", title: "组合理论与因子投资", desc: "现代组合理论、夏普比率、相关性、因子投资与风险平价。" },
  { id: "16", level: "进阶", file: "16-衍生品与可转债.html", title: "衍生品与可转债", desc: "期货、期权的原理与风险，以及可转债这个“攻守兼备”的品种。" },
  { id: "17", level: "进阶", file: "17-技术分析与交易执行.html", title: "技术分析与交易执行", desc: "K 线、均线、量价关系的客观认识，仓位管理与交易纪律。" },
  { id: "18", level: "进阶", file: "18-建立个人投资体系.html", title: "建立个人投资体系", desc: "投资政策书、业绩归因、复盘方法，形成可持续的投资框架。" },
  { id: "19", level: "进阶", file: "19-用AI工具辅助投资.html", title: "用 AI 工具辅助投资", desc: "AI 能做什么、不能做什么，读财报、做研究、写代码的工作流与提示词模板，以及如何验证 AI 的输出。" },
  { id: "R1", level: "实战", file: "财报精读-美的集团.html", title: "财报精读：美的集团", desc: "A 股制造业龙头。学会看营收结构、毛利率、上下游占款和现金流季节性。" },
  { id: "R2", level: "实战", file: "财报精读-腾讯控股.html", title: "财报精读：腾讯控股", desc: "港股互联网平台。学会区分 IFRS 与非 IFRS、理解递延收入与投资组合。" },
  { id: "R3", level: "实战", file: "财报精读-苹果公司.html", title: "财报精读：苹果公司", desc: "美股科技巨头。学会读 10-K、识别一次性项目、理解回购对 ROE 的影响。" },
  { id: "tools", level: "工具", file: "工具-投资计算器.html", title: "互动计算器", desc: "复利、定投、通胀、回本、DCF 计算器，亲手感受数字的力量。" },
];
const LEVELS = ["入门", "进阶", "实战", "工具"];
CHAPTERS.forEach(c => { c.level = c.level || "入门"; });

const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
};

function getDone() { return store.get("invest-done", {}); }

function applyTheme() {
  const t = store.get("invest-theme", null);
  if (t) document.documentElement.setAttribute("data-theme", t);
}
applyTheme();

function toggleTheme() {
  const cur = document.documentElement.getAttribute("data-theme") ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const next = cur === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  store.set("invest-theme", next);
}

function buildTopbar(isHome) {
  const bar = document.createElement("header");
  bar.className = "topbar";
  bar.innerHTML = `<div class="topbar-inner">
    ${isHome ? "" : '<button class="icon-btn" id="menuBtn" aria-label="目录">☰ 目录</button>'}
    <a class="brand" href="index.html">📘 投资入门学习手册</a>
    <span class="spacer"></span>
    <button class="icon-btn" id="themeBtn" aria-label="切换深浅色">◐ 主题</button>
  </div>`;
  document.body.prepend(bar);
  bar.querySelector("#themeBtn").onclick = toggleTheme;
}

function buildSidebar(pageId) {
  const side = document.querySelector(".sidebar");
  if (!side) return;
  const done = getDone();
  const names = { "入门": "入门篇", "进阶": "进阶篇", "实战": "实战篇 · 财报精读", "工具": "工具" };
  side.innerHTML = LEVELS.map(lv => `<h4 style="margin-top:${lv === "入门" ? 0 : 20}px">${names[lv]}</h4><ol>${
    CHAPTERS.filter(c => c.level === lv).map(c => `
    <li><a href="${c.file}" class="${c.id === pageId ? "active" : ""}">
      <span class="num">${c.id === "tools" ? "🧮" : c.level === "实战" ? "📄" : c.id}</span><span>${c.title.replace("财报精读：", "")}</span>
      ${done[c.id] ? '<span class="done-dot">✓</span>' : ""}
    </a></li>`).join("")}</ol>`).join("");
  const btn = document.getElementById("menuBtn");
  if (btn) btn.onclick = () => side.classList.toggle("open");
}

function buildFooter(pageId) {
  const main = document.querySelector(".content");
  if (!main) return;
  const idx = CHAPTERS.findIndex(c => c.id === pageId);
  const prev = CHAPTERS[idx - 1], next = CHAPTERS[idx + 1];
  const f = document.createElement("div");
  f.className = "chapter-footer";
  f.innerHTML = `
    <button class="done-btn" id="doneBtn"></button>
    <nav class="pager">
      ${prev ? `<a class="prev" href="${prev.file}"><small>← 上一章</small>${prev.title}</a>` : ""}
      ${next ? `<a class="next" href="${next.file}"><small>下一章 →</small>${next.title}</a>` : `<a class="next" href="index.html"><small>完成 →</small>返回首页</a>`}
    </nav>`;
  main.appendChild(f);
  const btn = f.querySelector("#doneBtn");
  const render = () => {
    const d = getDone()[pageId];
    btn.classList.toggle("is-done", !!d);
    btn.textContent = d ? "✓ 已学完本章" : "标记为已学完";
  };
  btn.onclick = () => { const d = getDone(); d[pageId] = !d[pageId]; store.set("invest-done", d); render(); buildSidebar(pageId); };
  render();
}

// 让带 data-key 的清单勾选状态被记住
function bindChecklists() {
  document.querySelectorAll(".checklist input[data-key]").forEach(cb => {
    const k = "invest-check-" + cb.dataset.key;
    cb.checked = store.get(k, false);
    cb.onchange = () => store.set(k, cb.checked);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const pageId = document.body.dataset.page;
  buildTopbar(pageId === "home");
  if (pageId !== "home") { buildSidebar(pageId); buildFooter(pageId); }
  bindChecklists();
});
