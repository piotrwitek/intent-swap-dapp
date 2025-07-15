import { useApp } from "../context/useApp";
import { AppActionType } from "../context/AppProvider";
import Dropdown from "./Dropdown";

const CHAIN_OPTIONS = [
  { value: 1, label: "Ethereum" },
  { value: 8453, label: "Base" },
  { value: 42161, label: "Arbitrum" },
];

export default function ChainSelector() {
  const { state, dispatch } = useApp();

  const handleChainSelect = (chainId: string | number) => {
    dispatch({ type: AppActionType.SET_CHAIN_ID, payload: Number(chainId) });
  };

  return (
    <Dropdown
      options={CHAIN_OPTIONS}
      value={state.chainId}
      onChange={handleChainSelect}
      ariaLabel="Select blockchain"
    />
  );
}
