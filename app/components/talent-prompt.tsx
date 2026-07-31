"use client";

import { FormEvent, useState } from "react";

const suggestions = [
  "懂千卡训练与推理优化的人",
  "有真机量产经验的具身算法专家",
  "做过世界模型与端到端驾驶的人",
];

const fallbackResults = [
  {
    id: 1,
    name: "陈墨",
    title: "AI Infra · 分布式训练",
    evidenceCount: 16,
    sourceCount: 9,
    matchScore: 94,
  },
  {
    id: 2,
    name: "林乔",
    title: "具身智能 · 机器人学习",
    evidenceCount: 14,
    sourceCount: 7,
    matchScore: 91,
  },
  {
    id: 3,
    name: "周也",
    title: "推理架构 · 编译器",
    evidenceCount: 18,
    sourceCount: 10,
    matchScore: 88,
  },
];

type TalentResult = {
  id: number;
  name: string;
  title: string;
  evidenceCount: number;
  sourceCount: number;
  matchScore: number;
};

export function TalentPrompt() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<TalentResult[]>(fallbackResults);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    setShowResults(false);
    try {
      const response = await fetch(`/api/talent?q=${encodeURIComponent(query)}`);
      const data = (await response.json()) as { profiles?: TalentResult[] };
      if (response.ok && data.profiles?.length) {
        setResults(data.profiles.slice(0, 3));
      } else {
        setResults(fallbackResults);
      }
    } catch {
      setResults(fallbackResults);
    } finally {
      await new Promise((resolve) => window.setTimeout(resolve, 520));
      setIsSearching(false);
      setShowResults(true);
    }
  }

  return (
    <div className="prompt-wrap">
      <form className="talent-prompt" onSubmit={submit}>
        <label htmlFor="talent-query">你正在寻找怎样的人？</label>
        <div className="prompt-input-row">
          <textarea
            id="talent-query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="例如：做过千卡训练，持续维护开源项目，最近关注推理效率的人"
            rows={2}
          />
          <button type="submit" aria-label="开始搜索" disabled={isSearching}>
            {isSearching ? "···" : "↑"}
          </button>
        </div>
        <div className="prompt-tools">
          <span className="tool-dot" />
          <span>全网证据搜索</span>
          <span>·</span>
          <span>中文 / English</span>
        </div>
      </form>

      <div className="prompt-suggestions">
        {suggestions.map((suggestion) => (
          <button key={suggestion} onClick={() => setQuery(suggestion)}>
            {suggestion}
          </button>
        ))}
      </div>

      {(isSearching || showResults) && (
        <div className={`prompt-results ${isSearching ? "is-searching" : ""}`}>
          {isSearching ? (
            <div className="searching-state">
              <span className="search-orbit" />
              正在读取并验证人才信号
            </div>
          ) : (
            <>
              <div className="results-head">
                <span>为你找到的高相关人才</span>
                <a href="/workspace">进入完整搜索 ↗</a>
              </div>
              {results.map((result) => (
                <article key={result.id} className="mini-result">
                  <div className="mini-avatar">{result.name.slice(0, 1)}</div>
                  <div>
                    <strong>{result.name}</strong>
                    <span>{result.title}</span>
                  </div>
                  <small>
                    {result.evidenceCount} 项证据 · {result.sourceCount} 个来源
                  </small>
                  <b>{result.matchScore}%</b>
                </article>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
