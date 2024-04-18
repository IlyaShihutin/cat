import React, { useEffect, useState } from "react";

import { SwitchCatType } from "../.././types/switchType";

import "./style.scss";

const SwitchCat: React.FC = () => {
  const [catIndex, setCatIndex] = useState<number>(0);
  const [maxIndex, setMaxIndex] = useState<number>(0);

  const switchCats = (side: SwitchCatType) => {
    let newIndex: number = catIndex
    if (side === SwitchCatType.PREV) {
      newIndex -= 1;
    } else {
      newIndex += 1;
    }
    const isListEnd: boolean = newIndex === maxIndex;

    window.electron.send('switchCat', { index: newIndex, isListEnd: isListEnd });
    setCatIndex(newIndex)
  }

  useEffect(() => {
    const getCatsData = (response: number) => {
      setMaxIndex(prev => prev + response);
    }
    window.electron.on('switchCatReplay', getCatsData)
    window.electron.send('switchCat', { index: 0, isListEnd: true });

    return () => {
      window.electron.removeListener('switchCatReplay', getCatsData);
    };
  }, []);

  return <div className="wrapper switch">
    <button className="switch_btn" onClick={() => switchCats(SwitchCatType.PREV)} disabled={catIndex === 0}>Prev</button>
    <button className="switch_btn" onClick={() => switchCats(SwitchCatType.NEXT)}>Next</button>
  </div>
}

export default SwitchCat;
