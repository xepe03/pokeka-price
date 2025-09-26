import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import packs from "./data/packs";

function Home() {
  const [search, setSearch] = useState("");
  const [selectedSeries, setSelectedSeries] = useState([]);
  const navigate = useNavigate();

  const seriesList = [...new Set(Object.values(packs).map((p) => p.series))];

  const toggleSeries = (series) => {
    if (selectedSeries.includes(series)) {
      setSelectedSeries(selectedSeries.filter((s) => s !== series));
    } else {
      setSelectedSeries([...selectedSeries, series]);
    }
  };

  const filteredPacks = Object.values(packs).filter((p) => {
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

      <input
        type="text"
        placeholder="확장팩검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {search.trim() === "" && (
        <div style={styles.seriesContainer}>
          <h3 style={styles.subTitle}>모든 확장팩</h3>
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
    alignItems: "center"   // 전체를 수평 중앙정렬
  },
  title: {
    textAlign: "center",
    fontSize: "28px",
    marginBottom: "20px"
  },
  subTitle: {
    marginBottom: "10px",
    textAlign: "center"
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
    alignItems: "center",   // 가운데 정렬
    width: "100%"
  },
  packBox: {
    width: "100%",
    maxWidth: "400px",      // 박스 너비 제한
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
