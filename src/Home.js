import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import packs from "./data/packs";
import specialPacks from "./data/packs-special";

function Home() {
  const [search, setSearch] = useState("");
  const [selectedSeries, setSelectedSeries] = useState([]);
  const [mode, setMode] = useState("normal"); // normal | special
  const navigate = useNavigate();

  // 검색어가 있으면 확장팩+스페셜팩 전체 검색
  const baseData =
    search.trim() !== ""
      ? { ...packs, ...specialPacks }
      : mode === "normal"
      ? packs
      : specialPacks;

  const seriesList = [...new Set(Object.values(baseData).map((p) => p.series))];

  const toggleSeries = (series) => {
    if (selectedSeries.includes(series)) {
      setSelectedSeries(selectedSeries.filter((s) => s !== series));
    } else {
      setSelectedSeries([...selectedSeries, series]);
    }
  };

  const filteredPacks = Object.values(baseData).filter((p) => {
    const krName = p.names.kr.replace(/\s+/g, "");
    const searchWord = search.replace(/\s+/g, "");
    const matchesSearch = searchWord === "" || krName.includes(searchWord);
    const matchesSeries =
      selectedSeries.length === 0 || selectedSeries.includes(p.series);
    return matchesSearch && matchesSeries;
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Pokeka</h2>

      {/* 검색창 */}
      <input
        type="text"
        placeholder="확장팩검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* 확장팩/스페셜팩 버튼 (검색 없을 때만 보임) */}
      {search.trim() === "" && (
        <div style={styles.modeContainer}>
          <button
            onClick={() => setMode("normal")}
            style={{
              ...styles.modeBtn,
              backgroundColor: mode === "normal" ? "#e0e0e0" : "#fff"
            }}
          >
            확장팩
          </button>
          <button
            onClick={() => setMode("special")}
            style={{
              ...styles.modeBtn,
              backgroundColor: mode === "special" ? "#e0e0e0" : "#fff"
            }}
          >
            스페셜팩
          </button>
        </div>
      )}

      {/* 시리즈 선택 (검색 없을 때만 표시) */}
      {search.trim() === "" && (
        <div style={styles.seriesContainer}>
          <h3 style={styles.subTitle}>시리즈 선택</h3>
          {seriesList.map((s) => (
            <button
              key={s}
              onClick={() => toggleSeries(s)}
              style={{
                ...styles.seriesBtn,
                backgroundColor: selectedSeries.includes(s) ? "#e0e0e0" : "#fff"
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* 결과 리스트 */}
      <div style={styles.resultContainer}>
        {filteredPacks.length > 0 ? (
          filteredPacks.map((p) => (
            <div
              key={p.pName}
              style={styles.packBox}
              onClick={() => navigate(`/pack/${p.pName}`)}
            >
              {p.names.kr}
            </div>
          ))
        ) : (
          search.trim() !== "" && (
            <p style={styles.noResult}>팩이 존재하지 않습니다</p>
          )
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f5f5f5",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    textAlign: "center",
    fontSize: "28px",
    marginBottom: "20px"
  },
  search: {
    width: "100%",
    maxWidth: "400px",
    padding: "12px 16px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    display: "block",
    margin: "0 auto 20px"
  },
  modeContainer: {
    marginBottom: "15px",
    textAlign: "center"
  },
  modeBtn: {
    margin: "5px",
    padding: "8px 14px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    cursor: "pointer"
  },
  subTitle: {
    marginBottom: "10px",
    textAlign: "center"
  },
  seriesContainer: {
    marginBottom: "20px",
    textAlign: "center"
  },
  seriesBtn: {
    margin: "5px",
    padding: "8px 14px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    cursor: "pointer"
  },
  resultContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "center",
    width: "100%"
  },
  packBox: {
    width: "100%",
    maxWidth: "400px",
    background: "#fff",
    borderRadius: "16px",
    padding: "14px",
    textAlign: "center",
    border: "1px solid #ddd",
    cursor: "pointer"
  },
  noResult: {
    color: "#888",
    fontSize: "15px",
    marginTop: "20px",
    textAlign: "center"
  }
};

export default Home;
