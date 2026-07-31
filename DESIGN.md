# 拾光 Shiguang — Design System

## 1. Creative Direction

拾光使用一套原创的 **Tezign × DINQ × Meta** 混合设计语言：

- Tezign-inspired：黑色品牌画布、超大编辑式标题、鲜明的紫/粉/酸橙聚光色与模块化产品叙事。
- DINQ-inspired：自然语言人才搜索、证据核验、候选人排序、人才对比和个性化沟通构成核心信息路径。
- Meta-inspired：工作台区域保持清晰、克制和高可用，使用胶囊控件、轻边框、明确状态和足够大的操作目标。

这是对界面原则的重新组合，不复制任何第三方 Logo、文案、图像、版式成品或品牌资产。

## 2. Experience Principles

1. **Evidence before opinion** — 关键判断旁边必须能看到证据、来源或状态。
2. **From understanding to action** — 每个洞察都应有明确下一步，例如加入清单、比较、触达或推进阶段。
3. **Editorial outside, operational inside** — 营销叙事大胆，数据工作台精确。
4. **Human final decision** — AI 负责归纳和建议，人类负责最终招聘决定。
5. **Progressive density** — 首屏容易理解，深层工具逐步显露更多信息。

## 3. Color Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `--ink` | `#070707` | 主文字、黑色品牌画布 |
| `--paper` | `#F3F1EB` | 编辑式浅色背景 |
| `--white` | `#FFFFFF` | 面板与反白文字 |
| `--line` | `#D5D1C9` | 浅色分隔线和输入框 |
| `--muted` | `#77756F` | 次级信息 |
| `--lime` | `#C7FF4A` | 主行动、高优先状态 |
| `--violet` | `#6E48FF` | AI 洞察、品牌聚光 |
| `--pink` | `#FF71C2` | 辅助视觉与提醒 |
| `--panel` | `#151515` | 深色工作台卡片 |

只在大型品牌区、聚光卡或关键状态使用高饱和色。长文本区域必须保持高对比。

## 4. Typography

- Font stack: `Inter, "PingFang SC", "Microsoft YaHei", Arial, sans-serif`.
- Display: `clamp(54px, 8vw, 116px)`, weight `500`, line-height `.9–.98`, tracking `-.05em` to `-.075em`.
- Section heading: `34–64px`, weight `500`, tight tracking.
- Body: `12–16px`, line-height `1.55–1.75`.
- Eyebrow/label: `8–11px`, weight `700–800`, uppercase where appropriate, tracking `.08–.14em`.
- Numeric metrics use tabular-looking spacing and minimal decoration.

Chinese display copy should stay short enough to preserve editorial rhythm. Avoid centered paragraphs longer than three lines.

## 5. Layout and Spacing

- Maximum content width: `1280px`.
- Marketing sections: `72–112px` vertical rhythm.
- Workbench sections: `20–56px` vertical rhythm.
- Desktop side padding: minimum `32px`; mobile: `16px`.
- Primary grid: 12 columns conceptually; use 2/3, 1/3 or asymmetric bento spans.
- Card radius: `16–28px`; pills: `999px`.
- Use one dominant object per viewport. Avoid grids with more than four equal columns.

## 6. Component Language

### Buttons

- Minimum target height: `44px`.
- Primary: acid-lime fill, dark text, round pill.
- Secondary: transparent with a 1px border.
- Icon button: `40–44px` square/circle.
- Hover changes fill or translates by no more than `2px`.

### Cards

- Marketing spotlight cards may use violet, pink or lime backgrounds.
- Product cards use white or `#151515` with a 1px border.
- Shadows are rare; separation comes from color, border and spacing.
- Every card has one clear action or one clear information purpose.

### Forms

- Labels remain visible above inputs.
- Inputs are at least `44px` high and have obvious focus treatment.
- Errors appear next to the relevant workflow and never rely on color alone.
- Static GitHub Pages forms store only local demonstration data.

### Status

- Default: dark neutral.
- Interview / attention: lime.
- AI / system insight: violet.
- Offer / completion: violet or high-contrast dark.
- Always pair color with a text label.

## 7. Iconography

- Original inline SVG line icons only.
- Default size: `18px`; small: `14px`; feature icons: `22–28px`.
- Stroke: `1.8`, round cap, round join.
- Icons supplement text instead of replacing unfamiliar actions.
- Do not use third-party brand icon sets or external icon fonts.

## 8. Motion

- Interaction duration: `160–240ms`.
- Reveal duration: `420–700ms`.
- Use opacity, small translation and scale only.
- Support `prefers-reduced-motion`.
- Avoid continuous ornamental animation behind dense data.

## 9. Responsive Behavior

- `>1024px`: full navigation, bento grids, multi-column dashboards.
- `768–1023px`: two-column metrics and stacked primary panels.
- `<768px`: single-column content, hidden sidebars, scrollable kanban, mobile menu.
- No critical action may depend on hover.
- Text, tables and modals must remain usable at `320px`.

## 10. Product Information Architecture

The required recruiting loop is:

1. Describe a hiring need in natural language.
2. Parse JD and identify capabilities, risks and constraints.
3. Rank candidate matches.
4. Inspect evidence and source context.
5. Compare candidates on consistent dimensions.
6. Generate interview validation questions.
7. Create personalized outreach.
8. Save to a shortlist or move through the recruiting pipeline.

Candidate and recruiter portals must expose the same underlying state in language appropriate to each role.

## 11. Guardrails

- Do not reproduce Tezign or DINQ logos, illustrations, copy, screenshots or proprietary layouts.
- Do not use fake testimonials or imply demonstration candidates are real.
- Do not expose production credentials in frontend code.
- The static `admin / fy147852` account is explicitly a public demo only.
- Do not use more than two strong gradient spotlights in one viewport.
- Do not place low-contrast grey text on colored backgrounds.
- Do not hide essential navigation behind icon-only controls on desktop.
- Do not turn every section into a rounded floating card.
