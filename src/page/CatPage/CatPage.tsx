import React, { useEffect, useState } from "react";

import { Cat, CatRequest } from "../../types/catType";

import "./style.scss";

const CatPage: React.FC = () => {
  const [catList, setCatList] = useState<Cat[]>([]);
  const [catIndex, setCatIndex] = useState<number>(0);

  useEffect(() => {
    const getCatsData = (response: CatRequest) => {
      if (response.list.length) {
        setCatList([...catList, ...response.list]);
      }
      setCatIndex(response.index);
    }

    window.electron.on('getCats', getCatsData)

    return () => {
      window.electron.removeListener('getCats', getCatsData);
    };
  }, [catList]);

  return (
    <div className='wrapper cat' >
      {catList[catIndex]
        ? <img className="cat_img" src={catList[catIndex].url} alt="cat image" />
        : <p className="cat_text">Cat has left</p>
      }
    </div>
  );
}

export default CatPage;
