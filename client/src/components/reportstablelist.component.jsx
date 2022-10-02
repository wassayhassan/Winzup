import React from "react";
import Report from "./report.component";

function ReportsTableList({reports}){
  
    return (
        reports && reports.map((report)=> {
          return <Report report={report} key={report._id} />
        })
    )
}
export default ReportsTableList;