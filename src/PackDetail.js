import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import packs from "./data/packs";

function PackDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pack = packs[id];

  if (!pack) return <p>팩 정보를 찾을 수 없습니다.</p>;

  const jpName = pack.names.jp;
  const links = {
    mercari: `https://jp.mercari.com/search?keyword=${encodeURIComponent(
      jpName + " box"
    )}`,
    ebay: `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(
      jpName + " box"
    )}`,
    snkrdunk: `https://snkrdunk.com/search?keywords=${encodeURIComponent(
      jpName
    )}`,
    tcgplayer: `https://www.tcgplayer.com/search/all/product?q=${encodeURIComponent(
      jpName
    )}`
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{pack.pName}</h2>
        <p style={styles.subTitle}>
          {pack.series} | {pack.type}
        </p>
        <p style={styles.jpName}>{pack.names.jp}</p>

        <h3 style={styles.sectionTitle}>시세 보러가기</h3>
        <div style={styles.linkContainer}>
          <a
            href={links.mercari}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.linkBtn}
          >
            메르카리
          </a>
          <a
            href={links.ebay}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.linkBtn}
          >
            eBay
          </a>
          <a
            href={links.snkrdunk}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.linkBtn}
          >
            SNKRDUNK
          </a>
           <button style={{ ...styles.linkBtn, background: "#eee", color: "#aaa", cursor: "not-allowed" }} disabled>
    TCGplayer (준비중)
  </button>
        </div>

        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          뒤로
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f5f5f5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },
  card: {
    width: "100%",
    maxWidth: "600px", // 카드 최대 크기
    background: "#fff",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  title: {
    fontSize: "24px",
    marginBottom: "8px",
    color: "#333"
  },
  subTitle: {
    fontSize: "15px",
    marginBottom: "4px",
    color: "#666"
  },
  jpName: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "20px"
  },
  sectionTitle: {
    margin: "20px 0 15px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#444"
  },
  linkContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "15px",
    marginBottom: "20px"
  },
  linkBtn: {
    flex: "1 1 40%", // 버튼 크기 맞춰서 2열 배치
    maxWidth: "200px",
    minWidth: "120px",
    padding: "12px 0",
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #ccc",
    textDecoration: "none",
    color: "#333",
    fontSize: "14px",
    fontWeight: "bold",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    transition: "0.2s"
  },
  backBtn: {
    marginTop: "10px",
    padding: "10px 20px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    background: "#fff",
    cursor: "pointer"
  }
};

export default PackDetail;
