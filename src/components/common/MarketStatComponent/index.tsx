import "./styles.css";

interface MarketStatComponentProps {
  title: string;
  body: string;
  subtext?: number;
}

function MarketStatComponent({
  title,
  body,
  subtext,
}: MarketStatComponentProps) {
  return (
    <div className="marketStatComponent">
      <div className="top">{title}</div>
      <div className="between">{body}</div>
      <div
        className="bottom"
        style={{
          color: (subtext ?? 0) < 0 ? "var(--negative)" : "var(--positive)",
        }}
      >
        {subtext && `${subtext.toFixed(2)}%`}
      </div>
    </div>
  );
}

export default MarketStatComponent;
