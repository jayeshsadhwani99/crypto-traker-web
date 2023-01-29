import "./styles.css";
import Table from "../common/Table";
import { useContext, useEffect, useState } from "react";
import { CoinContext, CoinContextType } from "../../context/CoinContext";
import Input from "../common/Input";

function AllCoins() {
  const { searchText, setSearchText } = useContext(
    CoinContext
  ) as CoinContextType;
  const { coins } = useContext(CoinContext) as CoinContextType;

  function handleChange(event: any) {
    setSearchText(event.target.value);
  }

  return (
    <div className="allCoins">
      <div className="title">All Coins</div>

      <Input
        value={searchText}
        placeholder={"Search using symbol or name..."}
        type="text"
        handleChange={handleChange}
      />
      <Table coins={coins} />
    </div>
  );
}

export default AllCoins;
