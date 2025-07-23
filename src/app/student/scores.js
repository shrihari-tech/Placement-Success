import React from 'react'
import { useDataContext } from "../context/dataContext";


const scores = () => {
    const { studentData} = useDataContext();

    const batchesNames = useMemo(() => {
      return [...new Set(studentData.map(s => s.batch))];
    }, [studentData]);

  return (
    <div>
        scores
    </div>
  )
}

export default scores