import AllCoins from "../AllCoins";
import MarketStats from "../MarketStats";
import TopMoving from "../TopMoving";

function RootData() {
  return (
    <>
      <MarketStats />
      <TopMoving />
      <AllCoins />
    </>
  );
}

export default RootData;
